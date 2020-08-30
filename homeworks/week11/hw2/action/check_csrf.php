<?php
if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
  die("88888");
}
?>