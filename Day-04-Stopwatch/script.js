let hh = document.getElementById("hh");
let min = document.getElementById("min");
let ss = document.getElementById("ss");
let fs = document.getElementById("fs");

let startBtn = document.querySelector(".start");
let pauseBtn = document.querySelector(".pause");
let resetBtn = document.querySelector(".reset");
let lapBtn = document.querySelector(".lap");
let laps = document.getElementById("laps");
let container = document.getElementsByClassName("container");

let h = 0,
  m = 0,
  s = 0,
  f = 0;
let timer = null;
let running = false;

function pad(n) {
  return n.toString().padStart(2, "0");
}
function show() {
  hh.textContent = pad(h);
  min.textContent = pad(m);
  ss.textContent = pad(s);
  fs.textContent = pad(f);
}

function tick(){
     if(f==100){
      f = 0;
      s++;
     }
     if(s==60){
      s = 0;
      m++;
     }
     if(m==60){
      m = 0;
      h++;
     }

    show();
}
