// Mobil Menü Açma/Kapatma Fonksiyonu
const menu = document.querySelector('#mobile-menu');
const nav = document.querySelector('.navigation');

// Menü ikonuna tıklandığında 'active' class'ını ekle veya çıkar
menu.addEventListener('click', () => {
    nav.classList.toggle('active');
});
