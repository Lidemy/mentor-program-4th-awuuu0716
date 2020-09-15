## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是打包模組的工具，可以把分散各個檔案的模組全部集合到一份檔案內，在打包的時候還能順便將資料做額外的處理，例如打包 JS 時做 uglify、CSS minify 之類的。
打包之後的檔案可以方常方便的引入網頁中使用，不需要引入一堆檔案就能使用的插件。

如果開發的項目規模不大或是沒用到那麼多模組的話也是可以不用到 webpack，依照產品規模選擇適合的工具使用即可。
## gulp 跟 webpack 有什麼不一樣？
gulp 是任務管理工具，webpack 是模組打包工具，兩者做的事情不太一樣。

gulp 會把任務（uglify、minify 等等）集中起來管理，讓開發者不用一個一個執行任務，可以一次處理完要做的事。
webpack 則是將模組集合起來成為一個檔案，而在集合的過程中也能順便做 (uglify、minify)，所以感覺上會跟 gulp 有點類似。

## CSS Selector 權重的計算方式為何？
!important > inline style > ID > Class/psuedo-class/attribute > Element
依照順序，可以把上面的大小用五個數字顯示，每符合一項權重就 + 1，
數值一樣就繼續往下比較，權重大的規則會蓋過權重小的，例如：

``` html
<div class="box">
  <div class="item"></div>
  <div id="item"></div>
</div>
```

```css
// 權重 0,0,0,1,0
.item {
  color:blue;
}

```

在這個規則下的權重就是：0,0,0,1,1

如果再加上一條規則：

```css
// 權重 0,0,0,1,1
.box div {
  color:red;
}

// 權重 0,0,0,1,0
.item {
  color:blue;
}

```
雖然這條規則寫在上面，但是權重較高，最後使用的規則會變成 color:red 這條。

如果再加上一條規則：

```css
// 權重 0,0,0,1,1
.box div {
  color:red;
}

// 權重 0,0,0,1,0
.item {
  color:blue;
}

// 權重 0,0,1,0,0
#item {
  color:green;
}

```
此時 id 為 item 的元素有兩條規則存在，一條是 color:red，一條是 color:green，
color:red 的權重為：0,0,0,1,1
color:green　的權重為：0,0,1,0,0
color:green 的權重較大，因此套用此規則。

最後來看 !important：

```css
// 權重 1,0,0,1,1
.box div {
  color:red;!important
}

// 權重 0,0,0,1,0
.item {
  color:blue;
}

// 權重 0,0,1,0,0
#item {
  color:green;
}
```
!important 的權重是最大的，相當難覆蓋掉，加上了 !important 後 .box 底下的 div 都會套用 color:red 這條規則。要覆蓋的話是必得先加上 !important：
```css
// 權重 1,0,0,1,1
.box div {
  color:red;!important
}

// 權重 0,0,0,1,0
.item {
  color:blue;
}

// 權重 1,0,1,0,0
#item {
  color:green;!important
}
```

這樣 id 為 item 的元素就會套用到 color:green 了，但是這樣一來權重計算就會相當複雜，程式碼也得多上不少行，除非萬不得已，還是盡量不要覆蓋太多層規則，否則權重計算會變成噩夢，分不清楚到底最後是使用哪條規則。