/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Veri Okuma (JSON) ve Kullanıcı Etkileşimi (LocalStorage)
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mevcut Menü ve Dark Mode kodların burada kalmaya devam etsin...
    
    // --- 4. DİNAMİK VERİ ÇEKME VE ETKİLEŞİMLİ KARTLAR ---
    verileriGetir();
});

async function verileriGetir() {
    try {
        const yanit = await fetch('data.json');
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');

        if (konteynir) {
            konteynir.innerHTML = ""; 
            veriler.forEach(teknoloji => {
                const kartHtml = `
                    <div class="card" style="cursor: pointer;" onclick="favoriKontrol(${teknoloji.id}, '${teknoloji.baslik}')">
                        <div class="card-image">
                            <img src="${teknoloji.resim}" alt="${teknoloji.baslik}" class="gallery-img">
                        </div>
                        <div class="card-body">
                            <h3>${teknoloji.baslik}</h3>
                            <p>${teknoloji.aciklama}</p>
                            <div class="card-footer">
                                <span><strong>Yıl:</strong> ${teknoloji.yil}</span>
                                <span id="fav-icon-${teknoloji.id}" class="fav-star">☆</span>
                            </div>
                        </div>
                    </div>
                `;
                konteynir.innerHTML += kartHtml;
            });
            // Sayfa açıldığında daha önce favoriye eklenenleri işaretle
            favoriIkonlariniGuncelle();
        }
    } catch (hata) {
        console.error("Kartlar oluşturulurken hata:", hata);
    }
}

// Favori işlemini yöneten ana fonksiyon (LocalStorage kullanımı)
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);

    if (index === -1) {
        // Favorilerde yoksa EKLE
        favoriler.push({ id, baslik });
        localStorage.setItem('techFavs', JSON.stringify(favoriler));
        alert(`${baslik} favorilerinize eklendi! ✨`);
    } else {
        // Favorilerde varsa ÇIKAR (Tıklayınca vazgeçme özelliği)
        favoriler.splice(index, 1);
        localStorage.setItem('techFavs', JSON.stringify(favoriler));
        alert(`${baslik} favorilerinizden çıkarıldı. 😊`);
    }
    favoriIkonlariniGuncelle();
};

// Favori yıldızlarını LocalStorage'a göre güncelleyen fonksiyon
function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const tumYildizlar = document.querySelectorAll('.fav-star');
    
    // Önce hepsini boşalt
    tumYildizlar.forEach(yildiz => yildiz.innerText = "☆");
    
    // Favori olanları dolu yıldız yap
    favoriler.forEach(fav => {
        const yildiz = document.getElementById(`fav-icon-${fav.id}`);
        if (yildiz) yildiz.innerText = "⭐";
    });
}
// --- MODAL YÖNETİMİ ---
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
};

// Toast bildirim sistemi için
function showToast(mesaj) {
    alert(mesaj); // Şimdilik alert, istersen toast CSS'ine bağlayabiliriz
}
