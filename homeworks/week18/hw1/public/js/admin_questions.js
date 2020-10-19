$(document).ready(() => {
  // 鎖定與解鎖 body 滾輪
  const toggleBodyScroll = () => {
    $('body').toggleClass('scroll__stop');
  };

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
  });

  // 新增問答
  const addQuestionBtn = $('.question__options-add');
  $(addQuestionBtn).on('click', (e) => {
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    modalWrapper.find('input[name=question]').val('');
    modalWrapper.find('textarea[name=answer]').val('');
    modalWrapper.find('input[name=question_number]').val('');
    modalTitle.text('新增問答');
    $('.modal__form').attr('action','questions/newquestion');
  });

  // 編輯品項
  const questionWrapper = $('.question__wrapper');
  $(questionWrapper).on('click', (e) => {
    if (!$(e.target).hasClass('question__options-edit')) return;
    e.preventDefault();
    toggleBodyScroll();
    modalWrapper.removeAttr('hidden');
    const questionCard = $(e.target).closest('.question__card');
    const questionContent = questionCard.data('question');
    const answer = questionCard.data('answer');
    const number = questionCard.data('number');
    const questionId = questionCard.data('id');

    modalWrapper.find('input[name=question]').val(questionContent);
    modalWrapper.find('textarea[name=answer]').val(answer);
    modalWrapper.find('input[name=question_number]').val(number);
    modalWrapper.find('input[name=id]').val(questionId);
    modalTitle.text('編輯問答');
    $('.modal__form').attr('action', 'questions/updatequestion');
  });
});
