<?php
  session_start();
  require_once("utils/utils.php");
  $level = $_SESSION["level"];
  $sql = "SELECT id, username, nickname, level FROM Awu_users";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
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
  <title>管理室</title>
  <link rel="stylesheet" href="css/style.css">
  </link>
</head>

<body>
  <nav class="navbar">
    <a class="home" href="index.php">首頁</a>
    <a class="home" href="admin_post.php">文章管理</a>
    <a class="home" href="admin_users.php">用戶管理</a>
  </nav>
  <?php if ($level === "admin") { ?>
    <section class="table__wrapper">
      <table class="table__body">
        <thead>
          <tr>
            <th colspan="6">用戶管理</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Nickname</th>
            <th>Level</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
              <td class="table__post-id"><?php echo $row["id"] ?></td>
              <td class="table__post-username"><?php echo $row["username"] ?></td>
              <td class="table__post-nickname"><?php echo $row["nickname"] ?></td>
              <td class="table__post-content"><?php echo $row["level"] ?></td>
              <td>
                <form action="action/admin_modify_users.php" method="POST">
                <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
                  <input name="id" type="text" value="<?php echo $row["id"]?>" hidden>
                  <select name="level">
                    <option value="admin" <?php if($row["level"] === "admin"){echo "selected";}?>>Admin</option>
                    <option value="general" <?php if($row["level"] === "general"){echo "selected";}?>>General</option>
                    <option value="bad_user" <?php if($row["level"] === "bad_user"){echo "selected";}?>>BadUser</option>
                  </select>
                  <input type="submit" value="Submit">
                </form>
              </td>
            </tr>
          <?php } ?>
        </tbody>
      </table>
    </section>
  <?php } else { ?>
    <h1 class="no__access">此帳號無權限瀏覽此頁面</h1>
  <?php } ?>
</body>

</html>