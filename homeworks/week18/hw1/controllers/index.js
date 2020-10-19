/* eslint-disable consistent-return */
/* 渲染首頁 */
const indexController = {
  renderIndexPage: (req , res) => {
    res.render('index');
  }
};

module.exports = indexController;
