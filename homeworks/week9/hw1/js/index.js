/* eslint-disable import/extensions */
import utlis from './utlis.js';

window.onload = () => {
  // 送出留言, 空白不能送出
  utlis.handleSubmitButton();

  // 控制是否可按下送出貼文
  utlis.handleButtonClickable();

  // 控制濾鏡
  utlis.handleFilter();

  // 控制開啟貼文選單
  utlis.handlePostOption();

  // 將貼文存入 localStorage
  utlis.handleTempComment();

  // 將 localStorage 的東西拿出來
  utlis.getPostFromLocalStorage();
};
