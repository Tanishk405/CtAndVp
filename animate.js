// Login and Sign up animation
let login = document.querySelector("#login");
let login_link = document.querySelector("#login a");

let cover = document.querySelector("#cover");

let sign = document.querySelector(".sign");
let sign_link = document.querySelector(".sign a");

login_link.addEventListener("click", () => {
  login.style.display = "none";
  sign.style.display = "flex";
  cover.setAttribute("class", "");
  setTimeout(() => {
    cover.setAttribute("class", "animate__animated animate__flipInY");
  }, 10);
});

sign_link.addEventListener("click", () => {
  login.style.display = "flex";
  sign.style.display = "none";
  cover.setAttribute("class", "");
  setTimeout(() => {
    cover.setAttribute("class", "animate__animated animate__flipInY");
  }, 10);
});
