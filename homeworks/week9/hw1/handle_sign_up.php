<?php 
  require_once("utlis.php");
  
  $username = $_POST["username"];
  $nickname = $_POST["nickname"];
  $password = $_POST["password"];
  $token = generateToken(16);

  $sql = sprintf(
    "INSERT INTO `Awu_users` (`username`, `nickname`, `password`,`token`) VALUES ('%s', '%s', '%s', '%s');",
    $username,
    $nickname,
    $password,
    $token
  );

  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
    echo $token;
  } 
  setcookie("token",$token, time() + 3600 * 24 * 30);
  header("Location: index.php");
?>
