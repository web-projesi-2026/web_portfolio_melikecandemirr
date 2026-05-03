/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Veri Okuma (JSON) ve Kullanıcı Etkileşimi (LocalStorage)
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- KOYU TEMA SİSTEMİ ---
    const themeBtn = document.getElementById("theme-toggle");
    
    // Hafızadaki temayı kontrol et
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

    // --- FORM GÖNDERİMİ VE 4 SANİYELİK MESAJ SİSTEMİ ---
    const formIds = ['contact-form', 'visitor-form', 'suggest-form'];
    
    formIds.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Sayfanın yenilenmesini engelle

                // Başarı mesajını (Toast) göster
                const toast = document.getElementById('toast-message');
                if (toast) {
                    toast.style.display = 'block';
                    
                    // 4 saniye sonra mesajı gizle
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 4000);
                }

                // Formu temizle
                form.reset();

                // Modalı kapat (Hangi formun içindeyse o modalı bulur ve kapatır)
                const modal = form.closest('.modal');
                if (modal) {
                    setTimeout(() => {
                        window.closeModal(modal.id);
                    }, 500); // Kullanıcı mesajı görmeye başlasın diye yarım saniye bekletip kapatır
                }
            });
        }
    });

    // --- VERİ ÇEKME ---
    verileriGetir();
});

// Modal Açma Kapama (Dışarıdan erişim için window'a bağladık)
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

// JSON Çekme ve Favori Fonksiyonları
async function verileriGetir() {
    try {
        const yanit = await fetch('data.json');
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');
        if (konteynir) {
            konteynir.innerHTML = ""; 
            veriler.forEach(teknoloji => {
                konteynir.innerHTML += `
                    <div class="card" onclick="favoriKontrol(${teknoloji.id}, '${teknoloji.baslik}')">
                        <div class="card-image"><img src="${teknoloji.resim}"></div>
                        <div class="card-body">
                            <h3>${teknoloji.baslik}</h3>
                            <p>${teknoloji.aciklama}</p>
                            <div class="card-footer">
                                <span>Yıl: ${teknoloji.yil}</span>
                                <span id="fav-icon-${teknoloji.id}" class="fav-star">☆</span>
                            </div>
                        </div>
                    </div>`;
            });
            favoriIkonlariniGuncelle();
        }
    } catch (e) { console.error(e); }
}

window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);
    if (index === -1) {
        favoriler.push({ id, baslik });
        alert(`${baslik} eklendi! ✨`);
    } else {
        favoriler.splice(index, 1);
        alert(`${baslik} çıkarıldı. 😊`);
    }
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    favoriIkonlariniGuncelle();
};

function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    document.querySelectorAll('.fav-star').forEach(s => s.innerText = "☆");
    favoriler.forEach(f => {
        const el = document.getElementById(`fav-icon-${f.id}`);
        if (el) el.innerText = "⭐";
    });
}
