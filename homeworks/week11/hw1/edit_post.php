<?php
session_start();
require_once("utils/utils.php");
require_once("action/check_baduser.php");
$username = $_SESSION["username"];



$sql = "SELECT `nickname` FROM Awu_users WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$result = $stmt->execute();
$result = $stmt->get_result();

$nickname = $result->fetch_assoc()['nickname'];
$post_id = $_POST['id'];

// 拿文章內容
$sql = "SELECT `comment` FROM Awu_comments WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $post_id);
$getPost = $stmt->execute();
$getPost = $stmt->get_result();

$postContent = $getPost->fetch_assoc()['comment'];

// 設置 csrftoken
if (!empty($_COOKIE["csrftoken"])) {
  $csrftoken = $_COOKIE["csrftoken"];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/normalize.css">
  <script type="module" src="js/edit_post.js"></script>
</head>

<body>
  <nav class="navbar">
    <a class="log__out" href="action/handle_log_out.php">登出</a>
    <a class="home" href="/hw1/index.php">首頁</a>
    <div class="user__name">
      <div class="user__avatar__small"></div>
      <?php echo htmlspecialchars($nickname) ?>
    </div>
  </nav>
  <section class="user__operating">
    <div class="add__post__title">編輯貼文</div>
    <form class="input__form" action="action/handle_edit_post.php" method="post">
      <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
      <input name="id" type="text" hidden value=<?php echo $post_id ?>>
      <textarea class="add__post__content" rows="15" name="comment"><?php echo htmlspecialchars($postContent); ?></textarea>
      <div class="submit__wrapper">
        <input class="btn__submit submit__active" type="submit" value="發佈貼文">
      </div>
    </form>
  </section>
  <div class="filter"></div>


</body>

</html>