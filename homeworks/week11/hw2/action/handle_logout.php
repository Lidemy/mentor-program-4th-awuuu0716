<?php 
  session_start();
  session_destroy();
  setcookie("csrftoken","", time() - 3600 * 365,"/");
  header("Location: ../index.php");
?>