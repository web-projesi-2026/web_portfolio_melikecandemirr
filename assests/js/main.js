/* ===================================
   TECH-TIMELINE: JAVASCRIPT
   Etkileşim ve Animasyon İşlevleri
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll için aktif nav linkini güncelle
    updateActiveNavLink();
    
    // Kart hover efektleri
    initializeCardAnimations();
    
    // Scroll animasyonları
    initializeScrollAnimations();
});

// ===================================
// NAVİGASYON FONKSIYONLARI
// ===================================

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
}

// ===================================
// KART ANİMASYONLARI
// ===================================

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.innovation-card');
    
    cards.forEach((card, index) => {
        // İlk yükleme animasyonu
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Hover efektleri
        card.addEventListener('mouseenter', function() {
            // Diğer kartları biraz sollaştır
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Tüm kartların opaklığını geri getir
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// ===================================
// SCROLL ANİMASYONLARI
// ===================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Tüm kartları ve bölümleri izle
    document.querySelectorAll('.innovation-card, .timeline-preview').forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// SAYFA YÜKLEMESİ SONRASI
// ===================================

window.addEventListener('load', function() {
    // Tüm görsel elementleri yükle
    console.log('Tech-Timeline sayfası başarıyla yüklendi!');
});

// ===================================
// RESPONSIVE MENU (MOBIL DESTEĞI)
// ===================================

// Mobil cihazlarda menü davranışı
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Masaüstü görünümüne geri döndü
        const nav = document.querySelector('.navigation');
        if (nav) {
            nav.style.display = 'flex';
        }
    }
});

// ===================================
// PARALLAX EFEKTLERI
// ===================================

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Orb'lara parallax efekti ekle
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    if (orb1) {
        orb1.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    if (orb2) {
        orb2.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});

// ===================================
// ZAMAN ÇİZGİSİ NOKTA TIŞ AYARLARI
// ===================================

document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const year = this.getAttribute('data-year');
        // Zaman çizgisi sayfasına yönlendir
        window.location.href = 'pages/timeline.php?year=' + year;
    });
    
    dot.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
        this.style.boxShadow = '0 0 20px rgba(255, 184, 28, 0.5)';
    });
    
    dot.addEventListener('mouseout', function() {
        this.style.boxShadow = 'none';
    });
});

// ===================================
// KART LİNK TIŞ AYARLARI
// ===================================

document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // İsteğe bağlı: Özel işlemler burada yapılabilir
        console.log('İcat detayına gitme işleminde...');
    });
});

// ===================================
// DÜĞME TIŞ OYUNCULARı
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Ripple efekti
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (event.clientX - rect.left) + 'px';
        ripple.style.top = (event.clientY - rect.top) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================================
// SAYFA YÜKLEMESİ BİTTİ
// ===================================

console.log('%cTech-Timeline: Dijital Müze', 'color: #00592D; font-size: 16px; font-weight: bold;');
console.log('%cAhi Evran Üniversitesi', 'color: #FFB81C; font-size: 12px; font-weight: bold;');
