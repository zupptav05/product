const API_BASE = "http://localhost:8080/TuProyecto/api/productos";

// Elementos del DOM
const productList = document.getElementById('product-list');
const modal = document.getElementById('modal-product');
const productForm = document.getElementById('product-form');

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    try {
        const res = await fetch(API_BASE);
        const products = await res.json();
        renderTable(products);
    } catch (err) {
        console.error("Error conectando a la API:", err);
    }
}

function renderTable(products) {
    productList.innerHTML = '';
    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.imagen_url}" width="50" style="border-radius:5px"></td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${p.precio}</td>
            <td><span class="badge ${p.en_oferta ? 'off' : ''}">${p.en_oferta ? 'Oferta' : 'Normal'}</span></td>
            <td>
                <button onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        productList.appendChild(tr);
    });
}

// Lógica de guardado (POST/PUT)
productForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const product = {
        nombre: document.getElementById('prod-name').value,
        precio: parseFloat(document.getElementById('prod-price').value),
        categoria: document.getElementById('prod-category').value,
        imagen_url: document.getElementById('prod-image').value,
        en_oferta: document.getElementById('prod-offer').checked
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE}/${id}` : API_BASE;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    closeModal();
    fetchProducts();
};

function deleteProduct(id) {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
        fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then(fetchProducts);
    }
}

// UI Controls
document.getElementById('btn-open-modal').onclick = () => {
    productForm.reset();
    document.getElementById('prod-id').value = '';
    modal.classList.add('active');
};

function closeModal() { modal.classList.remove('active'); }
document.getElementById('btn-close-modal').onclick = closeModal;