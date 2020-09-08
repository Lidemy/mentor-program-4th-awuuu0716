window.onload = () => {
  const clientId = 'wbd4r8kqc3urx0xd5f4fd4797nfr18';
  const navGameList = [];
  const gamesInfo = {};
  const accept = 'application/vnd.twitchtv.v5+json';
  const path = 'https://api.twitch.tv/kraken/';
  let nowGame = '';

  // fetch
  const fetchRequest = url => (
    fetch(`${path}${url}`,
      {
        method: 'GET',
        headers: new Headers({
          'client-id': clientId,
          Accept: accept,
        }),
      }).then((response) => {
      const { status } = response;
      if (status >= 200 && status < 400) return response.json();
      return false;
    }).then(data => data)
      .catch((err) => {
        console.log(err);
      })
  );
  // 負責整理打包資料的 function
  const pickStreamsInfoFromResponse = (data, dataLength) => {
    const tempArr = [];
    for (let i = 0; i < dataLength; i += 1) {
      const stream = data.streams[i];
      tempArr.push({
        preview: stream.preview.medium,
        thumbNail: stream.channel.logo,
        description: stream.channel.description || 'No description',
        streamerName: stream.channel.display_name || 'No name',
        url: stream.channel.url,
      });
    }
    return tempArr;
  };

  // 負責把實況資料塞進 <section> 的 function
  const appendStreamData = (data, parentNode) => {
    data.forEach((topStream) => {
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
      parentNode.appendChild(streamNode);
    });
  };

  // 遊戲列表出來時就載入實況
  const onGameListReady = (data, gameName) => {
    // 把要的資料打包成物件
    const streamsNum = data.streams.length;
    const streams = pickStreamsInfoFromResponse(data, streamsNum);
    gamesInfo[gameName].offset += streamsNum < 20 ? streamsNum : 20;
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
    appendStreamData(streams, streamContainNode);
  };

  // 處理 nav 上遊戲列表的 DOM
  const listParentNode = document.querySelector('.nav__games');
  const appendGamesList = (name) => {
    const arrowRight = document.querySelector('.arrow__right');
    const game = document.createElement('li');
    game.classList.add('change');
    game.setAttribute('id', `li${name}`);
    game.innerHTML = name;
    listParentNode.insertBefore(game, arrowRight);
  };

  // 只在網頁第一次開啟時執行, 抓 100 個遊戲實況名稱
  const packageGameData = (data) => {
    for (let i = 0; i < data.top.length; i += 1) {
      const { name } = data.top[i].game;
      navGameList.push(name);
      gamesInfo[name] = { name, offset: 0 };
    }
    // 設定初始頁面顯示哪個遊戲
    [nowGame] = [navGameList[0]];
  };

  // 載入前 20 個遊戲實況
  const loadTopStreams = (indexLeft, indexRight) => {
    navGameList.slice(indexLeft, indexRight).forEach(async (name) => {
      let gameData;
      const gameUrl = `streams/?game=${name.replace('&', '%26')}&limit=20&offset=${gamesInfo[name].offset}`;
      appendGamesList(name);
      // 沒載過的話就發 request 載入, 載過的話就不要載了
      if (document.getElementById(name)) return;
      await fetchRequest(gameUrl).then((data) => {
        gameData = data;
        return true;
      });
      onGameListReady(gameData, name);
    });
  };

  // 網頁開啟載入初始 5 個遊戲實況
  const loadTopFive = async () => {
    let topGameObj;
    const topGameUrl = 'games/top?limit=100';
    await fetchRequest(topGameUrl).then((data) => {
      topGameObj = data;
      return true;
    });
    packageGameData(topGameObj);
    // 拿到遊戲列表後再發 5 個 Request, 載入初始頁面的 5 個遊戲實況
    loadTopStreams(0, 5);
  };
  loadTopFive();

  // 載入更多目前顯示的遊戲實況
  const loadMoreNowGameStreams = (data, gameName) => {
    const streamsNum = data.streams.length;
    if (streamsNum === 0) return;
    const streams = pickStreamsInfoFromResponse(data, streamsNum);
    gamesInfo[gameName].offset += streamsNum < 20 ? streamsNum : 20;

    // DOM
    const streamsContainer = document.getElementById(gameName);
    appendStreamData(streams, streamsContainer);
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

  // 遊戲選單左右移動 在移動時就偷偷把實況載入
  let gameListIndex = 0;
  listParentNode.addEventListener('click', (e) => {
    if (!e.target.closest('.arrow__left') && !e.target.closest('.arrow__right')) return;
    if (e.target.closest('.arrow__left')) {
      if (gameListIndex - 5 < 0) return;
      gameListIndex -= 5;
    } else {
      if (gameListIndex + 5 >= navGameList.length) return;
      gameListIndex += 5;
    }
    window.scrollTo(0, 0);
    const now = document.getElementById('display__games');
    now.innerHTML = `         
          <div class=" arrow__container arrow__left">
            <div class="nav__games__pre">
          </div>
          </div>
          <div class="arrow__container arrow__right">
            <div class="nav__games__next">
          </div>`;
    loadTopStreams(gameListIndex, gameListIndex + 5);
  });

  // 手機板開關 menu
  const menu = document.querySelector('.open__menu');
  const gameList = document.querySelector('.nav__games');
  menu.addEventListener('click', () => {
    gameList.classList.toggle('nav__games__show');
  });

  // 卷軸捲到底部時載入更多遊戲
  let allowLoading = true;
  document.addEventListener('scroll', async () => {
    const isNeedLoading = (
      document.documentElement.scrollTop
      + window.screen.height
      - 150
    ) >= document.body.scrollHeight;
    if (isNeedLoading && allowLoading) {
      let gameData;
      const gameUrl = `streams/?game=${nowGame.replace('&', '%26')}&limit=20&offset=${gamesInfo[nowGame].offset}`;
      await fetchRequest(gameUrl).then((data) => {
        gameData = data;
        return true;
      });
      loadMoreNowGameStreams(gameData, nowGame);
      allowLoading = false;
      window.setTimeout(() => {
        allowLoading = true;
        return null;
      }, 1000);
    }
  });
};
