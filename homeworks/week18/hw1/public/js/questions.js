$(document).ready(() => {
  // 點開問答特效
  const questionList = $('#questions__list');
  questionList.on('click', (e) => {
    const answer = $(e.target).find('.answer__hidden');
    answer.toggleClass('answer__show');
  });
});
