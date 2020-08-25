<?php
session_start();

// 阻止沒有存取權限偷跑進來的人
if (empty($_SESSION["access_level"]) || $_SESSION["access_level"] !== "ilovecodingloveme") {
  die("88888");
}
require_once("utils/utils.php");
$sql = "select id, title, date, deleted from Awu_posts order by id desc;";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
$result = $stmt->get_result();
$csrftoken = $_COOKIE["csrftoken"];
?>
<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">

  <title>管理後台</title>
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
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="#">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>

  <!-- banner -->
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <!-- container-wrapper -->
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">

        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="admin-post">
            <div class="admin-post__title">
              <?php echo htmlspecialchars($row["title"]) ?>
              <?php if ($row["deleted"] === 1) { ?>
                (已隱藏)
              <?php } ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo $row["date"] ?>
              </div>
              <a class="admin-post__btn" href="edit.php?id=<?php echo $row["id"] ?>">
                編輯
              </a>
              <form action="action/handle_delete_post.php" method="POST">
                <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
                <input type="hidden" name="id" value="<?php echo $row["id"] ?>">
                <input type="submit" value="刪除" class="admin-post__btn">
              </form>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>

  <!-- footer -->
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>