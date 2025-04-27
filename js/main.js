document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        sections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetId) {
            section.classList.add('active');
          }
        });
      });
    });
  
    const carousel = document.querySelector('.carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    const productCards = document.querySelectorAll('.product-card');
    const cardWidth = productCards[0].offsetWidth + 20;
  
    let isHoveringCarousel = false;
  
    carouselContainer.addEventListener('mouseenter', () => {
      isHoveringCarousel = true;
      autoScroll();
    });
  
    carouselContainer.addEventListener('mouseleave', () => {
      isHoveringCarousel = false;
      scrollSpeed = 0;
    });
  
    carouselContainer.addEventListener('mousemove', e => {
      const { left, width } = carouselContainer.getBoundingClientRect();
      const x = e.clientX - left;
      const edgeZone = width * 0.3;
  
      if (x < edgeZone) {
        scrollSpeed = -Math.ceil((edgeZone - x) / 20);
      } else if (x > width - edgeZone) {
        scrollSpeed = Math.ceil((x - (width - edgeZone)) / 20);
      } else {
        scrollSpeed = 0;
      }
    });
  
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout');
  
    let cart = [];
    let isDeliveryValidated = false;
    let isPaymentValidated = false;
  
    cartBtn.addEventListener('click', () => {
      cartSidebar.classList.add('open');
    });
  
    closeCartBtn.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
    });
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.getAttribute('data-image');
  
        const existingItem = cart.find(item => item.id === productId);
  
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          });
        }
  
        updateCart();
        cartSidebar.classList.add('open');
  
        animateAddToCart(button);
      });
    });
  
    function animateAddToCart(button) {
      button.textContent = '¡Agregado!';
      button.style.backgroundColor = '#28a745';
  
      setTimeout(() => {
        button.textContent = 'Agregar al carrito';
        button.style.backgroundColor = '';
      }, 1000);
    }
  
    function updateCart() {
      try {
        cartItems.innerHTML = '';
  
        let totalItems = 0;
        cart.forEach(item => {
          totalItems += item.quantity;
        });
        cartCountElement.textContent = totalItems;
  
        if (cart.length === 0) {
          cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
          cartTotalElement.textContent = '$0.00';
          return;
        }
  
        let total = 0;
  
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
  
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="cart-item-remove" data-id="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `;
  
          cartItems.appendChild(cartItem);
        });
  
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
  
        document.querySelectorAll('.decrease').forEach(button => {
          button.addEventListener('click', () => {
            decreaseQuantity(button.getAttribute('data-id'));
          });
        });
  
        document.querySelectorAll('.increase').forEach(button => {
          button.addEventListener('click', () => {
            increaseQuantity(button.getAttribute('data-id'));
          });
        });
  
        document.querySelectorAll('.cart-item-remove').forEach(button => {
          button.addEventListener('click', () => {
            removeItem(button.getAttribute('data-id'));
          });
        });
      } catch (error) {
        console.error('Error en updateCart:', error);
      }
    }
  
    function increaseQuantity(id) {
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity++;
        updateCart();
      }
    }
  
    function decreaseQuantity(id) {
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          removeItem(id);
        } else {
          updateCart();
        }
      }
    }
  
    function removeItem(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }
  
    const paymentModal = document.getElementById('payment-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    const deliveryMethodRadios = document.querySelectorAll('input[name="delivery-method"]');
    const deliveryAddressDiv = document.getElementById('delivery-address');
    const pickupStoreDiv = document.getElementById('pickup-store');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-method-form');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const completePurchaseBtn = document.getElementById('complete-purchase');
    const loadingModal = document.getElementById('loading-modal');
    const successModal = document.getElementById('success-modal');
    const continueShoppingBtn = document.getElementById('continue-shopping');
  
    const deliveryForm = document.getElementById('delivery-form');
    const paymentForm = document.getElementById('payment-form');
    const confirmationForm = document.getElementById('confirmation-form');
  
    const steps = document.querySelectorAll('.step');
  
    proceedToCheckoutBtn.addEventListener('click', () => {
      console.log('Botón Continuar clicado');
      if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
      }
  
      isDeliveryValidated = false;
      isPaymentValidated = false;
  
      paymentModal.style.display = 'block';
      modalOverlay.style.display = 'block';
  
      deliveryForm.style.display = 'block';
      paymentForm.style.display = 'none';
      confirmationForm.style.display = 'none';
  
      paymentMethods.forEach(m => m.classList.remove('active'));
      const defaultMethod = paymentMethods[0];
      defaultMethod.classList.add('active');
  
      paymentForms.forEach(form => form.style.display = 'none');
      const methodType = defaultMethod.getAttribute('data-method');
      document.getElementById(`${methodType}-form`).style.display = 'block';
  
      steps.forEach((step, index) => {
        if (index === 0) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
          step.classList.remove('completed');
        }
      });
  
      updateOrderSummary();
    });
  
    closeModalBtn.addEventListener('click', () => {
      paymentModal.style.display = 'none';
      modalOverlay.style.display = 'none';
  
      isDeliveryValidated = false;
      isPaymentValidated = false;
    });
  
    deliveryMethodRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'delivery') {
          deliveryAddressDiv.style.display = 'block';
          pickupStoreDiv.style.display = 'none';
        } else {
          deliveryAddressDiv.style.display = 'none';
          pickupStoreDiv.style.display = 'block';
        }
      });
    });
  
    paymentMethods.forEach(method => {
      method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('active'));
  
        method.classList.add('active');
  
        paymentForms.forEach(form => form.style.display = 'none');
  
        const methodType = method.getAttribute('data-method');
        document.getElementById(`${methodType}-form`).style.display = 'block';
      });
    });
  
    nextStepButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentForm = this.closest('.payment-form');
  
        if (currentForm.id === 'delivery-form') {
          if (!validateDeliveryForm()) {
            return;
          }
  
          deliveryForm.style.display = 'none';
          paymentForm.style.display = 'block';
          confirmationForm.style.display = 'none';
  
          paymentMethods.forEach(m => m.classList.remove('active'));
          const defaultMethod = paymentMethods[0];
          defaultMethod.classList.add('active');
  
          paymentForms.forEach(form => form.style.display = 'none');
          const methodType = defaultMethod.getAttribute('data-method');
          document.getElementById(`${methodType}-form`).style.display = 'block';
  
          steps[0].classList.add('completed');
          steps[1].classList.add('active');
          steps[2].classList.remove('active');
        } else if (currentForm.id === 'payment-form') {
          if (!validatePaymentForm()) {
            return;
          }
  
          deliveryForm.style.display = 'none';
          paymentForm.style.display = 'none';
          confirmationForm.style.display = 'block';
  
          steps[1].classList.add('completed');
          steps[2].classList.add('active');
        }
      });
    });
  
    prevStepButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentForm = this.closest('.payment-form');
  
        if (currentForm.id === 'payment-form') {
          deliveryForm.style.display = 'block';
          paymentForm.style.display = 'none';
          confirmationForm.style.display = 'none';
  
          steps[0].classList.remove('completed');
          steps[1].classList.remove('active');
          steps[2].classList.remove('active');
        } else if (currentForm.id === 'confirmation-form') {
          deliveryForm.style.display = 'none';
          paymentForm.style.display = 'block';
          confirmationForm.style.display = 'none';
  
          steps[1].classList.remove('completed');
          steps[2].classList.remove('active');
        }
      });
    });
  
    function validateDeliveryForm() {
      const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
  
      if (deliveryMethod === 'delivery') {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
  
        if (!name || !phone || !address || !city) {
          alert('Por favor, completa todos los campos');
          return false;
        }
      }
  
      isDeliveryValidated = true;
      return true;
    }
  
    function validatePaymentForm() {
      const activeMethod = document.querySelector('.payment-method.active');
      if (!activeMethod) {
        alert('Por favor, selecciona un método de pago');
        return false;
      }
  
      const methodType = activeMethod.getAttribute('data-method');
  
      if (methodType === 'card') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvv = document.getElementById('card-cvv').value.trim();
        const cardName = document.getElementById('card-name').value.trim();
  
        if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
          alert('Por favor, completa todos los campos de la tarjeta');
          return false;
        }
  
        if (cardNumber.length < 16) {
          alert('El número de tarjeta no es válido');
          return false;
        }
  
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryPattern.test(cardExpiry)) {
          alert('El formato de la fecha de expiración debe ser MM/AA');
          return false;
        }
  
        if (cardCvv.length < 3) {
          alert('El CVV no es válido');
          return false;
        }
      } else if (methodType === 'yape') {
        const yapeConfirmation = document.getElementById('yape-confirmation').value.trim();
        if (!yapeConfirmation) {
          alert('Por favor, ingresa el número de operación de Yape');
          return false;
        }
      } else if (methodType === 'transfer') {
        const transferConfirmation = document.getElementById('transfer-confirmation').value.trim();
        if (!transferConfirmation) {
          alert('Por favor, ingresa el número de operación de la transferencia');
          return false;
        }
      }
  
      isPaymentValidated = true;
      return true;
    }
  
    function updateOrderSummary() {
      try {
        const summaryItems = document.querySelector('.summary-items');
        const summarySubtotal = document.querySelector('.summary-subtotal');
        const summaryShipping = document.querySelector('.summary-shipping');
        const summaryTotal = document.querySelector('.summary-total-amount');
  
        summaryItems.innerHTML = '';
  
        let subtotal = 0;
  
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;
  
          const summaryItem = document.createElement('div');
          summaryItem.classList.add('summary-item');
          summaryItem.innerHTML = `
            <div class="summary-item-name">${item.name}</div>
            <div class="summary-item-quantity">x${item.quantity}</div>
            <div class="summary-item-price">$${itemTotal.toFixed(2)}</div>
          `;
  
          summaryItems.appendChild(summaryItem);
        });
  
        summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
  
        const selectedDeliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
        const shipping = selectedDeliveryMethod && selectedDeliveryMethod.value === 'delivery' ? 5.00 : 0.00;
        summaryShipping.textContent = `$${shipping.toFixed(2)}`;
  
        const total = subtotal + shipping;
        summaryTotal.textContent = `$${total.toFixed(2)}`;
      } catch (error) {
        console.error('Error en updateOrderSummary:', error);
      }
    }
  
    completePurchaseBtn.addEventListener('click', () => {
      if (confirmationForm.style.display !== 'block') {
        alert('Por favor, completa todos los pasos del proceso de pago.');
        return;
      }
  
      if (!isDeliveryValidated) {
        alert('Por favor, completa y valida el formulario de entrega.');
        deliveryForm.style.display = 'block';
        paymentForm.style.display = 'none';
        confirmationForm.style.display = 'none';
        steps[0].classList.add('active');
        steps[1].classList.remove('active');
        steps[2].classList.remove('active');
        return;
      }
  
      if (!isPaymentValidated) {
        alert('Por favor, completa y valida el formulario de pago.');
        deliveryForm.style.display = 'none';
        paymentForm.style.display = 'block';
        confirmationForm.style.display = 'none';
        steps[0].classList.add('completed');
        steps[1].classList.add('active');
        steps[2].classList.remove('active');
        return;
      }
  
      paymentModal.style.display = 'none';
      loadingModal.style.display = 'block';
  
      setTimeout(() => {
        loadingModal.style.display = 'none';
        successModal.style.display = 'block';
  
        cart = [];
        updateCart();
      }, 3000);
    });
  
    continueShoppingBtn.addEventListener('click', () => {
      successModal.style.display = 'none';
      modalOverlay.style.display = 'none';
  
      resetCheckoutForms();

      isDeliveryValidated = false;
      isPaymentValidated = false;
    });
  
    function resetCheckoutForms() {
      steps.forEach((step, index) => {
        if (index === 0) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
          step.classList.remove('completed');
        }
      });
  
      deliveryForm.style.display = 'block';
      paymentForm.style.display = 'none';
      confirmationForm.style.display = 'none';
  
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('address').value = '';
      document.getElementById('city').value = '';
      document.getElementById('card-number').value = '';
      document.getElementById('card-expiry').value = '';
      document.getElementById('card-cvv').value = '';
      document.getElementById('card-name').value = '';
      document.getElementById('yape-confirmation').value = '';
      document.getElementById('transfer-confirmation').value = '';
  
      document.querySelector('input[name="delivery-method"][value="delivery"]').checked = true;
      deliveryAddressDiv.style.display = 'block';
      pickupStoreDiv.style.display = 'none';
  
      paymentMethods.forEach((method, index) => {
        if (index === 0) {
          method.classList.add('active');
        } else {
          method.classList.remove('active');
        }
      });
  
      paymentForms.forEach((form, index) => {
        if (index === 0) {
          form.style.display = 'block';
        } else {
          form.style.display = 'none';
        }
      });
    }
  
    updateCart();
  
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      let formattedValue = '';
  
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
      }
  
      if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
      }
  
      this.value = formattedValue;
    });
  
    const cardExpiryInput = document.getElementById('card-expiry');
    cardExpiryInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
  
      if (value.length > 2) {
        this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
      } else {
        this.value = value;
      }
    });
  
    const cardCvvInput = document.getElementById('card-cvv');
    cardCvvInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
  
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
  
    deliveryMethodRadios.forEach(radio => {
      radio.addEventListener('change', updateOrderSummary);
    });
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.product-card, .nosotros-content, .footer-section').forEach(el => {
      observer.observe(el);
      el.classList.add('animate');
    });
  
    document.body.classList.add('loaded');
  
    const header = document.querySelector('header');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
        function updateCarouselWidth() {
        const productCards = document.querySelectorAll('.product-card');
        let cardWidth;
        if (window.innerWidth <= 576) {
            cardWidth = carousel.clientWidth;
        } else if (window.innerWidth <= 991) {
            cardWidth = (carousel.clientWidth / 2) - 10;
        } else {
            cardWidth = (carousel.clientWidth / 3) - 14;
        }
        productCards.forEach(card => {
            card.style.flexBasis = `${cardWidth}px`;
        });
    }
    updateCarouselWidth();
    window.addEventListener('resize', updateCarouselWidth);
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        .animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        @keyframes addedToCart {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .added-animation {
            animation: addedToCart 0.5s ease;
        }
    `;
    document.head.appendChild(styleElement);
    function autoScroll() {
        if (!isHoveringCarousel) return;

        if (scrollSpeed !== 0) {
            carousel.scrollLeft += scrollSpeed;
        }
        requestAnimationFrame(autoScroll);
        }
    });