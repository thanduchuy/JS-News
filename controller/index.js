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
function loadPage() {
    getAllDocFromCollection("news").then(list=>{
        dataTopNews(shuffle(list))
    })
    getNewCategory("Lifestyle").then(list=>{  
        dataNewLifestyle(shuffle(list))
    })
    getNewCategory("Fashion").then(list=>{  
        dataNewFashion(shuffle(list));
    })
    getNewCategory("Travel").then(list=>{  
        dataNewTravel(shuffle(list));
    })
    getNewCategory("Food").then(list=>{  
        dataNewFood(shuffle(list));
    })
    getNewCategory("Vlogs").then(list=>{  
        dataNewVlog(shuffle(list));
    })
    getNewCategory("Health").then(list=>{  
        dataNewHealth(shuffle(list));
    })
}

function dataNewHealth(list) {
    let result = ""
    for(let i=0;i<3;i++) {
        let element =  ` <div class="blog-box">
        <div class="post-media">
            <a href="single.html?id=${list[i].id}" title="">
                <img src="${list[i].img}" alt="" class="img-fluid">
                <div class="hovereffect">
                    <span class="videohover"></span>
                </div><!-- end hover -->
            </a>
        </div><!-- end media -->
        <div class="blog-meta">
            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].category}</a></small>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].datePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->
    
    <hr class="invis">`;
    result+= element;
    }
    document.getElementById("health").innerHTML += result
}
function dataNewVlog(list) {
    let result = ""
    for(let i=0;i<3;i++) {
        let element =  ` <div class="blog-box">
        <div class="post-media">
            <a href="single.html?id=${list[i].id}" title="">
                <img src="${list[i].img}" alt="" class="img-fluid">
                <div class="hovereffect">
                    <span class="videohover"></span>
                </div><!-- end hover -->
            </a>
        </div><!-- end media -->
        <div class="blog-meta">
            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].category}</a></small>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].datePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->
    
    <hr class="invis">`;
    result+= element;
    }
    document.getElementById("Vlogs").innerHTML += result
}
function dataNewFood(list) {
    let result = ""
    for(let i=0;i<3;i++) {
        let element =  `  <div class="blog-box row">
        <div class="col-md-4">
            <div class="post-media">
                <a href="single.html?id=${list[i].id}" title="">
                    <img src="${list[i].img}" alt="" class="img-fluid">
                    <div class="hovereffect"></div>
                </a>
            </div><!-- end media -->
        </div><!-- end col -->
    
        <div class="blog-meta big-meta col-md-8">
            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
            <p>${list[i].content.slice(0, 150)}.</p>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].category}</a></small>
            <small><a href="single.html?id=${list[i].id}" title="">${list[i].datePost}</a></small>
            <small><a href="single.html?id=${list[i].id} title="">by ${list[i].namePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->
    
    <hr class="invis">`;
    result+= element;
    }
    document.getElementById("food").innerHTML += result
    
}
function dataNewTravel(list) {
    let result = ""
    for(let i=0;i<3;i++) {
        let element =  `  <div class="blog-box row">
        <div class="col-md-4">
            <div class="post-media">
                <a href="single.html?id=${list[i].id}" title="">
                    <img src="${list[i].img}" alt="" class="img-fluid">
                    <div class="hovereffect"></div>
                </a>
            </div><!-- end media -->
        </div><!-- end col -->
    
        <div class="blog-meta big-meta col-md-8">
            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
            <p>${list[i].content.slice(0, 150)}.</p>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].category}</a></small>
            <small><a href="single.html?id=${list[i].id}" title="">${list[i].datePost}</a></small>
            <small><a href="single.html?id=${list[i].id} title="">by ${list[i].namePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->
    
    <hr class="invis">`
    result+= element;
    }
    document.getElementById("travel").innerHTML += result
}
function dataNewFashion(list) {
    let result = "";
    for (let i = 0;i<4;i+=2) {
        let element = `
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
            <h4><a href="single.html?id=${list[i].id}" title="">${list[i].title}</a></h4>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].category}</a></small>
            <small><a href="single.html?id=${list[i].id} title="">${list[i].datePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->

    <hr class="invis">

    <div class="blog-box">
        <div class="post-media">
            <a href="single.html?id=${list[i+1].id}" title="">
                <img src="${list[i+1].img}" alt="" class="img-fluid">
                <div class="hovereffect">
                    <span></span>
                </div><!-- end hover -->
            </a>
        </div><!-- end media -->
        <div class="blog-meta">
            <h4><a href="single.html?id=${list[i+1].id}" title="">${list[i+1].title}</a></h4>
            <small><a href="single.html?id=${list[i+1].id} title="">${list[i+1].category}</a></small>
            <small><a href="single.html?id=${list[i+1].id} title="">${list[i+1].datePost}</a></small>
        </div><!-- end meta -->
    </div><!-- end blog-box -->
</div><!-- end col -->
    `
    result += element
    }
    document.getElementById("fashion").innerHTML = result;
    
}
function dataNewLifestyle(list) {
   let lifeStyle = `
   <div class="blog-box" >
   <!-- end meta -->
   <div class="post-media">
    <a href="single.html?id=${list[0].id}" title="">
        <img src="${list[0].img}" alt="" class="img-fluid">
        <div class="hovereffect">
            <span></span>
        </div><!-- end hover -->
    </a>
</div><!-- end media -->
<div class="blog-meta big-meta">
    <h4><a href="single.html?id=${list[0].id}" title="">${list[0].title}</a></h4>
    <p>${list[0].content.slice(0, 150)}...</p>
    <small><a href="single.html?id=${list[0].id} title="">${list[0].category}</a></small>
    <small><a href="single.html?id=${list[0].id}" title="">${list[0].datePost}</a></small>
    <small><a href="single.html?id=${list[0].id} title="">by ${list[0].namePost}</a></small>
</div>
</div><!-- end blog-box -->

<hr class="invis">

<div class="blog-box">
    <div class="post-media">
        <a href="single.html?id=${list[1].id}" title="">
            <img src="${list[1].img}" alt="" class="img-fluid">
            <div class="hovereffect">
                <span></span>
            </div><!-- end hover -->
        </a>
    </div><!-- end media -->
    <div class="blog-meta big-meta">
        <h4><a href="single.html?id=${list[1].id} title="">${list[1].title}</a></h4>
        <p>${list[1].content.slice(0, 150)}...</p>
        <small><a href="single.html?id=${list[1].id} title="">${list[1].category}</a></small>
        <small><a href="single.html?id=${list[1].id}" title="">${list[1].datePost}</a></small>
        <small><a href="single.html?id=${list[1].id} title="">by ${list[1].namePost}</a></small>
    </div><!-- end meta -->
</div>
   `
   document.getElementById("lifeStyle").innerHTML = lifeStyle;
}
function dataTopNews(list) {
    let leftSide = `
    <div class="masonry-box post-media">
    <img src="${list[0].img}" alt="" class="img-fluid">
    <div class="shadoweffect">
       <div class="shadow-desc">
           <div class="blog-meta">
               <span class="bg-aqua"><a href="blog-category-01.html" title="">${list[0].category}</a></span>
               <h4><a href="single.html?id=${list[0].id}" title="">${list[0].title}</a></h4>
               <small><a href="single.html?id=${list[0].id} title="">${list[0].datePost}</a></small>
               <small><a href="single.html?id=${list[0].id} title="">by ${list[0].namePost}</a></small>
           </div><!-- end meta -->
       </div><!-- end shadow-desc -->
   </div><!-- end shadow -->
    </div>
    `
    let centerSide = `
    <div class="masonry-box post-media">
    <img src="${list[1].img}" alt="" class="img-fluid">
    <div class="shadoweffect">
       <div class="shadow-desc">
           <div class="blog-meta">
               <span class="bg-green"><a href="single.html?id=${list[1].id} title="">${list[1].category}</a></span>
               <h4><a href="single.html?id=${list[1].id}" title="">${list[1].title}</a></h4>
               <small><a href="single.html?id=${list[1].id}" title="">${list[1].datePost}</a></small>
               <small><a href="single.html?id=${list[1].id} title="">by ${list[1].namePost}</a></small>
           </div><!-- end meta -->
       </div><!-- end shadow-desc -->
   </div><!-- end shadow -->
</div><!-- end post-media -->

<div class="masonry-box small-box post-media">
    <img src="${list[2].img}" alt="" class="img-fluid">
    <div class="shadoweffect">
       <div class="shadow-desc">
           <div class="blog-meta">
           <span class="bg-green"><a href="blog-category-01.html" title="">${list[2].category}</a></span>
               <h4><a href="single.html?id=${list[2].id}" title="">${list[2].title}</a></h4>
           </div><!-- end meta -->
       </div><!-- end shadow-desc -->
   </div><!-- end shadow -->
</div><!-- end post-media -->

<div class="masonry-box small-box post-media">
    <img src="${list[3].img}" alt="" class="img-fluid">
    <div class="shadoweffect">
       <div class="shadow-desc">
           <div class="blog-meta">
               <span class="bg-green"><a href="single.html?id=${list[3].id} title="">${list[3].category}</a></span>
               <h4><a href="single.html?id=${list[3].id}" title="">${list[3].title}</a></h4>
           </div><!-- end meta -->
       </div><!-- end shadow-desc -->
   </div><!-- end shadow -->
</div><!-- end post-media -->
    `
    let rightSide = `
    <div class="masonry-box post-media">
    <img src="${list[4].img}" alt="" class="img-fluid">
    <div class="shadoweffect">
       <div class="shadow-desc">
           <div class="blog-meta">
               <span class="bg-aqua"><a href="single.html?id=${list[4].id} title="">${list[4].category}</a></span>
               <h4><a href="single.html?id=${list[4].id}" title="">${list[4].title}</a></h4>
               <small><a href="single.html?id=${list[4].id}" title="">${list[4].datePost}</a></small>
               <small><a href="single.html?id=${list[4].id} title="">by ${list[3].namePost}</a></small>
           </div><!-- end meta -->
       </div><!-- end shadow-desc -->
    </div><!-- end shadow -->
</div>
    `
    document.getElementById("left-side").innerHTML = leftSide
    document.getElementById("center-side").innerHTML = centerSide
    document.getElementById("right-side").innerHTML = rightSide
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
