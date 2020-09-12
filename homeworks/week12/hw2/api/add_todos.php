<?php
require_once("../utils/utils.php");

if(empty($_POST["todos"]) ) {
  header("Location:../index.php");
  die();
}
// 如果 cookie 沒有 id
if(empty($_COOKIE["id"])) {

  $sql = "INSERT INTO `Awu_api_todo` (`todos`) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $_POST["todos"]);
  $result = $stmt->execute();

  $sql = "SELECT @@IDENTITY as id";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $id = $result->fetch_assoc()["id"];

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
    "message" => "Add todos success!"
  );

  // id 存進 cookie 以便下次重開使用
  setcookie("id", $id, time() + 3600 * 24 * 365, "/");
  $response = json_encode($json);
  echo $response;

} else {
  // 如果 cookie 內有 id
  $sql = "UPDATE `Awu_api_todo` SET `todos` = ? WHERE (`id` = ?);";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $_POST["todos"], $_COOKIE["id"]);
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
    "message" => "Add todos success!"
  );
  $response = json_encode($json);
  echo $response;
}

?>
