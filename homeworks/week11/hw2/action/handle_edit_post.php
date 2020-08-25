<?php 
  require_once("../utils/utils.php");
  
  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    die("88888");
  }

  if (!empty($_POST["id"])) {
    $id = $_POST["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    
    $sql = "UPDATE `Awu_posts` SET `title` = ?, `content` = ?, `deleted` = 0 WHERE (`id` = ?)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param("ssi", $title, $content, $id);
    $result = $stmt -> execute();
    
    if (!$result) {
      die($conn->error);
    }
    header("Location: ../index.php");

  } else {
    $title = $_POST["title"];
    $content = $_POST["content"];

    $sql = "INSERT INTO `Awu_posts` (`title`, `content`, `deleted`) VALUES (?, ?, 0)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $title, $content);
    $result = $stmt->execute();

    if (!$result) {
      die($conn->error);
    }

    header("Location: ../index.php");
  }
  
 
?>