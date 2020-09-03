<?php
require_once("utils/utils.php");
$sql = "select id, title, date, tags from Awu_posts where deleted = 0 order by id desc";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
$result = $stmt->get_result();
$is_login = isset($_SESSION["access_level"]) && $_SESSION["access_level"] === "ilovecodingloveme";
?>
<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">

  <title>分類文章</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/style.css" />
  <script src="js/category.js" type="module"></script>
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
            <li><a href="edit.php">新增文章</a></li>
            <li><a href="admin.php">管理後台</a></li>
            <li><a href="action/handle_logout.php">登出</a></li>
          <?php } else { ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>

  <!-- tags-wrapper -->
  <div class="tags__wrapper">
    文章標籤：
  </div>
  <!-- container-wrapper -->
  <div class="container-wrapper container-wrapper__no-banner">

    <div class="container no-margin-top">
      <div class="admin-posts">

        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="admin-post" data-tags="<?php echo $row["tags"] ?>">
            <div class="admin-post__title">
              <a href="blog.php?id=<?php echo $row["id"] ?>">
                <?php echo htmlspecialchars($row["title"]) ?>
              </a>
            </div>
            <div class="post__tags">
              Tags:
              <?php echo htmlspecialchars($row['tags']) ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo $row["date"] ?>
              </div>
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