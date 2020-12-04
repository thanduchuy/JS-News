getAllDocFromCollection("news").then(list=>{
        dataRecentPostBody(shuffle(list))
})
function dataRecentPostBody(list) {
    let result = ``
    for(let i=0;i<3;i++) {
        let element =  ` <a href="single.html?id=${list[i].id}" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="w-100 justify-content-between">
            <img src="${list[i].img}" alt="" class="img-fluid float-left">
            <h5 class="mb-1">${list[i].title}</h5>
            <small>${list[i].datePost}</small>
        </div>
    </a>`;
    result+= element;
    }
    document.getElementById("recentBody").innerHTML += result
}
function getAllDocFromCollection(nameCollection) {
    return new Promise((resolve,reject)=>{
        db.collection(nameCollection).get().then(function(querySnapshot) {
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
function loginUser() {
    let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
   if (email == "" || pass == "") {
    document.getElementById("error").innerHTML =
      "Không được bỏ trống trường nào";
    document.getElementById("error").style.display = "block";
  } else {
    login(email, pass);
  }
}

function login(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        if (user.user.email == "admin@gmail.com") {
            location.href = "http://127.0.0.1:5500/adminPage.html"
        } else {
            location.href = "http://127.0.0.1:5500/index.html"
        } 
    })
    .catch((error) => {
    document.getElementById("error").innerHTML =
        "Email hoặc mật khẩu không đúng";
      document.getElementById("error").style.display = "block";
    });
}