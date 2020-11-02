## 十六到二十週心得


## 十六到二十週心得
最後一週複習週了，不知不覺課程就要結束了，求職與經濟壓力也越來越大，時常懷疑自己到底能不能找到工作，我真的有學到東西了嗎？曾經有人說過，自信這種東西就是先假裝自己很強，之後再想辦法讓自己變得跟想像中一樣強就好，也就是有自信的同時又保有自知之明，反之一直覺得自己很爛的話，原本好好的也會真的變很爛。總之那些奇怪的負面想法先放一邊吧！以下是十六到二十周的心得，同上次複習週，這次也用自我檢討來呈現。
## 十六週 - JavaScript 核心與物件導向

* P1 你知道 Event Loop 的運作方式
JavaScript 只有單執行緒，一次只做一件事情，但這樣在網頁上會讓使用體驗非常的差，例如發 Request 等回應需要時間，如果要等到他回應才能繼續做其他事很沒效率，網頁也會停住什麼事都不能做，這時候就需要額外的工具來處理，也就是讓程式可以非同步運作。JavaScript 的執行環境中有個東西叫 task queue (工作佇列)，負責處理這些非同步的操作，當程式執行到一個非同步操作，會讓這段程式碼到 WebAPIs 等待回應，直到回應後再把 callback 放進 task queue 中等待，最後主執行緒的 stack 都清空後就會把 task queue 的 callback 拿出來執行，這個流程就是 Event Loop。以下是自製的 Event Loop 圖示，希望我觀念沒有搞錯：
![](https://i.imgur.com/nSY9veq.jpg)
 
* P1 你知道什麼是作用域（Scope）
程式碼中的變數會依照程式的結構來決定他的值，例如以下程式碼，在 fn 中並沒有 a 這個變數，但是卻會用到 a，此時就會往上一層來尋找 a 這個變數，如果已經到了最上層還找不到，那就會 Uncaught ReferenceError: a is not defined，非常有趣：
```JavaScript
var a = 1
function fn () {
  console.log(a) 
}
fn() // 印出 1
```
```JavaScript
function fn () {
  console.log(a) 
}
fn() // Uncaught ReferenceError: a is not defined
```

如果在 fn 中修改 a 的值，修改的會是上層環境的變數 a，此時在 fn 外使用 a，將會是新的值。
```JavaScript
var a = 1;
console.log(a) // 印出 1
function fn () {
  console.log(a) 
  a = 0
}
fn() // 印出 1
console.log(a) // 印出 0
```

如果在 fn 中又宣告同名的變數 a，這個 a 會屬於 fn，在 fn 外無法存取這個變數。
```JavaScript
var a = 1;
console.log(a) // 印出 1
function fn () {
  var a = 2
  console.log(a) 
}
fn() // 印出 2
console.log(a) // 印出 1
```

* P1 你知道 Hoisting（提升）是什麼
Hoisting 是程式執行環境初始化有關的機制，會依照某著順序來決定環境變數，順序是：1.function 2.arguments 3.variable，以下用課程影片的題目來複習：
``` JavaScript
var a = 1;
function test(){
  console.log('1.', a); // 底下的 var a 會被提升,所以找到一個 undefined
  var a = 7;
  console.log('2.', a); // 7
  a++;
  var a;
  inner();
  console.log('4.', a); // 30
  function inner(){
    console.log('3.', a); // 往上找 a , a === 8
    a = 30; // 把 test 的 a 變成 30
    b = 200; // 沒有宣告就使用, 變成全域變數 b
  }
}
test();
console.log('5.', a); // 1
a = 70;
console.log('6.', a); // 70
console.log('7.', b); // 200
```
* P1 你知道 Hoisting 的原理為何
每個執行環境中都有一個 variable object (VO)，這個物件中的 key 就是變數名稱，value 就是變數的值，在初始化的時候這個物件就會被建立，並且依照順序來建立變數，在 function 中的參數也會被加入 VO：
``` JavaScript
function fn (a, b) {
  // VO: { a:undefined, b:undefined }
  var a // VO 中已有變數 a , 這行程式將被忽略
  console.log(a) 
  a = 0
  // VO: { a:0, b:undefined }, a 的值被修改成 0
  console.log(a)
  console.log(b)
}

fn(1, 2) // 印出 1, 0, 2
```
* P1 你知道 Closure（閉包）是什麼
當 function 回傳 function 時，內層的 function 還是能夠使用上層的變數，不會因為上層 function 執行結束就存取不到變數。
* P1 你能夠舉出一個運用 Closure 的例子
``` JavaScript
function sayMyName(name) {
  function say() {
    console.log(name)
  }
  return say
}

var breakingBad = sayMyName('Heisenberg')
var breakingGood = sayMyName('Walter White')

breakingBad() // 印出 Heisenberg
breakingGood() // 印出 Walter White
```
這樣我們就有一個非常實用的製造經典台詞的 function 了呢！(超無聊)
* P1 你知道 Prototype 在 JavaScript 裡是什麼
Prototype 是 JavaScript 實現物件繼承的一種機制，每個物件在實體化時會設定他的 __proto__，這個 __proto__ 會指向他的上層元件的 prototype ，上層元件的 __proto__.prototype 又會指向更上層的 prototype，直到沒有更上層為止。這樣會形成一個 prototype chain，在呼叫物件方法時，會從最底下往上開始搜尋，如果在上層物件宣告了一個方法，下層的物件都可以存取的到。以下是圖示說明：
![](https://i.imgur.com/Ce93ZJR.jpg)
* P1 你知道大部分情況下 this 的值是什麼
this 的值的決定方式有兩種，一種是在呼叫時決定、一種是宣告時決定，前者是在 function declaration 中使用 this、後者則是在 arrow function 中使用 this。呼叫時決定我們可以用方法的小點點前面是誰來判斷 this，例如 shark.hi() 的 .hi() 前面是 shark，因此 this 會指向 shark 這個物件。然而，當我們用另一個變數 sharkHi 去儲存 shark.hi 時，sharkHi() 前面沒有點點，this 會指向全域物件 Window。arrow function 的 this 有點像是 Scope chain，他會往上找到第一個別人的 this，並且在宣告時決定。
``` JavaScript
function Person(name) {
  this.name = name
  this.hi = function () {
    console.log(this.name)
  }
}
const shark = new Person('Gura')
const sharkHi = shark.hi
shark.hi() // Gura
sharkHi() // 找不到這個值
```
``` JavaScript
function Person(name) {
  this.name = name
  this.hi = () => {
    console.log(this.name)
  }
}
const shark = new Person('Gura')
const sharkHi = shark.hi
shark.hi() // Gura
sharkHi() // Gura
```
* P2 你知道物件導向的基本概念（類別、實體、繼承、封裝）
類別：模具，定義好方法與屬性，可以用來生產多個類似的物件
實體：實際佔有記憶體空間的物件
繼承：能夠存取上層元件的方法，也能定義新的方法與屬性
封裝：物件內的方法與屬性不能夠被外界隨意存取，只能透過物件設定好的方式改變物件的內容

## 十七週 - JavaScript 現代後端開發（上）

* P1 學習如何使用 Express 及其相關套件
Express 的環境建置相當簡單，以及使用 Sequelize 來輕鬆操作資料庫：
``` JavaScript
const express = require('express'); // express 套件引入
const bodyParser = require('body-parser'); // 解析 request 的表單資料之類的套件
const session = require('express-session'); // 處理 session 的套件
const flash = require('connect-flash'); // 處理錯誤訊息的套件

const articleController = require('./controllers/article');
const adminController = require('./controllers/admin');

const app = express();
const port = process.env.PORT || 3000;
const redirectBack = (req, res) => {
  res.redirect('back');
};

app.set('view engine', 'ejs'); // 用 ejs 來管理 HTML 模板
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // 引入靜態檔案的必要設定
app.use(session({
  secret: 'keyboard cat', // 建議放在主機的環境變數內
  resave: false,
  saveUninitialized: true,
}));
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// 管理路由, 也可以獨立成一個檔案
app.post('/addArticle', articleController.addArticle, redirectBack);
app.post('/editArticle', articleController.edit, redirectBack);
app.post('/admin/delete', adminController.deleteArticle, redirectBack);
app.post('/signup', adminController.signUp, redirectBack);
app.post('/login', adminController.login, redirectBack);

app.get('/', articleController.getAll);
app.get('/addArticle', articleController.renderAddPage, redirectBack);
app.get('/article/:id', articleController.get);
app.get('/edit/:id', articleController.renderEditPage, redirectBack);
app.get('/admin', adminController.renderAdminPage, redirectBack);
app.get('/login', adminController.renderLoginPage);
app.get('/signup', adminController.renderSignupPage, redirectBack);
app.get('/logout', adminController.logout, redirectBack);
app.get('/category', articleController.renderCategoryPage);

// 啟動伺服器
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

```
我覺得學習 Express 困難的點在於 MVC 架構吧，之前寫 PHP 沒有架構的概念，所有東西都寫在一起，雖然比較難閱讀但沒那麼抽象，Express 寫起來會比較抽象一點，一開始會搞不清楚哪些檔案負責什麼部分，controller 跟 model 感覺很像，不過寫了兩三天就熟悉了，也很喜歡這種結構分明的寫法，學會了 Express 之後感覺對後端開發更有信心了一點，應該是有能力自己架出一個完整的網站了。
* P1 我理解為什麼會需要框架
框架背後幫我們做了很多事，例如用 Node.js 的內建功能也可以建立一個伺服器，但是碰到各種需求時就得自己寫一套解決方案，例如 session、HTML 模板、替不同的 HTTP 請求增加特定處理等等，這時候使用框架以及框架的相關套件就會很方便，我們只需要專注在如何使用工具並且實現網站功能即可，不需要自己從零開始造工具，增加開發速度。

* P1 了解什麼是 ORM
ORM 是操作資料庫的一種方式，全名為 Object Relational Mapping，可以讓我們像操作物件一樣來操作資料庫，就不需要手動寫入 SQL 語法，例如說：node.js 有 Sequelize、php 有 Laravel 的 Eloquent ORM 等等。
使用 ORM 的好處是我們比較不須擔心自己撰寫的 SQL 語法存在安全性漏洞，可以放心交給 ORM 處理，像是 Sequelize 會自動使用 prepare statement 功能來操作資料庫，能夠避免 SQL 注入的風險。
* P1 了解 ORM 的優缺點
ORM 的優點是可以讓我們不用自己寫 model、減少 SQL 語法的出錯可能、團隊程式碼撰寫風格統一，但方便的代價是消耗更多的記憶體空間，如果是迫切需要效能良好的產品就不要使用 ORM 了，不過我經驗不夠也還不知道什麼樣的需求會需要自己來寫 model，這邊大概了解一下而已。
* P1 了解什麼是 N+1 problem
N+1 problem 是一個可能存在於 ORM 的效能問題，例如說：
```
// select * from books
const books = 取回所有 books 資料

// 印出所有書本的作者
books.forEach(book => {
  // 對資料庫做 select * from author where author.id = book.id
  console.log(book.author) 
})
```
這樣就會跑出 N(書本數量) + 1(查詢書本數量) 次 query，假設有 100 本書，就會跑 100 + 1 次 query，嚴重傷害資料庫的~~情感~~效能，~~寫出這段程式應該要為此道歉~~。

為了不要被道歉，我們應該這樣寫：
```
// select * from books
const books = 取回所有 books 資料
// select * from author where bookID IN (1, 2, 3, 4, 5, ...)
const authors = 取回所有有關於 book 的作者資料

books.forEach(book => {
  console.log(authors[book.id]) 
})
```
這樣就只會有兩次 query，一次是取得書本的資料，另一次是利用所有書本 id 來查詢作者資料。一次 query 取回 100 筆資料會比 100 次 query 各取 1 筆資料來的高效。
* P1 我知道如何部署 Node.js 應用程式到 heroku
太棒了還好之前有寫筆記，終於找到能夠偷懶的地方 XD，此題請參閱筆記：
[Heroku 部署 SOP](https://hackmd.io/@js8fgfQPQUWFalwMkuQ-Nw/Bk-zpDlvP)

## 十八週 -　現代後端開發（下）

* P1 我能夠從頭把一個網站獨立建起來
從頭把一個網站架起來嗎？行！只要有規格與 UI 設計圖的話…。我覺得設計跟思考產品規格好難 QQ，實現功能應該算最簡單的事情了吧，畫面設計真的很有難度，還得考慮 RWD 各種大小下 UI 該怎麼改動。不過在不考慮畫面美醜的情況建立起一個功能完整網站我想是沒問題的，經過一到十週的課程掌握前端 JavaScript/HTML/CSS，以及如何發 request 串 API、了解瀏覽器跨域問題，十到十四從前端走到後端，能夠建立簡單的 PHP 伺服器並且部署到 AWS 上，也知道如何開 API 與 操作資料庫，也有基本的網站安全認識，十六週後學習方便的後端框架，讓開發更有架構更快速，基本的知識差不多都準備好了，剩下就靠時間與想像力來開發產品囉！
* P1 我知道如何部署 Node.js 的網站到自己的主機
這部份被我跳過了 QQ，本週作業花了不少時間，為了趕上進度只好先選擇部署網站到 HEROKU，之後再練習看看部署到自己的主機。
* P2 我知道如何使用 Nginx
同上 QQ
* P2 我知道如何使用 PM2
同上 QQ
## 十九週 -　產品開發流程

* P1 知道什麼是 Scrum
Scrum 是一種產品開發模式，以 2~4 週為一個週期，每個週期開始時會列出這個週期總共該做哪些事，週期結束時檢討有哪些地方要改善，然後開始下一個週期，直到產品開發完成。
* P1 知道 Scrum 中通常會有哪些元素
1. Product Backlog : 產品的規格、所有需要開發的功能列表
2. Sprint Meeting : 規劃這個 Sprint 總共要做哪些事，寫出 Sprint Backlog
3. Sprint Backlog : 這個 Sprint 總共要開發的事項
4. Sprint (1~4 weeks) : 開發期間，根據 Sprint 來開發所需要的功能，如果想要加入額外目標需要等下個 Sprint
5. Daily Scrum : 每日進度檢討，今天做了什麼明天要做什麼，組員彼此溝通進度
6. Retrospective : 檢討這個 Sprint 有沒有碰到什麼問題
* P1 知道什麼是 user story
用來規劃規格書的方法，用較為明確的方式提出產品需求，例如說十八週的管理後台作業說明就類似這種方式：

1. 身為一個管理員，我希望常見問題的內容可以儲存在資料庫，這樣我才能方便修改
2. 身為一個管理員，我希望管理後台可以管理常見問題，這樣我才能方便修改
3. 身為一個管理員，我希望在後台可以新增常見問題，會有標題跟內容以及順序
4. 身為一個管理員，我希望在後台可以編輯常見問題，包括標題跟內容以及順序
5. 身為一個管理員，我希望在後台可以刪除常見問題
6. 身為一個管理員，我希望前端頁面的資料是從後端拿的，這樣才能跟後台連動

寫法大概就是：身為一個＿＿，我希望＿＿＿。
然後可以用 p1 p2 ...來表示優先度，一個項目也可以直接變成一個 ticket，方便開發管理。