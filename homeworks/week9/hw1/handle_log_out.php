<?php 
  setcookie("token", "", time() - 3600 * 24 * 30);
  header("Location: index.php");
?>
