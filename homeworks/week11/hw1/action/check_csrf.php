<?php
if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
  header("Location:index.php");
  die("88888");
}
?>