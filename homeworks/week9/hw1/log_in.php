<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>會員登入</title>
  <link rel="stylesheet" href="./style.css">
  </link>
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <section class="user__operating">
    <form class="input__form" action="handle_log_in.php" method="post">
      <div class="input__container">帳號：
        <input name="username" type="text" placeholder="請輸入帳號名稱">
      </div>
      <div class="input__container">密碼：
        <input name="password" type="password" placeholder="請輸入密碼">
      </div>

      <input class="btn__submit" type="submit">
    </form>
  </section>
  <section class="comments">


</body>

</html>