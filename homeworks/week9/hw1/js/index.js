window.onload = () => {
  // 送出留言
  const submitBtn = document.querySelector('.btn__submit');
  const userInputNode = document.querySelector('.add__post__content');
  submitBtn.addEventListener('click', (e) => {
    const userInput = userInputNode.innerText;
    if (!userInput.replace(/\s*/g, '')) {
      e.preventDefault();
      return;
    }
    const comment = document.getElementById('comment');
    comment.setAttribute('value', userInput);
  });

  // 控制是否可按下送出貼文
  userInputNode.addEventListener('keydown', () => {
    setTimeout(() => {
      const userInput = userInputNode.innerText;
      if (!userInput.replace(/\s*/g, '')) {
        submitBtn.classList.remove('submit__active');
        return;
      }
      submitBtn.classList.add('submit__active');
    }, 1);
  });

  // 控制濾鏡
  const filter = document.querySelector('.filter');
  userInputNode.addEventListener('focus', () => {
    filter.classList.toggle('filter__on');
  });
  userInputNode.addEventListener('focusout', () => {
    filter.classList.toggle('filter__on');
  });
};
