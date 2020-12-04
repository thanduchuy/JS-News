var firebaseConfig = {
    apiKey: "AIzaSyAsyBM_RwYdATKC2qPYXAiPh6hboeg_Nrk",
    authDomain: "news-b3bd6.firebaseapp.com",
    databaseURL: "https://news-b3bd6.firebaseio.com",
    projectId: "news-b3bd6",
    storageBucket: "news-b3bd6.appspot.com",
    messagingSenderId: "162463966588",
    appId: "1:162463966588:web:8b83dd5831c6227f4af0f9",
    measurementId: "G-MX7YPFSRPZ"
  };
  firebase.initializeApp(firebaseConfig);
// Variable Cloud FireStore
  var db = firebase.firestore();

function loginUser() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    });
}
function changePasswordUser(newPassword) {
    var user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(function() {
        console.log("sucess");
    }).catch(function(error) {
        console.log(error);
    });
}
function registerUser(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });
}
function getDocFromCollection(nameCollection,id) {
    var ref = db.collection(nameCollection).doc(id)
    ref.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
function getAllDocFromCollection(nameCollection) {
    db.collection(nameCollection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}
// function addDocToNewCollection(element) {
//     db.collection("News").add({
//         title: element.title,
//         datePost: element.datePost,
//         namePost: element.namePost,
//         viewCount: element.viewCount,
//         img:element.img,
//         content:element.content
//     }).then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
// }
// Vlogs Health Lifestyle Fashion