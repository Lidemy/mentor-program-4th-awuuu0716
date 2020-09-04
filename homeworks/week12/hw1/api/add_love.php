<?php 
require_once("../utils/utils.php");

if(empty($_POST["id"]) || empty($_POST["newLoveNum"])) {
  header("Location:index.html");
  die();
}

$sql = "UPDATE `mtr04group2`.`Awu_api_comments` SET `love` = ? WHERE (`id` = ?);";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $_POST["newLoveNum"], $_POST["id"]);
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
  "message" => "Add love success"
);
$response = json_encode($json);
echo $response;
