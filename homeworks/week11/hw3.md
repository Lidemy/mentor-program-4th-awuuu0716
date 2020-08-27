## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密是一對一，可以被還原出原來的密碼；雜湊幾乎不可能被還原，雜湊出來的東西可以被還原出很多可能性，例如說：17#2n%234gwrm 是雜湊出來的結果，它可能對應到的密碼有：abc123、gg456、tyty5566…或是更多，
這樣一來如果資料庫被駭，攻擊者拿到 hash 過的密碼也沒有用，因為它沒辦法猜出原來的密碼是什麼。

## `include`、`require`、`include_once`、`require_once` 的差別
首先比較 include 與 require (不管有沒有 _once)，這兩者最大差別在遇到錯誤後會不會繼續執行程式碼。
include 遇到錯誤會繼續執行下面的程式碼；require 遇到錯誤不會繼續執行程式碼。

那 _once 沒有 _once 有什麼差別呢？
有 _once 的話可以避免函式因重複引入讓函式重複宣告而產生錯誤，例如這樣會出現錯誤：
```php
// index.php
require("utils/utils.php");
require("utils/utils.php");

// Fatal error:  Cannot redeclare generateToken() (previously declared in...
```

這樣就沒問題：
```php
require_once("utils/utils.php");
require_once("utils/utils.php");
```

## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL 注入就像 PTT 的留言一樣，因為送出留言的時間差導致中間被插入其他的留言，讓整段話的意思變的完全不一樣，
例如：

→ bluewinds:我在香港迪士尼有遇到邱淑貞 和她坐同艘船~搞到最後 我   11/02 21:11
推 FackPtt:  就射出來了                                        11/02 21:12
→ bluewinds:們都在看她 沒有人聽解說人員講話~~她本人人超好~~一聽   11/02 21:12
推 ZBeta:    就射出來了                                        11/02 21:13
→ bluewinds:到我們是台灣來的 就很開心的和我們合照~~後來去廁所又   11/02 21:12
→ sephen:   射出來了

在 PHP 中如果我們這樣寫 SQL Query：
```php
$sql = sprintf(
    "SELECT * FROM `Awu_users` WHERE username='%s' and password='%s'",
    $username,
    $password
  );
```

那麼攻擊者只要在帳號內填入 Awu'# 的話，這個 SQL Query 會變成這樣：
```php
$sql = "SELECT * FROM `Awu_users` WHERE username='Awu'#' and password='%s'";
```
\# 是註解的意思，在 # 後面的程式碼都會被註解掉，這樣就能在不知道密碼的情況下 select 到 Awu 這個 row，這個使用者就被盜用了。

防範的方法是使用 PHP 的內建語法 prepared statement：[筆記](https://hackmd.io/@js8fgfQPQUWFalwMkuQ-Nw/HJRCInoMP)
為了保險起見，要記得在任何使用到 SQL query 的地方都使用 prepared statement。


##  請說明 XSS 的攻擊原理以及防範方法
說到 XSS 攻擊我就想到一個冷笑話：
有個工程師某日在下班前接到老婆的電話...

老婆說：「下班順便帶一斤包子回家，如果看到賣西瓜的，就買一個。」

晚上工程師回到家，老婆看了就問：「怎麼只買了一個包子？」

工程師：「因為看到賣西瓜的。」

來源：[PTT](https://www.ptt.cc/man/joke/DE63/D4EB/D334/M.1297590153.A.208.html)

這跟 XSS 攻擊有點類似，就是用了另一種方式解讀語言而導致意料之外的結果。
如果說我們在沒做任何防範的留言板上留了這樣一段話：要在 HTML 引入 JavaScript，首先你要寫一個 \<script> 標籤。
那麼瀏覽器在讀到 \<script> 這段文字就會把它解讀成 HTML 標籤的 \<script>，而不是純文字的 \<script>。
如果有人留言：\<script>alert("hacked")\<\\script>，
在讀取留言的時候就會冒出一個 alert 顯示 hacked。

防範的方法是使用 PHP 的內建函式 htmlspecialchars()，在輸出文字時使用即可。
```php
<div class="post__header-title">
  <?php echo htmlspecialchars($row["title"]) ?>
</div>
```


## 請說明 CSRF 的攻擊原理以及防範方法

不知道大家小時候有沒有作過一件事：自己幫自己簽聯絡簿。
某種程度來說，這跟 CSRF 攻擊有點類似，我們就是攻擊者，為了避免今天段考不及格被家長發現，自己假冒家長在聯絡簿上簽名，再交回去給老師，假裝家長有看過，賭賭看老師不會檢查筆跡。
假如說老師有仔細檢查筆跡的話，就會發現這篇聯絡日誌根本不是家長審閱完送出的。

防範 CSRF 也是一樣，後端必須驗證一些只有使用者才知道的資訊，聯絡簿的例子就是筆跡，而網站上就是利用 cookie 來實現這一點：
> Double Submit Cookie 靠的核心概念是：「攻擊者的沒辦法讀寫目標網站的 cookie，所以 request 的 csrf token 會跟 cookie 內的不一樣」—— Huli《讓我們來談談 CSRF》
> 
## 實作方法
我們要做的事有四件：
1. 準備好一個產生 token 的 function
2. 產生隨機的 token 並且寫入 cookie
3. 在 form 表單內加入這個 token
4. 處理表單的 PHP 要驗證送來的 token 與 cookie 內的 token 是否一致

## 步驟
1. 準備好一個產生 token 的 function
``` php
// utils.php 
// 在 utils 寫好一個隨機產生 token 的 function，等等要用
<?php
    function generateToken($length)
    {
      $s = '';
      $tokenLength = $length;
      for ($i = 1; $i <= $tokenLength; $i++) {
        $s .= chr(rand(65, 90));
      }
      return $s;
    }
?>
```

2. 產生隨機的 token 並且寫入 cookie
``` php
// login.php 
// 可以寫在設置 session 的附近，性質類似放一起
<?php
  // 設置 csrftoken
  $csrftoken = generateToken(10);
  setcookie("csrftoken", $csrftoken, time() + 3600 * 24, "/");
?>
```
3. 在 form 表單內加入這個 token
``` php
// index.php
// 以刪除文章為例，抱歉寫的有點難看 QQ
<?php
  <form action="action/delete_post.php" method="POST">
　　  <input type="hidden" name="csrftoken" value="<?php echo $csrftoken ?>" />
　　  <input class="action" type="text" name="id" value="<?php echo $row["id"]; ?>" hidden>
　　  <input class="action" type="submit" value="刪除貼文">
  </form>
?>
```

4. 處理表單的 PHP 要驗證送來的 token 與 cookie 內的 token 是否一致
```php
// delete.php
// 在程式碼最上方做檢查，讓壞蛋早點離開
<?php 
  // 檢查是否為跨站攻擊
  if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
    // 跟壞壞的攻擊者說掰掰
    die("88888");
  }
?>
```

這樣就完成基本的 CSRF 防禦囉！有種學會黑魔法防禦術的感覺呢！