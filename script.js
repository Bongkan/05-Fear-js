const products = [];
let idCounter = 0;
const defaultImageUrl = "https://thumbs.dreamstime.com/b/flat-isolated-vector-eps-illustration-icon-minimal-design-long-shadow-product-not-available-icon-117825738.jpg";

document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    createProduct();
});

function createProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    let image = document.getElementById('productImage').value.trim();
    const priceValidation = /^[0-9]+(\.[0-9]{1,2})?$/;
    const imageValidation = /\.(jpg|png|gif)$/i;

    //Code P Mean
    // function isImgUrl(imageURL) {
    //     const input = new URL(imageURL);
    //     return /\.(jpg|jpeg)$/.test(input.pathname);
    // }

    if (!priceValidation.test(price)) {
        alert('Price must be a valid number');
        return;
    }

    if (image && !imageValidation.test(image)) {
        alert('Image URL must be a valid image file (jpg, png, gif)');
        return;
    }

    if (!image) {
        image = defaultImageUrl;
    }


    const newProduct = { name, price: parseFloat(price), image, id: idCounter++, };
    products.push(newProduct);
    displayProducts(newProduct);
    clearForm();
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
}

function displayProducts(newProduct) {
    const displaySection = document.getElementById("productsDashBoard");

    const card = document.createElement("div");
    card.className = "flex p-4 rounded-lg shadow-lg items-center w-fit";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox text-blue-600';
    checkbox.setAttribute('product-id', newProduct.id);


    const cardImage = document.createElement('img');
    cardImage.src = newProduct.image;
    cardImage.className = 'w-20 h-20 object-contain rounded mx-4';

    const info = document.createElement('div');
    info.className = "min-w-20"
    info.innerHTML = `<strong>${newProduct.name}</strong><br>$${newProduct.price.toFixed(2)}`;

    card.appendChild(checkbox);
    card.appendChild(cardImage);
    card.appendChild(info);
    displaySection.appendChild(card);
}

function addToCart() {
    const productDashboard = document.getElementById("productsDashBoard");
    const selectedProducts = productDashboard.querySelectorAll('input[type="checkbox"]:checked');
    const cartItems = document.querySelector(".cart-item");

    cartItems.innerHTML = '';

    selectedProducts.forEach((product) => {
        const productId = product.getAttribute('product-id');
        const selectedProduct = products.find((item) => item.id == productId);
        document.getElementById('cart').className = "block"
        const cartCard = createCartCard(selectedProduct);
        cartItems.appendChild(cartCard);
    });
}

function createCartCard(product) {
    const cartCard = document.createElement("div");
    cartCard.className = "flex p-4 rounded-lg shadow-lg items-center w-fit cart-item";
    cartCard.setAttribute('data-product-id', product.id);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button ml-4 bg-red-600 text-white rounded-md p-1";
    removeButton.addEventListener("click", function () {
        cartCard.remove();
    });

    const cartCardImage = document.createElement("img");
    cartCardImage.src = product.image;
    cartCardImage.className = "w-20 h-20 object-contain rounded mx-4";

    const cartCardInfo = document.createElement("div");
    cartCardInfo.innerHTML = `<strong>${product.name}</strong><p class="cart-price">$${product.price.toFixed(2)}<p>`;

    cartCard.appendChild(cartCardImage);
    cartCard.appendChild(cartCardInfo);
    cartCard.appendChild(removeButton);

    return cartCard;
}

function totalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach((cartCard) => {
        const productId = cartCard.getAttribute('data-product-id');
        const selectedProduct = products.find((item) => item.id == productId);
        if (selectedProduct) {
            totalPrice += selectedProduct.price;
        }
    });

    const totalPriceDisplay = document.getElementById('totalPrice');
    totalPriceDisplay.textContent = '$' + totalPrice.toFixed(2);
}
