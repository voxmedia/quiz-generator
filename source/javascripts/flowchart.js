var input, slug, currentRow, connectsTo, target, slugComparison;
var questionNumber = 0;
var separator = ",";

// social media icons
var facebook = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.5 3.7h1.4v1.6h-1c-.2 0-.4.1-.4.4v.9h1.4l-.1 1.7h-1.3v4.5h-1.9v-4.5h-.9v-1.7h.9v-1c0-.7.4-1.9 1.9-1.9z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px; margin-left: 15px;''>Facebook</tspan></text></foreignObject></svg>";
var twitter = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M4 4.8c1 1.2 2.5 2 4.2 2.1l-.1-.4c0-1.1.9-2 2-2 .6 0 1.1.3 1.5.6.5-.1.9-.3 1.3-.5-.2.4-.5.8-.9 1.1l1.2-.3c-.3.4-.6.8-1 1.1v.3c0 2.7-2 5.8-5.8 5.8-1.1 0-2.2-.3-3.1-.9h.5c.9 0 1.8-.3 2.5-.9-.9 0-1.6-.6-1.9-1.4h.4c.2 0 .4 0 .5-.1-.9-.2-1.6-1-1.6-2 .3.2.6.2.9.3-.6-.5-.9-1.1-.9-1.8 0-.4.1-.7.3-1z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px;''>Twitter</tspan></text></foreignObject></svg>";
var google = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.6 4.3l.6-.4c.1-.1.1-.1.1-.2s-.1-.1-.2-.1h-2.7c-.3 0-.6.1-.9.2-1 .3-1.6 1.1-1.6 2 0 1.2.9 2.1 2.2 2.1-.1 0-.1.1-.1.2 0 .2 0 .4.1.5-1.1 0-2.2.6-2.6 1.4-.1.2-.2.4-.2.7 0 .2.1.4.2.6.3.5.8.8 1.5 1 .4.1.8.1 1.2.1.4 0 .7 0 1.1-.1 1-.3 1.7-1.1 1.7-2 0-.8-.2-1.3-1-1.8-.3-.2-.6-.6-.6-.7 0-.2 0-.3.4-.6.5-.4.8-1 .8-1.5s-.2-1-.4-1.3h.2c.1 0 .1 0 .2-.1zm-3.3 1.3c-.1-.4 0-.8.3-1.1.1-.2.3-.2.5-.2.6 0 1.1.7 1.2 1.4.1.4 0 .8-.3 1.1-.1.2-.3.3-.5.3-.6 0-1.1-.7-1.2-1.5zm2.6 4.6v.2c0 .8-.6 1.2-1.7 1.2-.9 0-1.5-.5-1.5-1.2 0-.6.8-1.2 1.7-1.2.2 0 .4 0 .6.1l.2.1c.4.4.7.5.7.8z' class='shape-2'></path><path fill='#fff' d='M13.3 7.8c0 .1-.1.2-.2.2h-1.5v1.5c0 .1-.1.2-.2.2h-.4c-.1 0-.2-.1-.2-.2v-1.5h-1.6c-.1 0-.2-.1-.2-.2v-.4c0-.1.1-.2.2-.2h1.5v-1.5c0-.1.1-.2.2-.2h.4c.1 0 .2.1.2.2v1.5h1.5c.1 0 .2.1.2.2v.4z' class='shape-3'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px;''>Google+</tspan></text></foreignObject></svg>";


// get spreadsheet data
function readData(data, tabletop) { 
  input = data;
  slug = input[0].slug;
  slug = cleanSlug(slug);
  buildQuestion(slug);
}

function scrollDown(target) {
  console.log(target);
  console.log($(target).height());
  console.log($(target).offset().top);  
  $('html,body').animate({
     scrollTop: $(target).offset().top - 30
  }, 1000);
}

function getSlug (newslug, selection) {
  $(selection).addClass('flowchart-selected');
  $('.flowchart-button').attr('disabled', true);
  slug = newslug;
  buildQuestion(slug);
}

// clean slug
function cleanSlug(slug) {
  slug = slug.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return slug;
}

function compareSlug(slug) {
  for (var i = 0; i < input.length; i++) {
    slugComparison = cleanSlug(input[i].slug);
    if (slugComparison == slug) {
      currentRow = i;
      break;
    }
  }
}

function buildQuestion(slug) {
  compareSlug(slug);
  if (currentRow == 0) {
    // not sure where to put addCSS()??
    addCSS();
    $(".quiz-container").append("<div class='question-" + questionNumber + "'><div class='question'>" + input[currentRow].text + "</div></div>");
  } else {
    // $(".quiz-container").append("<div style="display:none;" class='question-" + questionNumber + "'><div class='question'>" + input[currentRow].text + "</div></div>");
    $(".quiz-container").append("<div class='question-" + questionNumber + "'><div class='question'>" + input[currentRow].text + "</div></div>");
    scrollDown(".question-" + (questionNumber));
  }
  writeOptions(currentRow);
}

function writeOptions(currentRow) {
  var row = input[currentRow];
  var connects_labels = row.connectstext.split(separator);
  connectsTo = row.connectsto.split(separator);
  if (connectsTo[0] == 'End') {
    $('.question-' + questionNumber).fadeIn(400);
    lastQuestion();
  } else {
    $('.question-' + questionNumber).append("<button class='flowchart-button qq-button question-" + questionNumber + "-left'>" + connects_labels[0] + "</button><button class='flowchart-button qq-button question-" + questionNumber + "-right'>" + connects_labels[1] + '</button>');
    $('.question-' + questionNumber).fadeIn(400);
    $('.question-' + questionNumber + '-left').on('click', function() { getSlug(cleanSlug(connectsTo[0]), this); });
    $('.question-' + questionNumber + '-right').on('click', function() { getSlug(cleanSlug(connectsTo[1]), this); });
    questionNumber++;
  }
}

function restart() {
  $('.quiz-container').empty();
  scrollDown('.quiz-container');
  questionNumber = 0;
  slug = input[0].slug;
  buildQuestion(slug);
}

function lastQuestion() {
  for (var i = 0; i < input.length; i++) {
    input[i].slug = cleanSlug(input[i].slug);
    if (input[i].slug == 'end') {
      theEndRow = i;
      break;
    }
  }
  $('.question-' + questionNumber).append('<div class="last"><p>' + input[theEndRow].text + '</p><br/>');
  
  $('.quiz-container').append('<button class="flowchart-button qq-button restart">Restart</button></div>');
  shareQuiz();
  $('.restart').on('click', restart);
}

var link = document.URL;
function shareQuiz() {
    $(".quiz-container").append("<div class='scorecard'><div id='social-media'><ul><li><a href='http://www.facebook.com/sharer.php?u=" + link + "' target='_blank'>" + facebook + "</a></li><li><a href='http://twitter.com/home?status=Check out this flowchart " + link + " via @voxproduct' target='_blank'>" + twitter   + "</a></li><li><a href='https://plus.google.com/share?url=" + link + "' target='_blank'>" + google + "</a></li></ul></div></div>");
    console.log("score");
}

// attach quiz and vertical-specific stylesheets
var addCSS = function () {
  $('head').append('<link rel="stylesheet" href="/stylesheets/flowchart.css" type="text/css" />');
  $('head').append('<link rel="stylesheet" href="' + pubStylesheet + '" type="text/css" />');
  console.log(pubStylesheet);
}

$(document).ready(function(){
  init();
});