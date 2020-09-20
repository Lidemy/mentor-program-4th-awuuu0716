# 部屬心得
首先是參考了這兩篇完成基本 AWS 的設定：
[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
[一小時完成 VPS (Virtual Private Server) 部署](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/21)

但是在 ssh 連線時出現了問題：
1. 金鑰檔案太 open
2. Could not create directory '%USERPROFILE%/.ssh'.percent_expand:unkown key %U ...

解決：
1. 要去設定金鑰檔案的權限，因為 windows 系統沒有 chown 指令，所以點右鍵進入內容＞安全性，把權限調整成只有目前的 user 才能存取，參考：[Windows CHMOD 600](https://stackoverflow.com/questions/5264595/windows-chmod-600)

2. windows 使用者名稱如果是中文，似乎就沒辦法儲存 ssh 設定檔，得把名稱修改成英文，並且要去登錄檔修改目錄路徑，不然會讀不到原來的使用者設定檔。參考：[(win10家庭版)修改C盤Users目錄下資料夾名稱](https://www.itread01.com/content/1548647134.html)

建立好 EC2 與 LAMP 後，想要用 FTP 方式來上傳檔案，安裝好 vsftpd 後出現了問題：
1. fileZilla 連不上 AWS EC2

解決：
1. 要使用 SFTP，選擇金鑰檔案才能連線，並且預設的 username 是 ubuntu，我一直以為是 root，結果都連不上。

終於是 PHP 部落格上傳到 EC2，不意外又出現問題：
1. 進入網頁後一片空白

解決：
1. 一直在 index.php 找 bug，結果是資料庫出問題，我直接把舊的資料庫檔案匯入，應該是格式選錯了，我以為 schema 也會一併設定好，結果把 row header 也當作資料的一個 row，導致整個 table 壞掉，重新建起 table 就沒事了，完全不關 php 的事。

在使用 phpmyadmin 的時候會一直談出一個錯誤訊息：
Problem with phpMyAdmin and PHP 7.2: “Warning in ./libraries/sql.lib.php#613 count(): Parameter must be an array or an object that implements Countable”

解決：
似乎是 LAMP 安裝的 phpmyadmin 並不是最新版本，需要手動更新 phpmyadmin，方法參考這篇即可：
[How to Manually Upgrade phpMyAdmin](https://devanswers.co/manually-upgrade-phpmyadmin/)