/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Etkileşim Kontrolleri, Dinamik Veri, Veri Saklama ve Oturum Yönetimi
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 🌤️ HARİCİ HAVA DURUMU API TETİKLEYİCİSİ ---
    if (document.getElementById('weather-section')) {
        havaDurumuGetir();
    }

    // --- 🔐 MODAL GİRİŞ / KAYIT VE OTURUM MOTORU ---
    oturumDurumunuKontrolEt();
    modalEtkilesimleriniKur();

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
            themeBtn.innerText = theme === "dark" ? "☀️ Açık Tema" : "🌙 Koyu Tema";
            localStorage.setItem("theme", theme);
        });
    }

    // --- 3. DİNAMİK VERİ VE FAVORİ SİSTEMİ ---
    if (document.getElementById('koleksiyon-konteynir')) {
        kategorileriGetir();
    }

    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }

    favoriIkonlariniGuncelle();
});

// ==========================================
// 🔐 MODAL PENCERE VE AUTH KONTROL FONKSİYONLARI
// ==========================================

function modalEtkilesimleriniKur() {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const profileModal = document.getElementById('profile-modal');

    const triggerLogin = document.getElementById('trigger-login-modal');
    const triggerRegister = document.getElementById('trigger-register-modal');
    const triggerProfile = document.getElementById('trigger-profile-modal');

    const closeLogin = document.getElementById('close-login');
    const closeRegister = document.getElementById('close-register');
    const closeProfile = document.getElementById('close-profile');

    const btnSubmitLogin = document.getElementById('btn-submit-login');
    const btnSubmitRegister = document.getElementById('btn-submit-register');
    const btnSubmitProfile = document.getElementById('btn-submit-profile');
    const btnLogout = document.getElementById('btn-logout');
    const profilePhotoInput = document.getElementById('profile-photo-input');

    // Açma Tetikleyicileri
    if (triggerLogin) triggerLogin.addEventListener('click', () => { loginModal.style.display = 'block'; });
    if (triggerRegister) triggerRegister.addEventListener('click', () => { registerModal.style.display = 'block'; });
    if (triggerProfile) triggerProfile.addEventListener('click', profilPaneliniAc);

    // Kapatma Tetikleyicileri
    if (closeLogin) closeLogin.addEventListener('click', () => { loginModal.style.display = 'none'; });
    if (closeRegister) closeRegister.addEventListener('click', () => { registerModal.style.display = 'none'; });
    if (closeProfile) closeProfile.addEventListener('click', () => { profileModal.style.display = 'none'; });

    // Dışarı tıklayınca kapatma
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
        if (e.target === profileModal) profileModal.style.display = 'none';
    });

    // Profil Fotoğrafı Önizleme Motoru
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewImg = document.getElementById('profile-modal-preview');
                    if (previewImg) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form Gönderimleri
    if (btnSubmitRegister) btnSubmitRegister.addEventListener('click', müzeKayıtOl);
    if (btnSubmitLogin) btnSubmitLogin.addEventListener('click', müzeGirisYap);
    if (btnSubmitProfile) btnSubmitProfile.addEventListener('click', profilBilgileriniGuncelle);
    if (btnLogout) btnLogout.addEventListener('click', müzeCıkısYap);
}

function müzeKayıtOl() {
    const fullname = document.getElementById('reg-fullname').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    if (!fullname || !email || !username || !password) {
        müzeToastAtesle("Lütfen tüm alanları doldurun! ⚠️");
        return;
    }

    let üyeler = JSON.parse(localStorage.getItem('muzeUyeler')) || [];
    
    if (üyeler.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        müzeToastAtesle("Bu kullanıcı adı zaten alınmış! 🛑");
        return;
    }

    üyeler.push({ 
        fullname: fullname, 
        email: email, 
        username: username, 
        password: password,
        avatar: "", 
        role: username.toLowerCase() === 'admin' ? 'Yönetici' : 'Kullanıcı' 
    });

    localStorage.setItem('muzeUyeler', JSON.stringify(üyeler));
    document.getElementById('register-modal').style.display = 'none';
    müzeToastAtesle("Kayıt başarıyla tamamlandı! Giriş yapabilirsiniz. 🎉");
    
    document.getElementById('reg-fullname').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
}

function müzeGirisYap() {
    const userInp = document.getElementById('login-username').value.trim();
    const passInp = document.getElementById('login-password').value.trim();

    if (!userInp || !passInp) {
        müzeToastAtesle("Lütfen kullanıcı adı ve şifrenizi girin! ⚠️");
        return;
    }

    let üyeler = JSON.parse(localStorage.getItem('muzeUyeler')) || [];
    let bulunanUser = üyeler.find(u => u.username.toLowerCase() === userInp.toLowerCase() && u.password === passInp);

    if (userInp.toLowerCase() === 'admin' && passInp === 'admin') {
        bulunanUser = { username: 'admin', fullname: 'Sistem Yöneticisi', email: 'admin@muze.com', avatar: "", role: 'Yönetici' };
    }

    if (bulunanUser) {
        localStorage.setItem('muzeAktifKullanıcı', JSON.stringify(bulunanUser));
        document.getElementById('login-modal').style.display = 'none';
        oturumDurumunuKontrolEt();
        
        // Eğer bu kullanıcının özel hava durumu ayarı varsa yansıt
        if (bulunanUser.customTemp && bulunanUser.customDesc) {
            ezHavaDurumuArayuzu(bulunanUser.customTemp, bulunanUser.customDesc);
        } else {
            havaDurumuGetir();
        }

        müzeToastAtesle(`Başarıyla giriş yapıldı. Hoş geldin ${bulunanUser.username}! 🔑`);
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    } else {
        müzeToastAtesle("Hatalı kullanıcı adı veya şifre! ❌");
    }
}

function profilPaneliniAc() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    if (!aktifUser) return;

    document.getElementById('profile-fullname').value = aktifUser.fullname || "";
    document.getElementById('profile-email').value = aktifUser.email || "";
    document.getElementById('profile-weather-temp').value = aktifUser.customTemp || "";
    document.getElementById('profile-weather-desc').value = aktifUser.customDesc || "";

    const previewImg = document.getElementById('profile-modal-preview');
    if (aktifUser.avatar) {
        previewImg.src = aktifUser.avatar;
        previewImg.style.display = 'block';
    } else {
        previewImg.style.display = 'none';
    }

    document.getElementById('profile-modal').style.display = 'block';
}

function profilBilgileriniGuncelle() {
    let aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    let üyeler = JSON.parse(localStorage.getItem('muzeUyeler')) || [];
    
    if (!aktifUser) return;

    const newFullname = document.getElementById('profile-fullname').value.trim();
    const newEmail = document.getElementById('profile-email').value.trim();
    const newTemp = document.getElementById('profile-weather-temp').value.trim();
    const newDesc = document.getElementById('profile-weather-desc').value.trim();
    const previewImg = document.getElementById('profile-modal-preview');

    if (!newFullname || !newEmail) {
        müzeToastAtesle("Ad Soyad ve E-posta alanları boş bırakılamaz! ⚠️");
        return;
    }

    // Bilgileri Güncelle
    aktifUser.fullname = newFullname;
    aktifUser.email = newEmail;
    
    if (previewImg && previewImg.src.startsWith('data:image')) {
        aktifUser.avatar = previewImg.src;
    }

    if (newTemp && newDesc) {
        aktifUser.customTemp = newTemp;
        aktifUser.customDesc = newDesc;
        ezHavaDurumuArayuzu(newTemp, newDesc);
    }

    // Ana veritabanındaki (üyeler dizisindeki) kaydı da güncelle
    let uIndex = üyeler.findIndex(u => u.username.toLowerCase() === aktifUser.username.toLowerCase());
    if (uIndex !== -1) {
        üyeler[uIndex] = aktifUser;
        localStorage.setItem('muzeUyeler', JSON.stringify(üyeler));
    }

    localStorage.setItem('muzeAktifKullanıcı', JSON.stringify(aktifUser));
    oturumDurumunuKontrolEt();
    
    document.getElementById('profile-modal').style.display = 'none';
    müzeToastAtesle("Profil bilgileriniz ve iklim tercihiniz başarıyla güncellendi! ⚙️🎉");
}

function ezHavaDurumuArayuzu(temp, desc) {
    const tElem = document.getElementById('weather-temp');
    const dElem = document.getElementById('weather-desc');
    if (tElem) tElem.innerText = `${temp}°C`;
    if (dElem) dElem.innerText = `Atmosfer: ${desc.toUpperCase()} (Kullanıcı Özelleştirmesi Veritabanı)`;
}

function müzeCıkısYap() {
    localStorage.removeItem('muzeAktifKullanıcı');
    oturumDurumunuKontrolEt();
    havaDurumuGetir(); // Orijinal hava durumuna geri dön
    müzeToastAtesle("Güvenli çıkış yapıldı. Tekrar bekleriz! 🚪");
}

function oturumDurumunuKontrolEt() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    const loggedOutDiv = document.getElementById('nav-auth-logged-out');
    const loggedInDiv = document.getElementById('nav-auth-logged-in');
    const welcomeText = document.getElementById('nav-welcome-text');
    const navAvatar = document.getElementById('nav-user-avatar');
    const navAvatarPlaceholder = document.getElementById('nav-user-avatar-placeholder');

    if (aktifUser) {
        if (loggedOutDiv) loggedOutDiv.style.display = 'none';
        if (loggedInDiv) loggedInDiv.style.display = 'flex';
        if (welcomeText) welcomeText.innerText = aktifUser.username;
        
        if (aktifUser.avatar) {
            if (navAvatar) { navAvatar.src = aktifUser.avatar; navAvatar.style.display = 'block'; }
            if (navAvatarPlaceholder) navAvatarPlaceholder.style.display = 'none';
        } else {
            if (navAvatar) navAvatar.style.display = 'none';
            if (navAvatarPlaceholder) navAvatarPlaceholder.style.display = 'block';
        }

        if (aktifUser.customTemp && aktifUser.customDesc) {
            ezHavaDurumuArayuzu(aktifUser.customTemp, aktifUser.customDesc);
        }
    } else {
        if (loggedOutDiv) loggedOutDiv.style.display = 'flex';
        if (loggedInDiv) loggedInDiv.style.display = 'none';
    }
}

function müzeToastAtesle(mesaj) {
    const toastKutusu = document.getElementById('custom-toast');
    if (toastKutusu) {
        toastKutusu.innerText = mesaj;
        toastKutusu.style.display = 'block';
        setTimeout(() => { toastKutusu.style.display = 'none'; }, 4500);
    }
}

// ==========================================
// 🌤️ HAVA DURUMU API MOTORU (ORİJİNAL)
// ==========================================
async function havaDurumuGetir() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    if (aktifUser && aktifUser.customTemp && aktifUser.customDesc) {
        ezHavaDurumuArayuzu(aktifUser.customTemp, aktifUser.customDesc);
        return;
    }
    try {
        const apiKey = "b1b15e88fa797225412429c1c50c122a1";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Afsin,TR&units=metric&lang=tr&appid=${apiKey}`);
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('weather-temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').innerText = `Atmosfer: ${data.weather[0].description.toUpperCase()} | Nem: %${data.main.humidity}`;
        } else { yedekHavaDurumu(); }
    } catch (e) { yedekHavaDurumu(); }
}

function shadowWeather() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    if (aktifUser && aktifUser.customTemp && aktifUser.customDesc) return;
    if(document.getElementById('weather-temp')) {
        document.getElementById('weather-temp').innerText = "18°C";
        document.getElementById('weather-desc').innerText = "MÜZE BÖLGESİ: HAVA KOŞULLARI OPTİMİZE EDİLDİ";
    }
}
window.yedekHavaDurumu = shadowWeather;

// ==========================================
// 📂 JSON VERİ VE FAVORİ SİSTEMİ (ORİJİNAL KORUNDU)
// ==========================================
async function kategorileriGetir() {
    try {
        const yanit = await fetch('data.json');
        const veriler = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');
        if (konteynir && veriler.kategoriler) {
            konteynir.innerHTML = veriler.kategoriler.map(kategori => `
                <div class="card" onclick="location.href='${kategori.link}'" style="cursor: pointer;">
                    <div class="card-image"><img src="${kategori.resim}"></div>
                    <div class="card-body">
                        <h3>${kategori.baslik}</h3>
                        <p>${kategori.aciklama}</p>
                        <div class="card-footer"><span>Yıl: ${kategori.yil}</span></div>
                    </div>
                </div>`).join('');
        }
    } catch (e) { console.error("Veri yüklenemedi:", e); }
}

window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);
    const toast = document.getElementById('toast-favourite');

    if (index === -1) {
        favoriler.push({ id, baslik });
        if (toast) gosterToast(`${baslik} eklendi! ❤️`);
    } else {
        favoriler.splice(index, 1);
        if (toast) gosterToast(`${baslik} çıkarıldı. 😊`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
    favoriIkonlariniGuncelle();
};

window.favorileriGoster = function() {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return;

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                <p style="font-size: 1.2rem; color: #666;">Favorilere herhangi bir şey eklemediniz. 😊</p>
                <a href="../index.html" class="btn" style="display:inline-block; margin-top:20px; background:var(--dark-green); color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Keşfetmeye Başla 🚀</a>
            </div>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 5px solid #e74c3c; padding: 20px; background: white; border-radius: 10px;">
            <div class="card-body">
                <h3>${item.baslik}</h3>
                <p style="color: #666;">Bu teknoloji favorilerinize eklendi.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:5px; margin-top:10px;">
                    Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

function favoriIkonlariniGuncelle() {
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const kalpIkoni = document.getElementById('fav-icon-robot-09');
    if (kalpIkoni) {
        kalpIkoni.innerText = favoriler.some(fav => fav.id === 'robot-09') ? "♥" : "♡";
    }
}

function gosterToast(mesaj) {
    const toast = document.getElementById('toast-favourite');
    if (toast) {
        toast.innerText = mesaj;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}
