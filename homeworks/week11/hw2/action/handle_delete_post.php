<?php
  session_start();

  // 阻止沒有存取權限偷跑進來的人
  if (empty($_SESSION["access_level"]) || $_SESSION["access_level"] !== "ilovecodingloveme") {
    die("88888");
  }
  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }

  require_once("../utils/utils.php");
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