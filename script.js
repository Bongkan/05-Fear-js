const products = [];
const cart = [];
let idCounter = 0;
const defaultImageUrl = "https://thumbs.dreamstime.com/b/flat-isolated-vector-eps-illustration-icon-minimal-design-long-shadow-product-not-available-icon-117825738.jpg";

function createProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;
    const priceValidation = /^[0-9]+(\.[0-9]{1,2})?$/;
    const imageValidation = /\.(jpg|png|gif)$/i;

    if (!priceValidation.test(price)) {
        alert('Price must be a valid number');
        return;
    }

    if (!imageValidation.test(image)) {
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
    const displaySection = document.getElementById("products");

    const card = document.createElement("div");
    card.className = "flex p-4 rounded-lg shadow-lg items-center";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox h-5 w-5 text-blue-600';

    const cardImage = document.createElement('img');
    cardImage.src = newProduct.image;
    cardImage.className = 'w-16 h-16 object-cover rounded';

    const info = document.createElement('div');
    info.innerHTML = `<strong>${newProduct.name}</strong><br>$${newProduct.price.toFixed(2)}`;
    card.appendChild(checkbox);
    card.appendChild(cardImage);
    card.appendChild(info);
    displaySection.appendChild(card);
}


document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    createProduct();
});

