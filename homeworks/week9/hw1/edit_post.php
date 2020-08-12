<?php
  require_once("utlis.php");
  $token = $_COOKIE["token"];
  $token_sql = sprintf("SELECT `nickname` FROM Awu_users WHERE token='%s'", $token);
  $getNickname = $conn->query($token_sql);
  $nickname = $getNickname->fetch_assoc()['nickname'];
  $post_id = $_POST['id'];

  // 拿文章內容
  $token_sql = sprintf("SELECT `comment` FROM Awu_comments WHERE id='%s'", $post_id);
  $getPost = $conn->query($token_sql);
  $postContent = $getPost->fetch_assoc()['comment'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/normalize.css">
  <script src="js/index.js"></script>
  </link>
</head>

<body>
  <nav class="navbar">
    <a class="log__out" href="handle_log_out.php">登出</a>
    <a class="home" href="/hw1/index.php">首頁</a>
    <div class="user__name">
      <div class="user__avatar__small"></div>
      <?php echo $nickname ?>
    </div>
  </nav>
  <section class="user__operating">
    <div class="add__post__title">編輯貼文</div>
    <form class="input__form" action="handle_edit_post.php" method="post">
      <input name="id" type="text" hidden value=<?php echo $post_id ?>>
      <input name="comment" type="text" hidden value="" id="comment">
      <div class="add__post__content" contenteditable="true"><?php echo $postContent ?></div>
      <div class="submit__wrapper">
        <input class="btn__submit" type="submit" value="發佈貼文">
      </div>
    </form>
  </section>



</body>

</html>