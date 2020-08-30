<?php
// 阻止沒有存取權限偷跑進來的人
if (empty($_SESSION["access_level"]) || $_SESSION["access_level"] !== "ilovecodingloveme") {
  header("Location:index.php");
  die("88888");
}
?>