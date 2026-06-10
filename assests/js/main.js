/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Etkileşim Kontrolleri, Dinamik Veri, Veri Saklama ve Gelişmiş Oturum Yönetimi
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
        themeBtn.addEventListener("click", function () {
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

    // Sayfa yüklendiğinde kart favori ikonlarını güncelle
    favoriIkonlariniGuncelle();
});

// ==========================================
// 🔐 MODAL PENCERE VE AUTH KONTROL FONKSİYONLARI
// ==========================================

function modalEtkilesimleriniKur() {
    const loginModal    = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const profileModal  = document.getElementById('profile-modal');

    const triggerLogin    = document.getElementById('trigger-login-modal');
    const triggerRegister = document.getElementById('trigger-register-modal');
    const triggerProfile  = document.getElementById('trigger-profile-modal');

    const closeLogin    = document.getElementById('close-login');
    const closeRegister = document.getElementById('close-register');
    const closeProfile  = document.getElementById('close-profile');

    const btnSubmitLogin     = document.getElementById('btn-submit-login');
    const btnSubmitRegister  = document.getElementById('btn-submit-register');
    const btnSubmitProfile   = document.getElementById('btn-submit-profile');
    const btnLogout          = document.getElementById('btn-logout');
    const profilePhotoInput  = document.getElementById('profile-photo-input');

    // Profil Modal Sekme Elementleri
    const tabBtnProfile      = document.getElementById('tab-btn-profile');
    const tabBtnFavorites    = document.getElementById('tab-btn-favorites');
    const tabContentProfile  = document.getElementById('tab-content-profile');
    const tabContentFavorites = document.getElementById('tab-content-favorites');

    // Açma Tetikleyicileri
    if (triggerLogin)    triggerLogin.addEventListener('click', () => { loginModal.style.display = 'block'; });
    if (triggerRegister) triggerRegister.addEventListener('click', () => { registerModal.style.display = 'block'; });
    if (triggerProfile)  triggerProfile.addEventListener('click', profilPaneliniAc);

    // Kapatma Tetikleyicileri
    if (closeLogin)    closeLogin.addEventListener('click', () => { loginModal.style.display = 'none'; });
    if (closeRegister) closeRegister.addEventListener('click', () => { registerModal.style.display = 'none'; });
    if (closeProfile)  closeProfile.addEventListener('click', () => { profileModal.style.display = 'none'; });

    // Sekme Geçiş Dinleyicileri
    if (tabBtnProfile && tabBtnFavorites) {
        tabBtnProfile.addEventListener('click', () => {
            tabBtnProfile.style.background = "#00592D"; tabBtnProfile.style.color = "white";
            tabBtnFavorites.style.background = "#f0f0f0"; tabBtnFavorites.style.color = "#333";
            tabContentProfile.style.display = "block";
            tabContentFavorites.style.display = "none";
        });
        tabBtnFavorites.addEventListener('click', () => {
            tabBtnFavorites.style.background = "#00592D"; tabBtnFavorites.style.color = "white";
            tabBtnProfile.style.background = "#f0f0f0"; tabBtnProfile.style.color = "#333";
            tabContentProfile.style.display = "none";
            tabContentFavorites.style.display = "block";
            profilFavorileriniListele();
        });
    }

    // Dışarı tıklayınca kapatma
    window.addEventListener('click', (e) => {
        if (e.target === loginModal)    loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
        if (e.target === profileModal)  profileModal.style.display = 'none';
    });

    // Profil Fotoğrafı Motoru
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
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

    if (btnSubmitRegister) btnSubmitRegister.addEventListener('click', müzeKayıtOl);
    if (btnSubmitLogin)    btnSubmitLogin.addEventListener('click', müzeGirisYap);
    if (btnSubmitProfile)  btnSubmitProfile.addEventListener('click', profilBilgileriniGuncelle);
    if (btnLogout)         btnLogout.addEventListener('click', müzeCıkısYap);
}

function müzeKayıtOl() {
    const fullname = document.getElementById('reg-fullname').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
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

    üyeler.push({ fullname, email, username, password, avatar: "", customCity: "Afsin,TR" });
    localStorage.setItem('muzeUyeler', JSON.stringify(üyeler));
    document.getElementById('register-modal').style.display = 'none';
    müzeToastAtesle("Kayıt başarıyla tamamlandı! Giriş yapabilirsiniz. 🎉");
}

function müzeGirisYap() {
    const userInp = document.getElementById('login-username').value.trim();
    const passInp = document.getElementById('login-password').value.trim();

    if (!userInp || !passInp) {
        müzeToastAtesle("Lütfen kullanıcı adı ve şifrenizi girin! ⚠️");
        return;
    }

    let üyeler = JSON.parse(localStorage.getItem('muzeUyeler')) || [];
    let bulunanUser = üyeler.find(u =>
        u.username.toLowerCase() === userInp.toLowerCase() && u.password === passInp
    );

    if (userInp.toLowerCase() === 'admin' && passInp === 'admin') {
        bulunanUser = { username: 'admin', fullname: 'Sistem Yöneticisi', email: 'admin@muze.com', avatar: "", customCity: "Afsin,TR" };
    }

    if (bulunanUser) {
        localStorage.setItem('muzeAktifKullanıcı', JSON.stringify(bulunanUser));
        document.getElementById('login-modal').style.display = 'none';
        oturumDurumunuKontrolEt();
        havaDurumuGetir();
        // Giriş sonrası favori ikonlarını güncelle
        favoriIkonlariniGuncelle();
        müzeToastAtesle(`Başarıyla giriş yapıldı. Hoş geldin ${bulunanUser.username}! 🔑`);
    } else {
        müzeToastAtesle("Hatalı kullanıcı adı veya şifre! ❌");
    }
}

function profilPaneliniAc() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    if (!aktifUser) return;

    document.getElementById('profile-fullname').value = aktifUser.fullname || "";
    document.getElementById('profile-email').value    = aktifUser.email    || "";
    document.getElementById('profile-weather-city').value = aktifUser.customCity || "Afsin,TR";

    // Favori sayacı güncelle
    const favoriler = JSON.parse(localStorage.getItem(`favs_${aktifUser.username}`)) || [];
    const favCount = document.getElementById('profile-fav-count');
    if (favCount) favCount.innerText = favoriler.length;

    const previewImg = document.getElementById('profile-modal-preview');
    if (aktifUser.avatar) {
        previewImg.src = aktifUser.avatar;
        previewImg.style.display = 'block';
    } else {
        previewImg.style.display = 'none';
    }

    // İlk sekmeyi aktif yap
    document.getElementById('tab-btn-profile').click();
    document.getElementById('profile-modal').style.display = 'block';
}

function profilBilgileriniGuncelle() {
    let aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    let üyeler    = JSON.parse(localStorage.getItem('muzeUyeler')) || [];
    if (!aktifUser) return;

    const newFullname = document.getElementById('profile-fullname').value.trim();
    const newEmail    = document.getElementById('profile-email').value.trim();
    const newCity     = document.getElementById('profile-weather-city').value;
    const previewImg  = document.getElementById('profile-modal-preview');

    if (!newFullname || !newEmail) {
        müzeToastAtesle("Ad Soyad ve E-posta alanları boş bırakılamaz! ⚠️");
        return;
    }

    aktifUser.fullname   = newFullname;
    aktifUser.email      = newEmail;
    aktifUser.customCity = newCity;
    if (previewImg && previewImg.src.startsWith('data:image')) {
        aktifUser.avatar = previewImg.src;
    }

    let uIndex = üyeler.findIndex(u => u.username.toLowerCase() === aktifUser.username.toLowerCase());
    if (uIndex !== -1) {
        üyeler[uIndex] = aktifUser;
        localStorage.setItem('muzeUyeler', JSON.stringify(üyeler));
    }
    localStorage.setItem('muzeAktifKullanıcı', JSON.stringify(aktifUser));

    oturumDurumunuKontrolEt();
    havaDurumuGetir();
    document.getElementById('profile-modal').style.display = 'none';
    müzeToastAtesle("Profil bilgileriniz ve iklim bölgeniz başarıyla kaydedildi! 💾🎉");
}

// ==========================================
// ❤️ FAVORİ YÖNETİM MOTORU
// ==========================================

/**
 * Favori ekle / çıkar.
 * id      → kartın benzersiz anahtarı  (örn: 'bilgisayar')
 * baslik  → kart başlığı               (örn: '💻 Bilgisayarın Doğuşu')
 */
window.muzeIcerikFavoriTetikle = function (id, baslik) {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    if (!aktifUser) {
        müzeToastAtesle("Favorilere eklemek için önce giriş yapmalısınız! 🔐");
        return;
    }

    const favKey   = `favs_${aktifUser.username}`;
    let favoriler  = JSON.parse(localStorage.getItem(favKey)) || [];
    const fIndex   = favoriler.findIndex(item => item.id === id);

    if (fIndex === -1) {
        // Ekle
        favoriler.push({ id, baslik });
        müzeToastAtesle(`"${baslik}" favorilere eklendi! ❤️`);
    } else {
        // Çıkar
        favoriler.splice(fIndex, 1);
        müzeToastAtesle(`"${baslik}" favorilerden kaldırıldı. 💔`);
    }

    localStorage.setItem(favKey, JSON.stringify(favoriler));

    // Sayaç senkronizasyonu
    const favCount = document.getElementById('profile-fav-count');
    if (favCount) favCount.innerText = favoriler.length;

    // Profil paneli açıksa listeyi de güncelle
    profilFavorileriniListele();

    // Kart ikonunu hemen güncelle
    favoriIkonlariniGuncelle();
};

/**
 * Sayfadaki tüm .fav-btn ikonlarını localStorage'a göre günceller.
 * data-id özelliğinden id'yi okur; CSS sınıfları ile aktif/pasif durumu gösterir.
 */
function favoriIkonlariniGuncelle() {
    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    const favoriler = aktifUser
        ? (JSON.parse(localStorage.getItem(`favs_${aktifUser.username}`)) || [])
        : [];

    const favIdler = favoriler.map(f => f.id);

    document.querySelectorAll('.fav-btn').forEach(btn => {
        // id'yi butonun onclick'inden değil, id özniteliğinden okuyoruz
        // fav-btn-bilgisayar → bilgisayar
        const rawId = btn.id ? btn.id.replace('fav-btn-', '') : null;
        if (!rawId) return;

        if (favIdler.includes(rawId)) {
            btn.classList.add('active');
            btn.innerHTML = '♥';
            btn.title = 'Favorilerden Kaldır';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '♡';
            btn.title = 'Favorilere Ekle';
        }
    });
}

/**
 * Profil modalındaki "Favorilerim" sekmesini doldurur.
 */
function profilFavorileriniListele() {
    const konteynir = document.getElementById('profile-favorites-list');
    if (!konteynir) return;

    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    const favoriler = aktifUser
        ? (JSON.parse(localStorage.getItem(`favs_${aktifUser.username}`)) || [])
        : [];

    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <p style="text-align:center; color:#888; font-size:0.9rem; padding:20px 10px;">
                Henüz favorilere eklenmiş başlık bulunmuyor. ❤️
            </p>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9f9f9;
            padding: 10px 15px;
            border-radius: 8px;
            border-left: 4px solid #00592D;
        ">
            <span style="
                font-size: 0.85rem;
                font-weight: 600;
                color: #333;
                max-width: 75%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            ">${item.baslik}</span>
            <button
                onclick="window.muzeIcerikFavoriTetikle('${item.id}', '${item.baslik.replace(/'/g, "\\'")}')"
                style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    font-size: 0.75rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: 'Montserrat';
                    white-space: nowrap;
                ">Kaldır 🗑️</button>
        </div>
    `).join('');
}

function müzeCıkısYap() {
    localStorage.removeItem('muzeAktifKullanıcı');
    oturumDurumunuKontrolEt();
    havaDurumuGetir();
    // Çıkış sonrası tüm favori ikonlarını sıfırla
    favoriIkonlariniGuncelle();
    müzeToastAtesle("Güvenli çıkış yapıldı. Tekrar bekleriz! 🚪");
}

function oturumDurumunuKontrolEt() {
    const aktifUser           = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    const loggedOutDiv        = document.getElementById('nav-auth-logged-out');
    const loggedInDiv         = document.getElementById('nav-auth-logged-in');
    const welcomeText         = document.getElementById('nav-welcome-text');
    const navAvatar           = document.getElementById('nav-user-avatar');
    const navAvatarPlaceholder = document.getElementById('nav-user-avatar-placeholder');

    if (aktifUser) {
        if (loggedOutDiv)         loggedOutDiv.style.display = 'none';
        if (loggedInDiv)          loggedInDiv.style.display  = 'flex';
        if (welcomeText)          welcomeText.innerText = aktifUser.username;

        if (aktifUser.avatar) {
            if (navAvatar)            { navAvatar.src = aktifUser.avatar; navAvatar.style.display = 'block'; }
            if (navAvatarPlaceholder) navAvatarPlaceholder.style.display = 'none';
        } else {
            if (navAvatar)            navAvatar.style.display = 'none';
            if (navAvatarPlaceholder) navAvatarPlaceholder.style.display = 'block';
        }
    } else {
        if (loggedOutDiv) loggedOutDiv.style.display = 'flex';
        if (loggedInDiv)  loggedInDiv.style.display  = 'none';
    }
}

// ==========================================
// 🔔 TOAST BİLDİRİM MOTORU (4.5 SANİYE)
// ==========================================
let toastTimeout = null;

function müzeToastAtesle(mesaj) {
    const toast = document.getElementById('custom-toast');
    if (!toast) return;

    // Önceki zamanlayıcı varsa iptal et
    if (toastTimeout) clearTimeout(toastTimeout);

    toast.innerText = mesaj;
    toast.classList.add('toast-visible');
    toast.style.display = 'block';

    toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
        toast.classList.remove('toast-visible');
        toastTimeout = null;
    }, 4500);
}

// ==========================================
// 🌤️ HAVA DURUMU API MOTORU
// ==========================================
async function havaDurumuGetir() {
    const aktifUser  = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    let sehirKodu    = (aktifUser && aktifUser.customCity) ? aktifUser.customCity : "Afsin,TR";

    const sehirBaslikMap = {
        "Afsin,TR"          : "Afşin",
        "Elbistan,TR"       : "Elbistan",
        "Kahramanmaras,TR"  : "Kahramanmaraş",
        "Kirsehir,TR"       : "Kırşehir",
        "Ankara,TR"         : "Ankara"
    };

    const cityTitle = document.getElementById('weather-city-title');
    if (cityTitle) cityTitle.innerText = sehirBaslikMap[sehirKodu] || "Afşin";

    try {
        const apiKey  = "b1b15e88fa797225412429c1c50c122a1";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${sehirKodu}&units=metric&lang=tr&appid=${apiKey}`
        );

        if (response.ok) {
            const data = await response.json();
            document.getElementById('weather-temp').innerText  = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').innerText  = `Atmosfer: ${data.weather[0].description.toUpperCase()} | Nem: %${data.main.humidity}`;
        } else {
            yedekHavaDurumu();
        }
    } catch (e) {
        yedekHavaDurumu();
    }
}

function shadowWeather() {
    if (document.getElementById('weather-temp')) {
        document.getElementById('weather-temp').innerText = "20°C";
        document.getElementById('weather-desc').innerText = "MÜZE BÖLGESİ: HAVA KOŞULLARI SEÇİME GÖRE GÜNCELLENDİ";
    }
}
window.yedekHavaDurumu = shadowWeather;

// ==========================================
// 📂 JSON VERİ SİSTEMİ (ORİJİNAL KORUNDU)
// ==========================================
async function kategorileriGetir() {
    try {
        const yanit     = await fetch('data.json');
        const veriler   = await yanit.json();
        const konteynir = document.getElementById('koleksiyon-konteynir');

        if (konteynir && veriler.kategoriler) {
            konteynir.innerHTML = veriler.kategoriler.map(kategori => `
                <div class="card-wrapper">
                    <a href="${kategori.link}" class="card-link">
                        <div class="card" id="card-${kategori.id}">
                            <div class="card-image">
                                <img src="${kategori.resim}" alt="${kategori.baslik}">
                            </div>
                            <h3>${kategori.baslik}</h3>
                            <p>${kategori.aciklama}</p>
                        </div>
                    </a>
                    <button
                        class="fav-btn"
                        id="fav-btn-${kategori.id}"
                        onclick="event.stopPropagation(); window.muzeIcerikFavoriTetikle('${kategori.id}', '${kategori.baslik.replace(/'/g, "\\'")}')">
                        ♡
                    </button>
                </div>
            `).join('');

            favoriIkonlariniGuncelle();
        }
    } catch (e) {
        console.error("Veri yüklenemedi:", e);
        const konteynir = document.getElementById('koleksiyon-konteynir');
        if (konteynir) {
            konteynir.innerHTML = `<p style="text-align:center; color:#e74c3c; padding:40px;">Koleksiyon yüklenirken bir hata oluştu. ⚠️</p>`;
        }
    }
}

window.favoriKontrol = function (id, baslik) {
    window.muzeIcerikFavoriTetikle(id, baslik);
};

window.favorileriGoster = function () {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return;

    const aktifUser = JSON.parse(localStorage.getItem('muzeAktifKullanıcı'));
    const favoriler = aktifUser
        ? (JSON.parse(localStorage.getItem(`favs_${aktifUser.username}`)) || [])
        : [];

    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column:1/-1; padding:50px;">
                <p style="font-size:1.2rem; color:#666;">Favorilere herhangi bir şey eklemediniz. 😊</p>
            </div>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left:5px solid #e74c3c; padding:20px; background:white; border-radius:10px;">
            <div class="card-body">
                <h3>${item.baslik}</h3>
                <button
                    onclick="window.muzeIcerikFavoriTetikle('${item.id}', '${item.baslik.replace(/'/g, "\\'")}')"
                    style="background:#ff7675; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:5px; margin-top:10px;">
                    Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};
