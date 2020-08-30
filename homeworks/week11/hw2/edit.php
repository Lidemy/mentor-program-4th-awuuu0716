<?php
require_once("utils/utils.php");
require_once("action/check_admin.php");
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
$is_login = isset($_SESSION["access_level"]) && $_SESSION["access_level"] === "ilovecodingloveme";
$csrftoken = $_COOKIE["csrftoken"];
?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="js/ckeditor/ckeditor.js"></script>
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;600&display=swap" rel="stylesheet">
</head>

<body>
  <!-- navbar -->
  <?php require_once("navbar.php") ?>

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
            <input class="edit-post__input" name="tags" placeholder="請輸入文章標籤" value="<?php echo isset($row) ? $row["tags"] : "" ?>" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?php echo isset($row) ? htmlspecialchars($row["content"]) : "" ?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input class="edit-post__btn" type="submit" value="送出"></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  <script>
    CKEDITOR.replace('content');
  </script>
</body>

</html>