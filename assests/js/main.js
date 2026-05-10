/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Gelişmiş Favori Sistemi, Dark Mode ve Navigasyon
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

    // --- 3. FAVORİ SİSTEMİ BAŞLATICI ---
    // Eğer favoriler sayfasındaysak listeyi göster
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }

    // Her sayfa açıldığında kalplerin durumunu kontrol et
    favoriIkonlariniGuncelle();
});

// --- 4. FAVORİ SİSTEMİ ÇEKİRDEK FONKSİYONLARI ---

window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);

    if (index === -1) {
        // Favorilere Ekle
        favoriler.push({ id, baslik });
        gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        // Favorilerden Çıkar
        favoriler.splice(index, 1);
        gosterToast(`${baslik} favorilerden çıkarıldı. 🗑️`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    
    // Değişiklikleri anlık olarak sayfa üzerinde yansıt
    favoriIkonlariniGuncelle();
    
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
};

// Sayfadaki tüm kalpleri (robot-01'den robot-20'ye kadar) tarayan fonksiyon
function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    // Sayfadaki "fav-icon-robot-" ile başlayan tüm span'ları seç
    const tumKalpler = document.querySelectorAll('span[id^="fav-icon-robot-"]');
    
    tumKalpler.forEach(kalp => {
        const robotId = kalp.id.replace('fav-icon-', ''); // Örn: robot-03
        const favorideMi = favoriler.some(fav => fav.id === robotId);
        
        if (favorideMi) {
            kalp.innerText = "♥"; // Dolu Kalp
            kalp.style.color = "#e74c3c";
        } else {
            kalp.innerText = "♡"; // Boş Kalp
            kalp.style.color = "#e74c3c";
        }
    });
}

// Favoriler Sayfasında Listeleme
window.favorileriGoster = function() {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return;

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                <p style="font-size: 1.2rem; color: #666;">Henüz favori listeniz boş. 😊</p>
                <a href="project.html" class="btn" style="display:inline-block; margin-top:20px; background:#00592D; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Robotları İncele 🤖</a>
            </div>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 5px solid #e74c3c; padding: 20px; background: var(--bg-card); border-radius: 10px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <div class="card-body">
                <h3 style="color: var(--dark-green); margin-bottom: 10px;">${item.baslik}</h3>
                <p style="color: #666; font-size: 0.9rem;">Bu robot interaktif müzenizde favori olarak işaretlendi.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:10px 15px; cursor:pointer; border-radius:5px; margin-top:15px; font-weight: bold; transition: 0.3s;">
                    Listeden Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

// Dinamik Toast Mesajı (4 Saniye)
function gosterToast(mesaj) {
    let toast = document.getElementById('toast-favourite');
    
    // Eğer toast div'i yoksa oluştur (güvenlik önlemi)
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-favourite';
        document.body.appendChild(toast);
    }

    toast.innerText = mesaj;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    // 4 Saniye sonra gizle
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 500);
    }, 4000);
}
