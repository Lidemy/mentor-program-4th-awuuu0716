const utlis = {
  saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },
  handleSubmitButton() {
    const submitBtn = document.querySelector('.btn__submit');
    const userInputNode = document.querySelector('.add__post__content');
    submitBtn.addEventListener('click', (e) => {
      const userInput = userInputNode.value;
      if (!userInput.replace(/\s*/g, '')) {
        e.preventDefault();
        return;
      }
      this.saveToLocalStorage('tempComment', '');
    });
  },
  handleButtonClickable() {
    const userInputNode = document.querySelector('.add__post__content');
    userInputNode.addEventListener('keydown', () => {
      const submitBtn = document.querySelector('.btn__submit');
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
  },
  handleFilter() {
    const userInputNode = document.querySelector('.add__post__content');
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
  },
  handlePostOption() {
    const body = document.querySelector('body');
    const comments = document.querySelector('.comments');
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
  },
  handleTempComment() {
    const userInputNode = document.querySelector('.add__post__content');
    let handleTimeout = setTimeout(() => {
      const comment = userInputNode.value;
      this.saveToLocalStorage('tempComment', comment);
    }, 500);

    userInputNode.addEventListener('keydown', () => {
      clearTimeout(handleTimeout);
      handleTimeout = setTimeout(() => {
        const comment = userInputNode.value;
        this.saveToLocalStorage('tempComment', comment);
      }, 500);
    });
  },
  getPostFromLocalStorage() {
    // 將 localStorage 的東西拿出來
    if (localStorage.getItem('tempComment')) {
      const userInputNode = document.querySelector('.add__post__content');
      const submitBtn = document.querySelector('.btn__submit');
      userInputNode.value = localStorage.getItem('tempComment');
      submitBtn.classList.add('submit__active');
    }
  },
};

export default utlis;
