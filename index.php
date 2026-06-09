<?php
/**
 * Tech-Timeline: Dijital Müze
 * Zaman Çizgisi Sayfası
 * pages/timeline.php
 */

$page_title = "Zaman Çizgisi - Tech-Timeline";
$year_filter = isset($_GET['year']) ? intval($_GET['year']) : null;
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - Ahi Evran Üniversitesi</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .timeline-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 3rem 2rem;
            min-height: calc(100vh - 300px);
        }
        
        .timeline-item {
            position: relative;
            padding-left: 40px;
            margin-bottom: 3rem;
            border-left: 3px solid #FFB81C;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -12px;
            top: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #00592D;
            border: 3px solid #FFB81C;
        }
        
        .timeline-item h3 {
            color: #00592D;
            margin-bottom: 0.5rem;
        }
        
        .timeline-item .year {
            color: #FFB81C;
            font-weight: 700;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .timeline-item p {
            color: #666;
            line-height: 1.8;
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
                    <li><a href="timeline.php" class="nav-link active">Zaman Çizgisi</a></li>
                    <li><a href="icat.php" class="nav-link">İcatlar</a></li>
                    <li><a href="hakkimizda.php" class="nav-link">Hakkımızda</a></li>
                    <li><a href="iletisim.php" class="nav-link">İletişim</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="timeline-container">
        <h1 style="color: #00592D; margin-bottom: 2rem;">Teknoloji Tarihi Zaman Çizgisi</h1>
        
        <div class="timeline-item">
            <span class="year">1950s</span>
            <h3>Bilgisayarların Doğuşu</h3>
            <p>
                ENIAC (Electronic Numerical Integrator and Computer) ve UNIVAC gibi ilk elektronik 
                bilgisayarlar, büyük laboratuvarlar ve hükümet kurumlarında devrim yarattı. Bu dönem, 
                modern bilgisayar çağının temelini attı.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">1960s</span>
            <h3>Entegre Devreler ve Küçültme</h3>
            <p>
                Entegre devrelerin icat edilmesi, bilgisayarların daha küçük ve verimli hale 
                gelmesini sağladı. Bu teknoloji, modern çipsetlerin temelini oluşturdu.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">1970s</span>
            <h3>Kişisel Bilgisayar Devrimi</h3>
            <p>
                Apple II, Commodore ve IBM PC'nin piyasaya girmesi, bilgisayarları evlere ve işletmelere 
                taşıdı. Yazılım endüstrisi doğmaya başladı. Steve Jobs ve Bill Gates bu dönemin 
                mimarlarıydı.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">1980s</span>
            <h3>Grafik Arayüzlerin Çıkışı</h3>
            <p>
                Xerox Alto'dan esinlenen Macintosh ve Windows'un gelişi, bilgisayarları herkes için 
                erişilebilir hale getirdi. Graphical User Interface (GUI) devrimi başladı.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">1990s</span>
            <h3>İnternet ve World Wide Web</h3>
            <p>
                Tim Berners-Lee'nin World Wide Web'i icat etmesi ve İnternet'in kamu tarafından 
                kullanılmaya açılması, dünyayı değiştirdi. E-ticaret ve dijital iletişim doğdu.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">2000s</span>
            <h3>Mobil Devrim ve Akıllı Telefonlar</h3>
            <p>
                iPhone'un 2007'de tanıtılması ve Google'ın Android'i geliştirmesi, mobil cihazları 
                milyarların eline verdi. Akıllı telefonlar hayatın merkezi hale geldi.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">2010s</span>
            <h3>Yapay Zeka ve Bulut Bilişim</h3>
            <p>
                Derin öğrenme algoritmaları ve yapay sinir ağlarının gelişmesi, yapay zekayı 
                çeşitli endüstrilere uygulanabilir hale getirdi. Bulut hizmetleri (AWS, Azure, GCP) 
                IT altyapısını dönüştürdü.
            </p>
        </div>

        <div class="timeline-item">
            <span class="year">2020s</span>
            <h3>Kuantum Bilişim ve Edge Computing</h3>
            <p>
                Kuantum bilgisayarlar kesintisiz problem çözmek üzere geliştiriliyordu. Edge Computing, 
                veri işlemeyi İnternet kenarına taşıdı. Yapay zeka, IoT ve 5G ağları yaşamımızı 
                şekillendiriyor.
            </p>
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
