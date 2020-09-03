/* eslint-disable import/extensions */
import utils from './utils.js';

window.onload = () => {
  const tagsWrapper = document.querySelector('.tags__wrapper');
  const tagList = utils.getTags('admin-post');
  const filterList = {};
  tagList.forEach((tag) => {
    utils.appendTags(tagsWrapper, tag);
    filterList[tag] = false;
  });
  tagsWrapper.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tag')) return;
    const tagButton = e.target;
    const postList = document.querySelectorAll('.admin-post');
    const tagName = tagButton.innerText;
    filterList[tagName] = !filterList[tagName];
    postList.forEach((post) => {
      const postTagArray = post.dataset.tags.trim().split(' ');
      const postTagObject = {};
      let showPost;
      postTagArray.forEach((tag) => {
        postTagObject[tag] = true;
      });

      Object.keys(filterList).every((tag) => {
        if (postTagObject[tag] || !filterList[tag]) {
          showPost = true;
          return true;
        }
        showPost = false;
        return false;
      });
      if (showPost) {
        post.classList.remove('display-none');
      } else {
        post.classList.add('display-none');
      }
    });
    tagButton.classList.toggle('tag-active');
  });
};
