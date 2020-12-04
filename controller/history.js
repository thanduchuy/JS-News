function getUser() {
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
function getHistoryUser(uid) {
    return new Promise((resovle,reject)=>{
        db.collection("HistoryUser").where("uid", "==", uid)
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
                viewCount: doc.data().viewCount,
                uid:doc.data().uid
            }
            list.push(element)
        });
        resovle(list)
    });
    })
}
function loadPage() {
    getUser().then(user=>{
        getHistoryUser(user.uid).then(data=>{
            loadDataHistory(data);
        })
    })
}
function loadDataHistory(arr) {
    let result = arr.reverse().map(element=>{
       return  `
            <div class="pitem item-w1 item-h1">
                                    <div class="blog-box">
                                        <div class="post-media">
                                            <a href="single.html?id=${element.id}" title="">
                                                <img src="${element.img}" alt="" class="img-fluid">
                                                <div class="hovereffect">
                                                    <span></span>
                                                </div><!-- end hover -->
                                            </a>
                                        </div><!-- end media -->
                                        <div class="blog-meta">
                                            <span class="bg-grey"><a href="single.html?id=${element.id}" title="">${element.category}</a></span>
                                            <h4><a href="single.html?id=${element.id}" title="">${element.title}r</a></h4>
                                            <small><a href="single.html?id=${element.id}" title="">By: ${element.namePost}</a></small>
                                            <small><a href="single.html?id=${element.id}" title="">${element.datePost}</a></small>
                                        </div><!-- end meta -->
                                    </div><!-- end blog-box -->
                                </div>
        `
    })
    document.getElementById("HistoryContent").style.height = ""
    document.getElementById("HistoryContent").innerHTML = result.join("")
}