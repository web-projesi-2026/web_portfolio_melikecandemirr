/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- KOYU TEMA SİSTEMİ ---
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

    // --- VERİ ÇEKME VE KATEGORİLERİ LİSTELEME ---
    // Sadece ana sayfadaysak (koleksiyon-konteynir varsa) çalıştır
    if (document.getElementById('koleksiyon-konteynir')) {
        kategorileriGetir();
    }
    
    // Kalp durumunu kontrol et
    favoriIkonlariniGuncelle();
});

// Kategori Getirme (Yol Hatası Giderildi)
async function kategorileriGetir() {
    try {
        const yanit = await fetch('data.json');
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');
        if (konteynir && veriler.kategoriler) {
            konteynir.innerHTML = ""; 
            veriler.kategoriler.forEach(kategori => {
                konteynir.innerHTML += `
                    <div class="card" onclick="location.href='${kategori.link}'" style="cursor: pointer;">
                        <div class="card-image"><img src="${kategori.resim}"></div>
                        <div class="card-body">
                            <h3>${kategori.baslik}</h3>
                            <p>${kategori.aciklama}</p>
                            <div class="card-footer"><span>Yıl: ${kategori.yil}</span></div>
                        </div>
                    </div>`;
            });
        }
    } catch (e) { console.error("Veri yüklenemedi:", e); }
}

// Favori Kontrolü (Hata Giderilmiş)
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);
    const toast = document.getElementById('toast-favourite'); // Doğru ID kullanıldı

    if (index === -1) {
        favoriler.push({ id, baslik });
        if (toast) {
            toast.innerText = `${baslik} eklendi! ❤️`;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 4000);
        }
    } else {
        favoriler.splice(index, 1);
        if (toast) {
            toast.innerText = `${baslik} çıkarıldı. 😊`;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 4000);
        }
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    favoriIkonlariniGuncelle();
};

window.favoriIkonlariniGuncelle = function() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const kalpIkoni = document.getElementById('fav-icon-robot-09');
    if (kalpIkoni) {
        const isFavorited = favoriler.some(fav => fav.id === 'robot-09');
        kalpIkoni.innerText = isFavorited ? "♥" : "♡";
    }
};

// Favoriler Sayfasındaki Kartları Oluşturan Fonksiyon
window.favorileriGoster = function() {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return; // Eğer favoriler sayfasında değilsek kodu durdur

    // LocalStorage'dan verileri çekiyoruz
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                <p style="font-size: 1.2rem; color: #666;">Henüz favori listeniz boş. 😊</p>
                <a href="../index.html" class="btn" style="display:inline-block; margin-top:20px; background:var(--dark-green); color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Keşfetmeye Başla</a>
            </div>`;
        return;
    }

    konteynir.innerHTML = ""; // İçini temizle
    favoriler.forEach(item => {
        // Her favori için bir kart oluşturuyoruz
        konteynir.innerHTML += `
            <div class="card" style="border-left: 5px solid #e74c3c; padding: 20px; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px;">
                <div class="card-body">
                    <h3 style="margin-top: 0;">${item.baslik}</h3>
                    <p style="color: #666; font-size: 0.9rem;">Bu teknoloji favorilerinize eklendi.</p>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}'); location.reload();" 
                                style="background:#ff7675; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:5px; font-weight:bold;">
                            Kaldır 🗑️
                        </button>
                    </div>
                </div>
            </div>`;
    });
};
