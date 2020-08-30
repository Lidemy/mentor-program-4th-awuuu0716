<?php
require_once("utils/utils.php");
$is_login = isset($_SESSION["access_level"]) && $_SESSION["access_level"] === "ilovecodingloveme";
?>
<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;600&display=swap" rel="stylesheet">

</head>

<body>
  <!-- navbar -->
  <?php require_once("navbar.php") ?>

  <div class="login-wrapper">
    <h2>Login</h2>
    <?php if (!empty($_GET["error"]) && $_GET["error"] == 1) { ?>
      <div class="account__error">帳號密碼錯誤</div>
    <?php } ?>
    <form action="action/handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>

      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type='submit' value="登入" />
    </form>

  </div>
</body>

</html>