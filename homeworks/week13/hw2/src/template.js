/* eslint-disable */
const mainTemplate = (siteKey) => `
  <form class="container mt-5 mb-3 add-comment-form">
    <div class="form-group row col-12 col-lg-6">
      <label for="inputComments">暱稱：</label>
      <input type="text" class="form-control" name="nickname" placeholder="請輸入暱稱 (最多10字)" aria-describedby="input nickname" maxlength="12">
      <div class="warning warning__nickname opacity-0 ">填一下暱稱拉。･ﾟ･(つдﾟ) ･ﾟ･</div></div >
  <div class="form-group">
    <label for="inputComments">留言：</label>
    <textarea class="form-control" name="comment" placeholder="請輸入留言" aria-label="With textarea" rows="10"></textarea>
    <div class="warning warning__comment opacity-0">你還沒有寫留言喔ﾟヽ(ﾟ´Д)ﾉﾟ｡</div>
  </div>
  <button type="submit" class="btn btn-primary btn-submit-${siteKey}">Submit</button>
  <input name="site" value="${siteKey}" hidden></input>
  </form >
  <div class="container">
    <hr />
  </div>
  <div class="container mt-5 mb-5">
    <div class="row row-cols-3 comments__container-${siteKey}"></div>
    <button type="button" class="btn btn-primary btn-loadmore-${siteKey} m-2">Load More</button>
  </div>
`

const commentTemplate = (data, dataProcessor) => `
<div class="card comment__wrapper col-lg-4 col-sm-6 col-12" style="height: 24rem;">
    <div class="card-body ">
    <h5 class="card-title">${dataProcessor(data.nickname)}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${data.create_time}</h6>
    <p class="card-text overflow-auto h-75">${dataProcessor(data.comment)}</p>
    <a href="#" class="card-link love" id="${data.id}">❤ ${data.love}</a>
  </div>
</div>`


module.exports = {
  mainTemplate,
  commentTemplate,
}