## 跟你朋友介紹 Git

_本篇教學使用的系統為 Win10, 如果是 Linux 或 mac 指令跟步驟可能有所不同_

何謂 Git？
打個比方來說， Git 就像是打電動時的存檔，記錄你現在的遊戲進度、角色練到幾等、劇情推到第幾章這樣，
不小心走到 Bad-Ending 時就能讀取存檔重新來過。

在寫程式的時候使用 Git ，我們可以紀錄現在的程式碼，不小心寫壞了便能一鍵還原，連上遠端資料庫還能跟
別人合作寫程式，他寫的不錯可以把他的程式碼合併到你的程式碼內，反之亦然。

那麼要如何使用 Git 呢？

1. 首先要安裝 Git ，到 https://git-scm.com/download/win 下載 Git 安裝檔。
2. 安裝好後開啟 Terminal 移動到放笑話檔案的資料夾，輸入 git init ，git 就會開始控管這個資料夾。
3. 此時蔡哥就可以開始寫笑話了，寫了一定進度想要存檔時，輸入 git add joke.txt，將檔案放進暫存區。
4. 如果暫存區的笑話還蠻好笑的，就可以輸入 git commit joke.txt -m "新增血乘四的部分"，將檔案放進本地資料庫。
5. 如果發現新寫的笑話很難笑，可以輸入 git checkout joke.txt ，把笑話還原到上一次 commit 的狀態。

如果蔡哥想要跟 h0w 哥一起合作寫笑話，那麼可以將笑話放到一個叫 GitHub 的網站上，步驟如下：

1. 去 https://github.com/ 申請好帳號，網頁右上角有個＋號，按下去後點 new repository。
2. 在 Repository name 輸入蔡哥與 h0w 哥笑話的名稱，例如 ourJokes。
3. 其他選項暫時不用動，日後有需要也可以再改，按下綠色按鈕 Create repository 建立起遠端資料庫。
4. 接著會看到 GitHub 很貼心地幫你把需要的指令都寫好了，複製　…or push an existing repository from the command line 那欄的內容。
5. 回到我們電腦的 Terminal ，把剛剛複製的指令貼上去執行，就會把本地資料庫存的笑話給推上 GitHub 囉。
6. 之後要推出新的笑話到 GitHub 時，只要輸入 git push -u origin master 就可以囉！

這樣就能把自己寫的笑話放到 GitHub 上跟 hOw 哥一起合作惹！等等，你說 push 的時候出現錯誤指令？
原來乳此，我想是因為 hOw 哥偷偷登入你的 GitHub 帳號，直接在網站上修改笑話，加了一句 "我愛 How 哥，How 哥 No.1" 的關係。
當 GitHub 上的最新笑話版本與你電腦裡的最新笑話版本不一樣時，此時就沒辦法把檔案 push 上去，必須先執行 pull 指令把本地資料庫中的笑話更新到最新版本：

1. 打開 Terminal ，輸入 git pull，獲取最新版本的笑話。

什麼！還是有錯誤，你說 How 哥在第六行寫 "ㄏㄏ"，而你寫的第六行是 "ㄎㄎ"？好的好的，請你先跟 how 哥好好談談，看到底是要ㄎㄎ還是ㄏㄏ，
決定好之後，在重新 commit&push 我想就沒問題了！
