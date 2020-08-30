<?php
require_once("utils/utils.php");
$offset = empty($_GET["offset"]) ? 0 : $_GET["offset"];
$posts_per_page = 5;
$sql = "SELECT * FROM Awu_posts WHERE deleted = 0 ORDER BY id DESC limit ? offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $posts_per_page, $offset);
$result = $stmt->execute();
$result = $stmt->get_result();
$posts_amount = $result->num_rows;
$pagination_num = ceil($posts_amount / 5);
$is_login = isset($_SESSION["access_level"]) && $_SESSION["access_level"] === "ilovecodingloveme";
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Awu's 部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;600&display=swap" rel="stylesheet">
</head>

<body>
  <!-- navbar -->
<?php require_once("navbar.php")?>

  <!-- container-wrapper -->
  <div class="container-wrapper">
    <div class="posts">
      <?php while ($row = $result->fetch_assoc()) { ?>

        <article class="post">
          <div class="post__header">
            <div class="post__header-title">
              <a href="blog.php?id=<?php echo $row["id"] ?>">
                <?php echo htmlspecialchars($row["title"]) ?>
              </a>
            </div>
            <div class="post__actions">
              <?php if ($is_login) { ?>
                <a class="post__action" href="edit.php?id=<?php echo $row["id"] ?>">編輯</a>
              <?php } ?>
            </div>
          </div>
          <div class="post__info">
            <div> <?php echo $row["date"] ?></div>
            <div> Tags: <?php echo htmlspecialchars($row["tags"]) ?></div>

          </div>
          <div class="post__content">
            <?php echo $row["content"] ?>
          </div>
          <a class="btn-read-more" href="blog.php?id=<?php echo $row["id"] ?>">READ MORE</a>
        </article>

      <?php } ?>
    </div>
  </div>
  <!-- pagination -->
  <div class="pagination__wrapper">
    <?php
    $sql = "SELECT * FROM Awu_posts WHERE deleted = 0 ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $posts_amount = $result->num_rows;
    $pagination_num = ceil($posts_amount / 5);
    $now_page = $offset == 0 ? 1 : ($offset / 5)+1;
    ?>
    <div class="page__now">第 <?php echo $now_page ?> 頁</div>
    <?php for ($i = 1; $i <= $pagination_num; $i += 1) { ?>
      <a class="page__num" href="index.php?offset=<?php echo ($i - 1) * 5 ?>">
        <?php echo $i ?>
      </a>
    <?php } ?>
  </div>

  <!-- btn__to-top -->
  <a href="#top" class="btn__to-top">Top</a>

  <!-- footer -->
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

</body>

</html>