<?php
session_start();
require_once("utils/utils.php");
require_once("action/check_admin.php");
$sql = "SELECT " .
  "C.id as id," .
  "C.nickname as nickname," .
  "C.comment as comment," .
  "C.username as username," .
  "deleted " .
  "FROM Awu_comments as C " .
  "left join " .
  "Awu_users as U " .
  "on C.nickname = U.nickname " .
  "order by C.id desc ";
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
    <section class="table__wrapper">
      <table class="table__body">
        <thead>
          <tr>
            <th colspan="6">文章管理</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Nickname</th>
            <th>Content</th>
            <th>Isdelete</th>
            <th>ChangeStatus</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
              <td class="table__post-id"><?php echo $row["id"] ?></td>
              <td class="table__post-username"><?php echo $row["username"] ?></td>
              <td class="table__post-nickname"><?php echo $row["nickname"] ?></td>
              <td class="table__post-content"><?php echo htmlspecialchars($row["comment"]) ?></td>
              <td class="table__post-deleted"><?php echo $row["deleted"] === 0 ? "N" : "Y" ?></td>
              <td class="table__post-delete__btn">
                <form action="action/admin_modify_post.php" method="POST">
                  <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
                  <input name="deleted" value="<?php echo $row["deleted"] ?>" hidden>
                  <input name="id" value="<?php echo $row["id"] ?>" hidden>
                  <button type="submit"><?php echo $row["deleted"] === 0 ? "Delete" : "Undo" ?></button>
                </form>
              </td>
            </tr>
          <?php } ?>
        </tbody>
      </table>
    </section>
</body>

</html>