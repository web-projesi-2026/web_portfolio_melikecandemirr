/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Mobil Menü Kontrolü
*/

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Hamburger İkonuna Tıklayınca Menüyü Aç/Kapat
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            
            // İsteğe bağlı: Menü açıkken sayfanın arkada kaymasını engeller
            if (navigation.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 2. Bir Linke Tıklanırsa Menüyü Otomatik Kapat
    // (Özellikle Zaman Tüneli gibi sayfa içi linklerde çok işe yarar)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

// Dark Mode Etkileşimi
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        // Butonun içindeki emojiyi ve metni değiştir
        if (document.body.classList.contains("dark-mode")) {
            themeBtn.innerText = "☀️ Açık Tema";
        } else {
            themeBtn.innerText = "🌙 Koyu Tema";
        }
    });
}

// RESİM GALERİSİ (LIGHTBOX) ETKİLEŞİMİ ---
// Sayfadaki tüm galeri resimlerini seçiyoruz
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', (e) => {
        // Resme tıklandığında linkin (sayfa değişimi) çalışmasını engellemek istersen:
        e.preventDefault(); 
        
        // Siyah arka plan (modal) oluşturma
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); display: flex; align-items: center;
            justify-content: center; z-index: 9999; cursor: zoom-out;
        `;
        
        // Büyütülecek resim oluşturma
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.style.maxWidth = '90%';
        fullImg.style.maxHeight = '90%';
        fullImg.style.borderRadius = '10px';
        fullImg.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
        
        // Resmi siyah arka plana, arka planı da sayfaya ekliyoruz
        modal.appendChild(fullImg);
        document.body.appendChild(modal);
        
        // Herhangi bir yere tıklandığında galeriyi kapat
        modal.onclick = () => modal.remove();
    });
});
