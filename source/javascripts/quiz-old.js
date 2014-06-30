(function(){
	quiz();
})();

// attach json object 'var input' with quiz data
var ans, qnumber, pubStylesheet;
var score = 0;
var currentQuestion = 0;

// social media
var facebook = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.5 3.7h1.4v1.6h-1c-.2 0-.4.1-.4.4v.9h1.4l-.1 1.7h-1.3v4.5h-1.9v-4.5h-.9v-1.7h.9v-1c0-.7.4-1.9 1.9-1.9z' class='shape-2'></path></svg>";
var twitter = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M4 4.8c1 1.2 2.5 2 4.2 2.1l-.1-.4c0-1.1.9-2 2-2 .6 0 1.1.3 1.5.6.5-.1.9-.3 1.3-.5-.2.4-.5.8-.9 1.1l1.2-.3c-.3.4-.6.8-1 1.1v.3c0 2.7-2 5.8-5.8 5.8-1.1 0-2.2-.3-3.1-.9h.5c.9 0 1.8-.3 2.5-.9-.9 0-1.6-.6-1.9-1.4h.4c.2 0 .4 0 .5-.1-.9-.2-1.6-1-1.6-2 .3.2.6.2.9.3-.6-.5-.9-1.1-.9-1.8 0-.4.1-.7.3-1z' class='shape-2'></path></svg>";
var google = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.6 4.3l.6-.4c.1-.1.1-.1.1-.2s-.1-.1-.2-.1h-2.7c-.3 0-.6.1-.9.2-1 .3-1.6 1.1-1.6 2 0 1.2.9 2.1 2.2 2.1-.1 0-.1.1-.1.2 0 .2 0 .4.1.5-1.1 0-2.2.6-2.6 1.4-.1.2-.2.4-.2.7 0 .2.1.4.2.6.3.5.8.8 1.5 1 .4.1.8.1 1.2.1.4 0 .7 0 1.1-.1 1-.3 1.7-1.1 1.7-2 0-.8-.2-1.3-1-1.8-.3-.2-.6-.6-.6-.7 0-.2 0-.3.4-.6.5-.4.8-1 .8-1.5s-.2-1-.4-1.3h.2c.1 0 .1 0 .2-.1zm-3.3 1.3c-.1-.4 0-.8.3-1.1.1-.2.3-.2.5-.2.6 0 1.1.7 1.2 1.4.1.4 0 .8-.3 1.1-.1.2-.3.3-.5.3-.6 0-1.1-.7-1.2-1.5zm2.6 4.6v.2c0 .8-.6 1.2-1.7 1.2-.9 0-1.5-.5-1.5-1.2 0-.6.8-1.2 1.7-1.2.2 0 .4 0 .6.1l.2.1c.4.4.7.5.7.8z' class='shape-2'></path><path fill='#fff' d='M13.3 7.8c0 .1-.1.2-.2.2h-1.5v1.5c0 .1-.1.2-.2.2h-.4c-.1 0-.2-.1-.2-.2v-1.5h-1.6c-.1 0-.2-.1-.2-.2v-.4c0-.1.1-.2.2-.2h1.5v-1.5c0-.1.1-.2.2-.2h.4c.1 0 .2.1.2.2v1.5h1.5c.1 0 .2.1.2.2v.4z' class='shape-3'></path></svg>";

function quiz() {
	$('head').append('<link rel="stylesheet" href="https://s3-us-west-2.amazonaws.com/quiz-generator/quiz.css" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + pubStylesheet + '" type="text/css" />');
}

$(window).load(function(){
	buildQuiz();
});

function buildQuiz() {
	qnumber = currentQuestion + 1;
	$(".quiz-container").html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div><div class='question'>" + input[currentQuestion].question + "</div>" +
		"<ol class='answers'><li id='option-a'>" + input[currentQuestion].a + "</li>" +
		"<li id='option-b'>" + input[currentQuestion].b + "</li>" +
		"<li id='option-c'>" + input[currentQuestion].c + "</li>" +
		"<li id='option-d'>" + input[currentQuestion].d + "</li></ol>" +
		"<button id='hint' class='hintbutton' onclick='showHint()'>Need a hint?</button>" +
		"<button id='submit' class='hintbutton'>Submit answer</button>" +
		"<div class='answer'></div>");
	selectAnswer();
	submitAnswer();
}

function displayProgress(){
	$('.progress').html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div>");
}

function selectAnswer() {
	$("li").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		$("#submit").addClass("submityo").fadeIn();
	});
}

function showHint() {
	$(".answer").html(input[currentQuestion].hint);
}

function submitAnswer() {
	$("#submit").click(function() {
		checkAnswer();
	});
}

function checkAnswer() {
	if ($(".selected").length > 0) {
		ans = $(".selected").html();
		if (ans == input[currentQuestion].answer) {
			score++;
			displayProgress();

			$(".answer").html("<p>Correct!</p><p>" + input[currentQuestion].correct + "</p>");

		} else {
			$(".answer").html("<p>Sorry!</p><p> " + input[currentQuestion].incorrect + "&nbsp;The correct answer is " + input[currentQuestion].answer + ".</p>");
		}
		if (currentQuestion != (input.length-1)) {
			$(".answer").append("<button id='next' class='hintbutton' onclick='nextQuestion()'>Next</button>");
		} else {
			$(".answer").append("<button id='score' class='hintbutton' onclick='finalScore()'>See Final Score</button>");
			
		}
	}
}

function nextQuestion() {
	currentQuestion++;
	buildQuiz();
}

var link = document.URL

function finalScore() {
	$(".quiz-container").html("<div class='scorecard'><p>You correctly answered</p><p>" + score + "&nbsp;out of&nbsp;" + input.length + "</p><div id='social-media'><ul><li><a href='http://www.facebook.com/sharer.php?u=" + link + "' target='_blank'>" + facebook + "</a></li><li><a href='http://twitter.com/home?status=I scored " + score + "/" + input.length + " on this quiz " + link + " via @voxproduct' target='_blank'>" + twitter  	+ "</a></li><li><a href='https://plus.google.com/share?url=" + link + "' target='_blank'>" + google + "</a></li></ul></div><p>Challenge your friends!</p></div>");
}
