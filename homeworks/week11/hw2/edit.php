<?php
session_start();
require_once("utils/utils.php");

if (empty($_SESSION["access_level"]) || $_SESSION["access_level"] !== "ilovecodingloveme") {
  die("88888");
}

if (!empty($_GET["id"])) {
  $id = $_GET["id"];
  $sql = "select * from Awu_posts where id =?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    die("這裡沒有東西喔!");
  }
  $row = $result->fetch_assoc();
}

$csrftoken = $_COOKIE["csrftoken"];
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
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="#">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="action/handle_edit_post.php" method="POST">
          <input type="hidden" name="id" value="<?php echo isset($row) ? $row["id"] : null ?>" />
          <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" name="title" placeholder="請輸入文章標題" value="<?php echo isset($row) ? $row["title"] : "" ?>" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?php echo htmlspecialchars(isset($row) ? $row["content"] : "") ?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input class="edit-post__btn" type="submit" value="送出"></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>