const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("category");
function loadData() {
    document.getElementById("title").innerHTML = myParam
    document.getElementById("liTitle").innerHTML = myParam
    getAllDocFromCollection("news").then(list=>{
        dataRecentPostBody(shuffle(list))
       
    })
    getNewCategory(myParam).then ( list => {
         dataCategory(shuffle(list))
    })
}
function getNewCategory(name) {
    return new Promise((resovle,reject)=>{
        db.collection("news").where("category", "==", name)
        .get().then(function(querySnapshot) {
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
        resovle(list)
    });
    })
}
function dataCategory(list) {
     let result = ``
    for(let i=0;i<3;i++) {
    let element = `
    <div class="pitem item-w1 item-h1">
                                    <div class="blog-box">
                                        <div class="post-media">
                                            <a href="single.html?id=${list[i].id}" title="">
                                                <img src="${list[i].img}" alt="" class="img-fluid">
                                                <div class="hovereffect">
                                                    <span></span>
                                                </div><!-- end hover -->
                                            </a>
                                        </div><!-- end media -->
                                        <div class="blog-meta">
                                            <span class="bg-pink"><a href="blog-category-01.html" title="">${list[i].category}</a></span>
                                            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
                                            <small><a href="single.html?id=${list[i].id}" title="">By: ${list[i].namePost}</a></small>
                                            <small><a href="single.html?id=${list[i].id}" title="">${list[i].datePost}</a></small>
                                        </div><!-- end meta -->
                                    </div><!-- end blog-box -->
                                </div>
    `
    result += element
    }
    document.getElementById("categoryContent").innerHTML = result
    document.getElementById("categoryContent").style = ""
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