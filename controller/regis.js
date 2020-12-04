function resetForm() {
  regis.email.value = "";
  regis.password.value = "";
  regis.repassword.value = "";
  document.getElementById("error").style.display = "none";
}

function onRegisUser() {
    let email = regis.email.value
    let password = regis.password.value
    let repassword = regis.repassword.value
     if (
    email === "" ||
    password === "" ||
    repassword === "" 
  ) {
    document.getElementById("error").innerHTML =
      "Không được bỏ trống trường nào";
    document.getElementById("error").style.display = "block";
  } else {
    if (password != repassword) {
      document.getElementById("error").innerHTML =
        "Mật khẩu nhập lại không đúng";
      document.getElementById("error").style.display = "block";
    } else {
      if (password.length < 6) {
        document.getElementById("error").innerHTML =
          "Mật khẩu phải hơn 6 ký tự";
        document.getElementById("error").style.display = "block";
      } else {
        resetForm()
        registerUser(email,password)
      }
    }
  }
}
function registerUser(email,password) {
    console.log("aaa");
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        location.href = "http://127.0.0.1:5500/page-login.html"
    })
    .catch((error) => {
        document.getElementById("error").innerHTML =
          "Email đã được sử dụng";
        document.getElementById("error").style.display = "block";
    });
}
