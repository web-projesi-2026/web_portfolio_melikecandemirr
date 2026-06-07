<?php
session_start();
$host = "localhost";
$user = "root";
$pass = "";
$db_name = "tech_timeline";

try {
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Veritabanı bağlantı hatası: " . $e->getMessage());
}

// 1. KULLANICI GİRİŞ YAPMA
if (isset($_POST['giris_yap'])) {
    $email = trim($_POST['email']);
    $sifre = trim($_POST['sifre']);
    
    $sorgu = $db->prepare("SELECT * FROM kullanicilar WHERE email = ?");
    $sorgu->execute([$email]);
    $user = $sorgu->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($sifre, $user['sifre'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['isim'];
        $_SESSION['toast_msg'] = "Hoş geldiniz, " . $user['isim'] . "! Girişiniz güvenle doğrulandı. 🔐";
        header("Location: index.php");
        exit;
    } else { $hata = "E-posta veya şifre hatalı!"; }
}

// 2. KULLANICI KAYIT OLMA
if (isset($_POST['kayit_ol'])) {
    $isim = trim($_POST['isim']);
    $email = trim($_POST['email']);
    $sifre = password_hash(trim($_POST['sifre']), PASSWORD_BCRYPT);
    
    try {
        $sorgu = $db->prepare("INSERT INTO kullanicilar (isim, email, sifre) VALUES (?, ?, ?)");
        $sorgu->execute([$isim, $email, $sifre]);
        $_SESSION['toast_msg'] = "Müze kaydınız başarıyla açıldı! Giriş yapabilirsiniz. 🎉";
        header("Location: index.php");
        exit;
    } catch (PDOException $e) { $hata = "Bu e-posta adresi zaten kayıtlı!"; }
}

// 3. VERİTABANINA VERİ EKLEME (CRUD - Create)
if (isset($_POST['robot_ekle']) && isset($_SESSION['user_id'])) {
    $baslik = trim($_POST['baslik']);
    $kategori = trim($_POST['kategori']);
    $yil = trim($_POST['yil']);
    $aciklama = trim($_POST['aciklama']);
    $resim = trim($_POST['resim']);
    
    $sorgu = $db->prepare("INSERT INTO robotlar (baslik, kategori, yil, aciklama, resim) VALUES (?, ?, ?, ?, ?)");
    $sorgu->execute([$baslik, $kategori, $yil, $aciklama, $resim]);
    $_SESSION['toast_msg'] = "Yeni robot veritabanına başarıyla eklendi! 💾";
    header("Location: index.php");
    exit;
}

// 4. VERİ GÜNCELLEME (CRUD - Update)
if (isset($_POST['robot_guncelle']) && isset($_SESSION['user_id'])) {
    $id = (int)$_POST['robot_id'];
    $baslik = trim($_POST['baslik']);
    $kategori = trim($_POST['kategori']);
    $yil = trim($_POST['yil']);
    $aciklama = trim($_POST['aciklama']);
    $resim = trim($_POST['resim']);
    
    $sorgu = $db->prepare("UPDATE robotlar SET baslik = ?, kategori = ?, yil = ?, aciklama = ?, resim = ? WHERE id = ?");
    $sorgu->execute([$baslik, $kategori, $yil, $aciklama, $resim, $id]);
    $_SESSION['toast_msg'] = "Robot verileri başarıyla güncellendi! 🔄";
    header("Location: index.php");
    exit;
}

// 5. VERİ SİLME (CRUD - Delete)
if (isset($_GET['sil']) && isset($_SESSION['user_id'])) {
    $id = (int)$_GET['sil'];
    $sorgu = $db->prepare("DELETE FROM robotlar WHERE id = ?");
    $sorgu->execute([$id]);
    $_SESSION['toast_msg'] = "Robot kaydı veritabanından kalıcı olarak silindi. 🗑️";
    header("Location: index.php");
    exit;
}

// KULLANICI ÇIKIŞ YAPMA
if (isset($_GET['cikis'])) {
    session_destroy();
    session_start();
    $_SESSION['toast_msg'] = "Oturum sonlandırıldı. Güvenle çıkış yaptınız! 🚪";
    header("Location: index.php");
    exit;
}

// VERİTABANINDAN VERİ LİSTELEME (CRUD - Read)
$robotlar = $db->query("SELECT * FROM robotlar ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech-Timeline | Dijital Müze Sergi ve Yönetim Sistemi</title>
    <link rel="stylesheet" href="assests/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="toast-favourite" style="display: none; position: fixed; bottom: 25px; right: 25px; background: #00592D; color: white; padding: 16px 28px; border-radius: 10px; z-index: 99999; font-weight: bold; box-shadow: 0 5px 20px rgba(0,0,0,0.3); border-left: 5px solid #d4af37; transition: all 0.4s ease-in-out; opacity: 0; transform: translateY(20px);"></div>

    <?php if (isset($_SESSION['toast_msg'])): ?>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                if(typeof window.gosterToast === 'function') { window.gosterToast('<?= $_SESSION['toast_msg'] ?>'); }
            });
        </script>
    <?php unset($_SESSION['toast_msg']); endif; ?>

    <header class="header">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">⚙️</span>
                <div class="logo-text"><h1>TECH-TIMELINE</h1><p>Dijital Müze</p></div>
            </div>
            <nav class="navigation">
                <div class="menu-toggle" id="mobile-menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link active">Ana Sayfa</a></li>
                    <li><a href="pages/about.html" class="nav-link">Hakkımda</a></li>
                    <li><a href="pages/project.html" class="nav-link">Projeler</a></li>
                    <li><a href="pages/contact.html" class="nav-link">İletişim</a></li>
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <li><a href="pages/favorites.html" class="nav-link">❤️ Favorilerim</a></li>
                        <li><a href="?cikis=1" class="nav-link" style="color:#ff7675;">Vkış (<?= $_SESSION['user_name'] ?>)</a></li>
                    <?php endif; ?>
                </ul>
                <button id="theme-toggle" class="theme-btn">🌙 Koyu Tema</button>
            </nav>
        </div>
    </header>

    <main style="padding: 2rem 10%;">
        <section id="weather-section" class="weather-card" style="background: linear-gradient(135deg, #00592D, #008943); color: white; padding: 20px; border-radius: 15px; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
            <div><h3>🌤️ Kahramanmaraş Afşin Hava Durumu (Canlı API)</h3><p id="weather-desc">Müze iklim verileri yükleniyor...</p></div>
            <h1 id="weather-temp" style="font-size: 2.5rem; margin: 0;">--°C</h1>
        </section>

        <section style="margin: 3rem 0; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
                <h2 style="font-size: 2.5rem; color: #00592D;">Geleceğin Teknolojisini Keşfedin</h2>
                <p style="margin: 1rem 0 2rem; color: #666; line-height: 1.6;">Veritabanı kontrollü ve API destekli dijital müze otomasyon sistemine hoş geldiniz.</p>
                <div style="display: flex; gap: 15px;">
                    <a href="pages/project.html" style="background: #00592D; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold;">💻 Keşfetmeye Başla</a>
                    <a href="pages/contact.html" style="border: 2px solid #00592D; color: #00592D; padding: 10px 22px; border-radius: 25px; text-decoration: none; font-weight: bold;">✨ Bize Ulaşın 🤗</a>
                </div>
            </div>
        </section>

        <?php if(isset($hata)): ?><div style="background:#ff7675; color:white; padding:15px; border-radius:8px; margin-bottom:1rem; font-weight:bold;"><?= $hata ?></div><?php endif; ?>

        <?php if(!isset($_SESSION['user_id'])): ?>
            <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 3rem;">
                <div class="form-box">
                    <h3>🔐 Üye Girişi</h3>
                    <form method="POST" style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
                        <div class="form-group"><span>📧</span><input type="email" name="email" placeholder="E-posta Adresi" required></div>
                        <div class="form-group"><span>🔑</span><input type="password" name="sifre" placeholder="Şifre" required></div>
                        <button type="submit" name="giris_yap" style="background:#00592D; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Giriş Yap 🚀</button>
                    </form>
                </div>
                <div class="form-box">
                    <h3>📝 Yeni Kayıt</h3>
                    <form method="POST" style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
                        <div class="form-group"><span>👤</span><input type="text" name="isim" placeholder="Tam Adınız" required></div>
                        <div class="form-group"><span>📧</span><input type="email" name="email" placeholder="E-posta Adresi" required></div>
                        <div class="form-group"><span>🔑</span><input type="password" name="sifre" placeholder="Şifre" required></div>
                        <button type="submit" name="kayit_ol" style="background:#d4af37; color:black; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Kayıt Ol ✨</button>
                    </form>
                </div>
            </section>
        <?php else: ?>
            <section class="form-box" style="margin-bottom: 3rem; border-left: 6px solid #00592D;">
                <h3>🛠️ Veritabanına Yeni Robot Ekle</h3>
                <form method="POST" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                    <div class="form-group"><span>🤖</span><input type="text" name="baslik" placeholder="Robot Adı" required></div>
                    <div class="form-group"><span>📂</span><input type="text" name="kategori" placeholder="Kategori" required></div>
                    <div class="form-group"><span>📅</span><input type="text" name="yil" placeholder="Üretim Yılı" required></div>
                    <div class="form-group"><span>🖼️</span><input type="text" name="resim" placeholder="Resim URL" required></div>
                    <div class="form-group" style="grid-column: 1/-1;"><span>📝</span><textarea name="aciklama" placeholder="Teknik Özellikleri" required style="height: 80px;"></textarea></div>
                    <button type="submit" name="robot_ekle" style="grid-column: 1/-1; background:#00592D; color:white; border:none; padding:12px; border-radius:5px; font-weight:bold; cursor:pointer;">Veritabanına Kaydet 💾</button>
                </form>
            </section>
        <?php endif; ?>

        <section style="text-align: center; margin-bottom: 2rem;">
            <input type="text" id="live-search" placeholder="🔍 Veritabanındaki robotlarda canlı ara..." style="width: 100%; max-width: 600px; padding: 15px 25px; border-radius: 30px; border: 2px solid #00592D; font-size: 1.1rem; outline: none; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        </section>

        <section id="robot-vitrini" class="card-grid">
            <?php foreach($robotlar as $robot): ?>
                <div class="card robot-item" data-title="<?= strtolower($robot['baslik']) ?>" data-desc="<?= strtolower($robot['aciklama']) ?>">
                    <img src="<?= $robot['resim'] ?>" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 20px; flex-grow: 1;">
                        <span style="background: #d4af37; padding: 3px 8px; border-radius: 5px; font-size: 0.8rem; font-weight: bold; color: black;"><?= $robot['kategori'] ?></span>
                        <h3 style="margin-top: 10px; color: #00592D;"><?= $robot['baslik'] ?></h3>
                        <p style="color:#666; font-size:0.9rem; line-height:1.5; margin-top:10px;"><?= $robot['aciklama'] ?></p>
                    </div>
                    <div style="padding: 20px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #555;">📅 <?= $robot['yil'] ?></span>
                        <div style="display: flex; gap: 8px;">
                            <?php if(isset($_SESSION['user_id'])): ?>
                                <button onclick="window.favoriKontrol('db-<?= $robot['id'] ?>', '<?= $robot['baslik'] ?>')" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:#e74c3c;">♡</button>
                                <button onclick="openEditForm(<?= $robot['id'] ?>)" style="background:#00592D; color:white; border:none; padding:5px 10px; border-radius:5px; font-weight:bold; cursor:pointer; font-size:0.85rem;">Düzenle 🔄</button>
                                <a href="?sil=<?= $robot['id'] ?>" onclick="return confirm('Bu kaydı silmek istiyor musunuz?')" style="background:#ff7675; color:white; text-decoration:none; padding:5px 10px; border-radius:5px; font-weight:bold; font-size:0.85rem;">Sil 🗑️</a>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div id="edit-form-<?= $robot['id'] ?>" style="display:none; padding:20px; background:#f9f9f9; border-top:2px solid #d4af37;">
                        <form method="POST">
                            <input type="hidden" name="robot_id" value="<?= $robot['id'] ?>">
                            <input type="text" name="baslik" value="<?= $robot['baslik'] ?>" required style="width:100%; padding:8px; margin-bottom:10px;">
                            <input type="text" name="kategori" value="<?= $robot['kategori'] ?>" required style="width:100%; padding:8px; margin-bottom:10px;">
                            <input type="text" name="yil" value="<?= $robot['yil'] ?>" required style="width:100%; padding:8px; margin-bottom:10px;">
                            <input type="text" name="resim" value="<?= $robot['resim'] ?>" required style="width:100%; padding:8px; margin-bottom:10px;">
                            <textarea name="aciklama" required style="width:100%; padding:8px; margin-bottom:10px; height:60px;"><?= $robot['aciklama'] ?></textarea>
                            <div style="display:flex; gap:10px;"><button type="submit" name="robot_guncelle" style="background:#2ecc71; color:white; border:none; padding:8px; cursor:pointer; flex-grow:1; font-weight:bold;">Kaydet</button><button type="button" onclick="closeEditForm(<?= $robot['id'] ?>)" style="background:#95a5a6; color:white; border:none; padding:8px; cursor:pointer;">İptal</button></div>
                        </form>
                    </div>
                </div>
            <?php endforeach; ?>
        </section>
    </main>

    <footer class="footer"><p>&copy; 2026 Melike Candemir | Ahi Evran Üniversitesi</p></footer>
    <script src="assests/js/main.js"></script>
    <script>
        document.getElementById('live-search').addEventListener('keyup', function(e) {
            const aramaMetni = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.robot-item').forEach(item => {
                if (item.getAttribute('data-title').includes(aramaMetni) || item.getAttribute('data-desc').includes(aramaMetni)) {
                    item.style.display = 'flex';
                } else { item.style.display = 'none'; }
            });
        });
        function openEditForm(id) { document.getElementById('edit-form-' + id).style.display = 'block'; }
        function closeEditForm(id) { document.getElementById('edit-form-' + id).style.display = 'none'; }
    </script>
</body>
</html>
