let listTemp = []
let chooseIndex = 0
function getUserLogged() {
    return new Promise((resovle,reject)=>{
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resovle(user)
        } else {
           reject("NAN")
        }
      });
    })
}
function loadPage() {
    getUserLogged().then(user=>{
        if (user.email != "admin@gmail.com") {
            location.href = "http://127.0.0.1:5500/index.html"
        }
    })
    getAllDocNews().then(data=>{
        listTemp = data
        loadDataTable(data)
    })
}
function getAllDocNews() {
    return new Promise((resolve,reject)=>{
        db.collection("news").get().then(function(querySnapshot) {
            let list = []
            querySnapshot.forEach(function(doc) {
                let element = {
                    id: doc.id,
                    category: doc.data().category,
                    content: doc.data().content,
                    datePost: doc.data().datePost,
                    img: doc.data().img,
                    namePost: doc.data().namePost,
                    title: doc.data().title,
                    viewCount: doc.data().viewCount
                }
                list.push(element)
            });
            resolve(list)
        });
    })
}
function loadDataTable(arr) {
    let result = arr.map((element,index)=>{
        return `
             <tr>
                                        <th scope="row">${element.id}</th>
                                        <td>${element.title}</td>
                                        <td >${element.content}</td>
                                        <td >
                                            <button type="button" class="btn btn-danger" onclick="dataNewUpdate(${index})" data-toggle="modal" data-target="#exampleModal1">UPDATE</button>
                                            <button type="button" class="btn btn-warning" onclick="submitDelete('${element.id}')">DELETE</button>
                                        </td>
                                    </tr>
        `
    }).join("")
    document.getElementById("tableBody").innerHTML = result
}
function dataNewUpdate(i) {
    chooseIndex = i
    formUpdate.title.value = listTemp[i].title
    formUpdate.content.value = listTemp[i].content
}
function submitUpdate() {
    let data = listTemp[chooseIndex]
    data.title = formUpdate.title.value
    data.content =  formUpdate.content.value 
    updateCollection(data)
}
function submitDelete(id) {
    deleteDocFromCollection(id)
}
function deleteDocFromCollection(id) {
    db.collection("news").doc(id).delete().then(function() {
        location.reload()
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function updateCollection(element) {
     db.collection("news").doc(element.id).set({
       title: element.title,
        datePost: element.datePost,
        namePost: element.namePost,
        viewCount: element.viewCount,
        img:element.img,
        content:element.content,
        category:element.category
    })
    .then(function() {
       location.reload()

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
function addDocToNewCollection(element) {
    db.collection("news").add({
        title: element.title,
        datePost: element.datePost,
        namePost: element.namePost,
        viewCount: element.viewCount,
        img:element.img,
        content:element.content,
        category:element.category
    }).then(function(docRef) {
        location.reload()
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function addDataNew() {
    var today  = new Date();
    let element = {
        title : formAdd.title.value,
        content : formAdd.content.value,
        namePost : formAdd.name.value,
        img : formAdd.img.value,
        datePost: today.toLocaleDateString("en-US"),
        viewCount: 1,
        category: formAdd.category.value
    }
    addDocToNewCollection(element);
}