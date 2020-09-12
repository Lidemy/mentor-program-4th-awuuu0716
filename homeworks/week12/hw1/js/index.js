/* eslint-env jquery */
$(document).ready(() => {
  let offset = 0;
  const emptyInput = () => {
    $('input[name=nickname]').val('');
    $('textarea[name=comment]').val('');
  };
  const escapeHtml = unsafe => (
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;'));

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
        return;
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
  $('.btn-submit').click((e) => {
    e.preventDefault();
    const nickname = $('input[name=nickname]').val();
    const comment = $('textarea[name=comment]').val();
    const createTime = getCreateTime();
    const newComment = [{
      nickname,
      comment,
      create_time: createTime,
      love: 0,
    }];
    appendComments(newComment, true);
    emptyInput();
    $('.btn-submit').attr('disabled', true);
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

  // 限制暱稱長度
  $('input[name=nickname]').keypress((e) => {
    const nicknameLength = $('input[name=nickname]').val().length;
    if (nicknameLength > 9) {
      e.preventDefault();
    }
  });

  $('input[name=nickname]').focusout(() => {
    const nicknameLength = $('input[name=nickname]').val().length;
    if (nicknameLength > 10) {
      const longNickname = $('input[name=nickname]').val();
      const shortNickname = longNickname.slice(0, 10);
      $('input[name=nickname]').val(shortNickname);
    }
  });

  // 檢查欄位是否為空
  const inputNickname = $('input[name=nickname]');
  const inputComment = $('textarea[name=comment]');

  const isInputEmpty = (element) => {
    const value = $(element).val().trim();
    return !value;
  };
  const errorMessageHandler = (target, option) => {
    if (option === 'show') {
      $(target).siblings('.warning').removeClass('opacity-0');
      return;
    }
    $(target).siblings('.warning').addClass('opacity-0');
  };

  const SubmitBtnHandler = () => {
    const isNicknameEmpty = isInputEmpty(inputNickname);
    const isCommentEmpty = isInputEmpty(inputComment);
    if (isNicknameEmpty || isCommentEmpty) {
      $('.btn-submit').attr('disabled', true);
      return;
    }
    $('.btn-submit').attr('disabled', false);
  };

  const checkInputHandler = (inputNode) => {
    const isTargetEmpty = isInputEmpty(inputNode);

    SubmitBtnHandler();
    if (isTargetEmpty) {
      errorMessageHandler(inputNode, 'show');
    } else {
      errorMessageHandler(inputNode);
    }
  };

  inputNickname.focusout(() => {
    checkInputHandler(inputNickname);
  });
  inputComment.focusout(() => {
    checkInputHandler(inputComment);
  });
  inputNickname.keypress(() => {
    setTimeout(() => {
      checkInputHandler(inputNickname);
    }, 0);
  });
  inputComment.keypress(() => {
    setTimeout(() => {
      checkInputHandler(inputComment);
    }, 0);
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
      }, 300);
      $.ajax({
        type: 'GET',
        url: `api/comments.php?offset=${offset}`,
      }).done((data) => {
        if (data.length === 0) {
          $('.btn-nomore').click();
          $(document).off('scroll');
          return;
        }
        offset += 9;
        appendComments(data);
      });
    }
  });
});
