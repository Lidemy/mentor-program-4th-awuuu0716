<?php
  require_once("../utils/utils.php");
  require_once("./check_csrf.php");
  
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