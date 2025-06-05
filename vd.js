// var video = document.querySelector("#vd");
// var result = document.querySelector("#result");
// function demo(){
//     var current_time = video.currentTime;
//     var duration = video.duration;
//     duration.toFixed();

//     result.innerHTML = current_time.toFixed(2)+" / "+ duration;
// }


let current_user = sessionStorage.getItem("user");

// Video play And pause
let ply = document.querySelector(".fa-circle-play");
ply.onclick = function Play(){
    let vd = document.querySelector("video");
    if (ply.className == "fa-solid fa-circle-play"){
        vd.play();
        ply.className = "fa-solid fa-circle-pause";
    }
    else{
        vd.pause();
        ply.className = "fa-solid fa-circle-play"
    }
}

// Progress bar
let vd = document.querySelector("video");
vd.ontimeupdate = function(){
    let ba = document.querySelector("#bar");
    var total_duration = vd.duration;
    var current_time = vd.currentTime;

    let p = document.querySelector("p");
    p.innerHTML = current_time.toFixed(2).replace(".",":")+" / "+total_duration.toFixed(2).replace(".",":");

    parcent = (current_time*100/total_duration)+ "%"

    ba.style.width = parcent;
    if (current_time === total_duration){
        ply.className = "fa-solid fa-circle-play";
    }

}


// USign progress bar skip video
let bar = document.querySelector("#prog-box");
let video = document.querySelector("video");
bar.onclick = function(event){
    let click_width = event.offsetX;
    let total_width = this.offsetWidth;
    let get_percentage = click_width/total_width;
    video.currentTime = get_percentage*video.duration;
    console.log(get_percentage*video.duration);
}


// Video Name Box
let plus = document.querySelector("#plus");
let box = document.querySelector("#add-box");
plus.onclick = function(){
    if (plus.className == "fa-solid fa-plus"){
        plus.className = "fa-solid fa-xmark";
        box.style.display = "block";
        box.className = "animate__animated animate__zoomInUp";
    }
    else{
        plus.className = "fa-solid fa-plus";
        box.className = "animate__animated animate__zoomOut";
        setTimeout(() =>{
            box.style.display = "none";
        }, 1000)
        
    }
}



current_user = sessionStorage.getItem("user");
vd_btn = document.querySelector("#vd-btn");
vd_btn.onclick = function(){
    var v_name = document.querySelector("#vd-name");
    var v_link = document.querySelector("#vd-link");

    if (v_name.value !== "" || v_link !== ""){
        var v_obj = {name:v_name.value, 
                    link:v_link.value
                    };
                    
        var v_txt = JSON.stringify(v_obj); 
        localStorage.setItem(current_user+"video"+v_name.value,v_txt); 

        
    }
}



// fecth video

function load_video(){
    var i;
    for (i=0; i<localStorage.length; i++){
        var all_keys = localStorage.key(i);
        if (all_keys.match(current_user+"video")){
            let v_data = localStorage.getItem(all_keys);
            let video_obj = JSON.parse(v_data);
            
            var div = document.createElement("div");
            let main = div.setAttribute("id", "main-vd-box");
            var p = document.createElement("p");
            p.setAttribute("id", "v-name");

            p.innerHTML = video_obj.name; 
            

            var btn1 = document.createElement("button");
            btn1.setAttribute("id", "vd-player-btn");
            btn1.setAttribute("class", "play-vd");
            btn1.setAttribute("url",video_obj.link);
            btn1.innerHTML = "Play";
            var btn2 = document.createElement("button");
            btn2.setAttribute("id", "vd-del-btn");
            btn2.setAttribute("class", "vd-del-btn");
            btn2.innerHTML = "Delete";
            div.appendChild(p);
            div.appendChild(btn1);
            div.appendChild(btn2);

            var bottom = document.querySelector("#bottom");
            bottom.appendChild(div);

        }
    }
}

load_video();










// Onlcik video play

function play_video(){
    let src = document.querySelector("#vd-src");
    let video_elem = document.querySelector("video");
    let playbtn = document.querySelectorAll(".play-vd");
    let ply = document.querySelector(".fa-circle-play");

    for (let i=0; i<playbtn.length; i++){
        playbtn[i].onclick = function(){
            clear();
            var url = this.getAttribute("url");
            src.setAttribute("src", url);
            src.src = url;
            video_elem.load();
            video_elem.play()
            ply.className = "fa-solid fa-circle-pause";
            this.innerHTML = "Playing..."
        }
    }

}


play_video();

function clear(){
    let playbtn = document.querySelectorAll(".play-vd");
    for (let i = 0; i<playbtn.length; i++){
        playbtn[i].innerHTML = "Play";
    }
}


// Delete Button work
function Dele(){
    let dele = document.querySelectorAll(".vd-del-btn");
    for (let i=0; i<dele.length; i++){
        dele[i].onclick = function(){
            let parent_cont = this.parentElement;
            let video_name = parent_cont.querySelector("p").textContent;
            let delete_val = current_user + "video"+ video_name;
            parent_cont.classList.add("vd-delete-animation");
            setTimeout(() => {
                localStorage.removeItem(delete_val);
                parent_cont.remove();
            }, 300);
        }
    }
}
Dele();




// Search Video
let input = document.querySelector("#search");
function Search_input(){
    input.oninput = function(){
        let searchTerm = this.value.toLowerCase();
        let vd_conainer = document.querySelectorAll("#main-vd-box");

        for (let i= 0; i<localStorage.length; i++){
            let key = localStorage.key(i);
            if (key.startsWith(current_user+"video")){
                let video_data = JSON.parse(localStorage.getItem(key));
                let video_name = video_data.name.toLowerCase();
                vd_conainer.forEach(box => {
                    let Box_vd_name = box.querySelector("#v-name").textContent.toLowerCase();
                    if (Box_vd_name.includes(searchTerm)){
                        box.style.display = "block";
                    }
                    else{
                        box.style.display = "none";
                    }
                })
            }
        }
    }
}

Search_input();



// Next and Previouse video
let play = document.querySelectorAll(".play-vd");
let current = -1;
function Next(){
    let next = document.querySelector("#next");
    next.onclick = function(){
        if (current < play.length - 1){
            current ++;
            play[current].click();
            back = document.querySelector("#back");
            back.disabled = false;
            back.style.color = "white";
            back.style.opacity = "100";
        }
        if (current == play.length -1){
            next.disabled = true;
            next.style.color = "gray";
            next.style.opacity = "0.5"

        }

        if (play[current].innerHTML === "Playing...") {
            let sibling = play[current].parentElement.nextElementSibling;
                if (sibling && sibling.querySelector(".play-item")) {
                    sibling.querySelector(".play-item").click();
                    current = Array.from(play).indexOf(sibling.querySelector(".play-item"));
                }

    }
}
}
Next();




play = document.querySelectorAll(".play-vd");
function Previouse(){
    let next = document.querySelector("#next");
    let back = document.querySelector("#back");
    back.onclick = function(){
        if (current > 0){
            current --;
            play[current].click();
            next.disabled = false;
            next.style.color = "white";
            next.style.opacity = "100"
        }
        if (current === 0){
            back.disabled = true;
            back.style.color = "gary";
            back.style.opacity = "0.5";

        }
        
    }
}

Previouse();




// Volume hover effect
function Volume_Effect(){
    let volume = document.querySelector("#volume");
let video = document.querySelector("video");
let k = 0
volume.addEventListener("mouseenter", () => {
    let range = document.querySelector("#range-bar");
    // volume.style.paddingLefft = "100px";
    volume.style.paddingRight = "5px";
    volume.style.paddingTop = "5px";
    volume.style.paddingBottom = "5px";
    volume.style.backgroundColor = "rgb(49, 49, 52)";
    range.style.display = "block";
    video.volume = range.value;

})

let range = document.querySelector("#range-bar");

volume.addEventListener("mouseleave", (e) => {
    // Check if mouse is leaving to the range bar
    if (!volume.contains(e.relatedTarget) && !range.contains(e.relatedTarget)) {
        volume.style.paddingLeft = "";
        volume.style.backgroundColor = "";
        range.style.display = "none";
    }
});


range.addEventListener("mouseenter", () => {
    volume.style.paddingLeft = "60px";
    volume.style.backgroundColor = "rgb(49, 49, 52)";
    range.style.display = "block";
});

range.addEventListener("mouseleave", (e) => {
    // Check if mouse is leaving to the volume button
    if (!volume.contains(e.relatedTarget) && !range.contains(e.relatedTarget)) {
        volume.style.paddingLeft = "";
        volume.style.backgroundColor = "";
        range.style.display = "none";
    }
});

}

Volume_Effect()


// full screen Effect
let full_screen = document.querySelector("#full-screen");
full_screen.addEventListener("mouseenter", () => {
    full_screen.style.padding = "10px";
    full_screen.style.backgroundColor = "rgb(49, 49, 52)";
    full_screen.style.borderRadius = "50%"
})
full_screen = document.querySelector("#full-screen");
full_screen.addEventListener("mouseout", () => {
    full_screen.style.padding = "";
    full_screen.style.backgroundColor = "";
})


// Getting full_screen codding
full_screen = document.querySelector("#full-screen");
full_screen.onclick = function(){
    video.requestFullscreen();
}

// Setting Hover Effect
let setting = document.querySelector("#setting");
setting.addEventListener("mouseenter", () => {
    setting.style.paddingLeft = "15px";
    setting.style.paddingRight = "15px";
    setting.style.paddingTop = "10px";
    setting.style.paddingBottom = "10px";
    setting.style.backgroundColor = "rgb(49, 49, 52)";
    setting.style.borderRadius = "50%"
})
setting = document.querySelector("#setting");
setting.addEventListener("mouseout", () => {
    setting.style.padding = "";
    setting.style.backgroundColor = "";
})