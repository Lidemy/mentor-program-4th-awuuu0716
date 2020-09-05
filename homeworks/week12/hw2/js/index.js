/* eslint-env jquery */
$(document).ready(() => {
  const parseCookie = () => {
    const cookieObj = {};
    const cookieAry = document.cookie.split(';');
    let cookie;

    for (let i = 0, l = cookieAry.length; i < l; i += 1) {
      cookie = jQuery.trim(cookieAry[i]);
      cookie = cookie.split('=');
      const [key, value] = cookie;
      cookieObj[key] = value;
    }

    return cookieObj;
  };

  const getCookieByName = (name) => {
    let value = parseCookie()[name];
    if (value) {
      value = decodeURIComponent(value);
    }

    return value;
  };

  const appendTask = (content, done, isprepend) => {
    const taskContainer = $('.tasks__container');
    const template = `
<li class="list-group-item flex align-items-center justify-content-between ${done ? 'container__task__done' : ''}">
  <div class="task__content w-75 ${done ? 'task__done' : ''}">${content}</div>
  <div>
    <button type="button" class="btn btn-success btn-done">標記完成</button>
    <button type="button" class="btn btn-warning btn-edit" data-toggle="modal" data-target="#editModal">編輯</button>
    <button type="button" class="btn btn-danger btn-delete">刪除</button>
  </div>
</li>
`;
    if (isprepend) {
      $(taskContainer).prepend(template);
      $('.input__task').val('');
      return;
    }
    $(taskContainer).append(template);
  };

  // 讀取 cookie 內的 id, 有的話向資料庫索取 todos
  const id = getCookieByName('id') ? getCookieByName('id') : null;
  if (id) {
    $('.tasks__container').append('<div class="spinner-border m-5" role="status"><span class="sr-only">Loading...</span></div >');
    $.ajax({
      type: 'POST',
      url: 'api/get_todos.php',
      data: {
        id,
      },
    }).done((data) => {
      $('.spinner-border').remove();
      data.forEach((element) => {
        appendTask(element.content, element.done);
      });
    }).fail((data) => {
      console.log(data);
    });
  }

  // 處理 Enter 輸入
  $('.input__task').keypress((e) => {
    if (e.keyCode === 13 && $('.input__task').val().trim()) {
      appendTask($('.input__task').val(), false, true);
    }
  });

  // 編輯事項
  $('.tasks__container').on('click', '.btn-edit', (e) => {
    const targetTask = $(e.target).closest('.list-group-item').find('.task__content');
    const preEditContent = targetTask.text();
    const editArea = $('.edit__task');
    const btnSave = $('.btn-save__edit');
    editArea.val(preEditContent);
    btnSave.off();
    btnSave.on('click', () => {
      targetTask.text(editArea.val());
      $('.btn-close__edit').click();
    });
  });

  // 刪除事項
  $('.tasks__container').on('click', '.btn-delete', (e) => {
    const targetTask = $(e.target).closest('.list-group-item');
    targetTask.remove();
  });

  // 標記完成
  $('.tasks__container').on('click', '.btn-done', (e) => {
    const targetContainer = $(e.target).closest('.list-group-item');
    const targetTask = targetContainer.find('.task__content');
    targetTask.toggleClass('task__done');
    targetContainer.toggleClass('container__task__done');
  });

  // 儲存 todos 至資料庫
  $('.btn-save-todos').click(() => {
    let todos = [];
    $('.task__content').each((index, element) => {
      const done = $(element).hasClass('task__done');
      todos.push({
        content: $(element).text(),
        done,
      });
    });
    todos = JSON.stringify(todos);
    $.ajax({
      type: 'POST',
      url: 'api/add_todos.php',
      data: {
        todos,
      },
    }).done(() => {
      const showId = getCookieByName('id');
      $('.btn-save-success').click();
      $('.save-success__message').text(`儲存成功! 您的 Todos id 為 ${showId}`);
    }).fail((data) => {
      console.log('fail', data);
    });
  });

  // 用 id 讀取資料庫的 todos
  $('.btn-load-todos').click(() => {
    const inputId = $('.input-id').val();
    $('.btn-close__load').click();
    $('.tasks__container').text('');
    $('.tasks__container').append('<div class="spinner-border m-5" role="status"><span class="sr-only">Loading...</span></div >');
    $.ajax({
      type: 'POST',
      url: 'api/get_todos.php',
      data: {
        id: inputId,
      },
    }).done((data) => {
      $('.spinner-border').remove();
      data.forEach((element) => {
        appendTask(element.content, element.done);
      });
    }).fail((data) => {
      console.log(data);
    });
  });

  // 處理篩選待辦事項
  $('.btn-group-toggle').on('click', '.filter', (e) => {
    const tag = $(e.target).attr('name');
    switch (tag) {
      case 'all':
        $('.list-group-item').each((index, element) => {
          $(element).fadeIn();
        });
        break;
      case 'done':
        $('.list-group-item').each((index, element) => {
          if ($(element).hasClass('container__task__done')) {
            $(element).fadeIn();
          } else {
            $(element).fadeOut();
          }
        });
        break;
      case 'undone':
        $('.list-group-item').each((index, element) => {
          if ($(element).hasClass('container__task__done')) {
            $(element).fadeOut();
          } else {
            $(element).fadeIn();
          }
        });
        break;
      default:
        break;
    }
  });
});
