<?php
require_once("../utils/utils.php");

if(empty($_POST["id"]) ) {
  header("Location:../index.php");
  die();
}
$id = $_POST["id"];
$sql = "SELECT * FROM `Awu_api_todo` WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_POST["id"]);
$result = $stmt->execute();
$result = $stmt->get_result();

if (!$result) {
  $json = array(
    "ok" => false,
    "message" => "Please try again"
  );
  $response = json_encode($json);
  echo $response;
  die();
}
$row = $result->fetch_assoc();
setcookie("id", $id, time() + 3600 * 24 * 365, "/");
echo $row["todos"];
