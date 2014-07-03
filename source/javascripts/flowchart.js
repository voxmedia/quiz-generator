function init() {
  Tabletop.init( { key: '0AlMgrVuuAI0MdFV6TmgxR0ZZeVpEWmppQnltZzVOWnc',
                   callback: readData,
                   simpleSheet: true } );
}

var input;
var that;
var row;
var connections = [];
var number = 0;
var slug;
var separator = ",";
var thisrow;

// get spreadsheet data
function readData(data, tabletop) { 
  input = data;
  console.log(input);
  that = this;
  slug = input[0].slug;
  buildQuestion(slug);
  // makeConnections();
}

function getSlug (newslug) {
  slug = newslug;
  buildQuestion(slug);
}

function compareSlug(slug) {
  for (var i = 0; i < input.length; i++) {
    if (input[i].slug == slug) {
      thisrow = i;
      console.log(thisrow)
      break;
    }
  }
}
// builds all questions - temporary
function buildQuestion(slug) {
  compareSlug(slug);
  $(".chart_wrapper").append("<div class='question-" + number + "'><h4>" + input[thisrow].text + "</h4></div>");
  writeOptions(thisrow);
}

function writeOptions(thisrow) {
  var row = input[thisrow];
  var connects_labels = row.connectstext.split(separator);
  $('.question-' + number).append("<button class='question-" + number + "-left'>" + connects_labels[0] + "</button><button class='question-" + number + "-right'>" + connects_labels[1] + '</button>');
  nextQuestion(thisrow);
}

var connects_to;
function nextQuestion(thisrow) {
  var row = input[thisrow];
  connects_to = row.connectsto.split(separator);
  console.log(connects_to[0], connects_to[1]);
  // $('.next').on('click', nextQuestion);
  $('.question-' + number + '-left').on('click', function() { getSlug(connects_to[0]) });
  $('.question-' + number + '-right').on('click', function() { getSlug(connects_to[1]) });
  number ++;
}

$(document).ready(function(){
  init();
  
  // build story page from row (html)
  

  // make connects data from row

  // display page
});