/* eslint-env jquery */
// 新增事項
$(document).ready(() => {
  const appendTask = (content) => {
    const taskContainer = $('.tasks__container');
    $(taskContainer).prepend(`
<li class="list-group-item d-flex align-items-center d-flex justify-content-between">
  <div class="task__content w-75">${content}</div>
  <div>
    <button type="button" class="btn btn-success">標記完成</button>
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">編輯</button>
    <button type="button" class="btn btn-danger">刪除</button>
  </div>
</li>
`);
  };

  $('.input__task').keypress((e) => {
    if (e.keyCode === 13 && $('.input__task').val().trim()) {
      appendTask($('.input__task').val());
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
      // 儲存成功小提示
      $('.modal-footer').parent().append('<div class="edit-success">儲存成功!</div>');
      $('.edit-success').animate({ opacity: '0', top: '60%' }, 500, () => {
        $('.edit-success').remove();
      });
    });
  });
});
