/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Dinamik Veri (JSON), LocalStorage ve Favori Sistemi (Final Sürüm)
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. YOL KONTROLÜ ---
    const isSubPage = window.location.pathname.includes('/pages/');
    const dataPath = isSubPage ? '../data.json' : 'data.json';

    // --- 2. MOBİL MENÜ ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
        });
    }

    // --- 3. DARK MODE (LocalStorage Hafızalı) ---
    const themeBtn = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerText = "☀️ Açık Tema";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.innerText = isDark ? "☀️ Açık Tema" : "🌙 Koyu Tema";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // --- 4. DİNAMİK VERİ YÜKLEME (Ana Sayfa) ---
    if (document.getElementById('koleksiyon-konteynir')) {
        kategorileriYukle(dataPath);
    }

    // --- 5. FAVORİLERİ LİSTELE (Favoriler Sayfası) ---
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }

    // Kalpleri sayfa yüklenince kontrol et
    favoriIkonlariniGuncelle();
});

// --- 6. JSON'DAN VERİ ÇEKME VE LİSTELEME ---
async function kategorileriYukle(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        const container = document.getElementById('koleksiyon-konteynir');
        
        if (container && data.kategoriler) {
            container.innerHTML = data.kategoriler.map(item => {
                const isSubPage = window.location.pathname.includes('/pages/');
                // Eğer zaten pages içindeysek linkin başındaki "pages/" kısmını temizle
                let finalLink = isSubPage ? item.link.replace('pages/', '') : item.link;

                return `
                <div class="card" onclick="location.href='${finalLink}'" style="cursor: pointer;">
                    <div class="card-image">
                        <img src="${item.resim}" alt="${item.baslik}">
                    </div>
                    <div class="card-body">
                        <h3>${item.baslik}</h3>
                        <p>${item.aciklama}</p>
                        <div class="card-footer">
                            <span>📅 Yıl: ${item.yil}</span>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }
    } catch (error) {
        console.error("Veri yükleme hatası:", error);
    }
}

// --- 7. FAVORİ SİSTEMİ (LocalStorage Yönetimi - Geliştirilmiş) ---
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    // some metodu ile kontrol
    const isAlreadyFav = favoriler.some(f => f.id === id);

    if (!isAlreadyFav) {
        // Ekle
        favoriler.push({ id, baslik });
        gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        // Çıkar (Filter kullanarak silmek splice'dan daha güvenlidir)
        favoriler = favoriler.filter(f => f.id !== id);
        gosterToast(`${baslik} favorilerden çıkarıldı. 🗑️`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    
    // UI Güncellemeleri
    favoriIkonlariniGuncelle();
    if (document.getElementById('favorites-container')) window.favorileriGoster();
};

function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const hearts = document.querySelectorAll('span[id^="fav-icon-robot-"]');
    
    hearts.forEach(heart => {
        const robotId = heart.id.replace('fav-icon-', '');
        const isFav = favoriler.some(f => f.id === robotId);
        heart.innerText = isFav ? "♥" : "♡";
        heart.style.color = "#e74c3c";
    });
}

window.favorileriGoster = function() {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:50px;">
                <p style="font-size: 1.1rem; color: #666;">Favori listeniz şu an boş. 😊</p>
                <a href="project.html" class="btn btn-primary" style="text-decoration:none; display:inline-block; margin-top:15px; background: #00592D; color: white; padding: 10px 20px; border-radius: 5px;">Keşfetmeye Başla 🤖</a>
            </div>`;
        return;
    }

    container.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 6px solid #e74c3c; padding: 20px; margin-bottom:15px; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div class="card-body">
                <h3 style="color: #00592D;">${item.baslik}</h3>
                <p style="color: #666; font-size: 0.9rem;">Bu robot favorilerinizde kayıtlıdır.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:10px 15px; border-radius:5px; cursor:pointer; margin-top:10px; font-weight: bold;">
                    Listeden Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

// --- 8. MODAL VE TOAST ---
window.openModal = (id) => { if(document.getElementById(id)) document.getElementById(id).style.display = "block"; };
window.closeModal = (id) => { if(document.getElementById(id)) document.getElementById(id).style.display = "none"; };

function gosterToast(mesaj) {
    let toast = document.getElementById('toast-favourite') || document.getElementById('toast-message');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-favourite';
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#00592D; color:white; padding:15px 25px; border-radius:8px; z-index:99999; font-weight:bold; transition: opacity 0.5s ease;";
        document.body.appendChild(toast);
    }

    toast.innerText = mesaj;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 500);
    }, 3000);
}



