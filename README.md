🚀 Tech-Timeline | Dijital Müze ve Teknoloji Arşivi
📝 Proje Tanımı
Tech-Timeline, insanlık tarihinin mekanik hesap makinelerinden modern yapay zeka mimarilerine uzanan teknolojik evrimini dijitalleştiren, interaktif ve dinamik bir web platformudur. Bu proje, kullanıcıların teknoloji tarihini keşfetmelerine, kişiselleştirilmiş bir deneyimle favori içeriklerini yönetmelerine ve yerel iklim verileriyle etkileşime girmelerine olanak tanır.

🏗️ Mimari ve Teknolojik Yığın
Proje, modern Serverless (Sunucusuz) prensiplere dayalı, yüksek performanslı ve taşınabilir bir mimari ile geliştirilmiştir:

Frontend Katmanı: HTML5, CSS3 (Semantik yapı, modern Grid/Flexbox düzenleri).

İş Mantığı (Logic Layer): Vanilla JavaScript (ES6+), Asenkron Programlama (Async/Await), Fetch API.

Veri Yönetimi (Data Layer): * JSON: Müze koleksiyonu ve ansiklopedik verilerin dinamik listelenmesi.

LocalStorage (NoSQL): Kullanıcı oturumları, profil tercihleri ve favori içeriklerin kalıcı olarak saklanması.

API Entegrasyonu: OpenWeatherMap REST API aracılığıyla gerçek zamanlı hava durumu verilerinin çekilmesi ve işlenmesi.

✨ Temel Fonksiyonel Özellikler
🔐 Gelişmiş Kimlik Doğrulama
Kayıt & Giriş: Ad-Soyad, E-posta ve şifre doğrulamalı dinamik modallar.

Profil Yönetimi: Kullanıcıların profil bilgilerini düzenleme, profil fotoğrafını (Base64 formatında) yükleme ve iklim bölgesini özelleştirme yetkisi.

🌤️ Dinamik İklim Yönetimi
Kullanıcılar profillerinden tercih ettikleri il/ilçeyi seçebilirler. Sistem, bu tercihi anında localStorage'a işler ve OpenWeatherMap API ile bölgenin güncel verilerini ana sayfaya yansıtır.

❤️ Favori Sistemi
Proje kartları üzerinde bulunan interaktif favori butonları ile içerikleri koleksiyona ekleme/çıkarma imkanı.

Profil paneli altında senkronize çalışan, anlık güncellenen "Favorilerim" sekmesi.

🎨 Kullanıcı Deneyimi (UX) Optimizasyonu
Toast Bildirim Sistemi: Her türlü veri değişikliğinde (giriş, kayıt, favori ekleme) sağ alt köşede 4.5 saniye boyunca görünen estetik bildirim kutusu.

Tema Yönetimi: LocalStorage tabanlı, sayfalar arası geçişlerde hafızasını koruyan Dark/Light mod desteği.

🛠️ Kurulum ve Çalıştırma
Bu proje, herhangi bir sunucu yapılandırması (Apache/MySQL/XAMPP) gerektirmez.

Depoyu Klonlayın:
git clone https://github.com/web-projesi-2026/web_portfolio_melikecandemirr.git

Projeyi Başlatın:
index.html dosyasını herhangi bir modern tarayıcıda (Chrome, Edge, Firefox) açmanız yeterlidir.

📂 Dosya Hiyerarşisi
Plaintext
Tech-Timeline/
├── index.html          # Ana giriş ve dashboard
├── assests/
│   ├── css/            # Global stiller ve Dark Mode ayarları
│   └── js/             # Tüm iş mantığı, API motoru ve CRUD işlemleri
├── pages/              # Alt kütüphane sayfaları (AI, Computer, Cloud)
└── data.json           # Koleksiyon verilerinin tutulduğu veri havuzu
🎓 Akademik Bildirim
Bu proje, Ahi Evran Üniversitesi - Bilgisayar Programcılığı final ödevi kapsamında Melike Candemir tarafından; modern yazılım standartları, sunucusuz veri yönetimi ve dinamik arayüz tasarımı ilkeleri gözetilerek geliştirilmiştir.

Geliştirici: Melike Candemir | 2026
