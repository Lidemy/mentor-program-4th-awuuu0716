$(document).ready(() => {
  let allowToDraw = true;
  $('.draw').on('click', () => {
    if (!allowToDraw) return;
    allowToDraw = false;
    $.ajax({
      type: 'GET',
      url: '/draw',
      success: (res) => {
        const { 
          prizeName, 
          description,
          imgUrl,
        } = JSON.parse(res);
        $('#prizeTitle').text(prizeName);
        $('#description').text(description);
        $('#prizeImg').attr('src', imgUrl);
        $('.draw__result').click();
        allowToDraw = true;
      },
      error: (err) => {
        console.log(err);
        allowToDraw = true;
      }
    });
  })
})

