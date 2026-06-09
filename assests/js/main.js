/* Tech-Timeline Dinamik JavaScript Yönetim Altyapısı */
let tumTeknolojiler = [];

document.addEventListener('DOMContentLoaded', () => {
    // Giriş Durumu Kontrolü (Sayfa her yenilendiğinde üye menüsünü günceller)
    oturumKontrolEt();

    // Hamburger Menü
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => { navigation.classList.toggle('active'); });
    }

    // Karanlık Mod
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

    // Giriş Yapma Form Eventi
    const lForm = document.getElementById('loginForm');
    if(lForm) {
        lForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            localStorage.setItem('activeUser', email.split('@')[0]); // Kullanıcı adını çıkar
            window.gosterToast("Giriş başarılı! Müze panelleri aktif edildi. 🔐");
            setTimeout(() => { location.reload(); }, 1500);
        });
    }

    // Kayıt Olma Form Eventi
    const rForm = document.getElementById('registerForm');
    if(rForm) {
        rForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.gosterToast("Kayıt başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz. 🎉");
            this.reset();
        });
    }
});

// 4.5 Saniyelik Şık Toast Bildirim Motoru
window.gosterToast = function(mesaj) {
    const toast = document.getElementById('toast-favourite');
    if (!toast) return;
    toast.innerText = mesaj;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 50);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => { toast.style.display = 'none'; }, 400);
    }, 4500);
};

function oturumKontrolEt() {
    const user = localStorage.getItem('activeUser');
    const authBox = document.getElementById('auth-container');
    const welcomeBox = document.getElementById('welcome-container');
    
    if(user) {
        if(authBox) authBox.style.display = 'none';
        if(welcomeBox) {
            welcomeBox.style.display = 'block';
            document.getElementById('user-display-name').innerText = user.toUpperCase();
        }
        // Menüleri Aç
        if(document.getElementById('nav-fav')) document.getElementById('nav-fav').style.display = 'block';
        if(document.getElementById('nav-crud')) document.getElementById('nav-crud').style.display = 'block';
        if(document.getElementById('nav-logout')) document.getElementById('nav-logout').style.display = 'block';
    }
}

window.kullaniciCikis = function() {
    localStorage.removeItem('activeUser');
    window.gosterToast("Oturum güvenle kapatıldı. Yine bekleriz! 🚪");
    setTimeout(() => { location.href = 'index.html'; }, 1500);
};
