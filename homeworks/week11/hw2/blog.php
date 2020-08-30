<?php
require_once("utils/utils.php");

if (empty($_GET["id"])) {
  header("Location:index.php");
  die("缺少文章 id!");
}

$id = $_GET["id"];
$sql = "select * from Awu_posts where id =?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
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
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Awu's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="index.php">首頁</a></li>
          <li><a href="category.php">分類專區</a></li>
        </div>
        <div>
          <?php if ($is_login) { ?>
            <li><a href="admin.php">管理後台</a></li>
            <li><a href="action/handle_logout.php">登出</a></li>
          <?php } else { ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>

  <!-- container-wrapper -->
  <div class="container-wrapper">
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div class="post__header-title post__header-title-all">
            <?php echo htmlspecialchars($row["title"]) ?>
          </div>
          <div class="post__actions">
            <?php if ($is_login) { ?>
              <a class="post__action" href="edit.php?id=<?php echo $row["id"] ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo $row["date"] ?>
        </div>
        <div class="post__content post__content-all">
          <?php echo $row["content"] ?>
        </div>
      </article>
    </div>
  </div>

  <!-- btn__to-top -->
  <a href="#top" class="btn__to-top">Top</a>

  <!-- footer -->
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>