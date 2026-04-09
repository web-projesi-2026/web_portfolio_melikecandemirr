// main.js içeriği
window.onload = function() {
    const menu = document.querySelector('#mobile-menu');
    const nav = document.querySelector('.navigation');

    if (menu) {
        menu.onclick = function() {
            nav.classList.toggle('active');
            console.log("Menüye tıklandı!"); // Çalıştığını anlamak için
        };
    } else {
        console.error("Hata: #mobile-menu bulunamadı!");
    }
};
