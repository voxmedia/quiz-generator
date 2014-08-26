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
  $(".quiz-container").html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div><div class='qq-question'><div class='qq-description'>" + input[currentQuestion].description + "</div><br><div class='question'>" + input[currentQuestion].question + "</div></div>" +
      "<ol class='answers'></ol>");
  $(".answers").append(
    "<li id='option-a'data-score='" + input[currentQuestion].avalue + "'>" + '<img src="' + input[currentQuestion].aimage + '"><p>' + input[currentQuestion].a + "</p></li>" +
    "<li id='option-b' data-score='" + input[currentQuestion].bvalue + "'>" + '<img src="' + input[currentQuestion].bimage + '"><p>' + input[currentQuestion].b + "</p></li>" +
    "<li id='option-c' data-score='" + input[currentQuestion].cvalue +"'>" + '<img src="' + input[currentQuestion].cimage + '"><p>' + input[currentQuestion].c + "</p></li>" +
    "<li id='option-d' data-score='" + input[currentQuestion].dvalue +"'>" + '<img src="' + input[currentQuestion].dimage + '"><p>' + input[currentQuestion].d + "</p></li>" +
    "<li id='option-e'data-score='" + input[currentQuestion].evalue + "'>" + '<img src="' + input[currentQuestion].eimage + '"><p>' + input[currentQuestion].e + "</p></li>" +
    "<li id='option-f'data-score='" + input[currentQuestion].fvalue + "'>" + '<img src="' + input[currentQuestion].fimage + '"><p>' + input[currentQuestion].f + "</p></li>"
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
  $('.quiz-container').html("<div class='scorecard'><h1>This is your score</h1></div>");
  for (var i = 0; i < scores.length; i++) {
    var percentage = (scores[i].value / (currentQuestion + 1)) * 100;
    $(".quiz-container").append("<p>You are " + percentage + "% " + scores[i].key + "</p>");
  }
}

$(document).ready(function(){
  getSpreadSheet();
});