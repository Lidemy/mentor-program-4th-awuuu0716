<?php 
require_once("../utils/utils.php");

if(empty($_POST["nickname"]) || empty($_POST["comment"])) {
  header("Location:index.html");
  die();
}

$sql = "INSERT INTO `Awu_api_comments` (`nickname`, `comment`) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $_POST["nickname"], $_POST["comment"]);
$result = $stmt->execute();


if (!$result) {
  $json = array(
    "ok" => false,
    "message" => "Please try again"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$json = array(
  "ok" => true,
  "message" => "Add comment success"
);
$response = json_encode($json);
echo $response;
?>