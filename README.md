# 🏛️ TECH-TIMELINE: DİJİTAL MÜZE
## Ana Sayfa Arayüzü - Ahi Evran Üniversitesi

---

## 📋 PROJE AÇIKLAMASI

**Tech-Timeline: Dijital Müze**, teknoloji tarihinin önemli icatlarını ve gelişimini ziyaretçilere sunan modern ve etkileşimli bir web platformudur. Proje, Ahi Evran Üniversitesi'nin kurumsal kimliğini yansıtan tasarımla birlikte, kullanıcı deneyimini ön planda tutan bir arayüze sahiptir.

### 🎨 Tasarım Özellikleri

- **Kurumsal Renkler**: 
  - **Koyu Yeşil (#00592D)**: Güven, sabitlik ve teknoloji
  - **Altın Sarısı (#FFB81C)**: Değer, başarı ve yenilik
  
- **Modern Tipografi**: 
  - Başlıklar: Playfair Display (serif) - zarif ve etkileyici
  - Body Metni: Montserrat (sans-serif) - temiz ve okunabilir

- **Responsif Tasarım**: Masaüstü, tablet ve mobil cihazlarda mükemmel görüntülenme

- **Etkileşimli Öğeler**:
  - Floating animasyonlar
  - Hover efektleri
  - Smooth scroll geçişleri
  - Parallax efektleri

---

## 📁 PROJE YAPISI

```
tech-timeline-project/
│
├── index.html              # Ana sayfa HTML (PHP olarak yapılandırılabilir)
├── styles.css              # Tüm stil tanımlamaları
├── script.js               # JavaScript etkileşimleri
│
└── pages/                  # Alt sayfa şablonları (oluşturulacak)
    ├── timeline.php        # Zaman çizgisi sayfası
    ├── icat.php            # İcatlar detay sayfası
    ├── hakkimizda.php      # Hakkımızda sayfası
    └── iletisim.php        # İletişim sayfası
```

---

## 🚀 KURULUM VE ÇALIŞTIRILMA

### Gereksinimler
- PHP 7.4+ (dinamik sayfalandırma için)
- Modern web tarayıcı
- Web sunucusu (Apache, Nginx vb.)

### Adımlar

#### 1. Dosyaları Proje Klasörüne Yerleştirin
```bash
cp index.html styles.css script.js /var/www/html/tech-timeline/
```

#### 2. PHP Sayfaları Oluşturun
`pages/` klasörü altında aşağıdaki PHP dosyalarını oluşturun:

**pages/timeline.php**
```php
<?php include '../index.html'; ?>
```

**pages/icat.php**
```php
<?php 
// İcat detaylarını göster
$id = isset($_GET['id']) ? $_GET['id'] : 1;
// İcat bilgilerini veritabanından al
?>
```

#### 3. Web Sunucusunu Başlatın
```bash
php -S localhost:8000
# veya Apache kullanıyorsanız
sudo service apache2 start
```

#### 4. Tarayıcıda Açın
```
http://localhost:8000/index.php
```

---

## 🎯 ANA BÖLÜMLER

### 1. **HEADER & NAVIGATION** 📍
- Sabit (sticky) başlık
- Kurumsal logo
- Navigasyon menüsü
- Aktif sayfa göstergesi

**Linkler:**
- Ana Sayfa → `index.php`
- Zaman Çizgisi → `pages/timeline.php`
- İcatlar → `pages/icat.php`
- Hakkımızda → `pages/hakkimizda.php`
- İletişim → `pages/iletisim.php`

### 2. **HERO SECTION** 🌟
- Etkileyici başlık
- Alt başlık metni
- İki buton (Keşfet ve Bize Ulaşın)
- Animated gradient orbs
- Responsive tasarım

### 3. **INNOVATION CARDS** 🎴
Altı ana teknoloji dönemi:
1. **1950s**: Bilgisayarların Doğuşu
2. **1970s**: Kişisel Bilgisayar Devrimi
3. **1990s**: İnternet Çağının Başlangıcı
4. **2000s**: Mobil İşletim Sistemleri
5. **2010s**: Yapay Zeka ve Makine Öğrenmesi
6. **2020s**: Bulut Bilişim & Kuantum

Her kart aşağıdakileri içerir:
- Emoji İkonu
- Yıl Etiketi
- Başlık
- Açıklama
- "Detaylı Bilgi" Linki

### 4. **TIMELINE PREVIEW** ⏱️
- Zaman noktalarını gösteren interaktif noktalar
- Tam zaman çizgisine link

### 5. **FOOTER** 📞
- Bölümlenmiş bilgiler
- Hızlı linkler
- İletişim bilgileri
- Telif hakkı bilgisi

---

## 🎨 TASARIM DETAYLARI

### Renkler
```css
--dark-green: #00592D    /* Temel yeşil */
--gold: #FFB81C          /* Vurgu sarısı */
--light-green: #00854D   /* Açık yeşil */
--text-color: #222222    /* Metin rengi */
```

### Boşluklar (Spacing)
- `--spacing-xs`: 0.5rem
- `--spacing-sm`: 1rem
- `--spacing-md`: 1.5rem
- `--spacing-lg`: 2rem
- `--spacing-xl`: 3rem
- `--spacing-2xl`: 4rem

### Geçişler
- `--transition`: 0.3s cubic-bezier
- `--transition-smooth`: 0.5s cubic-bezier

---

## 🎬 ANİMASYONLAR

### Hero Bölümü
- `slideDown`: Header aşağıdan yukarı
- `slideInLeft`: Metin soldan
- `slideInRight`: Görsel sağdan
- `float`: Orb'lar yüzüyor
- `pulse`: Elementler titreşiyor

### Kartlar
- `fadeIn`: Kartlar solgun çıkış
- `translateY`: Hover'da yukarı hareket

### Butonlar
- Hover: Yukarı hareket + gölge
- Ripple: Tıklama efekti

---

## 📱 RESPONSIF TASARIM

### Kırılma Noktaları
- **Masaüstü**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobil**: 480px - 767px
- **Küçük Mobil**: < 480px

### Ayarlamalar
- Grid sütunları azalır
- Font boyutları dinamik
- Butonlar tam genişlik
- Menü düzeni değişir

---

## 🔧 KÖK DEĞIŞKENLER (CSS Variables)

```css
:root {
    --dark-green: #00592D;
    --gold: #FFB81C;
    --light-green: #00854D;
    --very-light-green: #E8F2ED;
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
    --medium-gray: #E0E0E0;
    --dark-gray: #333333;
    --text-color: #222222;
}
```

---

## 📝 KÖK İŞLEVLER (JavaScript)

### updateActiveNavLink()
Mevcut sayfaya göre aktif navigasyon linkini günceller.

### initializeCardAnimations()
Kartlara yükleme ve hover animasyonları ekler.

### initializeScrollAnimations()
Sayfa aşağı kaydırıldıkça öğeleri animasyonlandırır.

---

## 🔗 MENÜ LİNKLERİ YAPISI

```
Ana Sayfa (index.php)
│
├── Zaman Çizgisi (pages/timeline.php)
│   └── ?year=YYYY parametresi ile yıl filtrelemesi
│
├── İcatlar (pages/icat.php)
│   └── ?id=N parametresi ile icat detayı
│
├── Hakkımızda (pages/hakkimizda.php)
│
└── İletişim (pages/iletisim.php)
```

---

## 🎓 UYUM NOTLARI

### Ahi Evran Üniversitesi
- Kurumsal renkler kesinlikle uygulanmıştır
- Profesyonel ve akademik görünüm
- Modern tasarım ile geleneksel değerlerin birleşimi

### Teknoloji Tarihi Teması
- 6 büyük dönem temsil edilmiştir
- 1950'den 2025'e kadar kronolojik sıra
- Her dönemi temsil eden ikonlar ve açıklamalar

---

## 📚 ÖRNEK PHP SAYFA (timeline.php)

```php
<?php
// pages/timeline.php

// Başlık bilgilerini ayarla
$page_title = "Zaman Çizgisi";
$page_description = "Teknoloji tarihinin zaman çizgisi";

// İçeriği getir
include '../header.php';
?>

<main>
    <h1>Teknoloji Tarihi Zaman Çizgisi</h1>
    <!-- İçerik buraya gelecek -->
</main>

<?php include '../footer.php'; ?>
```

---

## 🚨 ÖNEMLİ NOTLAR

1. **CSS Dosyası**: `styles.css` dosyası `index.html` ile aynı klasörde olmalıdır
2. **JavaScript Dosyası**: `script.js` dosyası `index.html` ile aynı klasörde olmalıdır
3. **Google Fonts**: İnternet bağlantısı gereklidir (Playfair Display ve Montserrat)
4. **PHP Sayfaları**: Dinamik içerik için PHP 7.4+ gereklidir
5. **Cross-Origin**: CSS ve JS dosyaları aynı domaindan servis edilmelidir

---

## 🎯 GELECEK ÖZELLİKLER

- [ ] Veritabanı entegrasyonu
- [ ] Kullanıcı yorumları sistemi
- [ ] Aramalar ve filtreleme
- [ ] Sosyal medya paylaşımı
- [ ] Galeri ve multimedya desteği
- [ ] Çok dili destekle (TR/EN)
- [ ] Arama motoru optimizasyonu (SEO)

---

## 📧 İLETİŞİM

**Ahi Evran Üniversitesi**
- Email: info@aeu.edu.tr
- Web: www.aeu.edu.tr
- Telefon: +90 386 XXX XXXX
- Adres: Kırşehir, Türkiye

---

## 📄 LİSANS

Bu proje Ahi Evran Üniversitesi tarafından geliştirilmiştir.
Tüm hakları saklıdır © 2025

---

**Proje Sürümü**: 1.0.0  
**Son Güncelleme**: Mart 2025  
**Geliştirici**: Web Tasarım Ekibi

---

## 🎉 TAMAMLAMA NOTLARI

Bu arayüz tamamen işlevsel ve üretim hazır durumda bulunmaktadır. 
Dinamik sayfalar için PHP dosyaları oluşturulması ve veritabanı 
bağlantıları kurulması gerekmektedir.

**İyi Tasarımlar! 🚀**
