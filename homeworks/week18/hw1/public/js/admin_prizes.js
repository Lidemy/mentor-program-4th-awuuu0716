$(document).ready(() => {
  // 鎖定與解鎖 body 滾輪
  const toggleBodyScroll = () => {
    $('body').toggleClass('scroll__stop');
  }

  // modal Node
  const modalWrapper = $('.modal__wrapper');

  // modal title
  const modalTitle = $('.modal__title');

  // 關閉 modal
  const closeModalBtn = $('.modal__btn-cancel');
  $(closeModalBtn).on('click', (e) => {
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.attr('hidden','');
  })

  // 新增品項
  const addPrizeBtn = $('.new-prize');
  $(addPrizeBtn).on('click', (e) => {
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    modalWrapper.find('input[name=prize_name]').val('');
    modalWrapper.find('textarea[name=description]').val('');
    modalWrapper.find('input[name=chance]').val('');
    modalWrapper.find('input[name=imgUrl]').val('');
    modalTitle.text('新增獎品');
    $('.modal__form').attr('action','prizes/newprize');
  })

  // 編輯品項
  const menuWrapper = $('.prizes__wrapper');
  $(menuWrapper).on('click', (e) => {
    if (!$(e.target).hasClass('prizes__btn-edit')) return;
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    const prizeCard = $(e.target).closest('.prizes__card');
    const name = prizeCard.data('name');
    const description = prizeCard.data('description');
    const imgUrl = prizeCard.data('imgurl');
    const chance = prizeCard.data('chance');
    const id = prizeCard.data('id');

    modalWrapper.find('input[name=prize_name]').val(name);
    modalWrapper.find('textarea[name=description]').val(description);
    modalWrapper.find('input[name=imgUrl]').val(imgUrl);
    modalWrapper.find('input[name=chance]').val(chance);
    modalWrapper.find('input[name=id]').val(id);
    modalTitle.text('編輯獎品');
    $('.modal__form').attr('action', 'prizes/updateprize');
  });
});
