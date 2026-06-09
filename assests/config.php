<?php
$host = "localhost";
$user = "root";
$pass = ""; // şifre varsa buraya yaz
$db   = "Tech-Timeline"; // senin veritabanı adı
$port = 3307; // senin MySQL port ayarın

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}
?>
