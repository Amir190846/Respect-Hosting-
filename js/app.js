const mockProducts = [
    { id: 101, category: 'samp', name: 'SA-MP - Plan 1', price: 0.99, desc: '1300 IQD', features: ['2 GB RAM', 'x5 Cores', '512 MB NVMe'] },
    { id: 201, category: 'mta', name: 'MTA - Basic Plan', price: 3.00, desc: '4000 IQD', features: ['50 Slots', '3 GB RAM', '2 GB SSD'] },
    { id: 301, category: 'bot', name: 'Bot - Plan 1', price: 1.00, desc: '1300 IQD', features: ['512 MB RAM', '2 GB Storage'] },
    { id: 401, category: 'vps', name: 'VPS Ryzen - Plan 1', price: 6.00, desc: '10,000 IQD', features: ['1 vCore', '8 GB RAM', '25 GB NVMe'] }
];

let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('drawer-closed');
    document.getElementById('side-menu').classList.toggle('drawer-open');
    document.getElementById('side-menu-overlay').classList.toggle('hidden');
}

function toggleOrderMenu() {
    document.getElementById('order-submenu').classList.toggle('hidden');
    document.getElementById('order-submenu').classList.toggle('flex');
}

function filterCategory(category) {
    toggleMenu();
    document.getElementById('services').classList.remove('hidden');
    const container = document.getElementById('products-container');
    const filtered = mockProducts.filter(p => p.category === category);
    
    container.innerHTML = filtered.map(p => `
        <div class="bg-darkCard p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 class="text-xl font-bold text-white mb-2">${p.name}</h3>
            <span class="text-3xl font-black text-primary">$${p.price.toFixed(2)}</span>
            <p class="text-gray-400 mt-1">${p.desc}</p>
            <ul class="my-4 space-y-2 text-sm text-gray-300">
                ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
            </ul>
            <button onclick="addToCart(${p.id})" class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl">أضف للسلة</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = mockProducts.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if(item) item.quantity++; else cart.push({...product, quantity: 1});
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    updateBadge();
    alert(`تمت إضافة ${product.name} للسلة!`);
}

function updateBadge() {
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
}

document.addEventListener('DOMContentLoaded', updateBadge);
                  
