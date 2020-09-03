<?php 
if($_SESSION["level"] === "bad_user") {
header("Location:index.php");
die("88888");
}
?>