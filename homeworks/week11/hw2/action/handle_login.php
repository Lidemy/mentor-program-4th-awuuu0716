<?php 
  require_once("../utils/utils.php");
  
  $username = $_POST["username"];
  $password = $_POST["password"];

  // 檢查帳號
  $sql = "SELECT `password` FROM `Awu_blog_admin` WHERE username=?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param("s", $username);
  $result = $stmt -> execute();
  
  if(!$result) {
    header("Location:../login.php?error=1");
    die($conn -> error);
  }

  $result = $stmt -> get_result();

  if($result -> num_rows === 0) {
    header("Location:../login.php?error=1");
    die();
  }

  $row = $result->fetch_assoc();
  $password_hash = $row['password'];

  // 驗證密碼
  if(!password_verify($password, $password_hash)) {
    header("Location:../login.php?error=1");
    die();
  } 

  // session
  $_SESSION['access_level'] = "ilovecodingloveme";

  // 設置 csrftoken
  $csrftoken = generateToken(10);
  setcookie("csrftoken", $csrftoken, time() + 3600 * 24, "/");
  header("Location: ../index.php");
