const main = document.querySelector(".main");
const clock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    main.innerText = time;
    
};
setInterval(clock, 1000);
clock();