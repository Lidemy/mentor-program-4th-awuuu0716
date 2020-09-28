```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
// Global 初始化
globalEC.VO {
  a:undefined,
  fn:function
}

// 執行 a = 1
globalEC.VO {
  a:1,
  fn:function
}

// 執行 fn() 並且初始化
fnEC.AO {
  a:undefined,
  fn2:function
}

// 執行 console.log(a)
印出 undefined

// 執行 a = 5
fnEC.AO {
  a:5,
  fn2:function
}

// 執行 console.log(a)
印出 5

// 執行 a++
fnEC.AO {
  a:6,
  fn2:function
}

// var a , fnEC.AO 已有變數 a，此行忽略

// 執行 fn2() 並且初始化
fn2EC.AO {

}

// 執行 console.log(a)，在 fn2EC.AO 找不到，再往 fnEC.AO 找，找到 a:6
印出 6

// 執行 a = 20，在 fn2EC.AO 找不到，再往 fnEC.AO 找，找到 a
fnEC.AO {
  a:20,
  fn2:function
}

// 執行 b = 100，在 fn2EC.AO 找不到，再往 fnEC.AO 找不到，再往 globalEC.VO 找不到，已到頂端，執行預設行為，在 globalEC.VO 建立變數 b
globalEC.VO {
  a:1,
  b:100,
  fn:function
}

// 離開 fn2EC，回到 fnEC，執行 console.log(a)
印出 20

// 離開 fnEC，回到 globalEC 執行 console.log(a)
印出 1

// 執行 a = 10
globalEC.VO {
  a:10,
  b:100,
  fn:function
}

// 執行 console.log(a)
印出 10

// 執行 console.log(b)
印出 100

console 的印出結果統整：
undefined
5
6
20
1
10
100