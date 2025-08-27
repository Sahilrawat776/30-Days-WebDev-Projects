const inputs = document.querySelectorAll(".css input");

inputs.forEach((input) => input.addEventListener("change", update));
inputs.forEach((input) => input.addEventListener("mousemove", update));

function update(){
    const change = this.dataset.sizing || "";

    document.documentElement.style.setProperty(
        `--${this.name}`, this.value + change
    );
}