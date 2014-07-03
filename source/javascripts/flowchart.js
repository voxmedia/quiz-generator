function init() {
  Tabletop.init( { key: '0AlMgrVuuAI0MdFV6TmgxR0ZZeVpEWmppQnltZzVOWnc',
                   callback: readData,
                   simpleSheet: true } );
}

var input, slug, currentRow, connectsTo;
var questionNumber = 0;
var separator = ",";

// get spreadsheet data
function readData(data, tabletop) { 
  input = data;
  slug = input[0].slug;
  buildQuestion(slug);
}

function getSlug (newslug) {
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
  $(".chart_wrapper").append("<div class='question-" + questionNumber + "'><h4>" + input[currentRow].text + "</h4></div>");
  writeOptions(currentRow);
}

function writeOptions(currentRow) {
  var row = input[currentRow];
  var connects_labels = row.connectstext.split(separator);
  connectsTo = row.connectsto.split(separator);
  console.log(connectsTo[0], connectsTo[1]);
  if (connectsTo[0] == 'End') {
    lastQuestion();
  } else {
    $('.question-' + questionNumber).append("<button class='flowchart-button question-" + questionNumber + "-left'>" + connects_labels[0] + "</button><button class='flowchart-button question-" + questionNumber + "-right'>" + connects_labels[1] + '</button>');
    $('.question-' + questionNumber + '-left').on('click', function() { getSlug(connectsTo[0]); });
    $('.question-' + questionNumber + '-right').on('click', function() { getSlug(connectsTo[1]); });
    questionNumber ++;
  }
}

function restart() {

}

function lastQuestion() {
  for (var i = 0; i < input.length; i++) {
    if (input[i].slug == 'End') {
      theEndRow = i;
      break;
    }
  }
  $('.question-' + questionNumber).append('<div>' + input[theEndRow].text + '</div><br/><button class="flowchart-button restart">Restart</button></div>');
  $('.restart').on('click', function(){
    $('.chart_wrapper').empty();
    slug = input[0].slug;
    buildQuestion(slug);
  })
}

$(document).ready(function(){
  init();
});