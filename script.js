// Products Database
const products = [
    {
        id: 1,
        name: 'Tài Khoản VIP Cơ Bản',
        category: 'account',
        price: 49000,
        icon: '👑',
        description: 'Tài khoản VIP 1 tháng với nhiều quyền lợi',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Tài Khoản VIP Premium',
        category: 'account',
        price: 99000,
        icon: '💎',
        description: 'Tài khoản VIP 3 tháng đầy đủ tính năng',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Thẻ Nạp 50K',
        category: 'card',
        price: 50000,
        icon: '💳',
        description: 'Thẻ nạp trực tiếp 50.000 Đồng',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Thẻ Nạp 100K',
        category: 'card',
        price: 100000,
        icon: '💳',
        description: 'Thẻ nạp trực tiếp 100.000 Đồng',
        rating: 4.8
    },
    {
        id: 5,
        name: 'Thẻ Nạp 500K',
        category: 'card',
        price: 500000,
        icon: '💳',
        description: 'Thẻ nạp trực tiếp 500.000 Đồng',
        rating: 4.9
    },
    {
        id: 6,
        name: 'Giftcode 1 Tháng VIP',
        category: 'gift',
        price: 49000,
        icon: '🎁',
        description: 'Mã quà 1 tháng VIP dùng ngay',
        rating: 4.6
    },
    {
        id: 7,
        name: 'Giftcode Sư Phụ Ngọc Rồng',
        category: 'gift',
        price: 199000,
        icon: '🎁',
        description: 'Mã quà set sư phụ cấp cao',
        rating: 4.9
    },
    {
        id: 8,
        name: 'Giftcode Đặc Biệt 2024',
        category: 'gift',
        price: 299000,
        icon: '🎁',
        description: 'Mã quà đặc biệt giới hạn 2024',
        rating: 5.0
    },
    {
        id: 9,
        name: 'Tài Khoản VIP Vĩnh Viễn',
        category: 'account',
        price: 299000,
        icon: '⭐',
        description: 'Tài khoản VIP trọn đời không hết hạn',
        rating: 5.0
    },
    {
        id: 10,
        name: 'Thẻ Nạp 1M',
        category: 'card',
        price: 1000000,
        icon: '💳',
        description: 'Thẻ nạp trực tiếp 1.000.000 Đồng',
        rating: 4.9
    },
    {
        id: 11,
        name: 'Bộ Trang Bị Vip',
        category: 'account',
        price: 79000,
        icon: '⚔️',
        description: 'Bộ trang bị cấp cao cho nhân vật',
        rating: 4.8
    },
    {
        id: 12,
        name: 'Giftcode Server Mới',
        category: 'gift',
        price: 149000,
        icon: '🎁',
        description: 'Mã quà dành cho server mới nhất',
        rating: 4.7
    }
];

// Cart Array
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartModal = document.getElementById('cartModal');
const cartIcon = document.querySelector('.cart-icon');
const closeBtn = document.querySelector('.close');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all');
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            displayProducts(category);
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

// Display Products
function displayProducts(category) {
    productsContainer.innerHTML = '';
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}
                </div>
                <div class="product-price">${product.price.toLocaleString('vi-VN')}đ</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    Thêm Vào Giỏ
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    updateCartDisplay();
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;color:#999;">Giỏ hàng trống</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div>
                    <span>Số lượng: ${item.quantity}</span> | 
                    <span class="cart-item-price">${itemTotal.toLocaleString('vi-VN')}đ</span>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartTotal();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toLocaleString('vi-VN') + 'đ';
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Tổng cộng: ${total.toLocaleString('vi-VN')}đ\n\nChào mừng bạn! Vui lòng liên hệ với chúng tôi để hoàn tất thanh toán.\n\nĐiện thoại: +84 123 456 789\nEmail: support@dragongamestore.com`);
    
    cart = [];
    updateCartDisplay();
    updateCartCount();
    cartModal.style.display = 'none';
}

// Contact Form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.');
            contactForm.reset();
        });
    }
});
