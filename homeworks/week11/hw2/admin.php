<?php
require_once("utils/utils.php");
require_once("action/check_admin.php");
$offset = empty($_GET["offset"]) ? 0 : $_GET["offset"];
$posts_per_page = 10;
$sql = "select id, title, date, deleted from Awu_posts order by id desc;";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
$result = $stmt->get_result();
$csrftoken = $_COOKIE["csrftoken"];
$is_login = isset($_SESSION["access_level"]) && $_SESSION["access_level"] === "ilovecodingloveme";
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
  <?php require_once("navbar.php") ?>

  <!-- container-wrapper -->
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">

        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="admin-post">
            <div class="admin-post__title">

              <?php if ($row["deleted"]) { ?>
                <s>
                  <?php echo htmlspecialchars($row["title"]) ?>
                </s>
              <?php } else { ?>
                <?php echo htmlspecialchars($row["title"]) ?>
              <?php } ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo $row["date"] ?>
              </div>
              <a class="admin-post__btn" href="edit.php?id=<?php echo $row["id"] ?>">
                編輯
              </a>
              <form action="action/<?php echo $row["deleted"] ? "handle_revive_post.php" : "handle_delete_post.php" ?>" method="POST">
                <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
                <input type="hidden" name="id" value="<?php echo $row["id"] ?>">
                <?php if ($row["deleted"]) { ?>
                  <input type="submit" value="復原" class="admin-post__btn">
                <?php } else { ?>
                  <input type="submit" value="刪除" class="admin-post__btn">
                <?php } ?>
              </form>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>

  <!-- pagination -->
  <div class="pagination__wrapper">
    <?php
    $sql = "SELECT * FROM Awu_posts ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $posts_amount = $result->num_rows;
    $pagination_num = ceil($posts_amount / 10);
    $now_page = $offset == 0 ? 1 : ($offset / 10);
    ?>
    <div class="page__now">第 <?php echo $now_page ?> 頁</div>
    <?php for ($i = 1; $i <= $pagination_num; $i += 1) { ?>
      <a class="page__num" href="admin.php?offset=<?php echo ($i - 1) * 10 ?>">
        <?php echo $i ?>
      </a>
    <?php } ?>
  </div>

  <!-- footer -->
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>

</html>