<?php
  if (empty($_SESSION["level"]) || $_SESSION["level"] !== "admin") {
  header("Location: index.php");
  die("88888");
  }
?>