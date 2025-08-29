
const y = document.getElementById("userScoreEl");
const c = document.getElementById("compScoreEl");
const d = document.getElementById("draw");

let user = "";
let comp = "";
let userScore = 0;
let compScore = 0;
let draw = 0;

function  clicked1(){
    user = "rock";
    winner();
    }
function clicked2() {
    user = "paper";
    winner();
}
function clicked3() {
    user = "scissors";
    winner();
}

let lastNumber = null;

function getRandomNumber(min, max) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (num === lastNumber);

  lastNumber = num;
  return num;
}

const winner = () =>{

    const num = getRandomNumber(1, 3);
    if (num == 1) {
      comp = "rock";
    } else if (num == 2) {
      comp = "paper";
    } else {
      comp = "scissors";
    }
    if (
      (user == "rock" && comp == "paper") ||
      (user == "paper" && comp == "scissors") ||
      (user == "scissors" && comp == "rock")
    ){
      compScore++;
      c.innerHTML = compScore;
    }
    else if (user == comp) {
       draw++;
       d.innerHTML = draw;
    } else {
      userScore++;
      y.innerHTML = userScore;
      
    }
}

