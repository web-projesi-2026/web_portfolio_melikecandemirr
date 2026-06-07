/* Tech-Timeline Dijital Müze Ana JavaScript Motoru */
let tumTeknolojiler = [];

document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/pages/');
    const dataPath = isSubPage ? '../data.json' : 'data.json';

    // 1. Hamburger Menü Kontrolü
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => { navigation.classList.toggle('active'); });
    }

    // 2. Hafızalı Karanlık Mod Sistemi
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

    // 3. Modülleri Başlatma
    if (document.getElementById('koleksiyon-konteynir')) müzeVerileriniYukle(dataPath);
    if (document.getElementById('favorites-container')) window.favorileriGoster();
    if (document.getElementById('weather-section')) havaDurumuGetir();
});

// 4. Harici OpenWeatherMap API Entegrasyonu (Afşin)
async function havaDurumuGetir() {
    try {
        const apiKey = "b1b15e88fa797225412429c1c50c122a1";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Afsin,TR&units=metric&lang=tr&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('weather-temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').innerText = `Müze Atmosferi: ${data.weather[0].description.toUpperCase()} | Nem: %${data.main.humidity}`;
        } else { yedekHavaDurumu(); }
    } catch (e) { yedekHavaDurumu(); }
}
function yedekHavaDurumu() {
    if(document.getElementById('weather-temp')) {
        document.getElementById('weather-temp').innerText = "24°C";
        document.getElementById('weather-desc').innerText = "Müze Bölgesi: Hava Koşulları Dijital Olarak Dengelendi.";
    }
}

// 5. 4.5 Saniyelik Şık Yumuşak Geçişli Toast Bildirim Motoru
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
    }, 4500); // 4-5 Saniye aralığı optimize edildi
};

// 6. Projeler Sayfası Canlı Arama ve 15 Kategori Algoritması
async function müzeVerileriniYukle(path) {
    try {
        const yanit = await fetch(path);
        const veriler = await yanit.json();
        tumTeknolojiler = veriler.kategoriler || [];
        kartlariEkranaBas(tumTeknolojiler);

        const aramaKutusu = document.getElementById('search-input');
        const kategoriSecici = document.getElementById('category-filter');
        if (aramaKutusu) aramaKutusu.addEventListener('keyup', filtreleMüze);
        if (kategoriSecici) kategoriSecici.addEventListener('change', filtreleMüze);
    } catch (e) { console.error(e); }
}

function filtreleMüze() {
    const aramaMetni = document.getElementById('search-input').value.toLowerCase().trim();
    const secilenKategori = document.getElementById('category-filter').value;
    const sonuclar = tumTeknolojiler.filter(item => {
        const katUyum = (secilenKategori === "all" || item.kategori === secilenKategori);
        const txtUyum = item.baslik.toLowerCase().includes(aramaMetni) || item.aciklama.toLowerCase().includes(aramaMetni) || item.yil.includes(aramaMetni);
        return katUyum && txtUyum;
    });
    kartlariEkranaBas(sonuclar);
}

function kartlariEkranaBas(veriler) {
    const konteynir = document.getElementById('koleksiyon-konteynir');
    if (!konteynir) return;
    if (veriler.length === 0) {
        konteynir.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:30px;">Eşleşen robot modeli bulunamadı. 🔍</p>`;
        return;
    }
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    konteynir.innerHTML = veriler.map(item => {
        const isFav = favoriler.some(fav => fav.id === item.id);
        return `
        <div class="card" style="border-top:4px solid var(--dark-green);">
            <div style="position:relative; height:200px;">
                <img src="${item.resim}" style="width:100%; height:100%; object-fit:cover;">
                <span id="fav-icon-${item.id}" onclick="event.stopPropagation(); window.favoriKontrol('${item.id}', '${item.baslik}')" style="position:absolute; top:15px; right:15px; font-size:1.8rem; cursor:pointer; color:#e74c3c; user-select:none;">${isFav ? "♥" : "♡"}</span>
            </div>
            <div style="padding:20px; flex-grow:1; display:flex; flex-direction:column; justify-content:between;">
                <div>
                    <span style="background:var(--gold); font-size:0.75rem; padding:4px 8px; border-radius:4px; font-weight:bold; color:black;">${item.kategori}</span>
                    <h3 style="margin:10px 0; color:var(--dark-green);">${item.baslik}</h3>
                    <p style="color:#666; font-size:0.88rem; line-height:1.5;">${item.aciklama}</p>
                </div>
                <div style="margin-top:15px; padding-top:10px; border-top:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold;">📅 Yıl: ${item.yil}</span>
                    <button onclick="location.href='${item.link}'" style="background:var(--dark-green); color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">İncele 🔍</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// 7. LocalStorage Tabanlı Güvenli Favori Fonksiyonu
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const varMi = favoriler.some(item => item.id === id);
    if (!varMi) {
        favoriler.push({ id, baslik });
        window.gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        favoriler = favoriler.filter(item => item.id !== id);
        window.gosterToast(`${baslik} favorilerden çıkarıldı. 🗑️`);
    }
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    const simge = document.getElementById(`fav-icon-${id}`);
    if (simge) simge.innerText = !varMi ? "♥" : "♡";
    if (document.getElementById('favorites-container')) window.favorileriGoster();
};

window.favorileriGoster = function() {
    const container = document.getElementById('favorites-container');
    if (!container) return;
    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    if (favoriler.length === 0) {
        container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:30px; color:#666;">Favori listeniz henüz boş. 😊</p>`;
        return;
    }
    container.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left:5px solid #e74c3c; padding:20px; background:var(--white);">
            <h3>${item.baslik}</h3>
            <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" style="background:#ff7675; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; margin-top:10px; font-weight:bold;">Kaldır 🗑️</button>
        </div>`).join('');
};
