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
  const addProductBtn = $('.new-product');
  $(addProductBtn).on('click', (e) => {
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    modalWrapper.find('input[name=product_name]').val('');
    modalWrapper.find('input[name=product_price]').val('');
    modalWrapper.find('input[name=product_url]').val('');
    modalTitle.text('新增商品');
    $('.modal__form').attr('action','products/newproduct');
  });

  // 編輯品項
  const menuWrapper = $('.order__menu-wrapper');
  $(menuWrapper).on('click', (e) => {
    if (!$(e.target).hasClass('order__btn-edit')) return;
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    const menuCard = $(e.target).closest('.order__menu-card');
    const productName = menuCard.data('name');
    const productPrice = menuCard.data('price');
    const productUrl = menuCard.data('pic');
    const productId = menuCard.data('id');

    modalWrapper.find('input[name=product_name]').val(productName);
    modalWrapper.find('input[name=product_price]').val(productPrice);
    modalWrapper.find('input[name=product_url]').val(productUrl);
    modalWrapper.find('input[name=id]').val(productId);
    modalTitle.text('編輯商品');
    $('.modal__form').attr('action', 'products/updateproduct');
  });
});
