## 什麼是 MVC？
MVC 是一種程式碼架構，將應用程式分成資料、畫面、操作三個部分，用這種架構可以讓程式碼的分工明確，不會所有東西都混在一起難以閱讀。

MVC 分別是 Model、Views、Controller
Model 負責處理資料，在實作上會與資料庫溝通，然後看 Controller 要什麼就給他什麼。
Views 負責畫面，也就是 HTML 架構，把資料塞進 HTML 中交給瀏覽器渲染。
Controller 根據使用者的請求來向 Model 要資料，再將資料交給 Views 處理畫面。

## 請寫下這週部署的心得
Heroku 雖然剛開始接觸時也是蠻麻煩的，卡了幾個小時才成功部署，但第二次部署就快很多，掌握了 SOP 後 Debug 也很快抓到問題點，寫了一篇部署步驟來方便日後複習：[筆記](https://hackmd.io/@js8fgfQPQUWFalwMkuQ-Nw/Bk-zpDlvP)

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
Node.js 的寫法跟之前 PHP 差很多，尤其是使用 express 之後就得遵照著架構去寫，強迫我們得將各功能拆開來寫，雖然層次分明但也比較抽象，需要摸個兩三天才能上手，
上手後寫起來還蠻舒服的，程式碼也比沒用框架的 PHP 好閱讀。