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
