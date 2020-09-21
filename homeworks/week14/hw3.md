## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS (Domain Name System)，一種將好記的域名 (Domain name) 與 IP 位置連結起來的系統，就像是總機一樣，會幫你轉接到正確的網路位置。
Google 有提供公開的 DNS 伺服器 (8.8.8.8)，對一般大眾來說 Google 表示他的 DNS 
>「 made many improvements in the areas of speed, security, and validity of results.」

，快速安全且穩定，在官方文件 Q&A 中提到他們雖然不會幫忙阻擋你不想看到的網站，但可能會擋掉一些明顯具有危險性的網站，
同時 google 也表示他們不會像某些 DNS 提供者會為了商業用途過濾、阻擋、重新導向網站。

至於對 Google 的好處，在 Q&A 中他們提到：
> 「Your client IP address is only logged temporarily (erased within a day or two), 
> but information about ISPs and city/metro-level locations are kept longer for the purpose of making our service faster, better, and more secure.」

用戶的 IP 位置只會儲存一小段時間，但是 ISP 與所在城市資訊會被長期保存以方便改善他們的服務，並且除了政府合法的要求以外，這些資訊不會交給 Google 以外的地方，
至於他們是如何利用這些資訊的，那就不得而知了。

從 [Your Privacy](https://developers.google.com/speed/public-dns/privacy) 頁面可以得知，他們收集的資訊如下：

Temporary DNS Logs (erased within a day or two):
* the IP address of your device sending the DNS query
* the technical information collected for Permanent Logs (see below)
* for DNS-over-HTTPS (DoH): the Content-Type and Accept HTTP headers

Permanent DNS Logs:
* Requested domain name
* Request type (A , AAAA , NS, MX, TXT, etc.)
* Transport protocol (TCP, UDP, TLS, or HTTPS)
* Client's autonomous system number
* User's geolocation: country, region, and city (no more specific than 1 km² and 1000 users)
* DNS Response code
* Google DNS server information
* Timestamp
* Processing time
* Response DNS flags (including AD, CD, DO, RD, and TC)
* Response size
* EDNS version
* EDNS option
* EDNS Client Subnet (ECS) (IP protocol and prefix length -- excluding the client IP address)
* For DNS-over-HTTPS (DoH):
* Version string corresponding to HTTP path (/dns-query or /resolve)
* Response HTTP encoding, such as application/dns-message or json

欸不是，仔細一看會長期保存的資訊還蠻多的欸 XD，實在蠻好奇他們到底會怎麼利用這些資訊。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
lock 是一種為了確保每筆 transaction 保持一致性的機制。

非常粗淺的來說，就是好比去圖書館借書，當我在讀這本書的時候，其他人也要讀的話只能乖乖排隊等我讀完，不可以在旁邊偷看我正在讀的書，
或是在我的書上亂更改書中的內容，一旦沒有這個機制，我的閱讀體驗可能會很糟，讀到一半前面的劇情就被改掉了，明明前面主角死掉了後面突然就復活，莫名奇怪。

在資料庫中根據不同的儲存引擎會有不同的上鎖方式，有將整個 table 上鎖、也有將某個 row 上鎖、又或是再細分成讀鎖與寫鎖，當有人讀取的時候其他人也只能讀不能寫，
有人在寫的時候其他人都不准讀寫，去後面乖乖排隊。
## NoSQL 跟 SQL 的差別在哪裡？
|              	| 明確的欄位 Schema   	| 明確的欄位數 	| 儲存格式 	| table 之間存在關聯 	| DBMS 	|
|--------------	|-----	|-------	|--------           |---------	|--------	|
| SQL          	| Yes  	| Yes    	| 依 Schema 而定    |  Yes    	| MySQL, PostgreSQL... etc   	|
| NoSQL        	| No   	| No  	  | JSON            	| 不一定	     | MongoDB, Redis... etc  	|

如何選用 NoSQL 還是 SQL ，答案沒有優劣，要依照產品需求而定。
SQL 適合需要固定資料、穩定不出錯的產品，例如用戶資訊、帳戶內容等等的資料，在進行轉帳的時候不會希望扣了款但對方沒收到的情況發生。
NoSQL 適合不特定資訊、快速且容許偶爾出錯的產品，例如留言板誰點了讚、用戶使用行為等等，更新不同步導致這篇文章 512 個讚跟 510 個讚不會有太大影響。


## 資料庫的 ACID 是什麼？
ACID 是關聯式資料庫為了確保交易(transaction)必須遵守的一個特性。transaction 是指一個或多個 SQL 指令為單位的資料庫操作，不能洗頭洗一半，
要嘛退出擦乾淨不要洗，要嘛就洗完，每筆 transaction 必須遵守 ACID 特性，如下：
* Atomicity (原子性) : 好比道爾吞認為原子不可再分割，每筆 transaction 必須只能完成或失敗，永遠不能有中間、做一半的情形發生。
* Consistency (一致性)： transaction 前後都必須確保資料有符合 schema 的規範。
* Isolation (隔離性)： 進行多個 transaction 時，這些操作不會互相干擾破壞一致性。
* Durability (耐久性)：完成 transaction 時，資料能永久地保存再資料庫中，即使當機了也有辦法復原資料。

內心 OS:寫得好維基百科...看完一些參考資料大概有個印象而已 QQ，先不求甚解了。

參考資料：
[Frequently Asked Questions](https://developers.google.com/speed/public-dns/faq)
[MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)
[SQL/NoSQL是什麼？認識資料庫管理系統DBMS](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction)