var childArr;
var mainPage = document.getElementById('main');

$.ajax({
  method: 'GET',
  url: '/api/my_boards.json',
  dataType: 'json'
})
.done(function (data) {
  processResponse(data);
})
.fail(function () {
  throw new TypeError();
})
.always(function () {
});

function processResponse (response) {
  childArr = response.data.children;
  childArr.forEach(createPage);
}

function createPage (elem, ind, arr) {
  var $post = $('<div/>');
  $post.addClass('post');
  $(mainPage).append($post);

  var $image = $('<img/>');
  $image.addClass('image');
  $image.attr('src', elem.data.thumbnail);
  $post.append($image);
  $image.wrap('<div class="imgContainer"></div>');

  var $title = $('<div/>');
  $title.addClass('title');
  $title.text(elem.data.title);
  $post.append($title);

  var $info = $('<div/>');
  $info.addClass('info');
  $post.append($info);

  var $author = $('<span/>');
  $author.addClass('author');
  $author.text('by ' + elem.data.author);
  $info.append($author);

  var $date = $('<li/>');
  var millisec = Date.now() - (elem.data.created_utc * 1000);
  $date.addClass('date');
  $date.text(timeConvert(millisec));
  $info.append($date);

  var $views = $('<li/>');
  $views.addClass('views');
  $views.text(elem.data.score + ' views');
  $info.append($views);

  var $body = $('<div/>');
  $body.addClass('body');
  $body.text("ZOMG DIS SO AWESOME!!! CAPS LOCK = CRUISE CONTROL FOR COOL!!! No, seriously though, stop yelling");
  $post.append($body);
}

function timeConvert (millisec) {
  var seconds = Math.floor(millisec / 1000);
  var minutes = Math.floor(millisec / (1000 * 60));
  var hours = Math.floor(millisec / (1000 * 3600));
  var days = Math.floor(millisec / (1000 * 3600 * 24));
  if (seconds < 60) {
      return 'Submitted ' + seconds + ' Seconds Ago ';
  } else if (minutes === 1) {
      return 'Submitted ' + minutes + ' Minute Ago ';
  } else if (minutes < 60) {
      return 'Submitted ' + minutes + ' Minutes Ago ';
  } else if (hours === 1) {
      return 'Submitted ' + hours + ' Hour Ago ';
  } else if (hours < 24) {
      return 'Submitted ' + hours + ' Hours Ago ';
  } else if (days === 1) {
      return 'Submitted ' + days + ' Day Ago ';
  } else {
      return 'Submitted ' + days + ' Days Ago ';
  }
}