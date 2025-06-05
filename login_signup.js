// Start Sign up conding
let sign_form = document.querySelector("#sign-up-form");

var sign_btn = document.querySelector("#sign-btn");

sign_form.onsubmit = function Submit() {
  let name = btoa(document.querySelector("#name").value);
  let email = btoa(document.querySelector("#email-sign").value);
  let phone = btoa(document.querySelector("#phone").value);
  let pass_sign = btoa(document.querySelector("#pass-sign").value);

  let obj = { username: name, email: email, phone: phone, password: pass_sign };
  user_value = JSON.stringify(obj);

  if (name !== "" && email !== "" && phone !== "" && pass_sign !== "") {
    let stored_data = localStorage.setItem(email, user_value);
    if (stored_data !== "") {
      sign_form = document.querySelector("#sign-up-form");
      sign_btn.innerHTML =
        '<i class="fa-solid    fa-user-check"></i> Sign up succssfuly';
      sign_btn.style.background = "green";

      setTimeout(() => {
        sign_btn.innerHTML = "Sign up";
        sign_btn.style.background =
          "linear-gradient(to right, #d421eb,#821bea)";
        sign_form.reset();
      }, 3000);
    }
  }

  event.preventDefault();
  return false;
};

let email_input = document.querySelector("#email-sign");

let notice = document.querySelector("#sign-email-warn");
email_input.onchange = function () {
  let email_val = btoa(document.querySelector("#email-sign").value);
  sign_btn = document.querySelector("#sign-btn");
  if (localStorage.getItem(email_val) !== null) {
    notice.style.display = "block";
    sign_btn.disabled = true;
    sign_btn.style.background = "grey";
    notice.style.display = "block";
  }

  email_input.onclick = function () {
    email_input.value = "";
    email_input.style.background = "white";
    notice.style.display = "none";
    sign_btn.disabled = false;
    sign_btn.style.background = "linear-gradient(to right, #d421eb,#821bea)";
  };
};
// End Sign up coding

// Start Login coding
let login_form = document.querySelector("#Login-form");

let login_email = document.querySelector("#login-email");

let login_pass = document.querySelector("#login-pass");

let login_btn = document.querySelector("#login-btn");

// Warning notice box
var login_email_warn = document.querySelector("#login_email_warn");

var login_pass_warn = document.querySelector("#login_pass_warn");

login_form.onsubmit = function () {
  let login_email_val = btoa(document.querySelector("#login-email").value);
  let login_pass_val = btoa(document.querySelector("#login-pass").value);
  if (localStorage.getItem(login_email_val) === null) {
    login_email_warn.style.display = "block";
    login_email.style.borderBottomColor = "red";
    login_email.onclick = function () {
      login_email.value = "";
      login_email_warn.style.display = "none";
      login_email.style.borderBottomColor = "grey";
    };
  } else {
    var text_data = localStorage.getItem(login_email_val);
    var obj_data = JSON.parse(text_data);
    var correct_email = obj_data.email;
    var correct_pass = obj_data.password;
    if (login_email_val == correct_email) {
      if (login_pass_val == correct_pass) {
        sessionStorage.setItem("user", login_email_val);
        location.replace("profile.html");
        alert("login success");
      } else {
        login_pass_warn.style.display = "block";
        login_pass.style.borderBottomColor = "red";

        login_pass.onclick = function () {
          login_pass.value = "";
          login_pass_warn.style.display = "none";
          login_pass.style.borderBottomColor = "grey";
        };
      }
    }
  }
  event.preventDefault();
  return false;
};
