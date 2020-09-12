/* eslint-disable */
const utils = require('./utils');
const template = require('./template');
const $ = require('jquery');
window.commentsPluginData = {};

const init = (options) => {
  let siteKey = options.siteKey
  let offset = 0;
  let allowClickLoadMore = true;
  let commentsData;
  let containerElement = $(options.container);
  commentsPluginData[siteKey] = {
    siteKey,
    offset,
    commentsData,
    allowClickLoadMore,
    containerElement
  }

  const addEventHandler = () => {
    // 使用者 submit 按鈕
    utils.userAddComment(siteKey);
    // 點愛心功能
    utils.clickLoveHandler(siteKey);
    // LoadMore 按鈕
    utils.loadMoreBtnHandler(siteKey);
  }

  const mountCommentPlugin = () => {
    addEventHandler();
    utils.loadComments(siteKey, offset);
  }

  containerElement.append(template.mainTemplate(siteKey));

  mountCommentPlugin()
}

export {init}