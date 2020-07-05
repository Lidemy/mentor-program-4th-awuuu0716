const https = require('https');

const clientId = 'wbd4r8kqc3urx0xd5f4fd4797nfr18';

const options = {
  method: 'get',
  hostname: 'api.twitch.tv',
  path: '/kraken/games/top',
  headers: {
    'client-id': clientId,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
};

const req = https.request(options, (res) => {
  let str = '';
  res.on('data', (d) => {
    str += d;
  });
  res.on('end', () => {
    const data = JSON.parse(str);
    const { top } = data;
    top.forEach((element) => {
      console.log(`${element.viewers} ${element.game.name}`);
    });
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
