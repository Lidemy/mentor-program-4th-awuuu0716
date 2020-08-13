<?php 
  require_once("utlis.php");
  $nickname = $_POST["nickname"];
  $comment = $parsedown->line($_POST["comment"]);
  $sql = sprintf(
  "INSERT INTO `Awu_comments` (`nickname`, `comment`) VALUES ('%s', '%s');",
    $nickname,
    $comment
   );

  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: index.php")
?>
