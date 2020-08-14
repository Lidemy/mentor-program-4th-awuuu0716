## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
可儲存的字串長度上限不一樣，VARCHAR 最多到 65535 個字節，TEXT 可以存到約 1600 萬個字節。
為此我寫了一點關於資料型態的筆記：[MySQL 資料型態不正確時會發生什麼事](https://hackmd.io/@js8fgfQPQUWFalwMkuQ-Nw/SktbcbWfv)。
查詢速度好像也有差：char > varchar > text。資料來源：[MySQL性能优化之char、varchar、text的区别](https://blog.csdn.net/brycegao321/article/details/78038272)
資料不大時選用 char 或 varchar，資料很大且不確定長度時使用 text，但還是要注意上限。
## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是一種儲存瀏覽狀態的方式，因為伺服器並不會認得發 request 的人，但是它可以看你帶來的 Cookie 內容來認識你。
好比來說 Cookie 就是一個履歷表，我們應徵工作不能只跟公司說：欸公司，給我一個工作。不附上履歷的話公司根本無從判斷是否要錄用這個人。

在網頁中我們的 Cookie 可能會記下我們是否為登入狀態、使用者是誰，伺服器就會根據我們帶來的 Cookie 給予相對應的權限，
有登入的話才能發文、編輯文章，沒登入的話就會瘋狂騷擾你要你註冊。

那要怎麼設定 Cookie 呢？
瀏覽器跟伺服器其實都可以設定 cookie，只是我們自己填的 cookie 伺服器未必會認帳 (自己畫張千元鈔票去 7-11 買東西，店員可能會報警，或是笑你)，
如果是 chrome 瀏覽器的話，點選網址列左邊的小鎖頭就能看到目前的 cookie，在 Devtool 的 console 裡輸入 document.cookie = "..." 可以自己修改 cookie。
伺服器的話可以在 PHP 裡寫 setcookie() 來設定，伺服器在回應的 headers 裡就會多一個 Set-Cookie:"..."，瀏覽器接收到便會將其內容存起來，
當瀏覽器有了 cookie 時，發送 request 就會在 headers 中設定 cookie:"..."，這樣一來，server 就能從這個 header 判斷發 request 的人是誰了。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 使用者資料沒有加密，萬一資料庫遭到入侵，他們可以隨意竊取使用者的帳號，更慘的話還能一次盜走使用者的其他網站帳號(因為使用者在多個網站使用同個帳密)。
2. 使用者輸入沒有過濾，萬一他填了奇怪的暱稱例如：header("Location:https://google.com")，PHP 在讀取他的暱稱時就會被導向 google.com，
攻擊者可以用這方法導向一個一模一樣的網站，當你不小心在那網站輸入帳密，就完蛋了。
3. 使用者可以隨意地更改網址(/login.php、/delete.php)來決定他要看我們哪個頁面，我不確定有什麼問題，但感覺很危險。
4. 使用者的留言如果包含 Emoji 會造成問題，資料庫沒設定好會讓 emoji 後面的東西都存不進去。
