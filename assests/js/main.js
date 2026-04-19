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
