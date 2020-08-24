<?php
  session_start();
  require_once("../utils/utils.php");

  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }
  
  $id = $_POST["id"];
  $level = $_SESSION["level"];
  $change_level = $_POST["level"];

  if ($level !== "admin") {
    header("Location: ../index.php");
  }

  $sql = "UPDATE `Awu_users` SET `level` = ? WHERE (`id` = ?)";
 
  $stmt = $conn->prepare($sql);

  if (!$stmt) {
    header("Location: ../admin_users.php?errcode=1");
    die();
  }

  $stmt->bind_param("ss", $change_level, $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: ../admin_users.php")
?>