const frame = document.querySelector("#frame");
const frame_ul = document.querySelector(".inner_frame");
const frame_li = document.querySelectorAll(".frame_list");

const btn = document.querySelector("#btn");
const btn_li = document.querySelectorAll("#btn li");
const btn_list = document.querySelectorAll(".btn_list");
const frame_bg = document.querySelectorAll(".frame_inner_bg");

let opa = 0;
let len = btn_li.length;
let wid = frame_ul.offsetWidth + 120;
let ht = frame_ul.offsetWidth / 2;
let i = 0;
let num = 0;
let active = 1;
let isScroll = false;
let index;
let bg_data;

//포스터 배치
for(let el of frame_li){
    el.style.left = `${wid * i}px`;
    el.style.bottom = `${ht * i}px`;
    i++;
};

//리스트 클릭 이벤트
for(let el of btn_list){
    el.addEventListener("click", (e)=>{
        e.preventDefault();
        
        let target = el.getAttribute("href");
        let bg_index = el.getAttribute("bg-index");
        let isOn = document.querySelector(bg_index).classList.contains("on");
        let posY = document.querySelector(target).offsetTop * -1;
        let posX = document.querySelector(target).offsetLeft * -1;
        index = document.querySelector(target).getAttribute("data-index");

        btnRemove(btn_li);
        el.parentNode.classList.add("on");

        btnRemove(frame_li);
        document.querySelector(target).classList.add("on");
        active = index;

        for(let el of frame_bg){
            bgImgNone(el);
            el.classList.remove("on");
        };
        clickImgShow(bg_index);
        document.querySelector(bg_index).classList.add("on");

        frame.style.top = `${posY}px`;
        frame.style.left = `${posX}px`;
    });
};

//마우스 휠 이벤트
document.querySelector("body").addEventListener("mousewheel", function(e){
    let wheel = e.deltaY;
    let frame_posX = window.getComputedStyle(frame).left.split("px")[0];
    let frame_posY = window.getComputedStyle(frame).top.split("px")[0];

    if(isScroll) return;

    if(wheel > 0){
        wheelUp(frame_posX, frame_posY);
        isScroll = true;
    } else {
        wheelDown(frame_posX, frame_posY);
        isScroll = true;
    }
});


//btn class 제거
function btnRemove(ele){
    for(let el of ele){el.classList.remove("on")};
};

//background 이미지 보여주기
function clickImgShow(index) {
    document.querySelector(index).style.display = "block";
};

//background 이미지 감추기
function bgImgNone(el){
    el.style.display = "none";
};

//scroll background 이미지 보여주기
function scrollImgShow(el, active){
    el[active -1].style.display = "block";
};

function wheelUp(x, y){
    --num;

    setTimeout(function(){
        isScroll = false;
    }, 500);

    if(active != len){
        active++;

        x -= 570;
        y -= 225 * -1;

        frame.style.top = y + "px";
        frame.style.left = x + "px";

        btnRemove(frame_bg);
        frame_bg[active -1].classList.add("on");

        for(let el of frame_bg){
            bgImgNone(el);
        }
        scrollImgShow(frame_bg, active);
    };

    btnRemove(btn_li);
    btn_li[active - 1].classList.add("on");

    btnRemove(frame_li);
    frame_li[active - 1].classList.add("on");
  
};

function wheelDown(x, y){
    ++num;

    setTimeout(function(){
        isScroll = false;
    }, 500);

    if(active != 1){
        active--;

        x -= 570 * -1;
        y -= 225;

        frame.style.top = y +"px";
        frame.style.left = x + "px";

        btnRemove(frame_bg);
        frame_bg[active -1].classList.add("on");

        for(let el of frame_bg){
            bgImgNone(el);
        }
        scrollImgShow(frame_bg, active);
    };

    btnRemove(btn_li);
    btn_li[active - 1].classList.add("on");

    btnRemove(frame_li);
    frame_li[active - 1].classList.add("on");
};
