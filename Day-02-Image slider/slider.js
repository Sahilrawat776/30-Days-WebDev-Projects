const img = document.querySelectorAll(".slider img");
const btn = document.querySelector(".btn1");
let i = 0;
btn.addEventListener("click",() => {        
      img[i].style.display = "none";

      i = (i + 1) % img.length;
      
      img[i].style.display = "block";
  });

