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
 getAllDocFromCollection("news").then(list=>{
        dataRecentPost(shuffle(list))
        dataPopularPost(shuffle(list))
        dataCategorise(shuffle(list))
})
function dataRecentPost(list) {
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
    document.getElementById("recent").innerHTML += result
}
function dataPopularPost(list) {
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
    document.getElementById("popular").innerHTML += result
}
function dataCategorise(list) {
    let result = ''
    for(let i = 0;i<4;i++) {
        let element = `
   <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
    <div class="blog-box">
    <div class="post-media">
        <a href="single.html?id=${list[i].id}" title="">
        <img src="${list[i].img}" alt="" class="img-fluid">
       <div class="hovereffect">
        </div><!-- end hover -->
        <span class="menucat">${list[i].category}</span>
        </a>
        </div><!-- end media -->
        <div class="blog-meta">
        <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
        </div><!-- end meta -->
        </div><!-- end blog-box -->
        </div>  
    `
    result += element
    }
    document.getElementById("previewCategory").innerHTML = result
    document.getElementById("cat2").innerHTML = result
    document.getElementById("cat3").innerHTML = result
    document.getElementById("cat4").innerHTML = result
    document.getElementById("cat5").innerHTML = result
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function searchNews() {
  let search = form.search.value;
  location.href = `http://127.0.0.1:5500/search.html?data=${search}`
}
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
getUserLogged().then(user=>{
    document.getElementById("notLogin").style.display = "inline"
    document.getElementById("nameUser").innerHTML = user.email
    document.getElementById("logged").href = "userHistory.html";
}).catch(err=>{
    document.getElementById("nameUser").innerHTML = "Login"
    document.getElementById("notLogin").style.display = "none"
    document.getElementById("logged").style.display = "inline"
     document.getElementById("logged").href = "page-login.html";
}) 
function onLogOutUser() {
    logoutUser()
}
function logoutUser() {
    firebase.auth().signOut().then(function() {
        location.reload()
    }).catch(function(error) {
        location.reload()
    });
}