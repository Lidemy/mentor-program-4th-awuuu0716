<?php
require_once("utils/utils.php");
$sql = "SELECT * FROM Awu_posts WHERE deleted = 0 ORDER BY id DESC";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
$result = $stmt->get_result();

?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Awu's 部落格</title>
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
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="login.php">登入</a></li>
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

    <div class="posts">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <article class="post">
          <div class="post__header">
            <div>
              <?php echo htmlspecialchars($row["title"]) ?>
            </div>
            <div class="post__actions">
              <a class="post__action" href="edit.php?id=<?php echo $row["id"] ?>">編輯</a>
            </div>
          </div>
          <div class="post__info">
            <?php echo $row["date"] ?>
          </div>
          <div class="post__content">
            <?php echo htmlspecialchars($row["content"]) ?>
          </div>
          <a class="btn-read-more" href="blog.php?id=<?php echo $row["id"] ?>">READ MORE</a>
        </article>

      <?php } ?>
    </div>
  </div>

  <!-- footer -->
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

</body>

</html>