if (sessionStorage.getItem("user") == null) {
  window.location.replace("/app/Login/html/index.html");
} else {
    var current_user = sessionStorage.getItem("user");
    // Open contact Box
  let plus = document.querySelector("#plus");

  var profile_img = document.querySelector("#profile-image");
  let pic = localStorage.getItem(current_user+"user-img".trim());
  profile_img.style.backgroundImage = `url(${pic})`; 

  let contain = document.querySelector("#contact-box");

  plus.addEventListener("click", function () {
    contain.style.display = "flex";
  });
}

// Add Contact
let Add_btn = document.querySelector("#Add-btn");
let contact = document.querySelector("#contact");
let N = document.querySelector("#N");
let P = document.querySelector("#P");
Add_btn.addEventListener("click", function(){
    event.preventDefault();
    var c_name = document.querySelector("#name");
    var c_phone = document.querySelector("#phone");
    if (c_name.value !== "" && c_phone.value !== ""){
        let contact_Obj = {name:c_name.value, phone:c_phone.value}
        let json_txt = JSON.stringify(contact_Obj);
        localStorage.setItem(current_user+"Contact"+c_name.value,json_txt);


        location.reload();

        
    }
    else{
        // c_name = document.querySelector("#name");
        // c_phone = document.querySelector("#phone");
        let name_notice = document.querySelector("#cont-name");
        let phone_notice = document.querySelector("#cont-phone");
        if (c_name.value === ""){
          c_name.style.borderColor = "red";
          name_notice.style.display = "block";
        }

        if (c_phone.value === ""){
          c_phone.style.borderColor = "red";
          phone_notice.style.display = "block";
        }

        c_name.addEventListener("input", function(){
          if (c_name.value !== ""){
          c_name.style.borderColor = "purple";
          name_notice.style.display = "none";
          }
        })

        c_phone.addEventListener("input", function(){
          if (c_phone.value !== ""){
            c_phone.style.borderColor = "purple";
            phone_notice.style.display = "none"; 
          }
        })
        
      }
    })
    function all_Contact(){
      var i;
      for(i =0; i<localStorage.length; i++){
        var all_keys = localStorage.key(i);
        if (all_keys.match(sessionStorage.getItem("user")+"Contact")){
          let txt = localStorage.getItem(all_keys)
          var obj = JSON.parse(txt);
          var nm = " "+obj.name
          var phn = " "+obj.phone

          const newContact = document.createElement("div");
          newContact.setAttribute("id","contact");
          var name_p = document.createElement("p");
          name_p.setAttribute("class","names")
          var name_i = document.createElement("i");
          name_i.setAttribute("class","fas fa-user");
          var div_tool = document.createElement("div");
          div_tool.setAttribute("id","tool");
          var edit_i = document.createElement("i");
          edit_i.setAttribute("class","fa-solid fa-pen-to-square pen_edit");
          var del_i = document.createElement("i");
          del_i.setAttribute("class","fa-solid fa-trash-can del");
          var line = document.createElement("hr");
          var num_p = document.createElement("p");
          var num_i = document.createElement("i");
          num_i.setAttribute("class","fa-solid fa-phone");
          
          name_p.appendChild(name_i);
          name_p.innerHTML += nm;

          div_tool.appendChild(edit_i);
          div_tool.appendChild(del_i);

          num_p.appendChild(num_i);
          num_p.innerHTML += phn;

          newContact.appendChild(name_p);
          newContact.appendChild(div_tool);
          newContact.appendChild(line);
          newContact.appendChild(num_p);

          var all_contact = document.querySelector("#all-contact");

          all_contact.appendChild(newContact);
          
        }
      }
    }
    all_Contact();


// Close contactbox
let close_btn = document.querySelector("#close-btn");
let contact_box = document.querySelector("#contact-box");

c_name = document.querySelector("#name");
c_phone = document.querySelector("#phone");
close_btn.addEventListener("click", function(){
    contact_box.style.display = "none";
    c_name.value = "";
    c_phone.value = "";
    return false;
})



let search_bar = document.querySelector("#search");

search_bar.oninput = function(){
  let names = document.querySelectorAll(".names");
  for (let i=0; i<names.length; i++){
    if(names[i].innerHTML.toLocaleUpperCase().match(search_bar.value.toLocaleUpperCase())){
      names[i].parentElement.style.display = "block";
    }
    else{
        names[i].parentElement.style.display = "none";
    }
  }
}


// for Deletting the numberse

function Delete(){
  let del = document.querySelectorAll(".del");
let del_contact = document.querySelector("#contact");

var current_user = sessionStorage.getItem("user");

let i ;
for (i = 0; i<del.length; i++){
  del[i].onclick = function(){
    var parent = this.parentElement.parentElement;
    var para_elem = parent.getElementsByClassName("names")[0];
    var nam = para_elem.innerHTML.replace('<i class="fas fa-user"></i>', "");
    localStorage.removeItem(current_user+"Contact"+nam.trim());
    parent.remove();
  }
}
}

Delete();




let names = document.querySelectorAll(".names");
let pen = document.querySelectorAll(".pen_edit");


function Edit(){
  for (let i=0; i<pen.length; i++){
    pen[i].onclick = function(){
      let a = this.parentElement.parentElement;
      let b = a.getElementsByTagName("p");
      var name = b[0].innerHTML.replace('<i class="fas fa-user"></i>',"");
      var phone = b[1].innerHTML.replace('<i class="fa-solid fa-phone"></i>', "");
      var c_name = document.querySelector("#name");
      var c_phone = document.querySelector("#phone");
      let add_btn = document.querySelector("#plus");
      c_name.value = name;
      c_phone.value = phone;
      add_btn.click();
      localStorage.removeItem(current_user+"Contact"+name.trim());
      let update_btn = document.querySelector("#Add-btn");
      update_btn.style.width = "300px"
      let close_btn = document.querySelector("#close-btn");
      update_btn.innerHTML = "Update";
      close_btn.style.display = "none";
    } 
  }
}

Edit();
