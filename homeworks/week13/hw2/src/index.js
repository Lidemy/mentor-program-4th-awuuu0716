const $ = require('jquery');
const utils = require('./utils');
const template = require('./template');

window.commentsPluginData = {};
const { commentsPluginData } = window;

const init = (options) => {
  const { siteKey } = options;
  const offset = 0;
  const allowClickLoadMore = true;
  const containerElement = $(options.container);
  let commentsData;
  commentsPluginData[siteKey] = {
    siteKey,
    offset,
    commentsData,
    allowClickLoadMore,
    containerElement,
  };

  const addEventHandler = () => {
    // 使用者 submit 按鈕
    utils.userAddComment(siteKey);
    // 點愛心功能
    utils.clickLoveHandler(siteKey);
    // LoadMore 按鈕
    utils.loadMoreBtnHandler(siteKey);
  };

  const mountCommentPlugin = () => {
    addEventHandler();
    utils.loadComments(siteKey, offset);
  };

  containerElement.append(template.mainTemplate(siteKey));

  mountCommentPlugin();
};

export { init as default };
