function loadData() {
     getAllDocFromCollection("news").then(list=>{
        dataRecentPostBody(shuffle(list))
        loadDataSearch(shuffle(list))
    })
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function loadDataSearch(list) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("data").trim().toUpperCase();
    let listFilter = list.filter(element=>{
       return element.title.trim().toUpperCase().indexOf(myParam) != -1
    })
    listFilter = listFilter.map(element=>{
        return `
        <div class="blog-box row">
                                    <div class="col-md-4">
                                        <div class="post-media">
                                            <a href="single.html?id=${element.id}" title="">
                                                <img src="${element.img}" alt="" class="img-fluid">
                                                <div class="hovereffect"></div>
                                            </a>
                                        </div><!-- end media -->
                                    </div><!-- end col -->

                                    <div class="blog-meta big-meta col-md-8">
                                        <h4><a href="single.html?id=${element.id}" title="">${element.title}</a></h4>
                                        <p>${element.content.slice(0, 150)}}</p>
                                        <small><a href="single.html?id=${element.id}" title="">${element.category}</a></small>
                                        <small><a href="single.html?id=${element.id}" title="">${element.datePost}</a></small>
                                        <small><a href="single.html?id=${element.id}" title="">by ${element.namePost}</a></small>
                                    </div><!-- end meta -->
        </div>
        <hr class="invis1">
    `
    })

    document.getElementById("listSearch").innerHTML =  listFilter.join("")
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