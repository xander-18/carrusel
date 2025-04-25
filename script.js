const products = [
    { id: 1, name: "Zapatilla Hombre Air jordan", price: 299.90, category: "hombre", image: "https://e7.pngegg.com/pngimages/963/643/png-clipart-air-jordan-nike-shoe-sneakers-adidas-nike-white-outdoor-shoe.png" },
    { id: 2, name: "Zapatilla Hombre Adidas Run", price: 249.90, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQME6qeF6nkcPgrG-qFQmwPJe4b9fgusN4FGA&s" },
    { id: 3, name: "Zapatilla Mujer Adidad", price: 279.90, category: "mujer", image: "https://bboys.pe/cdn/shop/files/ID2994_0.jpg?v=1744753580" },
    { id: 4, name: "Zapatilla Mujer Adidas", price: 259.90, category: "mujer", image: "https://passarelape.vtexassets.com/arquivos/ids/1476158/ZAPATILLAS-ADIDAS-MUJERES-IF7287-ALPHAEDGE---NEGRO-08-1.jpg?v=638462394592300000" },
    { id: 5, name: "Zapatilla Hombre Nike Air Max", price: 310.00, category: "hombre", image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/421756b633a84c3580a4ae8901801435_9366/Zapatillas_adidas_Grand_Court_Cloudfoam_Comfort_Negro_GW9196_01_00_standard.jpg" },
    { id: 6, name: "Zapatilla Hombre Puma Sport", price: 230.00, category: "hombre", image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4a46e180c40643c8b436af9c017a4615_9366/Zapatillas_Samba_adidas_Originals_Verde_ID2054_01_standard.jpg" },
    { id: 7, name: "Zapatilla Hombre Reebok Classic", price: 220.50, category: "hombre", image: "https://thn.pe/cdn/shop/products/fy4976_1.jpg?v=1689720330" },
    { id: 8, name: "Zapatilla Hombre Vans Skater", price: 210.00, category: "hombre", image: "https://images-cdn.ubuy.pe/649c972b6cac543f5c38612e-adidas-campus-00-039-s-originals-shoes.jpg" },
    { id: 9, name: "Zapatilla Hombre Converse All Star", price: 195.00, category: "hombre", image: "https://www.nike.com.pe/on/demandware.static/-/Sites-catalog-equinox/default/dw1568c5e5/images/hi-res/196608050278_1_20240207-mrtPeru.jpg" },
    { id: 10, name: "Zapatilla Hombre Under Armour", price: 270.00, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5o_YecDSUZFtoom0HvVCkahTDZSC4wQOr5w&s" },
    { id: 11, name: "Zapatilla Hombre Asics Gel", price: 250.90, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWL6bkpCdFNpG2ud1kLlE2OZ63AL7GhxZXg&s" },
    { id: 12, name: "Zapatilla Hombre New Balance", price: 280.00, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfD2twxhcern34nK6oIrq3JYrHaToArYIy7g&s" },
    { id: 13, name: "Zapatilla Hombre Skechers Go Walk", price: 200.00, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTamFhtVOCYJuatsmhPU36AWWp2nP1LLfDCdA&s" },
    { id: 14, name: "Zapatilla Hombre Fila Racer", price: 220.00, category: "hombre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgnY1hazodymY02Az-ci0X3W9-0fwO8UZnAw&s" },
    { id: 15, name: "Zapatilla Mujer Nike Revolution", price: 240.00, category: "mujer", image: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2676/PMP20000353287/full_image-14.jpeg" },
    { id: 16, name: "Zapatilla Mujer Puma Cali", price: 225.00, category: "mujer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhJlx_UpSJKCyidBNGUHHPU5FeGTL3FjSI6A&s" },
    { id: 17, name: "Zapatilla Mujer Reebok Princess", price: 210.90, category: "mujer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcoXzE0yJv314h6vJvKYzGU1xEEZfLkxbyMA&s" },
    { id: 18, name: "Zapatilla Mujer Vans Old Skool", price: 215.00, category: "mujer", image: "https://oechsle.vtexassets.com/arquivos/ids/15581714/2421947.jpg?v=638279202881330000" },
    { id: 19, name: "Zapatilla Mujer Converse Chuck Taylor", price: 205.00, category: "mujer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynV04bih5SkTJKf6HvzBAOidP_rHtgWtRmA&s" },
    { id: 20, name: "Zapatilla Mujer Under Armour HOVR", price: 260.00, category: "mujer", image: "https://m.media-amazon.com/images/I/51zvRULCQdL._AC_UY900_.jpg" },
    { id: 21, name: "Zapatilla Mujer Asics Dynablast", price: 245.00, category: "mujer", image: "https://unicosmoderna.com/cdn/shop/products/TENIS-ADIDAS-DURAMO-10-CORRER-GX0715-MUJER-BLANCO-A.jpg?v=1743722670" },
    { id: 22, name: "Zapatilla Mujer New Balance Fresh Foam", price: 270.00, category: "mujer", image: "https://files.merca20.com/uploads/2024/11/Adidas-con-descuento.jpg" },
    { id: 23, name: "Zapatilla Mujer Skechers Flex Appeal", price: 235.00, category: "mujer", image: "https://www.atmosmovement.com/dw/image/v2/BHFM_PRD/on/demandware.static/-/Sites-storefront_catalog_atmos/default/dw5960969c/images/hi-res/Lookbok_Renombradas/Tennis-Adidas-Para-Mujer-31720046-71282_1.jpg?sw=800&sh=960" },
    { id: 24, name: "Zapatilla Mujer Fila Disruptor", price: 250.00, category: "mujer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmAxGURJPNUH3mvSF_hEp2dkbRr9XC1gv9w&s" }
];

let cart = [];

function showCategory(category) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    const filteredProducts = products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>S/ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>S/ ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartCount.textContent = itemCount;
    cartTotal.textContent = `Total: S/ ${total.toFixed(2)}`;
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('active');
}

function processPayment(method) {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    alert(`Procesando pago con ${method}. Por favor, completa la transacción en la aplicación correspondiente.`);
    cart = [];
    updateCart();
    toggleCart();
}

// Mostrar productos de hombre por defecto
showCategory('hombre');