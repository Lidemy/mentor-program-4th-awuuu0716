```JavaScript
console.log(1) 
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
執行第一行，印出 1
執行第二行，在 0 毫秒後把 () => console.log(2) 把放入 Event Queue 中
執行第五行，印出 3 
執行第六行，在 0 毫秒後把 () => console.log(4) 把放入 Event Queue 中
執行第九行，印出 5
Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(2)，印出 2
Execution Stack 任務已清空，處理 Event Queue，執行 () => console.log(4)，印出 4

所以 console 最後應該會印出：
1
3
5
2
4
