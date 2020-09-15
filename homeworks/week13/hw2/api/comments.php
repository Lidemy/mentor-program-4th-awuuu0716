<?php 
require_once("../utils/utils.php");
$site = $_GET["site"];
$offset = empty($_GET["offset"]) ? 0 : $_GET["offset"];
$sql = "SELECT * FROM Awu_api_comments WHERE site=? ORDER BY id DESC limit 9 offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $site, $offset);
$result = $stmt->execute();
$json = array();

if (!$result) {
  header("Location:index.html");
  die($conn->error);
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
  $response = json_encode($json);
  echo $response;
  die();
}

while ($row = $result->fetch_assoc()) {
  array_push($json,$row);
}

$response = json_encode($json);
echo $response;
?>