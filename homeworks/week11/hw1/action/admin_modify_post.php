<?php
  session_start();
  require_once("../utils/utils.php");
  require_once("./check_csrf.php");
  
  $id = $_POST["id"];
  $level = $_SESSION['level'];
  $deleted = $_POST["deleted"];
  
  if ($level !== "admin") {
    header("Location: ../index.php");
  }

  if($deleted == 0) {
    $sql = "UPDATE `Awu_comments` SET `deleted` = '1' WHERE (`id` = ?)";
  } else if ($deleted == 1 ){
    $sql = "UPDATE `Awu_comments` SET `deleted` = '0' WHERE (`id` = ?)";
  } else {
    header("Location: ../index.php?errorcode=1");
  }

  $stmt = $conn->prepare($sql);

  if (!$stmt) {
    header("Location: ../admin_post.php?errcode=1");
    die();
  }

  $stmt->bind_param("s", $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: ../admin_post.php")
?>