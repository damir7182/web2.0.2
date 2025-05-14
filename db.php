<?php
$host = 'localhost';
$dbname = 'english_master';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Дерекқорға қосылу мүмкін емес: " . $e->getMessage());
}

// Пайдаланушыны аутентификациялау
function authenticateUser($email, $password) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }
    
    return false;
}

// Жаңа пайдаланушыны тіркеу
function registerUser($name, $email, $password) {
    global $pdo;
    
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    return $stmt->execute([$name, $email, $hashedPassword]);
}

// Сабақтарды алу
function getLessons($level) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM lessons WHERE level = ? ORDER BY order_num");
    $stmt->execute([$level]);
    return $stmt->fetchAll();
}
?>