<?php
  session_start();
  require_once("../utils/utils.php");
  
  $id = $_POST["id"];
  $username = $_SESSION['username'];
  $level = $_SESSION['level'];

  if ($level == "admin") {
    $sql = "DELETE FROM `Awu_comments` WHERE id=?";
  } else {
    $sql = "DELETE FROM `Awu_comments` WHERE id=? and username=?";
  }

  $stmt = $conn->prepare($sql);

  if (!$stmt) {
    header("Location: ../index.php?errcode=1");
    die();
  }

  if ($level == "admin") {
    $stmt->bind_param("s", $id);
  } else {
    $stmt->bind_param("ss", $id, $username);
  }

  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: ../index.php")
?>
