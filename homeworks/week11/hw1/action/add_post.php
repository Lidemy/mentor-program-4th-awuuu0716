<?php 
  session_start();
  require_once("../utils/utils.php");

  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }

  $username = $_SESSION["username"];
  $nickname = $_POST["nickname"];
  $comment = $_POST["comment"];
  

  $sql = "INSERT INTO `Awu_comments` (`nickname`, `comment`, `username`, `deleted`) VALUES (?, ?, ?, 0)";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param("sss", $nickname, $comment, $username);
  $result = $stmt -> execute();
  
  if (!$result) {
    die($conn -> error);
  } 

  header("Location: ../index.php")
?>
