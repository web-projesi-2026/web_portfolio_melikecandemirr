<?php
/* Proje: Tech-Timeline (Dijital Müze) 
   Geliştirici: Melike Candemir
*/
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech-Timeline | Dijital Müze</title>
    <link rel="stylesheet" href="assests/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
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
                <div class="menu-toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                
                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link">Ana Sayfa</a></li>
                    <li><a href="pages/zaman-tuneli.php" class="nav-link">Zaman Tüneli</a></li>
                    <li><a href="pages/icatlar.php" class="nav-link">İcatlar</a></li>
                    <li><a href="pages/iletisim.php" class="nav-link">İletişim</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <div class="hero-text">
                    <h2 class="hero-title">Teknoloji Tarihinin Yolculuğuna Hoş Geldiniz</h2>
                    <p class="hero-subtitle">Geçmişten geleceğe uzanan dijital bir yolculuk. İnsanlığın en büyük buluşlarını keşfedin.</p>
                    
                    <div class="hero-buttons">
                        <a href="pages/zaman-tuneli.php" class="btn btn-primary">
                            <span>💻</span> Keşfetmeye Başla
                        </a>
                        <a href="pages/iletisim.php" class="btn btn-secondary">
                            <span>✨</span> Bize Ulaşın <span>🤗</span>
                        </a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="floating-element">
                        <svg width="350" height="350" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="55" fill="none" stroke="#FFB81C" stroke-width="4"/>
                            <circle cx="60" cy="60" r="40" fill="none" stroke="#00592D" stroke-width="4"/>
                            <path d="M30 60 Q60 30 90 60 Q60 90 30 60" fill="none" stroke="#FFB81C" stroke-width="3"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>

        <section class="innovations">
            <div class="section-header">
                <h2>Tarih Boyunca Büyük İcatlar</h2>
                <p>Teknolojinin sınırlarını genişleten dönüm noktaları</p>
            </div>
            <div class="cards-grid">
                <div class="card"><h3>💻 Bilgisayar</h3><p>Dijital çağın temeli.</p></div>
                <div class="card"><h3>📱 Mobil</h3><p>Her an yanımızda.</p></div>
                <div class="card"><h3>🌐 İnternet</h3><p>Dünyayı bağlar.</p></div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2026 Tech-Timeline | Melike Candemir</p>
    </footer>

    <script src="assests/js/main.js"></script>
</body>
</html>
