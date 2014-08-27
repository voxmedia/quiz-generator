var answer,
    qnumber,
    currentQuestion = 0,
    input;

function getData() {
  getSpreadSheet();
}

function getSpreadSheet() {
  Tabletop.init({
    key: '1ZC3P1dBke3fV5rxsP5wcep_e6plszw0lCjB5gqArR8k',
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
      if (scores[i].key == answer && scores[i].key != "") {
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
  console.log(scores);
}

var score_img;
function switchImage(input) {
  if (input == "Entry-Level") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/new_city.jpg'
  } else if (input == "90s Enthusaist") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/90s.jpg'
  } else if (input == "No. 1 Fashion Fan") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/fashion_fan_girl2.jpg'
  } else if (input == "Plant-Based") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/grn_juice.jpg'
  } else if (input == "Minimalist") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/Blogger.jpg' 
  } else if (input == "Parisian In Brooklyn") {
    score_img = 'http://apps.voxmedia.com/graphics/racked-fashion-week-quiz/Parisian.jpg' 
  }
}

function finalScore() {
  checkAnswer();
  var top_score = scores[0].value;
  var top_key = scores[0].key;
  $(".quiz-container").html('<div class="scorecard"><div class="scores-img"></div><div class="scores"><h3>Breakdown</h3></div></div>');
  for (var i = 0; i < scores.length; i++) {
    if (scores[i].value > top_score) {
      top_score = scores[i].value;
      top_key = scores[i].key;
    }
    var percentage = (scores[i].value / (currentQuestion + 1)) * 100;
    $(".scores").append("<p>"+ scores[i].key + ": " + percentage.toFixed(0) + "%</p>");
  }
  switchImage(top_key);
  $(".scores-img").prepend("<img src='" + score_img + "'>");
  $(".scores").prepend("<h1>You are a " + top_key + " girl!</h1>");
  var link = document.URL;
  $(".scores").append("<ul class='social'><li><a class=\"fb-share\" href='http://www.facebook.com/sharer.php?u=" + link + "' target='_blank'><i class='fa fa-facebook-square'></i></a></li><li><a class=\"twitter-share\" href='http://twitter.com/home?status=I am a " + top_key + " according to this Fashion Girl quiz " + link + " via @racked target='_blank'><i class='fa fa-twitter-square'></i></a></li><li><a class=\"gplus-share\" href='https://plus.google.com/share?url=" + link + "' target='_blank'><i class='fa fa-google-plus-square'></i></a></li></ul>")
}


$(document).ready(function(){
  $('head').append('<link rel="stylesheet" href="quiz-fashion.css" type="text/css" />');
  $('head').append('<link rel="stylesheet" href="quiz-racked.css" type="text/css" />');

  buildQuiz(input);
});