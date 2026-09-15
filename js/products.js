const productList = document.getElementById("productList");
async function getProducts() {
    try {
        const response =await fetch("https://dummyjson.com/products?limit=12");
        const data = await response.json();
        displayProducts(data.products);
    }
    catch (error) {
        console.log(error);
        productList.innerHTML = "<p>Unable to load products.</p>";
    }
}

function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach(function(product) {
        const card = document.createElement("div");
        card.classList.add("product-card");
        const image = document.createElement("img");
        image.src = product.thumbnail;
        image.alt = product.title;
        const title = document.createElement("h3");
        title.textContent = product.title;
        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price;
        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(category);
        productList.appendChild(card);
    });
}
getProducts();