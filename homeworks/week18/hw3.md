## 什麼是反向代理（Reverse proxy）？
反向代理是指用戶不會直接與網站伺服器發送請求，而是向伺服器的代理伺服器發送請求，代理伺服器從真正的伺服器拿到回應後再送回給用戶，用戶不會知道實際上的伺服器到底在哪裡。
利用反向代理的好處是可以分配不同服務到不同 port，用戶不需要輸入各種 port 來取得不同服務，也可以把內部使用的 port 資訊隱藏起來。

## 什麼是 ORM？
ORM 是操作資料庫的一種方式，全名為 Object Relational Mapping，可以讓我們像操作物件一樣來操作資料庫，就不需要手動寫入 SQL 語法，例如說：node.js 有 Sequelize、php 有 Laravel 的 Eloquent ORM 等等。
使用 ORM 的好處是我們比較不須擔心自己撰寫的 SQL 語法存在安全性漏洞，可以放心交給 ORM 處理，像是 Sequelize 會自動使用 prepare statement 功能來操作資料庫，能夠避免 SQL 注入的風險。

## 什麼是 N+1 problem？
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

PS. N + 1 Problem 是我尚未在實作上遇過的問題，因此只能概略的從網路資料來理解這個議題，如果有理解錯誤的地方還請老師助教指正~