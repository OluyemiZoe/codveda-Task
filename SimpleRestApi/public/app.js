const API_URL = 'http://localhost:3000/api/products';


const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');
const loadingEl = document.getElementById('loading');


async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch store inventory.');
        console.log(response)
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        productGrid.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    } finally {
        loadingEl.style.display = 'none';
    }
}


function renderProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = '<p class="text-muted">No items found in your catalog.</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-item">
            <div class="product-info">
                <h3>&#8358; ${product.name}</h3>
                <p class="text-muted">Price: &#8358; ${product.price.toFixed(2)} | Stock: ${product.stock} units</p>
            </div>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `).join('');
}


productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Could not append item code.');

        productForm.reset();
        fetchProducts(); 
    } catch (error) {
        alert(error.message);
    }
});


async function deleteProduct(id) {
    if (!confirm('Are you sure you want to remove this product?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Deletion request rejected.');
        
        fetchProducts(); 
    } catch (error) {
        alert(error.message);
    }
}


fetchProducts();
