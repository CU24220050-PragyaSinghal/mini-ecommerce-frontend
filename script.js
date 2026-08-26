// labsheet 2
const products = [
    { id: 1, name: "Wireless Headphones", price: 1499, image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Smart Watch", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Running Shoes", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Travel Backpack", price: 999, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Bluetooth Speaker", price: 1299, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Laptop Stand", price: 799, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Coffee Mug", price: 399, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Phone Case", price: 499, image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80" }
];

function getCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const totalCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) cartBadge.textContent = totalCount;
}

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) existingItem.quantity += quantity;
    else cart.push({ ...product, quantity });
    saveCart(cart);
}

function renderProducts() {
    const productContainer = document.getElementById("product-container");
    if (!productContainer) return;

    products.forEach(product => {
        const productCard = document.createElement("article");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="btn add-to-cart-btn" type="button" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    productContainer.addEventListener("click", event => {
        const button = event.target.closest("[data-product-id]");
        if (button) addToCart(Number(button.dataset.productId));
    });
}

function calculateTotal() {
    const grandTotal = document.getElementById("grand-total");
    if (!grandTotal) return;

    const total = getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    grandTotal.textContent = formatPrice(total);
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    const cart = getCart();
    const emptyCart = document.getElementById("empty-cart");
    const checkoutButton = document.querySelector(".checkout-btn");
    cartItems.innerHTML = "";
    if (emptyCart) emptyCart.style.display = cart.length ? "none" : "block";
    if (checkoutButton) checkoutButton.style.display = cart.length ? "inline-block" : "none";

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input class="quantity-input" type="number" min="1" value="${item.quantity}" data-item-id="${item.id}" aria-label="Quantity for ${item.name}"></td>
            <td>${formatPrice(item.price)}</td>
            <td>${formatPrice(item.price * item.quantity)}</td>
            <td><button class="remove-btn" type="button" data-remove-id="${item.id}">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    totalRow.className = "total-row";
    totalRow.innerHTML = `
        <td colspan="3"><strong>Grand Total</strong></td>
        <td><strong id="grand-total">${formatPrice(0)}</strong></td>
        <td></td>
    `;
    cartItems.appendChild(totalRow);
    calculateTotal();
}

function setupCartEvents() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    cartItems.addEventListener("change", event => {
        if (!event.target.matches(".quantity-input")) return;
        const quantity = Math.max(1, parseInt(event.target.value, 10) || 1);
        const cart = getCart();
        const item = cart.find(cartItem => cartItem.id === Number(event.target.dataset.itemId));
        if (item) item.quantity = quantity;
        saveCart(cart);
        renderCart();
    });

    cartItems.addEventListener("click", event => {
        const button = event.target.closest("[data-remove-id]");
        if (!button) return;
        saveCart(getCart().filter(item => item.id !== Number(button.dataset.removeId)));
        renderCart();
    });
}

function setupDetailButton() {
    const button = document.getElementById("detail-add-to-cart");
    if (!button) return;
    button.addEventListener("click", () => {
        const quantity = Math.max(1, parseInt(document.getElementById("quantity").value, 10) || 1);
        addToCart(Number(button.dataset.productId), quantity);
    });
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();
        const values = {
            name: document.getElementById("name").value.trim(),
            address: document.getElementById("address").value.trim(),
            pincode: document.getElementById("pincode").value.trim(),
            phone: document.getElementById("phone").value.trim()
        };
        const errors = {
            name: values.name ? "" : "Name cannot be empty.",
            address: values.address ? "" : "Address cannot be empty.",
            pincode: /^\d{6}$/.test(values.pincode) ? "" : "Pincode must be exactly 6 digits.",
            phone: /^\d{10}$/.test(values.phone) ? "" : "Phone must be exactly 10 digits."
        };
        Object.entries(errors).forEach(([field, message]) => {
            document.getElementById(`${field}-error`).textContent = message;
        });

        const confirmation = document.getElementById("order-confirmation");
        if (Object.values(errors).some(Boolean)) {
            confirmation.textContent = "";
            return;
        }
        confirmation.textContent = "Order placed!";
        localStorage.removeItem("cart");
        updateCartBadge();
        checkoutForm.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    renderProducts();
    renderCart();
    setupCartEvents();
    setupDetailButton();
    setupCheckoutForm();
});
