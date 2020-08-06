<?php
  require_once("conn.php");
  $result = $conn->query("SELECT * FROM Awu_comments ORDER BY id DESC");
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
  <section class="user__operating">
    <form class="input__form" action="add_post.php" method="post">
      <input name="nickname" type="text" placeholder="請輸入暱稱">
      <textarea name="comment" id="" cols="30" rows="10"></textarea>
      <input type="submit">
    </form>
    <a href="login.php">登入</a>
    <a href="sign__in.php">註冊</a>
  </section>
  <section class="comments">
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="comment__body">
        <div class="user__wrapper">
          <div class="user__avatar"></div>
          <div class="user__info">
            <div class="user__nickname"><?php echo $row["nickname"] ?></div>
            <div class="user__time"><?php echo $row["date"] ?></div>
          </div>
        </div>
        <div class="post__wrapper">
          <p class=""><?php echo $row["comment"] ?></p>
        </div>
        <a class="delete__post" href=<?php echo "delete_post.php?id=".$row["id"]?>>刪除</a>
      </div>
    <?php } ?>
  </section>


</body>

</html>