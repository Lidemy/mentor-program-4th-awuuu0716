const utils = {
  saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },
  getTags(className) {
    const postList = document.querySelectorAll(`.${className}`);
    let tempTagList = [];
    postList.forEach((post) => {
      tempTagList = tempTagList.concat(post.dataset.tags.trim().split(' '));
    });
    return [...new Set(tempTagList)];
  },
  appendTags(parentNode, content) {
    const newContent = document.createElement('div');
    newContent.innerText = content;
    newContent.classList = 'tag';
    parentNode.appendChild(newContent);
  },

};

export default utils;
