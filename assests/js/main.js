/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Etkileşim Kontrolleri (Menu, Dark Mode, Lightbox)
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
            
            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeBtn.innerText = "☀️ Açık Tema";
            } else {
                themeBtn.innerText = "🌙 Koyu Tema";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // --- 3. RESİM GALERİSİ (LIGHTBOX) ---
    // GÜNCELLEME: Sadece 'gallery-img' sınıfına sahip <img> etiketlerini hedef alır.
    // project.html içinde bu sınıfı sildiğin için büyüteç orada çalışmayacaktır.
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
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(style);


// JSON verisini çekme fonksiyonu
async function verileriGetir() {
    try {
        const yanit = await fetch('data.json'); // Dosyayı çağırıyoruz
        const veriler = await yanit.json();    // Gelen veriyi JSON formatına çeviriyoruz
        console.log("Gelen Veriler:", veriler); // Kontrol için konsola yazdırıyoruz
    } catch (hata) {
        console.error("Veri çekilirken bir hata oluştu:", hata);
    }
}

// Sayfa yüklendiğinde fonksiyonu çalıştır
verileriGetir();
