<?php
  require_once("../utils/utils.php");
  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }
  
  $id = $_POST['id'];
  $comment = $_POST["comment"];

  $sql = "UPDATE `Awu_comments` SET `comment` = ? WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $comment, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: ../index.php")


?>