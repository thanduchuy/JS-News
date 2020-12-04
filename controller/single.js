const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
getAllDocFromCollection("news").then(list=>{
        dataRecentPostBody(shuffle(list))
        dataSinglePost(shuffle(list))
        dataPostAlsoLike(shuffle(list))
})
getDocFromCollection("news",myParam).then(result=>{
    document.getElementById("category").innerHTML = result.category
    document.getElementById("title").innerHTML = result.title
    document.getElementById("datePost").innerHTML = result.datePost
    document.getElementById("namePost").innerHTML = `by ${result.namePost}`
    document.getElementById("count").innerHTML = result.viewCount
    document.getElementById("banner").src = result.img
    document.getElementById("content").innerHTML = result.content
    document.getElementById("categoryPost").innerHTML = result.category
    document.getElementById("titlePost").innerHTML = result.title
    addHistoryUser(result)
})

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
function addHistoryUser(news) {
    getUserLogged().then(user=>{
        addNewToFirebase(user.uid,news)
    })
}
function addNewToFirebase(uid,news) {
     db.collection("HistoryUser").add({
        title: news.title,
        datePost: news.datePost,
        namePost: news.namePost,
        viewCount: news.viewCount,
        img:news.img,
        content:news.content,
        category:news.category,
        uid:uid
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function dataSinglePost(list) {
    let result = `
     <div class="col-lg-6">
                                        <div class="blog-list-widget">
                                            <div class="list-group">
                                                <a href="single.html?id=${list[0].id}" class="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div class="w-100 justify-content-between text-right">
                                                        <img src="${list[0].img}" alt="" class="img-fluid float-right">
                                                        <h5 class="mb-1">${list[0].title}</h5>
                                                        <small>Prev Post</small>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div><!-- end col -->

                                    <div class="col-lg-6">
                                        <div class="blog-list-widget">
                                            <div class="list-group">
                                                <a href="single.html?id=${list[1].id}" class="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div class="w-100 justify-content-between">
                                                        <img src="${list[1].img}" alt="" class="img-fluid float-left">
                                                        <h5 class="mb-1">${list[1].title}</h5>
                                                        <small>Next Post</small>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

    `
    document.getElementById("botSingle").innerHTML = result
}
function dataPostAlsoLike(list) {
    let result = `
        <div class="col-lg-6">
                                        <div class="blog-box">
                                            <div class="post-media">
                                                <a href="single.html?id=${list[0].id}" title="">
                                                    <img src="${list[0].img}" alt="" class="img-fluid">
                                                    <div class="hovereffect">
                                                        <span class=""></span>
                                                    </div><!-- end hover -->
                                                </a>
                                            </div><!-- end media -->
                                            <div class="blog-meta">
                                                <h4><a href="single.html?id=${list[0].id}" title="">${list[0].title}</a></h4>
                                                <small><a href="blog-category-01.html" title="">${list[0].category}</a></small>
                                                <small><a href="blog-category-01.html" title="">${list[0].datePost}</a></small>
                                            </div><!-- end meta -->
                                        </div><!-- end blog-box -->
                                    </div><!-- end col -->

                                    <div class="col-lg-6">
                                        <div class="blog-box">
                                            <div class="post-media">
                                                <a href="single.html?id=${list[1].id}" title="">
                                                    <img src="${list[1].img}" alt="" class="img-fluid">
                                                    <div class="hovereffect">
                                                        <span class=""></span>
                                                    </div><!-- end hover -->
                                                </a>
                                            </div><!-- end media -->
                                            <div class="blog-meta">
                                                <h4><a href="single.html?id=${list[1].id}" title="">${list[1].title}</a></h4>
                                                <small><a href="blog-category-01.html" title="">${list[1].category}</a></small>
                                                <small><a href="blog-category-01.html" title="">${list[1].datePost}</a></small>
                                            </div><!-- end meta -->
                                        </div><!-- end blog-box -->
                                    </div>
    `
    document.getElementById("alsoLike").innerHTML = result
}
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
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function getDocFromCollection(nameCollection,id) {
    return new Promise((resovle,reject)=>{
        var ref = db.collection(nameCollection).doc(id)
    ref.get().then(function(doc) {
        if (doc.exists) {
            let result = {
            category: doc.data().category,
            title: doc.data().title,
            datePost: doc.data().datePost,
            namePost: doc.data().namePost,
            viewCount: doc.data().viewCount,
            img: doc.data().img,
            content: doc.data().content
            }
            resovle(result);
        } else {
            reject("No such document!")
        }
    }).catch(function(error) {
        reject("No such document!")
    });
    })
}