function init() {
  Tabletop.init( { key: '0AlMgrVuuAI0MdFV6TmgxR0ZZeVpEWmppQnltZzVOWnc',
                   callback: readData,
                   simpleSheet: true } );
}

var input, slug, currentRow, connectsTo, target;
var questionNumber = 0;
var separator = ",";

// get spreadsheet data
function readData(data, tabletop) { 
  input = data;
  slug = input[0].slug;
  buildQuestion(slug);
}

function scrollDown(target) {
  console.log(target);
  console.log($(target).height());
  console.log($(target).offset().top);  
  $('html,body').animate({
     scrollTop: $(target).offset().top
  }, 1000);
}

function getSlug (newslug, selection) {
  $(selection).addClass('selected');
  $('button').attr('disabled', true);
  slug = newslug;
  buildQuestion(slug);
}

function compareSlug(slug) {
  for (var i = 0; i < input.length; i++) {
    if (input[i].slug == slug) {
      currentRow = i;
      break;
    }
  }
}

function buildQuestion(slug) {
  compareSlug(slug);
  if (currentRow == 0) {
    $(".quiz-container").append("<div class='question-" + questionNumber + "'><div class='question'>" + input[currentRow].text + "</div></div>");
  } else {
    $(".quiz-container").append("<div style='display:none;' class='question-" + questionNumber + "'><div class='question'>" + input[currentRow].text + "</div></div>");
    scrollDown(".question-" + (questionNumber - 1));
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
    $('.question-' + questionNumber + '-left').on('click', function() { getSlug(connectsTo[0], this); });
    $('.question-' + questionNumber + '-right').on('click', function() { getSlug(connectsTo[1], this); });
    questionNumber++;
  }
}

function restart() {
  $('.quiz-container').empty();
  slug = input[0].slug;
  buildQuestion(slug);
}

function lastQuestion() {
  for (var i = 0; i < input.length; i++) {
    if (input[i].slug == 'End') {
      theEndRow = i;
      break;
    }
  }
  $('.question-' + questionNumber).append('<div class="last"><p>' + input[theEndRow].text + '</p><br/><button class="flowchart-button qq-button restart">Restart</button></div>');
  $('.restart').on('click', restart);
}

// attach quiz and vertical-specific stylesheets
  var addCSS = function () {
    $('head').append('<link rel="stylesheet" href="/stylesheets/flowchart.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="/stylesheets/quiz-vox.css" type="text/css" />');
  }

$(document).ready(function(){
  addCSS();
  init();
});