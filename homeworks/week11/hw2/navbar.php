<nav class="navbar">
  <div class="wrapper navbar__wrapper">
    <div class="navbar__site-name">
      <a href='index.php'>Awu's Blog</a>
    </div>
    <ul class="navbar__list">
      <div>
        <li><a href="index.php">首頁</a></li>
        <li><a href="category.php">分類專區</a></li>
      </div>
      <div>
        <?php if (!empty($is_login) && $is_login) { ?>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="action/handle_logout.php">登出</a></li>
        <?php } else { ?>
          <li><a href="login.php">登入</a></li>
        <?php } ?>
      </div>
    </ul>
  </div>
</nav>