/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Dinamik Kategori Yönlendirmesi ve Kalp İkonlu Favori Yönetimi
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

    // --- FORM GÖNDERİMİ ---
    const formIds = ['contact-form', 'visitor-form', 'suggest-form'];
    formIds.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const toast = document.getElementById('toast-message');
                if (toast) {
                    toast.style.display = 'block';
                    setTimeout(() => { toast.style.display = 'none'; }, 4000);
                }
                form.reset();
                const modal = form.closest('.modal');
                if (modal) {
                    setTimeout(() => { window.closeModal(modal.id); }, 500);
                }
            });
        }
    });

    // --- VERİ ÇEKME VE KATEGORİLERİ LİSTELEME ---
    kategorileriGetir();
    
    // Alt sayfalarda kalp ikonunu başlangıçta kontrol et
    favoriIkonlariniGuncelle();
});

// Modal Yönetimi
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Ana Sayfa Kategorileri
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
                        <div class="card-image"><img src="${kategori.resim}" alt="${kategori.baslik}"></div>
                        <div class="card-body">
                            <h3>${kategori.baslik}</h3>
                            <p>${kategori.aciklama}</p>
                            <div class="card-footer">
                                <span>Kategori Yılı: ${kategori.yil}</span>
                            </div>
                        </div>
                    </div>`;
            });
        }
    } catch (e) { console.error("Kategoriler yüklenirken hata:", e); }
}

// Kalp İkonlu Favori Kontrolü
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);
    
    if (index === -1) {
        favoriler.push({ id, baslik });
        alert(`${baslik} favorilerinize eklendi! ❤️`);
    } else {
        favoriler.splice(index, 1);
        alert(`${baslik} favorilerinizden çıkarıldı. 😊`);
    }
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    favoriIkonlariniGuncelle();
};

// Kalp İkonlarını Güncelleyen Fonksiyon
window.favoriIkonlariniGuncelle = function() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const kalpIkoni = document.getElementById('fav-icon-robot-09');
    
    if (kalpIkoni) {
        const isFavorited = favoriler.some(fav => fav.id === 'robot-09');
        kalpIkoni.innerText = isFavorited ? "♥" : "♡";
    }
};
