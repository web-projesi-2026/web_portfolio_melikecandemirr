/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Dinamik Veri (JSON), Veri Saklama (LocalStorage) ve Favori Sistemi
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. YOL KONTROLÜ (Kritik Ayar) ---
    // Sayfanın konumuna göre data.json yolunu belirler
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

    // --- 4. DİNAMİK VERİ YÜKLEME (Ana Sayfa Kartları) ---
    const collectionContainer = document.getElementById('koleksiyon-konteynir');
    if (collectionContainer) {
        kategorileriYukle(dataPath);
    }

    // --- 5. FAVORİLERİ LİSTELE (Favoriler Sayfası) ---
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }

    // Projeler sayfasındaki kalplerin durumunu güncelle
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
                // Eğer alt sayfadaysak linklerin başına ../ koyma (çünkü JSON'da pages/ var)
                const isSubPage = window.location.pathname.includes('/pages/');
                let finalLink = item.link;
                if (isSubPage) finalLink = item.link.replace('pages/', '');

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

// --- 7. FAVORİ SİSTEMİ (LocalStorage Yönetimi) ---
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(f => f.id === id);

    if (index === -1) {
        // Ekle
        favoriler.push({ id, baslik });
        gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        // Çıkar
        favoriler.splice(index, 1);
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
                <p>Favori listeniz henüz boş. 😊</p>
                <a href="project.html" class="btn btn-primary" style="text-decoration:none; display:inline-block; margin-top:15px;">Keşfetmeye Başla</a>
            </div>`;
        return;
    }

    container.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 6px solid #e74c3c; padding: 20px; margin-bottom:15px;">
            <div class="card-body">
                <h3>${item.baslik}</h3>
                <p>Bu öğe favori koleksiyonunuzda yer alıyor.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:10px 15px; border-radius:5px; cursor:pointer; margin-top:10px;">
                    Listeden Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

// --- 8. MODAL VE TOAST BİLDİRİMLERİ ---
window.openModal = (id) => { if(document.getElementById(id)) document.getElementById(id).style.display = "block"; };
window.closeModal = (id) => { if(document.getElementById(id)) document.getElementById(id).style.display = "none"; };

function gosterToast(mesaj) {
    // index.html veya pages altındaki sayfalar için ID kontrolü
    let toast = document.getElementById('toast-message') || document.getElementById('toast-favourite');
    
    if (!toast) {
        // Eğer sayfada toast yoksa dinamik oluştur
        toast = document.createElement('div');
        toast.id = 'toast-favourite';
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#00592D; color:white; padding:15px 25px; border-radius:8px; z-index:99999; font-weight:bold;";
        document.body.appendChild(toast);
    }

    toast.innerText = mesaj;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 500);
    }, 4000);
}
