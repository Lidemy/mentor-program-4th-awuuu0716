## 請列出 React 內建的所有 hook，並大概講解功能是什麼
比較熟悉的 hooks:
useState: 用來建立元件的 state，useState 會回傳一個陣列，陣列內第一個值是 state，第二個則是更新 state 的函式。useState 傳入的參數會是 state 的初始值，如果傳入的是一個函式，那麼 useState 只會在第一次 render執行這個函式，可以用在需要昂貴計算的初始化函式。
useEffect: 這個 hook 會在元件 render 完執行，可以用來執行具有副作用的函式，例如改變 state、call API等等。第二個參數接收一個陣列，用來監控特定的 state，當 state 有改變時才會執行這個 hook，如果傳入的式空陣列，代表這個 hook 只會在第一次 render 後執行，之後會被略過。
useContext: 在資料需要穿透多層元件時，這個 hook 會很有用，可以想像成他也是一個元件，但是在他的任一個子元件底下都能存取到儲存的資料，不需要一層一層傳 props 下去。

以下是還不太熟的 hooks:
useReducer: 似乎是比較進階的 useState 用法，跟 useState 的不同之處在於可以拿到一個 dispatch function，dispatch 可以拿到之前的 state，並且依據不同的 action 來改變 state。
useCallback: 傳遞一個 callback 以及依賴 array，會記憶傳遞進去的 callback 回傳值，只有在依賴 array 改變時才會更新。
useMemo: 傳遞建立 function 以及依賴 array，跟 useCallback 類似會記憶 function 的回傳值只有在依賴 array 改變時才會更新。需要注意的是傳遞進去的 function 只會在 render 階段執行，用途就是讓一些沒有必要更新的計算又昂貴的子元件不會被其他 state 影響導致 re-render，是一種優化效能的手段。
useRef: 傳入一個初始值，會回傳一個 mutable 的 ref 物件，.current 屬性可以存取到傳入的初始值，可以用在需要自製 id 例如：
```JavaScript
// 初始化
const id = useRef(0)
// 之後可以直接去改動 id.current，每次 render 都還會是同一個 ref obj
id.current++
```
useImperativeHandle: 小夫你的新玩具不錯嘛，借我玩一下。這個 hook 超難懂 QQ，大概是讓子元件設定的 useRef 能夠往上傳讓母元件也能存取的到，就像胖虎借小夫的東西來用一樣，你的東西就是我的東西，我的東西還是我的東西。
useLayoutEffect: 會在 DOM 改變完之後、瀏覽器繪製前執行的 hook，不過 React 建議先使用 useEffect，避免阻礙畫面更新。
useDebugValue: 在自訂義 hook 中使用，可以用來顯示一些自訂義的訊息。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
有個網站 hen 棒，清楚列出了所有 class component 的 lifecycle method：[React Lifecycle Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
元件的一生跟我們人類一樣大概分成三個階段，出生(Mounting)、更新(Updating)、死亡(Unmounting)，讓我們先來看 Mounting 這個階段。
首先 constructor 會被執行，這就像我們的基因，一生下來就決定好膚色、頭髮顏色、遺傳疾病、以及你的舌頭是否能捲起來，元件的初始化將在這裡被執行。
然後是 render，人類的比喻掰不下去了，元件的 render 會決定要放什麼東西到畫面上。
最後是 componentDidMount，當 DOM 都建立好之後會執行。

Updating 順序如下：
1. shouldComponentUpdate(): 確定要更新嗎？預設是回傳 true，如果回傳 false 將會跳過下面的生命週期方法。
2. render(): 更新 DOM。
3. componentDidUpdate()：更新 DOM 完會執行的方法。

Unmounting :
1. componentWillUnmount(): 元件將被卸除前會執行，可以留下一些遺言、清除一些剩餘的債務或是未處理完的網路請求。

## 請問 class component 與 function component 的差別是什麼？
最大的差別在於 function component 每次 render 都會重新呼叫一次 function，新的 function 會有新的 props，function 內部的變數也都會重新再宣告一次。在寫 class component 時我們注意的是在各個生命週期函式個要做哪些事，利用 instance 來綁定 this 可以確保正確指向最新的值，不用擔心 re-render 後東西會跑掉。但是在寫 function component 時就得注意每次 render 後產生新的 props 是否有被正確傳入其他地方。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
差在 input 的 value 有沒有被 state 綁定，或是說資料有沒有被 React 控制，要用的時候會像這樣：
``` JavaScript
function App () {
  // 建立 state
  const [ name, setName] = useState('')
  // 宣告方法,每當 input 輸入新的值就改變 state
  const handleChange = e => setName(e.target.value)
  // input 元素的 value 與 state 綁定, 並加上 onChange 事件
  return <input value={name} onChange={handleChange}/>
}
```
如果不用 controlled component，當我們要存取資料就得用老方法 document.querySelector() 來拿到 input 的東西，在使用 React 的時候，是非常不建議直接去碰 DOM 的。