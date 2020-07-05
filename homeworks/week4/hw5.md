## 請以自己的話解釋 API 是什麼

以特定格式、交換特定資料的一種資料交換媒介。
API 不給的你不能拿、API 看不懂的你也不能給。好比說去麥當勞買餐點，店員就是一個 API，
你沒辦法在麥當勞買到滷肉飯，也沒辦法跟店員說：隨便，吃什麼都好。你得明確的告知對方：大
麥克餐、薯條可樂加大，類似這樣的訊息，然後付錢，才能正確拿到餐點。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. 400 : 例如串 Twitch API 時，client-id 不正確就會顯示此狀態碼，代表伺服器收到他不接受的東西而拒絕
   請求。

2. 410 : 請求的東西已經不見了，例如 串 Twitch API 時沒帶上 Accept: application/vnd.twitchtv.v5+json，
   這個 header 就會發送請求到 v3 這個已經被移除的 Twitch API，在[官方文件](https://dev.twitch.tv/docs/v5)也提到 v5 在未來也將會移除，大概也會變成 410 吧?

3. 429 : API 短時間內呼叫太多次，超過所允許的上限。串 API 時如果不小心把 request 寫進迴圈裡又出不來，就有機會出現此狀態。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://wantoeat.com

### 回傳所有餐廳資料

method: GET 　
path: /restaurants
參數: \_limit:限制回傳資料數量
範例: /restaurants?\_limit=5

### 回傳單一餐廳資料

method: GET 　
path: /restaurants/:id
參數: 無
範例: /restaurants/1

### 新增餐廳

method: POST 　
path: /restaurants
參數: name:餐廳名稱
範例: 無

### 刪除餐廳

method: DELETE
path: /restaurants/:id
參數: 無
範例: 無

### 更改餐廳

method: PATCH
path: /restaurants/:id
參數: name:新的餐廳名稱
範例: 無
