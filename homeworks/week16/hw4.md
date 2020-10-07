```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

* 判斷 this 的小技巧：看呼叫時 . 的前面是什麼。
obj.inner.hello()：hello() 的前面是 inner，因此 this 為 inner，console.log(this.value) 會印出 inner.value，也就是 2

obj2.hello()：hello() 的前面是 obj2，obj2 又指向 obj.inner，因此這裡其實跟上面的 obj.inner.hello() 的結果一樣，都會印出 2

hello()：hello() 的前面沒東西，會指向全域物件，在全域物件中找不到 value 這個屬性，因此印出 undefined
