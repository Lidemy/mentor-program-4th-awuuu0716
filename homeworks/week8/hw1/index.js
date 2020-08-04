window.onload = () => {
  const body = document.querySelector('body');
  const reload = document.querySelector('.active a');
  const background = document.querySelector('.lottery');
  const loading = document.querySelector('.loading');
  const prizeLog = [];

  body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('lottery__button')) return;
    loading.classList.toggle('display__show');
    const request = new XMLHttpRequest();

    const backgroundHandler = (prize) => {
      const target = document.querySelector(`.prize__${prize}`);
      const lastPrize = document.querySelector(`.prize__${prizeLog[prizeLog.length - 1]}`);
      if (lastPrize) lastPrize.classList.remove('prize__show');
      background.classList.add('display__none');
      target.classList.add('prize__show');
    };

    request.addEventListener('load', () => {
      if (request.status >= 200 && request.status < 400) {
        const result = JSON.parse(request.responseText).prize;
        switch (result) {
          case 'FIRST':
            backgroundHandler('first');
            prizeLog.push('first');
            loading.classList.toggle('display__show');
            break;
          case 'SECOND':
            backgroundHandler('second');
            prizeLog.push('second');
            loading.classList.toggle('display__show');
            break;
          case 'THIRD':
            backgroundHandler('third');
            prizeLog.push('third');
            loading.classList.toggle('display__show');
            break;
          case 'NONE':
            backgroundHandler('none');
            prizeLog.push('none');
            loading.classList.toggle('display__show');
            break;
          default:
            loading.classList.toggle('display__show');
            alert('系統錯誤，請再試一次'); // eslint-disable-line no-alert
        }
      } else {
        alert('系統錯誤，請再試一次'); // eslint-disable-line no-alert
        loading.classList.toggle('display__show');
      }
    });
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery');
    request.send();
  });
  reload.addEventListener('click', () => window.location.reload());
};
