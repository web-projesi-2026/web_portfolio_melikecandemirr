/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Gelişmiş Favori Sistemi, Dinamik Kart Yükleme, Dark Mode ve Navigasyon
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOBİL MENÜ KONTROLÜ ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- 2. DARK MODE (HAFIZALI SİSTEM) ---
    const themeBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerText = "☀️ Açık Tema";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
            themeBtn.innerText = theme === "dark" ? "☀️ Açık Tema" : "🌙 Koyu Tema";
            localStorage.setItem("theme", theme);
        });
    }

    // --- 3. DİNAMİK VERİ YÜKLEME (Ana Sayfa Kartları) ---
    if (document.getElementById('koleksiyon-konteynir')) {
        kategorileriGetir();
    }

    // --- 4. FAVORİ SİSTEMİ BAŞLATICI ---
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }

    // Her sayfa açıldığında kalplerin durumunu kontrol et
    favoriIkonlariniGuncelle();
});

// --- 5. JSON'DAN KATEGORİLERİ GETİRME ---
async function kategorileriGetir() {
    try {
        const yanit = await fetch('data.json'); 
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');
        
        if (konteynir && veriler.kategoriler) {
            konteynir.innerHTML = veriler.kategoriler.map(kategori => `
                <div class="card" onclick="location.href='${kategori.link}'" style="cursor: pointer;">
                    <div class="card-image">
                        <img src="${kategori.resim}" alt="${kategori.baslik}" style="width:100%; height:200px; object-fit:cover; border-radius:15px 15px 0 0;">
                    </div>
                    <div class="card-body" style="padding: 20px;">
                        <h3 style="color: var(--dark-green); margin-bottom: 10px;">${kategori.baslik}</h3>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.6;">${kategori.aciklama}</p>
                        <div class="card-footer" style="margin-top: 15px; font-weight: bold; color: var(--gold);">
                            <span>📅 Yıl: ${kategori.yil}</span>
                        </div>
                    </div>
                </div>`).join('');
        }
    } catch (e) { 
        console.error("Veri yüklenemedi, data.json dosyasını kontrol edin:", e); 
    }
}

// --- 6. FAVORİ SİSTEMİ ÇEKİRDEK FONKSİYONLARI ---
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);

    if (index === -1) {
        favoriler.push({ id, baslik });
        gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        favoriler.splice(index, 1);
        gosterToast(`${baslik} favorilerden çıkarıldı. 🗑️`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    favoriIkonlariniGuncelle();
    
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
};

function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const tumKalpler = document.querySelectorAll('span[id^="fav-icon-robot-"]');
    
    tumKalpler.forEach(kalp => {
        const robotId = kalp.id.replace('fav-icon-', '');
        const favorideMi = favoriler.some(fav => fav.id === robotId);
        kalp.innerText = favorideMi ? "♥" : "♡";
        kalp.style.color = "#e74c3c";
    });
}

window.favorileriGoster = function() {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return;

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                <p style="font-size: 1.2rem; color: #666;">Henüz favori listeniz boş. 😊</p>
                <a href="project.html" class="btn" style="display:inline-block; margin-top:20px; background:#00592D; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Keşfetmeye Başla 🤖</a>
            </div>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 5px solid #e74c3c; padding: 20px; background: var(--bg-card); border-radius: 10px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <div class="card-body">
                <h3 style="color: var(--dark-green); margin-bottom: 10px;">${item.baslik}</h3>
                <p style="color: #666; font-size: 0.9rem;">Bu robot interaktif müzenizde favori olarak işaretlendi.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:10px 15px; cursor:pointer; border-radius:5px; margin-top:15px; font-weight: bold;">
                    Listeden Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

// --- 7. MODAL VE FORM KONTROLLERİ ---
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
};

// Form gönderim simülasyonu
['contact-form', 'visitor-form', 'suggest-form'].forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const modal = form.closest('.modal');
            if (modal) closeModal(modal.id);
            gosterToast("Talebiniz başarıyla iletildi! ✨");
            form.reset();
        });
    }
});

// --- 8. TOAST MESAJI (4 Saniye) ---
function gosterToast(mesaj) {
    let toast = document.getElementById('toast-message') || document.getElementById('toast-favourite');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-favourite';
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#00592D; color:white; padding:15px 25px; border-radius:8px; z-index:99999;";
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
