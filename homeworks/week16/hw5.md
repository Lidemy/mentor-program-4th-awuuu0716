## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
應該有比之前更懂了吧 XD，做個比較表檢視一下好了：
|              	| Before    	|After |
|--------------	|-----	|-----	|
| 作用域          	| 大概知道跟函式建立時的環境有關 	|引入 EC 與 VO/AO 概念建立起 Scope Chain|
| Event Loop        	| Execution Stack 清空後查看 Event Queue 不斷循環	| 跟之前差不多|
| Hoisting       	| 變數與函式會先被解析	| 初始化時建立起 AO/VO 並且變數與函式有先後順序，另外 let 與 const 也會 Hoisting，只是初始化後使用前會進入 TDZ|
| Closure        	| function 回傳的 function 可以存取到上層函式的變數	| 了解到閉包可以如何應用，例如做出一個外界無法任意存取的錢包物件|
| 物件導向        	| 大概知道物件的建構子與原型鍊以及如何使用 class	|從 PHP 的物件導向了解到什麼是私有屬性以及方法，用 getter 與 setter 來改變物件的屬性會比較妥當|
| this          	| 只知道在物件中使用 this 會指向該物件，物件外使用 this 常會指向全域物件 	|了解 call()、apply()、bind() 的用法，以及 this 是跟怎麼被呼叫的有關|