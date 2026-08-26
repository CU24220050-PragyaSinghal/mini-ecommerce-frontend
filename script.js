// labsheet 2
const products = [
    { id: 1, name: "Wireless Headphones", price: 1999, image: "images/product1.jpg" },
    { id: 2, name: "Smart Watch", price: 2999, image: "images/product2.jpg" },
    { id: 3, name: "Running Shoes", price: 2499, image: "images/product3.jpg" },
    { id: 4, name: "Backpack", price: 1299, image: "images/product4.jpg" },
    { id: 5, name: "Sunglasses", price: 799, image: "images/product5.jpg" },
    { id: 6, name: "Bluetooth Speaker", price: 1499, image: "images/product6.jpg" },
    { id: 7, name: "Coffee Mug", price: 499, image: "images/product7.jpg" },
    { id: 8, name: "Gaming Mouse", price: 999, image: "images/product8.jpg" }
];
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) {
        cartBadge.textContent = totalCount;
    }
}
function renderProducts() {
    const productContainer = document.getElementById("product-container");
    if (!productContainer) return; 

    productContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });
}
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert(`${product.name} has been added to your cart!`);
}
function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const emptyCartMsg = document.getElementById("empty-cart");
    
    if (!cartContainer) return; // Run only if on cart.html

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        if (emptyCartMsg) emptyCartMsg.style.display = "block";
        cartContainer.innerHTML = "";
        calculateTotal();
        return;
    }

    if (emptyCartMsg) emptyCartMsg.style.display = "none";
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width:70px; height:70px; object-fit:cover;">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
            <div class="cart-quantity">
                <label>Qty:</label>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </div>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;

        cartContainer.appendChild(cartItemDiv);
    });

    calculateTotal();
}

function updateQuantity(index, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let qty = parseInt(newQty);

    if (qty > 0) {
        cart[index].quantity = qty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function calculateTotal() {
    const grandTotalSpan = document.getElementById("grand-total");
    if (!grandTotalSpan) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    grandTotalSpan.textContent = `₹${total}`;
}
function setupCheckoutForm() {
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm) return; // Run only if on checkout.html

    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default submission
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const phone = document.getElementById("phone").value.trim();
        // Get error elements
        const nameError = document.getElementById("name-error");
        const addressError = document.getElementById("address-error");
        const pincodeError = document.getElementById("pincode-error");
        const phoneError = document.getElementById("phone-error");
        const confirmationMsg = document.getElementById("order-confirmation");
        let isValid = true;
        // Reset errors
        if (nameError) nameError.textContent = "";
        if (addressError) addressError.textContent = "";
        if (pincodeError) pincodeError.textContent = "";
        if (phoneError) phoneError.textContent = "";
        if (confirmationMsg) confirmationMsg.textContent = "";
        // Validate Name
        if (name === "") {
            if (nameError) nameError.textContent = "Name cannot be empty.";
            isValid = false;
        }
        // Validate Address
        if (address === "") {
            if (addressError) addressError.textContent = "Address cannot be empty.";
            isValid = false;
        }
        // Validate Pincode (Exactly 6 digits)
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(pincode)) {
            if (pincodeError) pincodeError.textContent = "Pincode must be exactly 6 digits.";
            isValid = false;
        }
        // Validate Phone (Exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            if (phoneError) phoneError.textContent = "Phone must be exactly 10 digits.";
            isValid = false;
        }
        // If Validation is Successful
        if (isValid) {
            if (confirmationMsg) {
                confirmationMsg.textContent = "Order placed successfully!";
                confirmationMsg.style.color = "green";
            }
            // Clear cart from localStorage and update badge
            localStorage.removeItem("cart");
            updateCartBadge();

            // Optional: Reset form fields
            checkoutForm.reset();
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();     // Runs on every page to update navbar badge
    renderProducts();      // Runs if product-container exists
    renderCart();          // Runs if cart-container exists
    setupCheckoutForm();   // Runs if checkout-form exists
});
