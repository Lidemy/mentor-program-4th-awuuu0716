<?php
  require_once("utlis.php");
  $id = $_POST['id'];
  $comment = $parsedown->line($_POST["comment"]);

  $sql = sprintf("UPDATE `Awu_comments` SET `comment` = '%s' WHERE `id` = '%s'",
    $comment,
    $id);

  $result = $conn->query($sql);

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")


?>