/* eslint-env jquery */
$(document).ready(() => {
  const escapeHtml = unsafe => (
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;'));

  let offset = 0;

  const appendComments = (data, isPrepend) => {
    const parentNode = $('.comments__container');
    data.forEach((element) => {
      const template = `
<div class="card comment__wrapper col-lg-4 col-sm-6 col-12" style="height: 24rem;">
    <div class="card-body ">
    <h5 class="card-title">${escapeHtml(element.nickname)}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${element.create_time}</h6>
    <p class="card-text overflow-auto h-75">${escapeHtml(element.comment)}</p>
    <a href="#" class="card-link love" id="${element.id}">❤ ${element.love}</a>
  </div>
</div>`;
      if (isPrepend) {
        $(parentNode).prepend(template);
      }
      $(parentNode).append(template);
    });
  };

  const getCreateTime = () => {
    const date = new Date();
    const YY = date.getFullYear();
    const MM = date.getMonth().toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    const HH = date.getHours().toString().padStart(2, '0');
    const Minutes = date.getMinutes().toString().padStart(2, '0');
    const SS = date.getSeconds().toString().padStart(2, '0');
    return `${YY}-${MM}-${DD} ${HH}:${Minutes}:${SS}`;
  };
  // 初次載入留言
  $.ajax({
    type: 'GET',
    url: `api/comments.php?offset=${offset}`,
  }).done((data) => {
    offset += 9;
    appendComments(data);
  });

  // 新增留言
  $('.add-comment-form').submit((e) => {
    e.preventDefault();
    const nickname = $('input[name=nickname]').val();
    const comment = $('textarea[name=comment]').val();
    const createTime = getCreateTime();
    const newComment = [{ nickname, comment, create_time: createTime }];
    appendComments(newComment, true);
    $.ajax({
      type: 'POST',
      url: 'api/add_comment.php',
      data: {
        nickname,
        comment,
      },
    }).done((data) => {
      if (!data.ok) {
        console.log(data.message);
        return;
      }
      console.log(data.message);
    });
  });

  // 點愛心小功能
  let allowClick = true;
  $(document).on('click', '.love', (e) => {
    e.preventDefault();
    if (!allowClick) return;
    allowClick = false;
    setTimeout(() => {
      allowClick = true;
      return true;
    }, 200);
    const target = $(e.target);
    const beforeAddLove = target.text();
    const newLoveNum = Number(beforeAddLove.split(' ')[1]) + 1;
    target.text(`❤ ${newLoveNum}`);

    // 發送 Ajax
    const id = target.attr('id');
    $.ajax({
      type: 'POST',
      url: 'api/add_love.php',
      data: {
        id,
        newLoveNum,
      },
    }).done((data) => {
      if (!data.ok) {
        console.log(data.message);
        return;
      }
      console.log(data.message);
    });

    // 動畫處理
    $(target).parent().append('<div class="plus-love">+1</div>');
    $('.plus-love').animate({ opacity: '0', top: '80%' }, 200, () => {
      $('.plus-love').remove();
    });
  });

  // 載入更多
  const windowHeight = $(window).height();
  let allowLoadMore = true;
  $(document).scroll(() => {
    const scrollTop = $(window).scrollTop();
    const bodyHeight = $('body').height();
    if (scrollTop + windowHeight >= bodyHeight && allowLoadMore) {
      allowLoadMore = false;
      setTimeout(() => {
        allowLoadMore = true;
        return true;
      }, 1000);
      $.ajax({
        type: 'GET',
        url: `api/comments.php?offset=${offset}`,
      }).done((data) => {
        if (data.length === 0) {
          return;
        }
        offset += 9;
        appendComments(data);
      });
    }
  });
});
