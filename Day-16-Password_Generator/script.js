// Select elements
const form = document.querySelector("#password-form");
const output = document.querySelector("#password-output");
const copyBtn = document.querySelector("#copy-btn");

// Character sets
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Generate password function
function generatePassword(length, hasNumbers, hasSymbols, hasLower, hasUpper) {
  let chars = "";
  if (hasNumbers) chars += numbers;
  if (hasSymbols) chars += symbols;
  if (hasLower) chars += lowercase;
  if (hasUpper) chars += uppercase;

  if (chars.length === 0) return "❌ Please select at least one option";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const length = document.querySelector("#length").value;
  const hasNumbers = document.querySelector("#include-numbers").checked;
  const hasSymbols = document.querySelector("#include-symbols").checked;
  const hasLower = document.querySelector("#include-lowercase").checked;
  const hasUpper = document.querySelector("#include-uppercase").checked;

  const password = generatePassword(
    length,
    hasNumbers,
    hasSymbols,
    hasLower,
    hasUpper
  );
  output.textContent = password;
});

// Copy password
copyBtn.addEventListener("click", () => {
  const password = output.textContent;
  if (password && password !== "❌ Please select at least one option") {
    navigator.clipboard.writeText(password);
    alert("✅ Password copied to clipboard!");
  }
});
