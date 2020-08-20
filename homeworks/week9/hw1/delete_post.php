<?php 
  require_once("utlis.php");
  
  $id = $_POST["id"];
  $sql = sprintf("DELETE FROM `Awu_comments` WHERE id=%s",$id);

  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  } 

  header("Location: index.php")
?>
