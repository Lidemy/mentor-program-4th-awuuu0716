<?php 
  require_once("conn.php");
  $username = $_POST["username"];
  $nickname = $_POST["nickname"];
  $password = $_POST["password"];
  $sql = sprintf(
    "INSERT INTO `Awu_users` (`username`, `nickname`, `password`) VALUES ('%s', '%s', '%s');",
    $username,
    $nickname,
    $password
  );

  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: index.php");
?>
