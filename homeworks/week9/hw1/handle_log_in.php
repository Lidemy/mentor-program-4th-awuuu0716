<?php 
  require_once("conn.php");
  $username = $_POST["username"];
  $password = $_POST["password"];
  $sql = sprintf(
    "SELECT * FROM `Awu_users` WHERE username='%s' and password='%s'",
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

  header("Location: index.php");
?>
