/* eslint-disable */
const $ = require('jquery');
const template = require('./template');

const escapeHtml = unsafe => (
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;'));


const isInputEmpty = (formNode, nickname, comment) => {
  if (!nickname) {
    formNode.find('.warning__nickname').removeClass('opacity-0');
  } else {
    formNode.find('.warning__nickname').addClass('opacity-0');
  }
  if (!comment) {
    formNode.find('.warning__comment').removeClass('opacity-0');
  } else {
    formNode.find('.warning__comment').addClass('opacity-0');
  }
  return !nickname || !comment;
};

// 拿留言
const getCommentsRequest = (siteKey, offset) => fetch(`api/comments.php?offset=${offset}&site=${siteKey}`)
  .then(data => data.json())
  .then((data) => {
    commentsPluginData[siteKey].commentsData = data;
    return true;
  });

// append 拿到的留言
const appendComments = (siteKey) => {
  const parentNode = $(`.comments__container-${siteKey}`);
  const { commentsData } = commentsPluginData[siteKey];
  commentsData.forEach(element => $(parentNode)
    .append(template.commentTemplate(element, escapeHtml)));
};
const clearInput = () => {
  $('input[name=nickname]').val('');
  $('textarea[name=comment]').val('');
};

// 新增留言 request
const addCommentRequest = data => fetch('api/add_comment.php', {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  body: data,
})
  .then(res => res.json())
  .then(resJsonData => console.log(resJsonData));

// 載入留言
const loadComments = async (siteKey, offset) => {
  await getCommentsRequest(siteKey, offset);
  appendComments(siteKey);
};

const userAddComment = (site) => {
  $(`.btn-submit-${site}`).click(async (e) => {
    const formNode = $(e.target).parent('form');
    const nickname = formNode.find('input[name=nickname]').val();
    const comment = formNode.find('textarea[name=comment]').val();
    const siteKey = formNode.find('input[name=site]').val();
    const parentNode = $(`.comments__container-${siteKey}`);
    const newCommentData = `nickname=${nickname}&comment=${comment}&site=${siteKey}`;
    e.preventDefault();
    if (isInputEmpty(formNode, nickname, comment)) return;

    clearInput();
    $('.btn-submit').attr('disabled', true);
    await addCommentRequest(newCommentData);
    $(parentNode).text('');
    const { offset } = commentsPluginData[site];
    loadComments(siteKey, offset);
  });
};

const clickLoveHandler = (siteKey) => {
  $(`.comments__container-${siteKey}`).on('click', '.love', (e) => {
    const { allowClickLoadMore } = commentsPluginData[siteKey];
    e.preventDefault();
    if (!allowClickLoadMore) return;
    commentsPluginData[siteKey].allowClickLoadMore = false;
    setTimeout(() => {
      commentsPluginData[siteKey].allowClickLoadMore = true;
      return true;
    }, 200);

    const target = $(e.target);
    const beforeAddLove = target.text();
    const newLoveNum = Number(beforeAddLove.split(' ')[1]) + 1;
    const id = target.attr('id');
    const loveData = `id=${id}&newLoveNum=${newLoveNum}`;
    target.text(`❤ ${newLoveNum}`);

    // 發送 Ajax
    fetch('api/add_love.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: loveData,
    });

    // 動畫處理
    $(target).parent().append('<div class="plus-love">+1</div>');
    $('.plus-love').animate({ opacity: '0', top: '80%' }, 200, () => {
      $('.plus-love').remove();
    });
  });
};

const loadMoreBtnHandler = (siteKey) => {
  $(`.btn-loadmore-${siteKey}`).click(async () => {
    commentsPluginData[siteKey].offset += 9;
    const { offset } = commentsPluginData[siteKey];
    await getCommentsRequest(siteKey, offset);
    appendComments(siteKey);
  });
};

module.exports = {
  escapeHtml,
  clearInput,
  userAddComment,
  clickLoveHandler,
  loadMoreBtnHandler,
  loadComments,
};
