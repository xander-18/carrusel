// let cart = [];

// function updateCartCount() {
//   const count = cart.reduce((acc, item) => acc + item.quantity, 0);
//   document.getElementById('cart-count').textContent = count;
// }

// function addToCart(productId) {
//   const existing = cart.find(item => item.id === productId);
//   if (existing) {
//     existing.quantity += 1;
//   } else {
//     cart.push({ id: productId, quantity: 1 });
//   }
//   updateCartCount();
// }

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.add-to-cart').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.dataset.productId;
//       addToCart(id);
//     });
//   });
//   updateCartCount();
// });
const products = [
    { id: "1", name: "Air Jordan 1", price: 175.00, image: "assets/AirJordan-1.jpg" },
    { id: "2", name: "Air Jordan 2", price: 185.00, image: "assets/AirJordan2-13.jpg" },
    { id: "3", name: "Air Jordan 4", price: 195.00, image: "assets/AirJordan4-13.jpg" },
    { id: "4", name: "Air Jordan F", price: 155.00, image: "assets/AirJordanF-1.jpg" },
    { id: "5", name: "Air Jordan Zarpado", price: 135.00, image: "assets/AirJordanZarpado.jpg" }
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let cartIcon;
  let cartPanel;
  let closeCartBtn;
  let cartItemsContainer;
  let cartTotalPrice;
  let cartCount;
  let addToCartButtons;
  let productAddedNotification;
  let checkoutBtn;
  let carouselPrev;
  let carouselNext;
  let carouselInner;
  // 
  function updateCartUI() {
    // Actualizar contador de carrito
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items en el panel
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-message">Tu carrito está vacío</div>';
    } else {
      cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
          <img class="cart-item-image" src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="quantity-control">
              <button class="quantity-btn minus" data-id="${item.id}">−</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
              <button class="quantity-btn plus" data-id="${item.id}">+</button>
              <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
      });
    }
    
    // Actualizar total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    updateCartUI();
    showAddedNotification();
  }
  
  function updateQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    cart[itemIndex].quantity = newQuantity;
    updateCartUI();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  }
  
  function showAddedNotification() {
    productAddedNotification.style.display = 'block';
    setTimeout(() => {
      productAddedNotification.style.display = 'none';
    }, 2000);
  }
  
  function moveCarousel(direction) {
    const cardWidth = 270; // card width + gap
    const visibleItems = Math.floor(carouselInner.offsetWidth / cardWidth);
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    carouselInner.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  
  // Inicialización y Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos DOM
    cartIcon = document.querySelector('.cart-icon');
    cartPanel = document.querySelector('.cart-panel');
    closeCartBtn = document.querySelector('.close-cart');
    cartItemsContainer = document.querySelector('.cart-items');
    cartTotalPrice = document.getElementById('cart-total-price');
    cartCount = document.getElementById('cart-count');
    addToCartButtons = document.querySelectorAll('.add-to-cart');
    productAddedNotification = document.querySelector('.product-added');
    checkoutBtn = document.querySelector('.checkout-btn');
    carouselPrev = document.querySelector('.prev');
    carouselNext = document.querySelector('.next');
    carouselInner = document.querySelector('.carousel-inner');
  
    // Actualizar carrito al cargar la página
    updateCartUI();
    
    // Abrir panel del carrito
    cartIcon.addEventListener('click', () => {
      cartPanel.classList.add('open');
    });
    
    // Cerrar panel del carrito
    closeCartBtn.addEventListener('click', () => {
      cartPanel.classList.remove('open');
    });
    
    // Agregar al carrito
    addToCartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        addToCart(productId);
      });
    });
    
    // Eventos en los items del carrito
    cartItemsContainer.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      if (!productId) return;
      
      if (e.target.classList.contains('minus')) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;
        updateQuantity(productId, cart[itemIndex].quantity - 1);
      }
      
      if (e.target.classList.contains('plus')) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;
        updateQuantity(productId, cart[itemIndex].quantity + 1);
      }
      
      if (e.target.classList.contains('remove-item')) {
        removeFromCart(productId);
      }
    });
    
    // Cambiar cantidad con input
    cartItemsContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('quantity-input')) {
        const productId = e.target.dataset.id;
        const newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity)) return;
        updateQuantity(productId, newQuantity);
      }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }
      alert('¡Gracias por tu compra! Procesando tu pedido...');
      cart = [];
      updateCartUI();
      cartPanel.classList.remove('open');
    });
    
    // Carrusel de productos
    carouselPrev.addEventListener('click', () => moveCarousel('prev'));
    carouselNext.addEventListener('click', () => moveCarousel('next'));
  });