/* eslint-disable import/extensions */
import utils from './utils.js';

window.onload = () => {
  // 送出留言, 空白不能送出
  utils.handleSubmitButton();

  // 控制是否可按下送出貼文
  utils.handleButtonClickable();

  // 控制濾鏡
  utils.handleFilter();

  // 控制開啟貼文選單
  utils.handlePostOption();

  // 將貼文存入 localStorage
  utils.handleTempComment();

  // 將 localStorage 的東西拿出來
  utils.getPostFromLocalStorage();
};
