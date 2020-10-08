## 什麼是 MVC？
MVC 是一種程式碼架構，將應用程式分成資料、畫面、操作三個部分，用這種架構可以讓程式碼的分工明確，不會所有東西都混在一起難以閱讀。

MVC 分別是 Model、Views、Controller
Model 負責處理資料，在實作上會與資料庫溝通，然後看 Controller 要什麼就給他什麼。
Views 負責畫面，也就是 HTML 架構，把資料塞進 HTML 中交給瀏覽器渲染。
Controller 根據使用者的請求來向 Model 要資料，再將資料交給 Views 處理畫面。

## 什麼是 ORM？
ORM 是一種操作資料庫的方式，以往操作資料庫得下 SQL 語法，但使用 ORM 的話就能像操作物件一樣操作資料庫，不需要在自己下 SQL 語法，是很方便的工具，使用 Sequelize 還能順便防止 SQL 注入漏洞，基本上安全問題可以放心交給 Sequlize 處理。

## 什麼是 N+1 problem？
