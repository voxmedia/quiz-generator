var answer,
    qnumber,
    currentQuestion = 0,
    input;

function getData() {
  getSpreadSheet();
}

function getSpreadSheet() {
  Tabletop.init({
    key: '1kVfAkLUXOxVgtTvw-Z4MSlvVfrNr8-6XdBPtQwHQ_lI',
    callback: function(data, tabletop) {
      console.log(data)
      input = data;
      buildQuiz(input);
    }, simpleSheet: true
  })
}

function buildQuiz(input) {
  qnumber = currentQuestion + 1;
  anumber = qnumber;
  $(".quiz-container").html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div><div class='qq-question'><div class='question'>" + input[currentQuestion].question + "</div></div>" +
      "<ol class='answers'></ol>");
  $(".answers").append(
    "<li id='option-a'data-score='" + input[currentQuestion].avalue + "'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].aimage + '"></div><p>' + input[currentQuestion].a + "</p></li>" +
    "<li id='option-b' data-score='" + input[currentQuestion].bvalue + "'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].bimage + '"></div><p>' + input[currentQuestion].b + "</p></li>" +
    "<li id='option-c' data-score='" + input[currentQuestion].cvalue +"'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].cimage + '"><p>' + input[currentQuestion].c + "</div></p></li>" +
    "<li id='option-d' data-score='" + input[currentQuestion].dvalue +"'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].dimage + '"></div><p>' + input[currentQuestion].d + "</p></li>" +
    "<li id='option-e'data-score='" + input[currentQuestion].evalue + "'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].eimage + '"></div><p>' + input[currentQuestion].e + "</p></li>" +
    "<li id='option-f'data-score='" + input[currentQuestion].fvalue + "'>" + '<div class="img-wrapper"><img src="' + input[currentQuestion].fimage + '"></div><p>' + input[currentQuestion].f + "</p></li>"
  );
  selectAnswer();
  if (currentQuestion != (input.length-1)) {
    $('.quiz-container').append("<button class='qq-button submit-answer'>Submit answer</button>");
    $('.submit-answer').on('click', checkAnswer);
  } else {
    $(".quiz-container").append("<button class='qq-button check-score'>See Final Score</button>");
    $('.check-score').on('click', finalScore);
  }
}

function selectAnswer() {
  $('li').click(function() {
    $(".selected").removeClass("selected");
    $('li').addClass("dim");
    $(this).addClass("selected");
    $(".submit-answer").addClass("submit-highlight").fadeIn();
  })
}

var scores = [];
function checkAnswer() {
  if ($(".selected").length > 0) {
    answer = $('.selected').data('score');
    match = false;
    for (var i = 0; i < scores.length; i++) {
      if (scores[i].key == answer) {
        match = true;
        break;
      } else {
        match = false;
      }
    }
    if (match == true) {
      for (var i = 0; i < scores.length; i++) {
        if(scores[i].key == answer) {
          scores[i].value ++;
        }
      }
    } else if (match == false) {
      scores.push({
        key: answer,
        value: 1
      })
    }
    if (currentQuestion != (input.length-1)) {
      currentQuestion++;
      buildQuiz(input);
    }
  }
}

function finalScore() {
  checkAnswer();
  var top_score = scores[0].value;
  var top_key = scores[0].key;
  $(".quiz-container").html("<div class='scores'><h3>Breakdown</h3></div>");
  for (var i = 0; i < scores.length; i++) {
    if (scores[i].value > top_score) {
      top_score = scores[i].value;
      top_key = scores[i].key;
    }
    var percentage = (scores[i].value / (currentQuestion + 1)) * 100;
    $(".quiz-container").append("<p>"+ scores[i].key + ": " + percentage.toFixed(0) + "%</p>");
  }
  $(".quiz-container").prepend("<h1>You are a " + top_key + " girl!</h1>");
}

// http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/90s.jpg
// http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/Blogger.jpg
// http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/grn_juice.jpg
// http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/newcity.jpg


$(document).ready(function(){
  getSpreadSheet();
});