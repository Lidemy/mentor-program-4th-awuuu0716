$(document).ready(() => {
  $('.container__prizes').on('click', (e) => {
    if (!$(e.target).hasClass('btn__edit')) return;
    const targetContainer = $(e.target).closest('.container__prize');
    const id = $(targetContainer).find('.list__prizeId').text();
    const prizeName = $(targetContainer).find('.list__prizeName').text();
    const description = $(targetContainer).find('.list__description').text();
    const imgUrl = $(targetContainer).find('.list__imgUrl').data('url');
    const chance = $(targetContainer).find('.list__chance').text();
    const editForm = $('.form__edit-prize');

    $(editForm).find('input[name = "id"]').val(id);
    $(editForm).find('input[name = "prizeName"]').val(prizeName);
    $(editForm).find('input[name = "description"]').val(description);
    $(editForm).find('input[name = "imgUrl"]').val(imgUrl);
    $(editForm).find('input[name = "chance"]').val(chance);
  })

  $('.container__prizes').on('click', (e) => {
    if (!$(e.target).hasClass('btn__img')) return;
    const targetContainer = $(e.target).closest('.list__imgUrl');
    const imgUrl = $(targetContainer).data('url');
    const imgTag = $('#prizeImg');

    $(imgTag).attr('src', imgUrl);
  })

})

