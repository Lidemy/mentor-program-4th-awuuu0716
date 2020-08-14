<?php
require_once("utlis.php");
$result = $conn->query("SELECT * FROM Awu_comments ORDER BY id DESC");

// 判斷有沒有登入與設置 nickname
if (isset($_COOKIE["token"])) {
  $token = $_COOKIE["token"];
  $token_sql = sprintf("SELECT `nickname` FROM Awu_users WHERE token='%s'", $token);
  $getNickname = $conn->query($token_sql);
  $isTokenValid = $getNickname->num_rows > 0;
  if ($isTokenValid) {
    $nickname = $getNickname->fetch_assoc()['nickname'];
    $isLogIn = true;
  } else {
    $nickname = "Guest";
    $isLogIn = false;
  }
} else {
  $nickname = "Guest";
  $isLogIn = false;
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
  <script type="module" src="js/index.js"></script>
  </link>
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <nav class="navbar">
    <?php if (!$isLogIn) { ?>
      <a class="log__in" href="log_in.php">登入</a>
      <a class="sign__up" href="sign_up.php">註冊</a>
    <?php } else { ?>
      <a class="log__out" href="handle_log_out.php">登出</a>
      <a class="home" href="index.php">首頁</a>
      <div class="user__name">
        <div class="user__avatar__small"></div>
        <?php echo $nickname ?>
      </div>
    <?php } ?>
  </nav>

  <section class="user__operating">
    <div class="add__post__title">建立貼文 (支援 MarkDown 格式, 歡迎測試)</div>
    <form class="input__form" action="add_post.php" method="post">
      <input name="nickname" type="text" hidden value=<?php echo $nickname ?>>
      <textarea name="comment" class="add__post__content" rows="15"></textarea>
      <div class="submit__wrapper">
        <?php if ($isLogIn) { ?>
          <input class="btn__submit" type="submit" value="發佈貼文">
        <?php } else { ?>
          <input class="btn__submit" type="submit" value="發佈貼文" hidden>
          <a class="to__log__in" href="log_in.php">登入後即可發文</a>
        <?php } ?>
      </div>
    </form>
  </section>

  <section class="comments comments__fliter__off">
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="comment__body">
        <div class="user__wrapper">
          <div class="user__avatar"></div>
          <div class="user__info">
            <div class="user__nickname"><?php echo $row["nickname"]; ?></div>
            <div class="user__time"><?php echo $row["date"]; ?></div>
          </div>
          <?php if ($row["nickname"] == $nickname && $isLogIn) { ?>
            <div class="more__action">...
              <div class="action__wrapper">
                <form action="delete_post.php" method="POST">
                  <input class="action" type="text" name="id" value="<?php echo $row["id"]; ?>" hidden>
                  <input class="action" type="submit" value="刪除貼文">
                </form>
                <form action="edit_post.php" method="POST">
                  <input class="action" type="text" name="id" value="<?php echo $row["id"]; ?>" hidden>
                  <input class="action" type="submit" value="編輯貼文">
                </form>
              </div>
            </div>
          <?php } ?>
        </div>
        <div class="post__wrapper">
          <?php echo $parsedown->text($row["comment"]) ?>
        </div>

      </div>
    <?php } ?>
  </section>
  <div class="filter"></div>

</body>

</html>