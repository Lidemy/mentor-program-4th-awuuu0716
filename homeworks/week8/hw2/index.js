window.onload = () => {
  const clientId = 'wbd4r8kqc3urx0xd5f4fd4797nfr18';
  const navGameList = [];
  const gamesInfo = {};
  let nowGame = '';

  const sendRequest = (cb, url, gameName) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.twitch.tv/kraken/${url}`);
    xhr.setRequestHeader('client-id', clientId);
    xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const data = JSON.parse(xhr.responseText);
        cb(data, gameName);
      } else {
        console.log('err');
      }
    });
    xhr.send();
  };

  // 遊戲列表出來時就載入實況
  const onGameListReady = (data, gameName) => {
    // 把要的資料打包成物件
    const streams = [];
    const streamsNum = data.streams.length;
    gamesInfo[gameName].offset += streamsNum < 20 ? streamsNum : 20;
    for (let i = 0; i < streamsNum; i += 1) {
      const stream = data.streams[i];
      streams.push({
        preview: stream.preview.medium,
        thumbNail: stream.channel.logo,
        description: stream.channel.description || 'No description',
        streamerName: stream.channel.display_name || 'No name',
        url: stream.channel.url,
      });
    }

    // DOM
    const mainNode = document.querySelector('.streams__container');
    const gameTitle = document.querySelector('.streams__name');
    const gameListButton = document.getElementById(`li${gameName}`);
    const streamContainNode = document.createElement('section');
    streamContainNode.classList.add('streams__top__20');
    streamContainNode.setAttribute('id', gameName);
    if (gameName !== navGameList[0]) streamContainNode.classList.add('display__none');
    if (gameName === navGameList[0]) {
      gameTitle.innerHTML = gameName;
      gameListButton.classList.add('nav__games__active');
    }
    mainNode.appendChild(streamContainNode);

    streams.forEach((topStream) => {
      const streamNode = document.createElement('a');
      const {
        preview,
        thumbNail,
        description,
        streamerName,
        url,
      } = topStream;
      streamNode.classList.add('stream');
      streamNode.setAttribute('href', url);
      streamNode.setAttribute('target', '_blank');
      streamNode.innerHTML = `
              <div class="stream__preview">
                <img src="${preview}">
              </div>
                <div class="stream__info__container">
                  <div class="stream__info__thumbnail">
                    <img src="${thumbNail}" width="50px" height="50px">
                  </div>
                  <div class="stream__info__context">
                    <div class="stream__description">${description}</div>
                    <div class="stream__name">${streamerName}</div>
                </div>
              </div>`;
      streamContainNode.appendChild(streamNode);
    });
  };

  // 處理 nav 上遊戲列表的 DOM
  const appendGamesList = (name) => {
    const listParentNode = document.querySelector('.nav__games');
    const game = document.createElement('li');
    game.classList.add('change');
    game.setAttribute('id', `li${name}`);
    game.innerHTML = name;
    listParentNode.appendChild(game);
  };

  // 只在網頁第一次開啟時執行, 抓 100 個遊戲實況名稱
  const onDocumentReady = (data) => {
    for (let i = 0; i < data.top.length; i += 1) {
      const { name } = data.top[i].game;
      navGameList.push(name);
      gamesInfo[name] = { name, offset: 0 };
    }

    // 設定初始頁面顯示哪個遊戲
    [nowGame] = [navGameList[0]];

    // 拿到遊戲列表後再發 5 個 Request, 載入初始頁面的 5 個遊戲實況
    navGameList.slice(0, 5).forEach((name) => {
      sendRequest(onGameListReady, `streams/?game=${name.replace('&', '%26')}&limit=20&offset=${gamesInfo[name].offset}`, name);
      appendGamesList(name);
    });
  };

  // 網頁開啟載入初始 5 個遊戲實況
  sendRequest(onDocumentReady, 'games/top?limit=100');

  // 載入更多目前顯示的遊戲實況
  const loadMoreNowGameStreams = (data, gameName) => {
    console.log('now loading:', gameName);
    const streams = [];
    const streamsNum = data.streams.length;
    if (streamsNum === 0) return;
    gamesInfo[gameName].offset += streamsNum < 20 ? streamsNum : 20;
    for (let i = 0; i < streamsNum; i += 1) {
      const stream = data.streams[i];
      streams.push({
        preview: stream.preview.medium,
        thumbNail: stream.channel.logo,
        description: stream.channel.description || 'No description',
        streamerName: stream.channel.display_name || 'No name',
        url: stream.channel.url,
      });
    }

    // DOM
    const streamsContainer = document.getElementById(gameName);
    streams.forEach((stream) => {
      const streamNode = document.createElement('a');
      const {
        preview,
        thumbNail,
        description,
        streamerName,
        url,
      } = stream;
      streamNode.classList.add('stream');
      streamNode.setAttribute('href', url);
      streamNode.setAttribute('target', '_blank');
      streamNode.innerHTML = `
              <div class="stream__preview">
                <img src="${preview}">
              </div>
                <div class="stream__info__container">
                  <div class="stream__info__thumbnail">
                    <img src="${thumbNail}" width="50px" height="50px">
                  </div>
                  <div class="stream__info__context">
                    <div class="stream__description">${description}</div>
                    <div class="stream__name">${streamerName}</div>
                </div>
              </div>`;
      streamsContainer.appendChild(streamNode);
    });
  };

  // 切換目前顯示的遊戲
  const ul = document.querySelector('ul');
  ul.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
    const newGame = e.target.innerText;
    if (newGame === nowGame || !e.target.classList.contains('change')) return;
    const title = document.querySelector('.streams__name');
    const nowGameButton = document.getElementById(`li${nowGame}`);
    const newGameButton = document.getElementById(`li${newGame}`);
    const nowDisplay = document.getElementById(nowGame);
    const changeTo = document.getElementById(newGame);
    title.innerHTML = newGame;
    nowDisplay.classList.add('display__none');
    changeTo.classList.remove('display__none');
    if (nowGameButton) nowGameButton.classList.remove('nav__games__active');
    newGameButton.classList.add('nav__games__active');
    nowGame = newGame;
  });

  // 手機板開關 menu
  const menu = document.querySelector('.open__menu');
  const gameList = document.querySelector('.nav__games');
  menu.addEventListener('click', () => {
    gameList.classList.toggle('nav__games__show');
  });

  // 遊戲選單左右移動 在移動時就偷偷把實況載入
  const arrowContainerLeft = document.querySelector('.arrow__container__left');
  const arrowContainerRight = document.querySelector('.arrow__container__right');
  let gameListIndex = 0;

  // 按右邊的箭頭
  arrowContainerRight.addEventListener('click', () => {
    if (gameListIndex + 5 >= navGameList.length) return;
    window.scrollTo(0, 0);
    gameListIndex += 5;
    const now = document.getElementById('display__games');
    now.innerHTML = '';
    navGameList.slice(gameListIndex, gameListIndex + 5).forEach((name) => {
      // 沒載過的話就發 request 載入, 載過的話就不要載了
      if (!document.getElementById(name)) sendRequest(onGameListReady, `streams/?game=${name.replace('&', '%26')}&limit=20&offset=${gamesInfo[name].offset}`, name);
      appendGamesList(name);
    });
  });

  // 按左邊的箭頭
  arrowContainerLeft.addEventListener('click', () => {
    if (gameListIndex - 5 < 0) return;
    window.scrollTo(0, 0);
    gameListIndex -= 5;
    const now = document.getElementById('display__games');
    now.innerHTML = '';
    navGameList.slice(gameListIndex, gameListIndex + 5).forEach((name) => {
      if (!document.getElementById(name)) sendRequest(onGameListReady, `streams/?game=${name.replace('&', '%26')}&limit=20&offset=${gamesInfo[name].offset}`, name);
      appendGamesList(name);
    });
  });

  // 卷軸捲到底部時載入更多遊戲
  let allowLoading = true;
  document.addEventListener('scroll', () => {
    const isNeedLoading = (
      document.documentElement.scrollTop
      + window.screen.height
      - 150
    ) >= document.body.scrollHeight;
    if (isNeedLoading && allowLoading) {
      sendRequest(loadMoreNowGameStreams, `streams/?game=${nowGame.replace('&', '%26')}&limit=20&offset=${gamesInfo[nowGame].offset}`, nowGame);
      allowLoading = false;
      window.setTimeout(() => {
        allowLoading = true;
        return null;
      }, 1000);
    }
  });
};
