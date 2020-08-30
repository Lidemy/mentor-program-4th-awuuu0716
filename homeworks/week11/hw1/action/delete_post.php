<?php
  session_start();
  require_once("../utils/utils.php");
  require_once("action/check_baduser.php");
  require_once("./check_csrf.php");

  $id = $_POST["id"];
  $username = $_SESSION['username'];
  $level = $_SESSION['level'];

  if ($level == "admin") {
    $sql = "UPDATE `Awu_comments` SET `deleted` = '1' WHERE (`id` = ?)";
  } else {
    $sql = "UPDATE `Awu_comments` SET `deleted` = '1' WHERE id=? and username=?";
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
