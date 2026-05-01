/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Menu, Dark Mode, Lightbox ve Dinamik Veri Yönetimi
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
            themeBtn.innerText = (theme === "dark") ? "☀️ Açık Tema" : "🌙 Koyu Tema";
            localStorage.setItem("theme", theme);
        });
    }

    // --- 3. RESİM GALERİSİ (LIGHTBOX) ---
    const galleryImages = document.querySelectorAll('img.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); 
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); display: flex; align-items: center;
                justify-content: center; z-index: 9999; cursor: zoom-out;
                animation: fadeIn 0.3s ease;
            `;
            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.style.cssText = `
                max-width: 90%; max-height: 90%; border-radius: 10px;
                box-shadow: 0 0 30px rgba(0,0,0,0.5); transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
            modal.appendChild(fullImg);
            document.body.appendChild(modal);
            setTimeout(() => { fullImg.style.transform = 'scale(1)'; }, 10);
            modal.onclick = () => {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            };
        });
    });

    // --- 4. DİNAMİK VERİ ÇEKME VE KARTLARI OLUŞTURMA ---
    verileriGetir();
});

// JSON verisini çekme ve ekrana basma fonksiyonu
async function verileriGetir() {
    try {
        const yanit = await fetch('data.json');
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');

        if (konteynir) {
            konteynir.innerHTML = ""; // İçini temizle
            veriler.forEach(teknoloji => {
                const kartHtml = `
                    <div class="card">
                        <div class="card-image">
                            <img src="${teknoloji.resim}" alt="${teknoloji.baslik}">
                        </div>
                        <h3>${teknoloji.baslik}</h3>
                        <p>${teknoloji.aciklama}</p>
                        <p><strong>Yıl:</strong> ${teknoloji.yil}</p>
                        <button class="btn btn-primary" style="margin-top:10px; width:100%;" onclick="favoriyeEkle(${teknoloji.id}, '${teknoloji.baslik}')">⭐ Favorilere Ekle</button>
                    </div>
                `;
                konteynir.innerHTML += kartHtml;
            });
        }
    } catch (hata) {
        console.error("Veriler ekrana basılırken hata oluştu:", hata);
    }
}

// Favorilere ekleme fonksiyonu (localStorage altyapısı)
window.favoriyeEkle = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('favoriTeknolojiler')) || [];
    
    // Eğer ürün zaten favorilerde yoksa ekle
    if (!favoriler.find(item => item.id === id)) {
        favoriler.push({ id, baslik });
        localStorage.setItem('favoriTeknolojiler', JSON.stringify(favoriler));
        alert(`${baslik} favorilerinize eklendi! ✨`);
    } else {
        alert("Bu teknoloji zaten favorilerinizde mevcut. 😊");
    }
};

// CSS Animasyon Eki
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
document.head.appendChild(style);
