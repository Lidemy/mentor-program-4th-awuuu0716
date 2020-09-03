<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>會員登入</title>
  <link rel="stylesheet" href="css/style.css">
  </link>
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>

  <nav class="navbar">
    <a class="log__in" href="log_in.php">登入</a>
    <a class="sign__up" href="sign_up.php">註冊</a>
    <a class="home" href="index.php">首頁</a>
  </nav>

  <section class="account__info">
    <form class="account__form" action="action/handle_log_in.php" method="post">
      <?php if (isset($_GET['error']) && $_GET['error'] == "tjhji4xk7") { ?>
        <div class="account__error animation__shack">帳號或密碼錯誤 (╥﹏╥)</div>
      <?php } ?>
      <div class="input__container">帳號：
        <input name="username" type="text" placeholder="請輸入帳號名稱">
      </div>
      <div class="input__container">密碼：
        <input name="password" type="password" placeholder="請輸入密碼">
      </div>
      <input class="btn__log__in" type="submit" value="登入">
      <div class="no__account">還沒有帳號？
        <a href="sign_up.php">註冊</a>
      </div>
    </form>
  </section>

</body>

</html>