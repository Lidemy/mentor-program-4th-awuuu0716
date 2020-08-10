<?php
require_once("utlis.php");
$result = $conn->query("SELECT `username` FROM `Awu_users`");
$usersList = "";
while ($row = $result->fetch_assoc()) {
  $usersList .= " " . $row["username"];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>會員註冊</title>
  <link rel="stylesheet" href="css/style.css">
  </link>
</head>

<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <nav class="navbar">
    <a class="log__in" href="log_in.php">登入</a>
    <a class="sign__up" href="sign_up.php">註冊</a>
    <a class="home" href="/hw1/index.php">首頁</a>
  </nav>

  <section class="sign__up__wrapper">
    <form class="sign__up__form" action="handle_sign_up.php" method="post">
      <div class="input__wrapper">
        帳號：
        <input class="input__username" name="username" type="text" placeholder="帳號名稱">
        <div class="warning__username display__none">此帳號已被使用</div>
      </div>
      <div class="input__wrapper">
        暱稱：
        <input name="nickname" type="text" placeholder="暱稱">
      </div>
      <div class="input__wrapper">
        密碼：
        <input name="password" type="password" placeholder="密碼">
      </div>
      <div class="submit__wrapper bc__white">
        <input class="btn__submit submit__active" type="submit" value="註冊">
      </div>

    </form>
  </section>

</body>

<script>
  const usersList = "<?php echo $usersList ?>".trim().split(" ");
  const userNameInput = document.querySelector(".input__username");
  const userNameRepeat = document.querySelector(".warning__username")

  userNameInput.addEventListener("keydown", () => {
    setTimeout(() => {
      const input = userNameInput.value;
      if (usersList.indexOf(input) >= 0) {
        userNameRepeat.classList.remove('display__none');
      } else {
        userNameRepeat.classList.add('display__none');
      }
    }, 1)

  })
</script>

</html>