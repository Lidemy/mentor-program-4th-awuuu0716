<?php 
  session_start();
  require_once("../utils/utils.php");
  $username = htmlspecialchars($_POST["username"]);
  $nickname = htmlspecialchars($_POST["nickname"]);
  $password = $_POST["password"];
  $level = "general";
  if (empty($username) || empty($nickname) || empty($password)) {
    header("Location: ../sign_up.php?errcode=1");
    die();
  }
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $sql = "INSERT INTO `Awu_users` (`username`, `nickname`, `password`, `level`) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt -> bind_param("ssss", $username, $nickname, $password, $level);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $_SESSION['username'] = $username;
  $_SESSION['level'] = $level;
  // 設置 csrftoken
  $csrftoken = generateToken(10);
  setcookie("csrftoken", $csrftoken, time() + 3600 * 24, "/");
  header("Location: ../index.php");
?>
