document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#mobile-menu');
    const nav = document.querySelector('.navigation');

    if (menu) {
        menu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});
