## 十一到十五週心得
十一到十五週內容蠻硬的，都是非常陌生的領域(陌生拉，哪週不陌生)，作業也相當厚實，前兩週都須要交一個小作品出來，
後兩週則是熟悉新工具使用以及線上部屬，尤其是線上部屬，一直處於我是誰？這是哪裡？的狀態，不過回過神來已經部屬完成了，可喜可賀。
以下是各週的詳細心得：

### 第十一週（08/24 ~ 08/30）：資訊安全
怕痛的我，把防禦點滿就對了。

這週要把之前漏洞百出的留言板給修好，熟悉基本的資訊安全措施，包括加密、雜湊、SQL 注入、XSS 攻擊，攻擊者只要找到一處漏洞就能攻陷網站，所以任何一個小細節都不能忽略，要記得永遠不能相信來自使用者的資訊。

#### 自我檢測
* P1 你知道什麼是雜湊（Hash function）

雜湊是一種讓資料改變成無法被還原的狀態的演算法，例如:abc123 經由 SHA-256 雜湊過後會得到 6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090，由於雜湊過的文字可以對應到無限多組可能，極難被還原出原始輸入，因此雜湊演算法可以用於保護使用者的帳戶資訊，即使資料庫遭入侵，也沒辦法拿到正確的資料。順帶一提，如果有網站在你按忘記密碼時寄了你的正確密碼過來，代表他們沒對你的密碼做雜湊，這是很危險的資安漏洞，反之網站有做雜湊保護的話，他們是不知道你的密碼的，只能要求使用者重設密碼。

* P1 你知道什麼是加密（Encryption）

加密是一種讓資料改變，但只要知道解密方法就能還原資料的演算法，例如說：00su3cl3ji3g4vul3au/6，乍看之下是一串無意義的文字，
但對台灣的電腦使用者恐怕是再熟悉不過了，這就是忘記切換注音輸入法時會出現的東西，還原方法就是按照鍵盤上所對應的注音輸入，就可以得到：安安你好我是小明。

* P1 你知道雜湊與加密的差別

雜湊不能被還原，而加密只要知道解密方法就可以被還原

* P1 你知道什麼是 SQL Injection 以及如何防範

SQL Injection 是由於使用者輸入了特定的文字，導致後端 SQL Query 產生不同的作用，繞過密碼驗證、或是對資料庫進行其他操作等等，可以用 PHP 內建的 prepare statement 來防範

* P1 你知道什麼是 XSS 以及如何防範

XSS (Cross-Site Scripting) 是一種利用網站的 HTML 漏洞進行攻擊的方式，比如說使用者在留言板上留下
```
<script>document.location.href="https://attack.com";</script>
```
這樣一段留言，來留言版的人都會被導向這個 attack.com，就可能因此受害。所以在處理使用者輸入時，要記得做 HTML Escape，防止瀏覽器把使用者輸入當作程式碼的一部分去執行。

* P1 你知道為什麼儘管前端做了驗證，後端還是要再做一次驗證

前端驗證防君子不防小人，後端驗證才是最保險的驗證。前端的東西可以被使用者竄改，關閉驗證機制，或是透過 postman 之類的工具來直接對伺服器發送請求，前端驗證只能提升使用者體驗、減少 request/response 等待時間，在後端還是要再驗證一次使用者輸入比較好。

* P2 你知道什麼是 CSRF 以及如何防範

CSRF(Cross-site request forgery)，是一種利用使用者的登入資訊，來偷偷進行惡意操作的網頁陷阱。作為使用者，我們盡量避免進入不安全的網站、點進奇怪的連結，以免受到惡意程式碼的攻擊。做為網站開發者，可以用 Double Submit Cookie 或是設定 SameSite cookie 來防範 CSRF 攻擊。

### 第十二週（08/31 ~ 09/06）：前後端整合
前面幾週做的網站就像是一人小吃店，老闆同時要負責點餐、做菜、上菜、結帳，所有事情一手包辦，這對伺服器來說非常不友善，要是伺服器掛了，那會是不小的問題。這禮拜開始學習什麼是 SPA、如何寫 API、如何串接自己寫的 API，把一些事情丟給前端來做，降低伺服器負擔，使用者用網站就像是在用 APP 一樣，一個頁面多個享受。

#### 自我檢測
* P1 你知道什麼是 SPA

SPA(Single Page Application)，單頁應用程式，指的是不需要換頁也能夠切換網頁內容的網站，利用 Ajax(Asynchronous JavaScript and XML) 來非同步地向伺服器發送請求，前端收到回應後便將內容渲染到畫面上，不斷更新內容，像一個應用程式一樣。

* P1 你知道怎麼樣用 PHP 自己寫出 API

利用 PHP 的 json_encode() 可以將陣列轉成 JSON 格式：
```php
$json = array();
array_push($json,array("id"=>1,"name"=>"jojo"));
array_push($json,array("id"=>2,"name"=>"dio"));
$response = json_encode($json);
echo $response;
// 印出 [{"id":1,"name":"jojo"},{"id":2,"name":"dio"}]
```

在留言板的 API 會利用迴圈抓取資料庫內容放進初始陣列內，最後轉成 JSON 給前端：
```php
require_once("../utils/utils.php");
$offset = empty($_GET["offset"]) ? 0 : $_GET["offset"];
$sql = "SELECT * FROM Awu_api_comments ORDER BY id DESC limit 9 offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $offset);
$result = $stmt->execute();
$json = array();

if (!$result) {
  header("Location:index.html");
  die($conn->error);
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
  $response = json_encode($json);
  echo $response;
  die();
}

while ($row = $result->fetch_assoc()) {
  array_push($json,$row);
}

$response = json_encode($json);
echo $response;
```

* P1 你知道如何在前端與自己開的 API 串接

前端發 Ajax 的方式有很多，有 XMLHttpRequest、jQuery 的 $.ajax()、fetch、axios 等等，這禮拜我們開始接觸 jQuery，所以就用 jQuery 練習：
```javascript
$.ajax({
    type: 'GET',
    url: `api/comments.php?offset=${offset}`,
  }).done((data) => {
    offset += 9;
    appendComments(data);
  });
```
用法相當親切，比起 XMLHttpRequest 節省了相當多行程式碼(不過底層運作還是 XMLHttpRequest 喔!)。

* P1 你知道在 server 與在 client render 的差別

最大的差別在於 server 有沒有 render 東西給前端，以下是 minw 助教提供的一張圖，清楚地說明了演化過程：
![](https://user-images.githubusercontent.com/10834433/92352316-6422e280-f110-11ea-8b0d-fc29ef8fb4cf.png)

所以說，完全體的 client side render 應該只會從後端拿到空空的 HTML，之後的內容 100% 原汁原味用 JavaScript 產生。

* P1 你知道 jQuery 是做什麼的

jQuery 是一個 JavaScript 函式庫，提供了更簡潔的語法操作 DOM 與 Ajax 以及事件處理。

* P1 你知道 jQuery 與 vanilla js 的差別

vanilla js 就是原生的 JavaScript，jQuery 是一種 JavaScript 函式庫，要引入檔案才能使用，底層運作還是原生 JavaScript，只是寫起來更簡潔、結構分明。

* P1 你知道什麼是 Bootstrap

Bootstrap 是一種 CSS 框架，它編寫了固定的 class 名稱與 CSS 屬性，要用的時候只需要引入檔案、並且加入特定的 class 即可，Bootstrap 也提供了現成的 UI 元件，甚至可以直接複製下來使用，非常方便。

* P2 你知道 Bootstrap 原理及如何應用

Bootstrap 其實就是一大堆寫好 CSS 的 class，有些元件也加入了 JavaScript 事件可以跟使用者互動例如漢堡選單、Modal 等等，另外 Bootstrap 的 Layout 系統也很方便，可以很快速地做出格線佈局，還順便將 RWD 處理好，
對於缺乏設計感的工程師來說是一大福音，缺點是做出來的網站看起來都很像。

### 第十三週（09/07 ~ 09/13）：現代前端工具
這週主要是在學一些新工具：CSS 預處理器、Babel、Gulp、Webpack，以及 JavaScript 另一個發 Request 的語法 fetch。相較其他週是比較輕鬆的單元，只需掌握工具的使用方法即可。

#### 自我檢測
* P1 你知道 webpack 的目的以及原理

webpack 是模組打包程式，目的是把散落各處的模組集合起來變成單一檔案，讓網頁不需要 request 一大堆檔案，同時也可以在引入模組時做額外的處理例如：minify、uglify 等等。

* P1 你熟悉如何使用 webpack 進行模組化開發

```javascript
const $ = require('jquery');
const utils = require('./utils');
const template = require('./template');

window.commentsPluginData = {};
const { commentsPluginData } = window;

const init = (options) => {
  const { siteKey } = options;
  const offset = 0;
  const allowClickLoadMore = true;
  const containerElement = $(options.container);
  let commentsData;
  commentsPluginData[siteKey] = {
    siteKey,
    offset,
    commentsData,
    allowClickLoadMore,
    containerElement,
  };

  const addEventHandler = () => {
    // 使用者 submit 按鈕
    utils.userAddComment(siteKey);
    // 點愛心功能
    utils.clickLoveHandler(siteKey);
    // LoadMore 按鈕
    utils.loadMoreBtnHandler(siteKey);
  };

  const mountCommentPlugin = () => {
    addEventHandler();
    utils.loadComments(siteKey, offset);
  };

  containerElement.append(template.mainTemplate(siteKey));

  mountCommentPlugin();
};

export { init as default };
```
我在留言板 plugin 中嘗試將各種功能寫進 utils、HTML 模板寫在 template，最後在引入這隻主要的 JS 檔，不過有一點比較不滿意的是這支 JS 仍然需要將 siteKey 或 offset 之類的參數傳給其他元件，
出了問題要追蹤資料感覺會有點小麻煩，如果可以的話希望有個地方能統一管理狀態，這邊就單純呼叫函式就好。

* P1 你知道如何使用 Promise

借用 MDN 的範例：
```javascript
// 新增一個 Promise 實例時會傳入一個函式，並且帶兩個參數，第一個參數是成功時呼叫的，第二個則是失敗時呼叫，成功或失敗是自己定義的 (感覺很心靈雞湯呢)
// 參數名稱也不一定要叫 resolve, reject，名字可以自己取
const promise1 = new Promise((resolve, reject) => {
  // 這邊就定義 1 秒後一定會成功
  setTimeout(() => {
    // resolve 傳入的參數會被 then 的 callback 接收，這邊就傳一個字串 "Success!" 下去
    resolve('Success!');
  }, 1000);
});

// 這邊就像是寫 $.jax().then() 的感覺，定義好 Promise 成功之後要做什麼事，要注意的是 .then() 完回傳的還是一個 Promise 
promise1
.then((value) => {
  // 最後就印出 Success!
  console.log(value);
})
// 也可以定義失敗時要做什麼處理，當然上面那邊就必須先定義什麼是失敗，並且執行 reject()
.catch((value) => {
  console.log(value);
});
```

* P2 你知道如何使用 fetch

```javascript
  const fetchRequest = url => (
    fetch(`${path}${url}`,
      {
        method: 'GET',
        headers: new Headers({
          'client-id': clientId,
          Accept: accept,
        }),
      }).then((response) => {
      // response.status 可以獲取回應的狀態碼
      const { status } = response;
      // response.json() 回傳的仍然是一個 promise，要再接一個 .then() 才能拿到資料
      if (status >= 200 && status < 400) return response.json();
      return false;
    }).then(data => data)
      .catch((err) => {
        console.log(err);
      })
  );

  const loadTopFive = async () => {
    let topGameObj;
    const topGameUrl = 'games/top?limit=100';
    // 這邊就拿到資料了，就可以對它做一些處理
    await fetchRequest(topGameUrl).then((data) => {
      topGameObj = data;
      return true;
    });
    packageGameData(topGameObj);
    loadTopStreams(0, 5);
  };
  loadTopFive();
```

* P2 你知道 gulp 的目的以及原理

gulp 會把任務（uglify、minify 等等）集中起來管理，讓開發者不用一個一個執行任務，可以一次處理完要做的事。

* P2 你知道 CSS Sprites 與 Data URI 的優缺點

CSS Sprites 可以將許多小圖示拼成一個大圖，優點是可以減少 HTTP 請求次數、減少圖片大小，缺點是不易維護，每個圖片都有自己的絕對定位，改了一個圖片大小會影響到其他圖片的定位。
Data URI 可以將圖片直接寫在 HTML 中，不需要額外的 HTTP 請求，缺點是圖片轉成 base64 後檔案會變大，瀏覽器也不能快取，圖片修改後也得重新編碼。

* P2 你知道什麼是 uglify 與 minify

minify 會把程式碼的空行消除變成只有一行，變數名稱簡化成 a, b, c 之類的，目的是減少檔案大小，增加載入速度。
uglify 會打散程式碼邏輯，讓公開的程式碼變得難以閱讀，同時也會壓縮檔案。

* P3 你熟悉如何使用 gulp 建構自動化工作流程

```javaScript
// gulpfile.js
const { src, dest, series, parallel } = require('gulp')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

function compileJS() {
  return src('src/*.js')
  // 執行完 babel 後存進 dist 資料夾
    .pipe(babel())
    .pipe(dest('dist'))
    // 然後再做 uglify 跟 rename, 再存進 dist
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(dest('dist'))
}

function compileCSS() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('css'))
}

// 先做 compileCSS 再做 compileJS
// exports.default = series(compileCSS, compileJS)

// 兩個同時做
exports.default = series(compileCSS, compileJS)

// 這樣才能單獨執行某個任務 npx gulp compileCSS
exports.compileCSS = compileCSS
```
gulp 得安裝許多插劍會有點小麻煩，不過都不算困難所以還好。

* P3 你知道 CSS 優化的一些小技巧
1. 壓縮，利用 webpack 或是 gulp-clean-css 之類的插件來壓縮 CSS 檔案大小，簡單暴力又有效。
2. 使用 SVG 代替 JPG 或 PNG，SVG 是向量圖形，不僅檔案較小、圖像也不會因為縮放而失真
3. 使用 CSS Shorthand 減少重複的 CSS 
4. 使用顏色簡寫，#ffffff 可以寫成 #fff
5. 刪除不必要的零或單位，padding: 0.2em -> padding: .2em、margin: 0px -> margin: 0
不過後面幾項其實 CSS minify 都會幫忙做，算是大概了解一下而已。


### 第十四週（09/14 ~ 09/20）：伺服器與網站部署
大部分的部屬心得都寫在 [week14 hw2](https://github.com/Lidemy/mentor-program-4th-awuuu0716/blob/master/homeworks/week14/hw2.md)了，這裡就偷懶不再重複。
不過有點好奇前端工程師工作上會需要從零開始部屬網站嗎？還是部屬是由後端來做呢？

#### 自我檢測

* P1 你知道虛擬空間、虛擬主機以及實體主機的差別

實體主機指的是一台真實存在的電腦，如果要用實體主機當伺服器，就必須在上面裝好作業系統、架網路線、並且做好管理不能隨便關機 (關機別人就連不進你的網站了)，自己架一台實體伺服器的成本非常高。

虛體主機 (VPS)、或是虛擬空間，指的是一台實體主機但是被切成許多份大家一起共用，就像大學生一起合租一間公寓一樣，可以節省許多成本，著名的主機有 AWS、GCP、Digital Ocean 等等

* P1 你知道什麼是網域（Domain）

網域指的是屬於某個網站的區域，例如說：https://www.gamer.com.tw/ 是巴哈姆特電玩資訊站，而 https://forum.gamer.com.tw/ 是 gamer.com.tw 底下的子網域，一個主網站底下可以有很多子網域，區分成不同的功能，
就像財團底下可以有許多自己的企業一樣。只有網域是沒辦法讓使用者連上網站的，必須要透過 DNS 才能將使用者導入正確的網站 IP。

* P1 你知道如何設定網域（A、CNAME）

我是用 cloudflare 的免費 DNS 方案來設定的，在它的管理頁面可以非常簡單的設定：

A
![](https://i.imgur.com/AXBRx67.jpg)

CNAME 設定
![](https://i.imgur.com/6SG3IvJ.jpg)
![](https://i.imgur.com/DCIonUD.jpg)

* P1 你知道如何用 SSH 遠端連線到自己的主機

參考[使用 SSH 用戶端連接至 Linux 執行個體](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)使用 SSH 指令並存取金鑰即可連上主機，需要注意的是金鑰的檔權限不能太 open 與本機作業系統的使用者名稱不能有中文。

* P1 你知道如何部署應用程式

不會用 Docker 只會用 FTP QQ，在 VPS 上安裝好 vsftpd 即可使用各種 FTP 軟體上傳檔案，要注意這邊得用 SFTP 上傳，並且載入金鑰檔案。

* P2 你知道什麼是 No SQL

NoSQL 是 Not Only SQL，指的是允許其他儲存格式 (JSON) 的資料庫管理系統，沒有欄位 Schema，資料內容較為寬鬆，可隨時擴充，適合收集大量不特定資料。常見的 NoSQL 有 MongoDB, Redis 等等。

* P2 你知道什麼是 Transaction 與 lock

Transaction 是操作資料庫的一種方式，Transaction 只能完成或是失敗回復到未完成的狀態，不能只執行一半的指令，例如說交易轉帳，必須要有人扣錢、有人收到錢，不能只有人扣錢或是只有某人收到錢。

lock 則是讓資料庫操作時不會受到 Race condition 的影響，例如搶票或購物系統，如果有三個人同時送出購買請求，但商品只有兩個，這時候就會超賣，售出數量超過商品數量。這時就需要一個類似排隊的機制，當某人在存取某筆資料時，另一人得在旁邊等待，等到前面的人操作完才能換下一個，這樣就能保證商品不會超賣，但是會犧牲存取效率。

* P2 你知道資料庫的 ACID 是什麼

Atomicity (原子性) : 好比道爾吞認為原子不可再分割，每筆 transaction 必須只能完成或失敗，永遠不能有中間、做一半的情形發生。
Consistency (一致性)： transaction 前後都必須確保資料有符合 schema 的規範。
Isolation (隔離性)： 進行多個 transaction 時，這些操作不會互相干擾破壞一致性。
Durability (耐久性)：完成 transaction 時，資料能永久地保存再資料庫中，即使當機了也有辦法復原資料。

* P3 你知道什麼是資料庫的 View 以及使用時機

View 是一個虛擬的唯獨資料表，只能讀取不能改寫，適用於需要給別人看到部分資料庫但不想被改到資料的時候，用法如下：
```
CREATE VIEW view_name [(column_list)] AS
SELECT column_name(s)
FROM table_name
WHERE condition;
```

之後就可以像一般 table 一樣 SELECT view_name... 進行操作。

* P3 你知道什麼是 Stored procedure 以及如何使用

Stored procedure 是 SQL 的 function，首先要定義 function，由於定義 function 時會需要用到分號，但我們這時候並不希望資料庫將分號作為結束符號使用，因此會用 delimiter 重新定義結束符號，下面假設我們要一個取回所有文章標題的函式：
```sql
DELIMITER //
CREATE PROCEDURE getPostTitles()
  BEGIN 
    SELECT title FROM Awu_posts;
  END //
DELIMITER ;
```

使用時：
```sql
CALL getPostTitles();
```
* P3 你知道資料庫的 Trigger 以及使用時機

Trigger 是紀錄資料庫變動的表格，可以寫在 PHP 中，或是直接寫在資料庫，讓每一筆資料操作都自動記錄下來，以下的 Trigger 會記錄部落格文章更新，就能得到一個類似編輯紀錄的表格了：
```sql
DELIMITER //
CREATE TRIGGER update_log
  BEFORE UPDATE FROM posts
  FOR EACH ROW
BEGIN
  INSERT INTO posts_log(post_id, username, content, change_at)
  VALUES (OLD.id, OLD.username, OLD.content)
END
DELIMITER ;
```


## 參考資料
[加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
[【網頁安全】給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
[一看就懂的 React Server Rendering（Isomorphic JavaScript）入門教學](https://blog.techbridge.cc/2016/08/27/react-redux-immutablejs-node-server-isomorphic-tutorial/)
[Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
[gulp-babel](https://www.npmjs.com/package/gulp-babel)
[gulp-sass](https://github.com/dlmanning/gulp-sass)
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
[60秒，搞懂虛擬主機、VPS、實體主機間的差異](https://wanteasy.com.tw/blog/difference-between-shared-vps-dedicated-hosting)
[後端基礎：資料庫補充 View、Stored Procedure 與 Trigger](https://medium.com/@hugh_Program_learning_diary_Js/%E5%BE%8C%E7%AB%AF%E5%9F%BA%E7%A4%8E-%E8%B3%87%E6%96%99%E5%BA%AB%E8%A3%9C%E5%85%85-view-stored-procedure-%E8%88%87-trigger-8dbcbf5946a9)