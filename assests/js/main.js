/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Etkileşim Kontrolleri (Menu, Dark Mode, Modal, Lightbox)
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

    // --- 3. MODAL SİSTEMİ (📞, 📖, 💡 İçin Kesin Çözüm) ---
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // --- FORM MESAJI GÜNCELLEMESİ ---
    const forms = ['contact-form', 'visitor-form', 'suggest-form'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // İstediğin yeni ve samimi mesaj buraya eklendi:
                alert("Yanıtınız geliştiricimize iletilmek üzere kaydedilmiştir, teşekkür ederiz! ✨😊🚀");
                form.reset();
                const modalId = form.closest('.modal').id;
                closeModal(modalId);
            });
        }
    });

    // --- 4. RESİM GALERİSİ (LIGHTBOX) ---
    const galleryImages = document.querySelectorAll('img.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); display: flex; align-items: center;
                justify-content: center; z-index: 9999; cursor: zoom-out;
            `;
            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.style.cssText = "max-width: 90%; max-height: 90%; border-radius: 10px;";
            modal.appendChild(fullImg);
            document.body.appendChild(modal);
            modal.onclick = () => modal.remove();
        });
    });
});
