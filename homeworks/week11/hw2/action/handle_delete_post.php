<?php
  require_once("../utils/utils.php");
  
  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }
  $id = $_POST["id"];
  $sql = "UPDATE `Awu_posts` SET `deleted` = 1 WHERE `id`= ?";

  $stmt = $conn->prepare($sql);

  if (!$stmt) {
    die();
  }
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: ../admin.php")
?>