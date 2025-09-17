// script.js
const buttons = document.querySelectorAll(".buttons");
const inputField = document.querySelector("input");

// to store the current expression
let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText.trim();

    if (value === "AC") {
      // clear everything
      expression = "";
      inputField.value = "";
    } else if (value === "=") {
      try {
        // safely evaluate expression
        expression = eval(expression).toString();
        inputField.value = expression;
      } catch {
        inputField.value = "Error";
        expression = "";
      }
    } else if (value === "") {
      // clear last character (when image button clicked)
      expression = expression.slice(0, -1);
      inputField.value = expression;
    } else {
      // append clicked value
      expression += value;
      inputField.value = expression;
    }
  });
});
