<?php
require_once("utlis.php");

$result = $conn->query("SELECT * FROM Awu_comments ORDER BY id DESC");

// 判斷有沒有登入與設置 nickname
if (isset($_COOKIE["token"])) {
  $token = $_COOKIE["token"];
  $token_sql = sprintf("SELECT `nickname` FROM Awu_users WHERE token='%s'", $token);
  $getNickname = $conn->query($token_sql);
  $nickname = $getNickname->fetch_assoc()['nickname'];
  $isLogIn = true;
} else {
  $nickname = "Guest";
  $isLogIn = false;
}
  $greeting = "Hello " . $nickname;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./style.css">
  </link>
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <h1 class="greeting"><?php echo $greeting ?></h1>
  <section class="user__operating">
    <form class="input__form" action="add_post.php" method="post">
      <input name="nickname" type="text" hidden value=<?php echo $nickname?>>
      <textarea name="comment" id="" cols="30" rows="10"></textarea>
      <input type="submit">
    </form>
    <?php if (!$isLogIn) { ?>
      <a href="log_in.php">登入</a>
      <a href="sign_up.php">註冊</a>
    <?php } ?>
  </section>
  <section class="comments">
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="comment__body">
        <div class="user__wrapper">
          <div class="user__avatar"></div>
          <div class="user__info">
            <div class="user__nickname"><?php echo $row["nickname"]; ?></div>
            <div class="user__time"><?php echo $row["date"]; ?></div>
            <form action="delete_post.php" method="POST">
              <input type="text" name="id" value="<?php echo $row["id"]; ?>" hidden>
              <input type="submit" value="刪除">
            </form>
          </div>
        </div>
        <div class="post__wrapper">
          <p class=""><?php echo $row["comment"]; ?></p>
        </div>

      </div>
    <?php } ?>
  </section>


</body>

</html>