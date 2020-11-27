## Redux middleware 是什麼？
是指 dispatch 後，進入 store 之前的中介軟體，可以做一些額外的事情。例如說 Redux thunk 這個 middleware 可以發非同步的 request 出去，等到 response 回來後再發 dispatch 給 store。
Redux saga 則是處理更複雜的非同步操作，例如途中取消非同步操作、模擬類似資料庫 transaction 的操作方式等等。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
差在伺服器有沒有 render 畫面，只要有就算是 SSR。引用 min 助教補充的一張圖說明：
![](https://user-images.githubusercontent.com/10834433/92352316-6422e280-f110-11ea-8b0d-fc29ef8fb4cf.png)
四種方法中只有第二種算是 CSR，畫面完全由用戶端產生，伺服器只會丟出空空的 HTML 以及 JS 檔案，之後的畫面渲染全都交由 JS 動態產生，如果我們打開某個網頁原始碼發現完全看不到網頁內容，這個網頁大概就是 CSR。但也衍生出一個問題，搜尋引擎可能會爬不到網頁內容，因為它未必會執行我們丟出的 JS 檔案，或是執行太久有可能就不執行了，我們的網站 SEO 有可能因此下降，需要一個新的方法讓伺服器先渲染出重要的網頁內容，同時又保有 CSR 的優點。

## React 提供了哪些原生的方法讓你實作 SSR？
使用 ReactDOMServer.renderToString(element) 可以產生一個初始的 HTML 字串，這樣一來搜尋引擎就能看到我們的網頁內容了。但是只用這個方法沒辦法讓 HTML 元素加上 EventListener，因為 HTML 歸 HTML，EventListener 歸 JavaScript，HTML 不會管你有什麼 EventListener，這時候就需要另一個方法：ReactDOM.hydrate()。這個方法會在前端透過 React 執行，他會嘗試幫 HTML 附加上 EventListener，我們的網頁就能動起來了！但是還有個問題需要解決，那就是假如說我們的網頁需要 Call API 拿資料，這時候該如何是好呢？在接下來的題目會介紹兩種方案來解決上述問題。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
1. prerender: 一個超輕巧的 SSR 工具，他會將 CSR 網頁執行完 JavaScript 的結果顯示給搜尋引擎看，使用起來無敵簡單。

安裝：
```cmd
npm install prerender-node --save
```
使用：
```JavaScript
// index.js
app.use(require('prerender-node'));
```

2. Next.js: 一個基於 React.js 的框架，內建許多我們在寫 React 時會需要手動找套件的功能，例如：
SSR、Routing、Css In Js 等等，相對於第一個方法來，Next.js 雖然能夠解決 SSR 問題，但也得熟悉這套工具的使用，會需要一些學習時間，如果只是想解決 SSR 問題，似乎使用 prerender 會比較快。

