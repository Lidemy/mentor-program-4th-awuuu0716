<?php 
  session_start();
  require_once("../utils/utils.php");
  
  $username = $_POST["username"];
  $password = $_POST["password"];

  // 檢查帳號
  $sql = "SELECT `password`, `level` FROM `Awu_users` WHERE username=?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param("s", $username);
  $result = $stmt -> execute();
  
  if(!$result) {
    header("Location:../log_in.php?error=tjhji4xk7");
    die($conn -> error);
  }

  $result = $stmt -> get_result();

  if($result -> num_rows === 0) {
    header("Location:../log_in.php?error=tjhji4xk7");
    die();
  }

  $row = $result->fetch_assoc();
  $password_hash = $row['password'];
  $level = $row['level'];
  // 驗證密碼
  if(!password_verify($password, $password_hash)) {
  header("Location:../log_in.php?error=tjhji4xk7");
  die();
  } 

  // session
  $_SESSION['username'] = $username;
  $_SESSION['level'] = $level;

  // 設置 csrftoken
  $csrftoken = generateToken(10);
  setcookie("csrftoken", $csrftoken, time() + 3600 * 24, "/");
  header("Location: ../index.php");
?>
