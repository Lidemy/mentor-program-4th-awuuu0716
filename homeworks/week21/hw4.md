## 為什麼我們需要 React？可以不用嗎？
我們完全可以不用 React 就能進行前端開發，React 只是提供另一種思考方式來開發網頁前端，以往我們要改變網頁上的內容得使用各種瀏覽器提供的 API 來操作 DOM。
在 React 中要改變網頁內容則是改變元件的 state，一旦 state 改變，React 就會幫我們處理 DOM，我們可以專注在資料處理的邏輯上，不需要親自操作畫面。
## React 的思考模式跟以前的思考模式有什麼不一樣？
React 的思考模式是 state，凡是會動的會改變的都應該要放進 state 中。
例如說一個計數器，在以前我們可能會這樣寫：
``` JavaScript
// 抓取目標的 DOM 元素
const counter = document.querySelector('.counter')
// 加上事件，滑鼠每點就 + 1
counter.addEventListener('click', () => {
  // 直接改變畫面上的文字
  counter.innerText = Number(counter.innerText) + 1
})
```
而在 React 中，要改變畫面就得先改變 state：
``` JavaScript
// 一個 React 元件
function Counter () {
  // 初始化 state
  const [count, setCount] = useState(0)
  // 宣告事件的 callback function
  const handleClick = () => { setCounter(counter++) }
  // 回傳 JSX
  return <div onClick={handleClick}>{count}</div>
}
```

## state 跟 props 的差別在哪裡？
state 是元件的狀態，可以透過 React 提供的方法改變。
props 是元件傳給子元件的參數，無法直接在子元件改變 props，props 會在上層元件就決定好。

此外，如果要在子元件改變上層元件的 state，上層元件必須先提供一個 function 來讓下層元件呼叫，藉此改變上層的 state。
