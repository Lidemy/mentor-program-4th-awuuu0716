## 什麼是 DOM？
DOM 是 HTML 與 JavaScript 的溝通橋樑，讓 JavaScript 用節點的方式存取 HTML。透過 DOM 我們才能用 JavaScript 控制網頁畫面，例如存取節點、加入節點、刪除節點、幫節點新增屬性、刪除屬性、加入事件監聽…等

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
順序為：
1. 捕獲階段
2. 目標階段
3. 冒泡階段

* 冒泡：由目標節點一路往上觸發事件，例如節點 Ａ－Ｂ－Ｃ－Ｄ－Ｅ(目標)，事件觸發順序就會是 Ｅ－Ｄ－Ｃ－Ｂ－Ａ。
* 捕獲：由根結點一路向下觸發事件，例如節點 Ａ－Ｂ－Ｃ－Ｄ－Ｅ(目標)，事件觸發順序就會是 Ａ－Ｂ－Ｃ－Ｄ－Ｅ。

雖然 addEventListener 可以設定第三個參數改變捕獲或冒泡，但事件傳遞順序仍然不會變，改變的只是這個監聽器觸發事件的時機。

## 什麼是 event delegation，為什麼我們需要它？
event delegation 是一種能夠節省資源的事件監聽模式，好比老師委派一位同學擔任衛生股長，衛生股長再依照日期與座號指定全班同學當值日生做打掃。
在網頁中如果我們有一個清單，清單底下有 100 個項目，每個項目要加入刪除按鈕，如果一個一個加入事件監聽，不但很麻煩也很吃資源，這時候就可以用 event delegation 來改善。
步驟大概是：
1. 幫 ul 加入事件監聽 (addEventListener('click',(event)=>{...}))
2. 點到節點下層的按鈕觸發事件 (使用者點到按鈕)
3. 搜尋離觸發目標最近的 li (event.target.closest(selectors))
4. 刪除 li (Node.removeChild(''))

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
event.preventDefault() 會取消事件的預設行為，例如處理輸入時，讓 Enter 鍵不要有換行的行為：
``` html
<body>
    <div contenteditable="true" class="input__area"><div>
    <div class="task__area"></div>

    <script>
        const input = document.querySelector('.input__area');
        const taskArea = document.querySelector('.task__area');

        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const taskContent = input.innerHTML;

                // 加入 preventDefault 以免 enter 做出換行效果
                e.preventDefault();

                // 沒有輸入, 不可以送出
                if (!taskContent) return;

                const newTask = document.createElement('div');
                const newTaskHTML = `
                    <button class="button__done__off" id="done"></button>
                    <p class="task__content">${taskContent}</p>
                    <div class="task__done__line__off"></div>
                    <button class="button__delete" id="del">X</button>`;
                    
                newTask.innerHTML = newTaskHTML;
                newTask.classList.add('task__container');
                taskArea.insertBefore(newTask, taskArea.childNodes[0])
                input.innerHTML = '';
            }
        })
    <script>
</body>
```

event.stopPropagation() 會停止事件的傳遞，例如有三個重疊的 div，每個 div 都掛有事件監聽，但我想要只觸發最底下的 div 事件，就加上 stopPropagation() 來阻止事件繼續傳遞：

``` html
<body>
    <div class="div__1">
        <div class="div__2">
            <div class="div__3">
            <div>
        </div>
    </div>

    <script>
        document.querySelector('.div__1').onClick = () => {...};
        document.querySelector('.div__2').onClick = () => {...};
        document.querySelector('.div__3').onClick = (e) => {
            ...
            e.stopPropagation()
        };

    </script>
</body>

```