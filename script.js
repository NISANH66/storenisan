let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to the cart or update quantity
function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    saveCart();
}

// Remove a product from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
    saveCart();
}

// Update the cart display
function updateCart() {
    const cartBody = document.querySelector('#cart tbody');
    const totalPriceEl = document.getElementById('total-price');
    cartBody.innerHTML = ''; // Clear the cart before re-rendering

    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="4">Cart is empty</td></tr>';
        totalPriceEl.textContent = 'סהך הכל: $0.00';
        document.getElementById('checkout-btn').disabled = true;
    } else {
        let total = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart('${item.name}')">הסר</button></td>
            `;
            cartBody.appendChild(row);
            total += item.price * item.quantity;
        });


        totalPriceEl.textContent = `סהך הכל: $${total.toFixed(2)}`;

        document.getElementById('checkout-btn').disabled = false;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear the cart
function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

// Show the checkout form
function showCheckout() {
    document.getElementById('checkout-form').classList.remove('hidden');
}

// Hide the checkout form
function hideCheckout() {
    document.getElementById('checkout-form').classList.add('hidden');
}

// Handle checkout submission
function handleCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    alert(`Order placed!\nName: ${name}\nAddress: ${address}\nEmail: ${email}`);
    clearCart();
    hideCheckout();
}

// Initialize the cart display on page load
updateCart();
