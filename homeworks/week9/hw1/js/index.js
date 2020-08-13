window.onload = () => {
  // 送出留言, 空白不能送出
  const submitBtn = document.querySelector('.btn__submit');
  const userInputNode = document.querySelector('.add__post__content');
  submitBtn.addEventListener('click', (e) => {
    const userInput = userInputNode.value;
    if (!userInput.replace(/\s*/g, '')) {
      e.preventDefault();
      return;
    }
    localStorage.setItem('tempComment', '');
    const comment = document.getElementById('comment');
    comment.setAttribute('value', userInput);
  });

  // 控制是否可按下送出貼文
  userInputNode.addEventListener('keydown', () => {
    // 加入 setTimeout 是為了抓到第一個輸入, 沒加的話要輸入兩個字以上按鈕才會亮起來
    setTimeout(() => {
      const userInput = userInputNode.value;
      if (!userInput.replace(/\s*/g, '')) {
        submitBtn.classList.remove('submit__active');
        return;
      }
      submitBtn.classList.add('submit__active');
    }, 1);
  });

  // 控制濾鏡
  const filter = document.querySelector('.filter');
  const comments = document.querySelector('.comments');
  userInputNode.addEventListener('focus', () => {
    comments.classList.toggle('comments__fliter__off');
    filter.classList.toggle('filter__on');
  });
  userInputNode.addEventListener('focusout', () => {
    setTimeout(() => {
      comments.classList.toggle('comments__fliter__off');
    }, 200);
    filter.classList.toggle('filter__on');
  });

  // 控制開啟貼文選單
  const body = document.querySelector('body');
  comments.addEventListener('click', (e) => {
    if (e.target.closest('.more__action')) {
      e.stopPropagation();
      const targetMenu = e.target.closest('.more__action').querySelector('.action__wrapper');
      targetMenu.classList.toggle('display__flex');
      setTimeout(() => {
        targetMenu.classList.toggle('show__more__action');
      }, 0);
    }
  });

  const closeMenu = () => {
    const openedMenu = document.querySelector('.show__more__action');
    if (!openedMenu) return;
    openedMenu.classList.remove('show__more__action');
    openedMenu.classList.remove('display__flex');
    closeMenu();
  };

  body.addEventListener('click', () => {
    closeMenu();
  });

  // 將貼文存入 localStorage
  let handleTimeout = setTimeout(() => {
    const comment = userInputNode.innerText;
    localStorage.setItem('tempComment', comment);
  }, 500);

  userInputNode.addEventListener('keydown', () => {
    clearTimeout(handleTimeout);
    handleTimeout = setTimeout(() => {
      const comment = userInputNode.innerText;
      localStorage.setItem('tempComment', comment);
    }, 500);
  });

  // 將 localStorage 的東西拿出來
  if (localStorage.getItem('tempComment')) {
    userInputNode.innerText = localStorage.getItem('tempComment');
    submitBtn.classList.add('submit__active');
  }
};
