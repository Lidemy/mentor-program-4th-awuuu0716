```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
用時間軸來表示感覺比較好說明，在此假設每一行執行時間都只需要一毫秒：

1ms：執行第一行，宣告變數 i = 0，當 i < 5 時執行迴圈，i < 5，執行迴圈。(i === 0)
2ms：執行第二行，印出 i: 0。
3ms：執行第三行，在 0 * 1000 毫秒後把 () => console.log(i) 把放入 Event Queue 中，第一圈迴圈結束，回到第一行。

4ms：執行第一行，i ++，當 i < 5 時執行迴圈，i < 5，執行迴圈。(i === 1)
5ms：執行第二行，印出 i: 1。
6ms：執行第三行，在 1 * 1000 毫秒後把 () => console.log(i) 把放入 Event Queue 中，第一圈迴圈結束，回到第一行。

7ms：執行第一行，i ++，當 i < 5 時執行迴圈，i < 5，執行迴圈。(i === 2)
8ms：執行第二行，印出 i: 2。
9ms：執行第三行，在 2 * 1000 毫秒後把 () => console.log(i) 把放入 Event Queue 中，第一圈迴圈結束，回到第一行。

10ms：執行第一行，i ++，當 i < 5 時執行迴圈，i < 5，執行迴圈。(i === 3)
11ms：執行第二行，印出 i: 3。
12ms：執行第三行，在 3 * 1000 毫秒後把 () => console.log(i) 把放入 Event Queue 中，第一圈迴圈結束，回到第一行。

13ms：執行第一行，i ++，當 i < 5 時執行迴圈，i < 5，執行迴圈。(i === 4)
14ms：執行第二行，印出 i: 4。
15ms：執行第三行，在 4 * 1000 毫秒後把 () => console.log(i) 把放入 Event Queue 中，第一圈迴圈結束，回到第一行。

16ms：執行第一行，i ++，當 i < 5 時執行迴圈，i === 5，離開迴圈。(i === 5)

17ms：Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(i)，因為在 () => console.log(i) 找不到變數 i，往上找到位於 Global 的 i，i === 5，印出 5
1000ms：Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(i)，因為在 () => console.log(i) 找不到變數 i，往上找到位於 Global 的 i，i === 5，印出 5
2000ms：Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(i)，因為在 () => console.log(i) 找不到變數 i，往上找到位於 Global 的 i，i === 5，印出 5
3000ms：Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(i)，因為在 () => console.log(i) 找不到變數 i，往上找到位於 Global 的 i，i === 5，印出 5
4000ms：Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(i)，因為在 () => console.log(i) 找不到變數 i，往上找到位於 Global 的 i，i === 5，印出 5

console 的印出結果統整：
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5