var user_name = document.querySelector("#user-name");

if (sessionStorage.getItem("user") == null) {
  window.location.replace("/app/Login/html/index.html");
} else {
  // logout coding
  var logout = document.querySelector("#log-out");
  logout.addEventListener("click", function () {
    let a = confirm("Are you sure you want to logout ?");
    if (a === true) {
      sessionStorage.clear();
      location.reload();
    } else {
      location.reload();
    }
  });

  // Profile name codding
  let user_email = sessionStorage.getItem("user");
  var txt = localStorage.getItem(user_email);
  var obj = JSON.parse(txt);
  user_name.innerHTML = atob(obj.username);

  let url = localStorage.getItem(`${user_email}user-img`);
  let profile_pic = document.querySelector("#profile-pic");

  profile_pic.style.backgroundImage = `url(${url})`;

  if (localStorage.getItem(`${user_email}user-img`, "images") !== null) {
    let page_cover = document.querySelector("#page-cover");
    page_cover.style.display = "none";
    let naam = document.querySelector("#naam");
    naam.innerHTML = atob(obj.username);
  }
}

let input_img = document.querySelector("#input-img");
let profile_img = document.querySelector("#profile-img");
let fa_user = document.querySelector(".fa-user");

let page_cover = document.querySelector("#profile_box");

input_img.onchange = function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      base_img = e.target.result;
      profile_img.style.backgroundImage = `url(${base_img})`;

      fa_user.style.display = "none";

      let next_btn = document.querySelector("#next-btn");
      next_btn.style.display = "block";
      let user_email = sessionStorage.getItem("user");
      let page_cover = document.querySelector("#page-cover");
      localStorage.setItem(`${user_email}user-img`, base_img);
      next_btn.onclick = function () {
        // localStorage.setItem(`${user_email}user-img`,base_img)
        page_cover.style.display = "none";
        window.location = location.href;
      };
    };
    reader.readAsDataURL(file);
  }
};
