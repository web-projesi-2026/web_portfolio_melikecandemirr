<?php
/**
 * Tech-Timeline: Dijital Müze
 * İcatlar Detay Sayfası
 * pages/icat.php
 */

include '../config.php'; // 🔗 Veritabanı bağlantısı eklendi

$page_title = "İcatlar - Tech-Timeline";
$icat_id = isset($_GET['id']) ? intval($_GET['id']) : 1;

// Örnek veri (şimdilik duruyor, SQL'e geçince kaldırabilirsin)
$icatlar = array(
    1 => array(
        'baslik' => 'Bilgisayarların Doğuşu',
        'yil' => '1950s',
        'icon' => '💻',
        'aciklama' => 'ENIAC ve UNIVAC gibi ilk elektronik bilgisayarlar, insanlığın hesaplama yeteneğini devrim niteliğinde değiştirdi.',
        'detay' => 'Electronic Numerical Integrator and Computer (ENIAC) 1946 yılında inşa edilmiş, 30 ton ağırlığında ve odalarını doldurmuş ilk genel amaçlı elektronik sayısal bilgisayardır. Vacuum tube teknolojisini kullanarak saniyede 5000 işlem yapabiliyordu.'
    ),
    2 => array(
        'baslik' => 'Kişisel Bilgisayar Devrimi',
        'yil' => '1970s',
        'icon' => '📱',
        'aciklama' => 'Apple II, Commodore 64 ve IBM PC, bilgisayarları her evde bulunur hale getirdi.',
        'detay' => '1977 yılında Apple II, Commodore PET ve TRS-80 neredeyse aynı anda piyasaya sürüldü. Bu üç bilgisayar, kişisel bilgisayar devriminin başlamasını işaret etti. Özellikle Apple II, grafikler ve renk ekranı ile halkı çekti.'
    ),
    3 => array(
        'baslik' => 'İnternet Çağının Başlangıcı',
        'yil' => '1990s',
        'icon' => '🌐',
        'aciklama' => 'World Wide Web\'in icat edilmesi ve kamu tarafından kullanılmaya açılması, dijital devrimi başlattı.',
        'detay' => 'Tim Berners-Lee, 1989 yılında CERN\'de çalışırken World Wide Web\'i icat etti. İlk web sayfası 1991 yılında çevrimiçi oldu. HTML, HTTP ve URL\'nin kombinasyonu, bugünün interneti için temel oluşturdu.'
    ),
    4 => array(
        'baslik' => 'Mobil İşletim Sistemleri',
        'yil' => '2000s',
        'icon' => '📲',
        'aciklama' => 'iPhone ve Android\'in ortaya çıkışı, milyarları internet\'e bağladı.',
        'detay' => 'Steve Jobs\'ın 2007\'de sunduğu iPhone, dokunmatik ekran arayüzü ile akıllı telefonları tamamen değiştirdi. Google\'ın açık kaynaklı Android işletim sistemi ise, telefonları herkese erişilebilir hale getirdi. Bugün 6 milyardan fazla akıllı telefon kullanıcısı vardır.'
    ),
    5 => array(
        'baslik' => 'Yapay Zeka ve Makine Öğrenmesi',
        'yil' => '2010s',
        'icon' => '🤖',
        'aciklama' => 'Derin öğrenme algoritmaları, yapay zekayı tüm endüstrilerde uygulanır hale getirdi.',
        'detay' => 'Geoffrey Hinton ve kollegalarının 2012\'de AlexNet ile ImageNet yarışmasını kazanması, derin öğrenme çağını başlattı. Bu gelişme, doğal dil işleme, görüntü tanıma ve tavsiye sistemleri gibi pek çok alanda devrim yarattı.'
    ),
    6 => array(
        'baslik' => 'Bulut Bilişim & Kuantum',
        'yil' => '2020s',
        'icon' => '☁️',
        'aciklama' => 'Bulut hizmetleri ve kuantum bilgisayarlar, geleceğin altyapısını oluşturuyor.',
        'detay' => 'Amazon Web Services (AWS), Microsoft Azure ve Google Cloud Platform, bilişimi bir hizmet olarak sundu. Kuantum bilgisayarlar ise, klasik bilgisayarların çözemediği karmaşık problemleri çözmek üzere geliştirilmektedir. IBM, Google ve Microsoft\'un yatırımları hızla artıyor.'
    )
);

$icat = isset($icatlar[$icat_id]) ? $icatlar[$icat_id] : $icatlar[1];
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $icat['baslik']; ?> - Tech-Timeline</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .icat-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 3rem 2rem;
            min-height: calc(100vh - 300px);
        }
        
        .icat-header {
            background: linear-gradient(135deg, #00592D 0%, #00854D 100%);
            color: white;
            padding: 3rem;
            border-radius: 12px;
            margin-bottom: 3rem;
            text-align: center;
        }
        
        .icat-header .icat-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        .icat-header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: white;
        }
        
        .icat-header .icat-year {
            font-size: 1.2rem;
            color: #FFB81C;
            font-weight: 700;
        }
        
        .icat-content {
            background: white;
            padding: 2rem;
            border-left: 4px solid #FFB81C;
            margin-bottom: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        
        .icat-content h2 {
            color: #00592D;
            margin-bottom: 1rem;
        }
        
        .icat-content p {
            color: #555;
            line-height: 1.8;
            margin-bottom: 1rem;
        }
        
        .nav-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .nav-buttons a {
            padding: 0.8rem 1.5rem;
            background: #00592D;
            color: white;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .nav-buttons a:hover {
            background: #FFB81C;
            color: #00592D;
        }
    </style>
</head>
<body>
    <!-- Header & Navigation -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">⚙️</span>
                <div class="logo-text">
                    <h1>TECH-TIMELINE</h1>
                    <p>Dijital Müze</p>
                </div>
            </div>
            
            <nav class="navigation">
                <ul>
                    <li><a href="../index.php" class="nav-link">Ana Sayfa</a></li>
                    <li><a href="timeline.php" class="nav-link">Zaman Çizgisi</a></li>
                    <li><a href="icat.php" class="nav-link active">İcatlar</a></li>
                    <li><a href="hakkimizda.php" class="nav-link">Hakkımızda</a></li>
                    <li><a href="iletisim.php" class="nav-link">İletişim</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="icat-container">
        <div class="icat-header">
            <div class="icat-icon"><?php echo $icat['icon']; ?></div>
            <h1><?php echo $icat['baslik']; ?></h1>
            <div class="icat-year"><?php echo $icat['yil']; ?></div>
        </div>

        <div class="icat-content">
            <h2>Özet</h2>
            <p><?php echo $icat['aciklama']; ?></p>
        </div>

        <div class="icat-content">
            <h2>Detaylı Bilgi</h2>
            <p><?php echo $icat['detay']; ?></p>
        </div>

        <div class="icat-content">
            <h2>Tarihsel Önem</h2>
            <p>
                Bu icat, teknoloji tarihinde dönüm noktası teşkil etmiş ve insanlığın dijital dönüşümünde 
                kritik rol oynamıştır. Günümüz teknolojisinin temelini oluşturan bu gelişmeler, 
                gelecek inovasyonların kapısını açmıştır.
            </p>
        </div>

        <div class="nav-buttons">
            <a href="icat.php?id=<?php echo max(1, $icat_id - 1); ?>">← Önceki İcat</a>
            <a href="timeline.php">Zaman Çizgisine Dön</a>
            <a href="icat.php?id=<?php echo min(6, $icat_id + 1); ?>">Sonraki İcat →</a>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Tech-Timeline</h4>
                <p>Ahi Evran Üniversitesi'nin sunduğu dijital müze platformu</p>
            </div>
            <div class="footer-section">
                <h4>Hızlı Linkler</h4>
                <ul>
                    <li><a href="timeline.php">Zaman Çizgisi</a></li>
                    <li><a href="icat.php">İcatlar</a></li>
                    <li><a href="hakkimizda.php">Hakkımızda</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>İletişim</h4>
                <p>
                    Ahi Evran Üniversitesi<br>
                    Kırşehir, Türkiye<br>
                    <a href="mailto:info@aeu.edu.tr">info@aeu.edu.tr</a>
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Tech-Timeline: Dijital Müze. Tüm hakları saklıdır.</p>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>
