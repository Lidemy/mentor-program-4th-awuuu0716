<?php 
  session_start();
  require_once("../utils/utils.php");
  $username = $_SESSION["username"];
  $nickname = $_POST["nickname"];
  $comment = $_POST["comment"];
  $sql = "INSERT INTO `Awu_comments` (`nickname`, `comment`, `username`) VALUES (?, ?, ?)";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param("sss", $nickname, $comment, $username);
  $result = $stmt -> execute();
  
  if (!$result) {
    die($conn -> error);
  } 

  header("Location: ../index.php")
?>
