<?php
  session_start();
  require_once("../utils/utils.php");
  require_once("./check_csrf.php");
  
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