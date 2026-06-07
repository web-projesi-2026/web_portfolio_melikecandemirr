/* Tech-Timeline Dijital Müze Projesi 
   Geliştirici: Melike Candemir
   Görev: Gelişmiş Canlı Arama, 15 Kategori Filtreleme ve Güvenli Favori Altyapısı
*/

// Global veri hafızası
let tumTeknolojiler = [];

document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/pages/');
    const dataPath = isSubPage ? '../data.json' : 'data.json';

    // --- 1. MOBİL MENÜ KONTROLÜ ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
        });
    }

    // --- 2. DARK MODE (HAFIZALI SİSTEM) ---
    const themeBtn = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") {
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

    // --- 3. DİNAMİK YÜKLEME VE FİLTRE EVENTLERİ ---
    if (document.getElementById('koleksiyon-konteynir')) {
        müzeVerileriniYukle(dataPath);
    }

    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
});

// --- 4. DATA.JSON'DAN VERİ ÇEKME VE CANLI FİLTRELEME MOTORU ---
async function müzeVerileriniYukle(path) {
    try {
        const yanit = await fetch(path);
        const veriler = await yanit.json();
        tumTeknolojiler = veriler.kategoriler || [];
        
        // İlk yüklemede tüm kartları ekrana bas
        kartlariEkranaBas(tumTeknolojiler);

        // Arama kutusu girdisini dinle (Anlık Canlı Arama)
        const aramaKutusu = document.getElementById('search-input');
        const kategoriSecici = document.getElementById('category-filter');

        if (aramaKutusu) aramaKutusu.addEventListener('keyup', filtreleMüze);
        if (kategoriSecici) kategoriSecici.addEventListener('change', filtreleMüze);

    } catch (e) {
        console.error("Müze verileri yüklenirken hata oluştu:", e);
    }
}

// Filtreleme Algoritması (Hem Arama Hem Kategori Kombinasyonu)
function filtreleMüze() {
    const aramaMetni = document.getElementById('search-input').value.toLowerCase().trim();
    const secilenKategori = document.getElementById('category-filter').value;

    const filtrelenmişSonuclar = tumTeknolojiler.filter(item => {
        // Kategori eşleşme kontrolü
        const kategoriUyumlu = (secilenKategori === "all" || item.kategori === secilenKategori);
        
        // Metin arama kontrolü (Başlık, Açıklama veya Yıl içinde arar)
        const metinUyumlu = item.baslik.toLowerCase().includes(aramaMetni) || 
                            item.aciklama.toLowerCase().includes(aramaMetni) || 
                            item.yil.includes(aramaMetni) ||
                            item.kategori.toLowerCase().includes(aramaMetni);

        return kategoriUyumlu && metinUyumlu;
    });

    kartlariEkranaBas(filtrelenmişSonuclar);
}

// Kartları Ekrana HTML Olarak Çizen Fonksiyon
function kartlariEkranaBas(veriler) {
    const konteynir = document.getElementById('koleksiyon-konteynir');
    if (!konteynir) return;

    if (veriler.length === 0) {
        konteynir.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 40px; background: #fff3f3; border-radius: 10px; border: 1px solid #ffcccc;">
                <p style="font-size: 1.1rem; color: #d63031; font-weight: bold;">Aradığınız kriterlere uygun robot modeli bulunamadı. 🔍</p>
            </div>`;
        return;
    }

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];

    konteynir.innerHTML = veriler.map(item => {
        const isFav = favoriler.some(fav => fav.id === item.id);
        return `
        <div class="card" style="background: white; border-radius: 15px; box-shadow: 0 6px 18px rgba(0,0,0,0.08); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--dark-green);">
            <div class="card-image" style="position: relative; height: 200px; overflow: hidden;">
                <img src="${item.resim}" alt="${item.baslik}" style="width: 100%; height: 100%; object-fit: cover;">
                <span id="fav-icon-${item.id}" onclick="event.stopPropagation(); window.favoriKontrol('${item.id}', '${item.baslik}')" 
                      style="position: absolute; top: 15px; right: 15px; background: rgba(25px, 25px, 25px, 0.6); color: #e74c3c; font-size: 1.8rem; padding: 5px 10px; border-radius: 50%; cursor: pointer; user-select: none;">
                      ${isFav ? "♥" : "♡"}
                </span>
            </div>
            <div class="card-body" style="padding: 20px; flex-grow: 1;">
                <span style="background: var(--gold); color: #333; font-size: 0.8rem; padding: 4px 10px; border-radius: 10px; font-weight: bold; display: inline-block; margin-bottom: 10px;">${item.kategori}</span>
                <h3 style="color: var(--dark-green); margin-bottom: 10px; font-size: 1.3rem;">${item.baslik}</h3>
                <p style="color: #666; font-size: 0.95rem; line-height: 1.6; margin-bottom: 15px;">${item.aciklama}</p>
                <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 10px; font-size: 0.9rem; font-weight: bold; color: #555;">
                    <span>📅 Yıl: ${item.yil}</span>
                    <button onclick="location.href='${item.link}'" style="background: var(--dark-green); color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer;">Detayları Gör 🔍</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// --- 5. FAVORİ SİSTEMİ ALTYAPISI (FİLTER METODLU KESİN ÇÖZÜM) ---
window.favoriKontrol = function(id, baslik) {
    let favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    const varMi = favoriler.some(item => item.id === id);

    if (!varMi) {
        favoriler.push({ id, baslik });
        gosterToast(`${baslik} favorilere eklendi! ❤️`);
    } else {
        favoriler = favoriler.filter(item => item.id !== id);
        gosterToast(`${baslik} favorilerden çıkarıldı. 🗑️`);
    }
    
    localStorage.setItem('techFavs', JSON.stringify(favoriler));
    
    // UI Güncellemeleri
    const kalpSimgesi = document.getElementById(`fav-icon-${id}`);
    if (kalpSimgesi) {
        kalpSimgesi.innerText = !varMi ? "♥" : "♡";
    }

    if (document.getElementById('favorites-container')) {
        window.favorileriGoster();
    }
};

window.favorileriGoster = function() {
    const konteynir = document.getElementById('favorites-container');
    if (!konteynir) return;

    const favoriler = JSON.parse(localStorage.getItem('techFavs')) || [];
    
    if (favoriler.length === 0) {
        konteynir.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                <p style="font-size: 1.2rem; color: #666;">Favori listeniz boş. 😊</p>
                <a href="project.html" class="btn" style="display:inline-block; margin-top:20px; background:var(--dark-green); color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Robotları İncele 🤖</a>
            </div>`;
        return;
    }

    konteynir.innerHTML = favoriler.map(item => `
        <div class="card" style="border-left: 6px solid #e74c3c; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div class="card-body">
                <h3 style="color: var(--dark-green);">${item.baslik}</h3>
                <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">Müze favori listenizde kayıtlı model.</p>
                <button onclick="window.favoriKontrol('${item.id}', '${item.baslik}')" 
                        style="background:#ff7675; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:5px; margin-top:15px; font-weight:bold;">
                    Listeden Kaldır 🗑️
                </button>
            </div>
        </div>`).join('');
};

function gosterToast(mesaj) {
    const toast = document.getElementById('toast-favourite');
    if (toast) {
        toast.innerText = mesaj;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}
