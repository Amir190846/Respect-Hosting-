const mockProducts = [
    // باقات SA-MP
    { id: 101, category: 'samp', name: 'SA-MP - الخطة الأساسية', price: 1.50, desc: 'استضافة SA-MP بأداء ممتاز', features: ['سلوتس غير محدودة', '2 جيجا رام', 'مساحة تخزين سريعة', 'حماية DDoS متقدمة', 'لوحة تحكم احترافية'] },
    { id: 102, category: 'samp', name: 'SA-MP - الخطة الاحترافية', price: 3.00, desc: 'أداء عالي للسيرفرات الكبيرة', features: ['سلوتس غير محدودة', '4 جيجا رام', 'مساحة NVMe فائقة السرعة', 'دعم فني 24/7', 'نسخ احتياطي يومي'] },
    
    // باقات MTA
    { id: 201, category: 'mta', name: 'MTA - الخطة الأولى', price: 2.00, desc: 'استضافة MTA مستقرة', features: ['سلوتس غير محدودة', '2 جيجا رام', 'قواعد بيانات مجانية', 'حماية قوية', 'أداء بدون لاق'] },
    { id: 202, category: 'mta', name: 'MTA - الخطة المتقدمة', price: 4.00, desc: 'للخوادم ذات اللاعبين الكثر', features: ['سلوتس غير محدودة', '6 جيجا رام', 'مساحة تخزين ضخمة', 'دعم المودات الثقيلة'] },
    
    // باقات استضافة البوتات
    { id: 301, category: 'bot', name: 'استضافة بوت - Node.js', price: 1.00, desc: 'للبوتات الخفيفة والسريعة', features: ['تشغيل 24/7 بدون توقف', '1 جيجا رام', 'دعم أحدث إصدارات Node.js', 'مساحة تخزين 2GB'] },
    { id: 302, category: 'bot', name: 'استضافة بوت - Python', price: 1.00, desc: 'لبوتات ديسكورد وتيليجرام', features: ['تشغيل 24/7 بدون توقف', '1 جيجا رام', 'دعم Python 3.10+', 'أداء مستقر'] },
    
    // باقات الخوادم الافتراضية VPS
    { id: 401, category: 'vps', name: 'VPS Ryzen - الخطة الفضية', price: 6.00, desc: 'خادم افتراضي قوي جداً', features: ['2 vCore Ryzen 9', '4 GB RAM DDR4', '40 GB NVMe Storage', '1 Gbps Network Speed', 'وصول Root كامل'] },
    { id: 402, category: 'vps', name: 'VPS Ryzen - الخطة الذهبية', price: 10.00, desc: 'للأداء الخارق والمشاريع الكبيرة', features: ['4 vCore Ryzen 9', '8 GB RAM DDR4', '80 GB NVMe Storage', '1 Gbps Network Speed', 'وصول Root كامل'] }
];

let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];

function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('side-menu-overlay');
    menu.classList.toggle('drawer-closed');
    menu.classList.toggle('drawer-open');
    overlay.classList.toggle('hidden');
    setTimeout(() => overlay.classList.toggle('opacity-0'), 10);
}

function toggleOrderMenu() {
    const submenu = document.getElementById('order-submenu');
    submenu.classList.toggle('hidden');
    submenu.classList.toggle('flex');
}

function filterCategory(category) {
    toggleMenu();
    document.getElementById('services').classList.remove('hidden');
    const container = document.getElementById('products-container');
    
    let filtered = category === 'all' ? mockProducts : mockProducts.filter(p => p.category === category);
    
    container.innerHTML = filtered.map(p => `
        <div class="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300">
            <div>
                <h3 class="text-2xl font-black mb-2">${p.name}</h3>
                <span class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">$${p.price.toFixed(2)}</span>
                <span class="text-gray-500 text-sm">/ شهرياً</span>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-semibold">${p.desc}</p>
                <ul class="my-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    ${p.features.map(f => `
                        <li class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            ${f}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <button onclick="addToCart(${p.id})" class="w-full bg-gray-100 dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary text-gray-900 dark:text-white hover:text-white font-bold py-4 rounded-xl transition shadow-md">
                إضافة إلى السلة
            </button>
        </div>
    `).join('');
    
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(id) {
    const product = mockProducts.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if(item) {
        item.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    updateBadge();
    alert(`تمت إضافة [ ${product.name} ] إلى سلة المشتريات!`);
}

function updateBadge() {
    const badge = document.getElementById('cart-count');
    if(badge) {
        badge.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
        // إضافة حركة تفاعلية للسلة عند الإضافة
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
    }
}

document.addEventListener('DOMContentLoaded', updateBadge);
