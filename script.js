// Product data
const products = [
    {
        id: 1,
        name: "Premium Notebook",
        price: 12.99,
        image: "/api/placeholder/200/200",
        description: "High-quality ruled notebook with leather cover"
    },
    {
        id: 2,
        name: "Professional Pen Set",
        price: 8.99,
        image: "/api/placeholder/200/200",
        description: "Set of 5 premium gel pens in different colors"
    },
    {
        id: 3,
        name: "Designer Pencil Case",
        price: 6.99,
        image: "/api/placeholder/200/200",
        description: "Stylish and spacious pencil case with multiple compartments"
    },
    {
        id: 4,
        name: "Sticky Notes Bundle",
        price: 4.99,
        image: "/api/placeholder/200/200",
        description: "Pack of 100 colorful sticky notes in various sizes"
    },
    {
        id: 5,
        name: "Art Pencil Set",
        price: 15.99,
        image: "/api/placeholder/200/200",
        description: "Professional drawing pencils (2H-6B)"
    },
    {
        id: 6,
        name: "Desk Organizer",
        price: 19.99,
        image: "/api/placeholder/200/200",
        description: "Modern desk organizer with multiple compartments"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsContainer = document.getElementById('products');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products
function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showAddedToCartMessage(product.name);
}

// Show added to cart message
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.textContent = `${productName} added to cart!`;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1001;
        animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}`);
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
});

// Initialize the store
displayProducts();
