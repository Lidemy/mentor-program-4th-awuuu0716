<?php 
  require_once("utlis.php");
  
  $username = $_POST["username"];
  $password = $_POST["password"];
  $sql = sprintf(
    "SELECT `token` FROM `Awu_users` WHERE username='%s' and password='%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  } 
  if($result->num_rows === 0) {
    die('帳號密碼錯誤');
  }
  $token = $result->fetch_assoc()["token"];
  setcookie("token", $token, time() + 3600 * 24 * 30);
  header("Location: index.php");
?>
