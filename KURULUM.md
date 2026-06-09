# 📦 TECH-TIMELINE: DOSYA YAPISI VE KURULUM

## 🎯 PROJE HARITASI

```
tech-timeline-project/
│
├── 📄 index.html                    ⭐ ANA SAYFA (HTML)
├── 🎨 styles.css                    ⭐ TÜM STİLLER (CSS)
├── ⚡ script.js                     ⭐ ETKILEŞIMLER (JavaScript)
│
├── 📋 README.md                      📖 PROJE DOKÜMANTASYONU
├── 📊 SITEMAP.txt                    🗺️ SAYFA HARİTASI
│
└── pages/                             📁 DİNAMİK SAYFALAR (PHP)
    ├── timeline.php                  ⏱️ ZAMAN ÇİZGİSİ
    ├── icat.php                      🔬 İCAT DETAYLARI
    ├── hakkimizda.php                ℹ️ KURUMSAL BİLGİ
    └── iletisim.php                  📧 İLETİŞİM FORMU
```

---

## 📁 DOSYA AÇIKLAMALARI

### 🎯 TEMEL DOSYALAR

| Dosya | Tip | Boyut | Açıklama |
|-------|-----|-------|----------|
| **index.html** | HTML | ~15 KB | Ana sayfa - Logo, Navigasyon, Hero, Kartlar, Footer |
| **styles.css** | CSS | ~25 KB | Tüm stil tanımlamaları - Renkler, Animasyonlar, Responsive |
| **script.js** | JavaScript | ~8 KB | Etkileşimler - Menü, Kartlar, Scroll, Parallax |

### 📄 SAYFA DOSYLARI (PHP)

| Dosya | URL | Amaç |
|-------|-----|------|
| **timeline.php** | `/pages/timeline.php` | Teknoloji tarihinin kronolojik sunumu |
| **icat.php** | `/pages/icat.php?id=1-6` | Her icatın detaylı bilgi sayfası |
| **hakkimizda.php** | `/pages/hakkimizda.php` | Proje ve üniversite hakkında bilgi |
| **iletisim.php** | `/pages/iletisim.php` | İletişim formu ve bilgileri |

### 📚 DOKÜMANTASYON

| Dosya | Amaç |
|-------|------|
| **README.md** | Detaylı proje dokümantasyonu |
| **SITEMAP.txt** | Sayfa hiyerarşisi ve linkler |
| **KURULUM.md** | Bu dosya - Başlangıç rehberi |

---

## 🚀 KURULUM ADIMARI

### 1️⃣ GEREKSİNİMLER

```
✓ PHP 7.4 veya üstü
✓ Web sunucusu (Apache, Nginx, LiteSpeed)
✓ Modern tarayıcı (Chrome, Firefox, Safari, Edge)
✓ İnternet bağlantısı (Google Fonts için)
```

### 2️⃣ DOSYA YÜKLEME

```bash
# Projeler klasörüne gidin
cd /var/www/html
# veya
cd C:\xampp\htdocs

# Tech-Timeline klasörü oluşturun
mkdir tech-timeline
cd tech-timeline

# Dosyaları kopyalayın
cp index.html styles.css script.js ./
mkdir pages
cp pages/*.php ./pages/
```

### 3️⃣ KLASÖR İZİNLERİ (Linux)

```bash
chmod 755 .
chmod 644 *.html *.css *.js
chmod 644 pages/*.php
chmod 755 pages
```

### 4️⃣ WEB SUNUCUSUNU BAŞLATIN

**Apache ile:**
```bash
sudo service apache2 start
# veya
sudo systemctl start apache2
```

**PHP Yerleşik Sunucusu ile (Geliştirme):**
```bash
php -S localhost:8000
```

**Nginx ile:**
```bash
sudo systemctl start nginx
```

### 5️⃣ TARAYICIDA AÇIN

```
http://localhost:8000/index.php
# veya
http://localhost/tech-timeline/index.php
# veya
http://your-domain.com/tech-timeline/
```

---

## 📋 DOSYA KONTROL LİSTESİ

Kurulumdan önce aşağıdaki kontrol listesini tamamlayın:

- [ ] `index.html` dosyası mevcut
- [ ] `styles.css` dosyası mevcut
- [ ] `script.js` dosyası mevcut
- [ ] `pages/` klasörü oluşturuldu
- [ ] `pages/timeline.php` dosyası mevcut
- [ ] `pages/icat.php` dosyası mevcut
- [ ] `pages/hakkimizda.php` dosyası mevcut (opsiyonel)
- [ ] `pages/iletisim.php` dosyası mevcut (opsiyonel)
- [ ] Tüm dosyalar UTF-8 kodlamasında
- [ ] CSS ve JS dosyaları index.html ile aynı klasörde

---

## 🔗 DOSYA REFERANSLARI

### HTML'de CSS Referansı
```html
<link rel="stylesheet" href="styles.css">
```

### HTML'de JS Referansı
```html
<script src="script.js"></script>
```

### PHP'de Ana Sayfaya Link
```html
<a href="../index.php">Ana Sayfa</a>
```

### PHP'de Stil Dosyasına Link
```html
<link rel="stylesheet" href="../styles.css">
```

### PHP'de Komut Dosyasına Link
```html
<script src="../script.js"></script>
```

---

## 🔄 DOSYA BAĞIMLILIKLARI

```
index.php (Ana Sayfa)
    ├─→ styles.css (gerekli)
    ├─→ script.js (gerekli)
    ├─→ pages/timeline.php (link)
    ├─→ pages/icat.php (link)
    ├─→ pages/hakkimizda.php (link)
    └─→ pages/iletisim.php (link)

pages/timeline.php
    ├─→ ../styles.css (gerekli)
    ├─→ ../script.js (gerekli)
    └─→ ../index.php (geri link)

pages/icat.php
    ├─→ ../styles.css (gerekli)
    ├─→ ../script.js (gerekli)
    └─→ ../index.php (geri link)
```

---

## ⚙️ KÖK YAPILANDIRMA

### CSS Değişkenleri (styles.css)
```css
:root {
    --dark-green: #00592D;      /* Temel yeşil */
    --gold: #FFB81C;            /* Vurgu sarısı */
    --light-green: #00854D;     /* Açık yeşil */
    --white: #FFFFFF;           /* Beyaz */
}
```

### JavaScript Ayarları (script.js)
```javascript
// Otomatik yüklenir
// - Nav link aktivasyon
// - Kart animasyonları
// - Scroll efektleri
// - Parallax
```

---

## 🎨 RENK PALETİ

### Kullanılan Renkler
```
Koyu Yeşil      #00592D
Açık Yeşil      #00854D
Çok Açık Yeşil  #E8F2ED
Altın Sarı      #FFB81C
Beyaz           #FFFFFF
Açık Gri        #F5F5F5
Koyu Gri        #333333
Metin           #222222
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Masaüstü */
@media (min-width: 1200px) { }

/* Tablet */
@media (max-width: 1024px) { }
@media (max-width: 768px) { }

/* Mobil */
@media (max-width: 480px) { }
```

---

## 🔍 TARAŞTIRMA SONRASI KONTROLLER

Sayfayı yükledikten sonra kontrol edin:

- [ ] Logo ve başlık doğru şekilde görünüyor
- [ ] Navigasyon menüsü yanıt veriyor
- [ ] Başlık metni okunabilir
- [ ] Kartlar doğru sırada görünüyor
- [ ] Renkler kurumsal renklere uyuyor
- [ ] Linkler doğru sayfalara götürüyor
- [ ] Responsive tasarım mobilde çalışıyor
- [ ] Animasyonlar sorunsuz çalışıyor
- [ ] Footer bilgileri doğru

---

## 🆘 SORUN GİDERME

### Sayfa Boş Görünüyor
```
✓ PHP etkin mi kontrol edin
✓ Sunucu PHP'yi destekliyor mu kontrol edin
✓ Hata günlüğünü kontrol edin
```

### Stiller Yüklenmedi
```
✓ styles.css dosyası aynı klasörde mi
✓ CSS dosya adı doğru mu
✓ İzinler doğru mu (644)
```

### Linkler Çalışmıyor
```
✓ Sayfa yolları doğru mu
✓ Pages klasörü oluşturuldu mu
✓ PHP dosyaları pages/ içinde mi
```

### Animasyonlar Çalışmıyor
```
✓ script.js yüklendi mi
✓ JavaScript tarayıcıda etkin mi
✓ Hata konsolu (F12) var mı
```

---

## 📞 DESTEK

Sorunlar için:

1. **Hata Konsolu Kontrol**: F12 → Console
2. **Sunucu Günlükleri**: Apache error log
3. **PHP Info**: `<?php phpinfo(); ?>`
4. **Üniversite IT**: info@aeu.edu.tr

---

## 📊 DOSYA İSTATİSTİKLERİ

| Dosya | Satır | Boyut |
|-------|-------|-------|
| index.html | ~250 | 15 KB |
| styles.css | ~600 | 25 KB |
| script.js | ~150 | 8 KB |
| timeline.php | ~180 | 10 KB |
| icat.php | ~220 | 12 KB |
| **TOPLAM** | **~1400** | **~70 KB** |

---

## ✅ BAŞARILI KURULUMUN İŞARETLERİ

Kurulum başarılıysa:
- ✅ Ana sayfa sorunsuz yüklenir
- ✅ Animasyonlar çalışır
- ✅ Linkler çalışır
- ✅ Responsive tasarım uygun
- ✅ Renkler doğru
- ✅ Konsolda hata yok

---

## 📈 SONRAKI ADIMLAR

1. **Veritabanı Entegrasyonu**
   - MySQL kurulumu
   - PDO bağlantısı
   - Tablo tasarımı

2. **Dinamik İçerik**
   - Veritabanından okuma
   - İçerik yönetim sistemi
   - Admin paneli

3. **SEO Optimizasyonu**
   - Meta etiketleri
   - Sitemap.xml
   - robots.txt

4. **Güvenlik**
   - SQL Injection koruması
   - XSS koruması
   - HTTPS sertifikası

---

**Sürüm**: 1.0  
**Tarih**: Mart 2025  
**Durum**: ✅ HAZIR

Kurulum sorularınız için lütfen Ahi Evran Üniversitesi IT Bölümü ile iletişime geçin.
