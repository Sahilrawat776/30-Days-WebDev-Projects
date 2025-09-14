const addCartButtons = document.querySelectorAll(".add-cart");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

// load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// render cart items
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    let li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;

    // remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// add product
addCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = e.target.parentElement;
    const id = product.getAttribute("data-id");
    const name = product.querySelector("h3").textContent;
    const price = parseInt(product.getAttribute("data-price"));

    cart.push({ id, name, price });
    saveCart();
    renderCart();
  });
});

// clear cart
clearCartBtn.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

// initial render
renderCart();
