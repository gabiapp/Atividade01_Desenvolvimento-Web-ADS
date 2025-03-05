const logoButton = document.querySelector('.logo');

logoButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    
    window.scrollBy({
        top: 500, 
        behavior: 'smooth' 
    });
});

let products = [
    { id: 1, name: 'Composição para ambientes', price: 59.90, image: 'imagem_curso/arranjo_ambientes.jpeg' },
    { id: 2, name: 'Arranjo para aniversário', price: 59.90, image: './imagem_curso/arranjo_aniversarios.jpeg' },
    { id: 3, name: 'Especial para românticos', price: 49.90, image: './imagem_curso/arranjo_romanticos.jpeg' },
    { id: 4, name: 'Flores com chocolates', price: 75.99, image: './imagem_curso/arranjo_chocolate.jpg' },
    { id: 5, name: 'Arranjo para eventos', price: 38.99, image: './imagem_curso/arranjo_eventos.jpeg' },
    { id: 6, name: 'Composição Simples', price: 29.90, image: './imagem_curso/arranjo_simples.jpeg' }
];

let cart = [];

function renderProducts() {
    let productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach((product) => {
        let productDIV = document.createElement('div');
        productDIV.className = 'product';

        productDIV.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Preço: R$${product.price}</p>
            <button>Adicionar ao carrinho</button>
        `;
        
        let button = productDIV.querySelector('button');
        button.addEventListener('click', () => addToCart(product.id, button));

        productGrid.appendChild(productDIV);
    });
}

function addToCart(productId, button) {
    let product = products.find((product) => product.id === productId);
    cart.push(product);

  
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 1000);

    renderCart();
}

function renderCart() {
    let cartTable = document.querySelector('.cart-table tbody');
    cartTable.innerHTML = '';

    cart.forEach((product) => {
        let cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td>${product.name}</td>
            <td>1</td>
            <td>R$${product.price}</td>
            <td>R$${product.price}</td>
            <td><button class="btn_exc"><i class="fa-solid fa-trash"></i></button></td>
            <td ><button class="btn_add"><i class="fa-solid fa-plus"></i></button></td>
        `;
        cartTable.appendChild(cartRow);
    });

    updateTotal();
}

function updateTotal() {
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('total').textContent = `R$${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', () => { 
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert('Pedido realizado com sucesso!');
        cart = [];
        renderCart();
    }
});

renderProducts();