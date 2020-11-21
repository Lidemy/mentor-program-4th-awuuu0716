## 為什麼我們需要 Redux？
1. 方便追蹤是誰改動了狀態
2. 避免 prop-drilling
3. Redux DevTools 可以時間旅行、追蹤狀態，debug 時很方便

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
Redux 是管理 state 的工具，在比較複雜的 app 當中，如果沒有負責統一管理狀態的工具，資料將會變得難以追蹤，出現問題時也比較不好找到問題點。打個比方來說，在班級裡面如果誰都可以寫黑板，有人在黑板亂寫了髒話，就會找不到是誰寫的。如果把寫黑板的工作統一交給班長，班長記下是誰需要寫東西要寫什麼，再由班長去寫，這樣一來，就能知道黑板上寫的東西是誰的了，雖然比較沒效率，但在人數眾多時出事情會比較好抓兇手。

Redux 的主要三大元件：
1. Actions: 用來描述要改變的資料類型以及內容，傳遞給 Reducer 進行資料處理，就像是一般同學的角色，只能發送請求不能直接操作狀態。
2. Reducer: 負責處理收到的 actions，依照 action.type 決定要用哪個邏輯來改變狀態，在依照 action.payload 來改變狀態內容，就像是班長的角色，負責班上一切的公共事務。
3. Store: 紀錄狀態的地方，就像是班上的公共事務手冊。

Redux 的資料流：
![](https://i.imgur.com/IgbHUds.jpg)

心得：redux 的資料流感覺跟瀏覽器發 Request 的流程很像，三大元件就像瀏覽器的 HTTP 請求、伺服器、資料庫，雖然實際上應該差蠻多的，不過我大致上暫時是這樣理解，畢竟這東西真的很抽象 QQ，需要依賴已知的概念來認識 Redux 這東西。
## 該怎麼把 React 跟 Redux 串起來？
首先我們建立一個非常簡單的 React APP，功能只有顯示一個數字，滑鼠每點數字一下就會 + 1，然後為這個 APP 套上 Redux：
1. 安裝 redux : npm install redux
2. 安裝 react-redux : npm install --save react-redux
3. 建立 store
```JavaScript
import { creareStore } from 'redux';
import rootReducer from './reducers';

export default creareStore(rootReducer)
```
4. 建立 reducer
```JavaScript
import { ADD_COUNT } from '../actionTypes';

const initialState = 0;

export default function count(state = initialState, action) {
  // 照理說這裡只有一種情況不會使用 switch，但在複雜的 APP 當中會有多個 action，所以會用 switch 來處理 action，這裡純粹示範用。
  switch (action.type) {
    case ADD_COUNT:
      return state + 1
    default:
      return state;
  }
}
```
5. (選擇性) 建立 combineReducer
```JavaScript
// 結合多個 reducer 的地方
import { combineReducers } from 'redux';
import count from './count';

const rootReducer = combineReducers({
  count,
});

export default rootReducer;
```
6. (選擇性) 建立 actionTypes
```JavaScript
// 這個常數的目的是避免 actionType 打錯字產生難以追蹤的錯誤。
// 使用這個方式即使打錯常數名稱也會報出明顯的錯誤，比較容易 debug。
export const ADD_COUNT = 'ADD_COUNT';
```
7. 建立 actions
```JavaScript
import * as types from './actionTypes';

export const addCount = () => ({ type: types.ADD_COUNT });
```
8. (選擇性) 建立 selectors
```JavaScript
// 可以輸出多個 selector
export const getCount = (store) => store.count;
```
9. 使用 Provider 包住整個 APP，類似 React hook Context 的概念
```JavaScript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

10. 改造原本的 App.js
```JavaScript
import { getCount } from './redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addCount } from './redux/actions';

function App() {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  return <div onClick={() => dispatch(addCount())}>{count}</div>;
}

export default App;
```

