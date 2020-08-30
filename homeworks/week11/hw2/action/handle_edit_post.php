<?php
  require_once("../utils/utils.php");
  require_once("./check_admin.php");
  require_once("./check_csrf.php");

  if (!empty($_POST["id"])) {
    // 帶 id 進來代表要編輯文章
    $id = $_POST["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $tags = $_POST["tags"];
    
    $sql = "UPDATE `Awu_posts` SET `title` = ?, `content` = ?, `deleted` = 0, `tags` = ? WHERE (`id` = ?)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param("sssi", $title, $content, $tags, $id);
    $result = $stmt -> execute();
    
    if (!$result) {
      die($conn->error);
    }
    header("Location: ../blog.php?id=$id");

  } else {
    // 沒帶 id 為新增文章
    $title = $_POST["title"];
    $content = $_POST["content"];
    $tags = $_POST["tags"];

    $sql = "INSERT INTO `Awu_posts` (`title`, `content`, `deleted`, `tags`) VALUES (?, ?, 0, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $title, $content, $tags);
    $result = $stmt->execute();

    if (!$result) {
      die($conn->error);
    }

    header("Location: ../index.php");
  }
  
 
?>