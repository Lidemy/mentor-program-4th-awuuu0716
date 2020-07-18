## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
* canvas
可以在 HTML 裡面繪製圖形、動畫、甚至做遊戲的一個元素。
[MDN 只使用 JavaScript 的 2D 打磚塊遊戲](https://developer.mozilla.org/zh-TW/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
自己嘗試用 canvas 做的小遊戲 ：[notFlappyBird](https://github.com/awuuu0716/notFlappyBird)

* video
在網頁內放影片，例如：```<video src="movie.mp4" controls width="1280" height="720" ></video>```，就在網頁撥放目錄底下名為 movie.mp4 的影片。

* wbr 
讓某個字串無論瀏覽器縮到多小，都能保持完整的樣子，不會被斷行。例如：
``` html
<p>kwjenrkwjentkuqntkoqujnrkoqun<wbr>hello<wbr>werwgwewhe</p>
```
這樣一來可以保證 "hello" 這個單字不會從中間斷行，怎麼斷都會是 hello。
## 請問什麼是盒模型（box modal）
用來計算 HTML 上元素所占空間的一種方式，由內到外分別是：內容 (width/height) > padding > border > margin，一共四層。

內容：設定的 width 與 height 大小。
padding：內文與邊框的距離。
border：邊框的厚度。
margin：邊框以外、離其他元素的距離。

BUT! 如果設計師今天說他要一個盒子，寬長為 300px 200px，並且有 10px 的 padding，如果我們直接設定
``` css
.box { 
  width:300px; 
  height:200px; 
  padding:10px;
}
``` 
這樣一來就會跟設計師要的不一樣，實際上會得到比原本更大的一個盒子，看到的 width 與 height 就會是 (300 + 10 * 2) px 
與 (200 + 10 * 2) px。
如果要讓長寬維持原本設計的 300px 與 200px ，就必須手動計算出 (300 - 10 * 2) 與 (200 - 10 * 2) 的值，
如果網站規模一大，就會耗費許多時間在計算寬度上。
所以我們可以設定 box-sizing 屬性來解決這個問題：
``` css
.box { 
  width:300px; 
  height:200px; 
  padding:10px;
  box-sizing: border-box;
}
```
如此一來，瀏覽器就會自行計算出內容的 width 與 height 該減掉多少，讓每個元素大小更一致。

沒設定 box-sizing: border-box 的盒子：
![](https://i.imgur.com/yWXtY1f.jpg)

設定 box-sizing: border-box 的盒子 (中間變成 280 x 180)：
![](https://i.imgur.com/z3IyFj1.jpg)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* inline ：行內元素，會並排在一起，不會換行，無法指定 width 或 height。
* block ：塊元素，會另啟新行，可以指定 width 或 height。
* inline-block：不會換行、可以並排在一起的 block，可以指定 width 或 height。

三者分別可調整的屬性如下：

|              	| 換行 	| width 	| height 	| padding 	| border 	| margin 	|
|--------------	|------	|-------	|--------	|---------	|--------	|--------	|
| inline       	| No   	| No    	| No     	| Yes     	| Yes    	| Yes    	|
| block        	| Yes  	| Yes   	| Yes    	| Yes     	| Yes    	| Yes    	|
| inline-block 	| No  	| Yes   	| Yes    	| Yes     	| Yes    	| Yes    	|

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
* static：預設的定位方式，由上排到下、由左排到右，無法指定 top, down, right, left
* relative：如果沒設定 top, down, right, left, 的話看起來就跟 static 一樣，但如果設定了 top: 10px; 就會讓元素往下偏離 10px，
而且不會影響到其他元素的定位，但內容有可能會蓋到其他元素。
* absolute：會往上找到第一個不是 static 的元素定位，並且可以設定 top, down, right, left 來偏移定位，一旦設定了 absolute，其他下面的元素便會遞補上來，當作這個 absolute 元素不存在，也就是說會影響到其他元素的定位。
* fixed：對瀏覽器做定位，無論畫面往上或往下，它都會停在設定的位置，就像釘在螢幕上一樣。

