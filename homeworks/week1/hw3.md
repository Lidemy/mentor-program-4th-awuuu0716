## 教你朋友 CLI

_本篇教學使用的系統為 Win10, 如果是 Linux 或 mac 指令跟步驟可能有所不同_

Command line (CLI) 就是用指令來操作電腦，在沒有圖形介面時要開啟檔案、建立資料夾都得靠一行一行輸入指令才能完成任務，
有些操作反而用 CLI 會比較快，例如查自己電腦的 ip，輸入 ipconfig 一下就能顯示目前網路的資訊。

那麼在哪裡才能使用 CLI 呢？

電腦的搜尋列中找 cmd (命令提示字元)，就能使用 CLI。
如果你有用 Visual Studio Code，按下 Ctrl + Shift + ` 就能開啟 Terminal ，還會幫你設定當前目錄到開啟的 Folder。

那麼事不宜遲，來看看 h0w 哥需要用 CLI 做些什麼吧！
h0w 哥需要建立一個叫 wife 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。

步驟拆解：

0. 打開 CMD 或 VS Code 的 Terminal

1. mkdir wifi (mkdir 建立資料夾 ，wifi 是資料夾名稱)

2. cd wifi (cd 移動當前目錄，wifi 是要去的目錄)

3. echo AAA >> afu.js (echo 會顯示訊息，AAA 是要輸入到目標檔案的訊息，>> 會把訊息輸入到目標檔案，afu.js 是我們要建立的檔案名稱，
   因為目前 wifi 資料夾內找不到名為 afu.js 的檔案，聰明的電腦會自動幫你把檔案建立起來)

4. 完成！ ｡:.ﾟヽ(´∀`)ﾉﾟ.:｡

