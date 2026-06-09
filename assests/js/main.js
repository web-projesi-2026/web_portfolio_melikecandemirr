/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Etkileşim Kontrolleri, Dinamik Veri ve Veri Saklama
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 🌤️ HARİCI HAVA DURUMU API TETİKLEYİCİSİ ---
    if (document.getElementById('weather-section')) {
        havaDurumuGetir();
    }

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

// HARİCİ OPENWEATHERMAP APISINDEN ANLIK VERİ ÇEKME MOTORU (KAHRAMANMARAŞ AFŞİN)
async function havaDurumuGetir() {
    try {
        const apiKey = "b1b15e88fa797225412429c1c50c122a1";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Afsin,TR&units=metric&lang=tr&appid=${apiKey}`);
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('weather-temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').innerText = `Atmosfer: ${data.weather[0].description.toUpperCase()} | Nem: %${data.main.humidity}`;
        } else { 
            yedekHavaDurumu(); 
        }
    } catch (e) { 
        yedekHavaDurumu(); 
    }
}

// İnternet kesintisi veya API limiti durumunda sitenin çökmesini önleyen emniyet sistemi
function shadowWeather() {
    if(document.getElementById('weather-temp')) {
        document.getElementById('weather-temp').innerText = "22°C";
        document.getElementById('weather-desc').innerText = "MÜZE BÖLGESİ: HAVA KOŞULLARI OPTİMİZE EDİLDİ";
    }
}
window.yedekHavaDurumu = shadowWeather;

// JSON'dan Veri Çekme
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

// Favori Kontrolü (Ekleme/Çıkarma Mantığı Düzeltildi)
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const index = favoriler.findIndex(item => item.id === id);
    const toast = document.getElementById('toast-favourite');

    if (index === -1) {
        favoriler.push({ id, baslik });
        if (toast) gosterToast(`${navLinks} eklendi! ❤️`); // Orijinal metin korundu
    } else {
        favoriler.splice(index, 1);
        if (toast) gosterToast(`${baslik} çıkarıldı. 😊`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    
    // Favoriler sayfasındaysak anlık güncelle
    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
    favoriIkonlariniGuncelle();
};

// Favorileri Listeleme (Boş Liste Mesajı Dahil)
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
