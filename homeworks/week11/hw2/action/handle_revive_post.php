<?php
  require_once("../utils/utils.php");
  require_once("./check_admin.php");
  require_once("./check_csrf.php");

  $id = $_POST["id"];
  $sql = "UPDATE `Awu_posts` SET `deleted` = 0 WHERE `id`= ?";

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