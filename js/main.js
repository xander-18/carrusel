document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.add-to-cart');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.productId;
        console.log(`Se pulsó añadir al carrito: producto ${id}`);
      });
    });

    // Carrusel
    const carousel = document.querySelector('.product-carousel');
    if (carousel) {
      const inner = carousel.querySelector('.carousel-inner');
      const slides = inner.children;
      let index = 0;

      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');

      function update() {
        inner.style.transform = `translateX(-${index * 100}%)`;
      }

      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
      });

      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        update();
      });
    }
});