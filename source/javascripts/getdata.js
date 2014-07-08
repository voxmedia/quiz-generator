var input;
var quizType; 
// initialize tabletop library
function init() {
		Tabletop.init( { key: url,
                   callback: readData,
                   simpleSheet: true } );
	}

function readData(data, tabletop) { 
	console.log(data);
	input = data;
	addJS();
	embed();
}

function addJS() {
	quizType = $('input[name="quiz-type"]:checked').val();
		if (quizType == 'quiz') {
			$('body').append('<script src="/javascripts/quiz.js" type="text/javascript"><\/script>');
		} else {
			$('body').append('<script src="/javascripts/flowchart.js" type="text/javascript"><\/script>');
		}
}

function changeTemplate() {
	if (quizType == 'quiz') {
        $('#quiz-template').attr('href', 'https://drive.google.com/previewtemplate?id=0AlMgrVuuAI0MdGl6NngwMGYtX3RHQjlic0xzNnBjUGc&mode=public');
        $('#example-spreadsheet').val('https://docs.google.com/spreadsheet/pub?key=0AlMgrVuuAI0MdDE4ZVRWVXpmVktHc3oyNVJ0SWt0c0E&output=html');
      } else {
        // flowchart quiz template
        $('#example-spreadsheet').val('https://docs.google.com/spreadsheets/d/1CTJiGNNreq2TALYLesWybbiDJ4FRRPSuW_3SbaDwOoU/pubhtml');
      }
      // colors look wonky
}

function submitquiz() {
	quizType = $('input[name="quiz-type"]:checked').val();
	if (quizType == 'quiz') {
		buildquiz();
	} else {
		buildflowchart();
	}
}

var key;
var pubStylesheet = 'http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/quiz-vox.css';
// var pubStylesheet = 'stylesheets/quiz-vox.css';
var pub;

function getStylesheet() {
	pub = $('input[name="pub"]:checked').val();
    // pubStylesheet = "http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/quiz-" + pub + ".css";
    pubStylesheet = "/stylesheets/quiz-" + pub + ".css";
}

function embed() {
    $("#embedcode").html("&lt;div class='quiz-container'></div>&lt;script type='text/javascript'>window.jQuery || document.write('&lt;script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'>&lt;&#92;/script>');&lt;/script>&lt;script type='text/javascript'>var input = " + JSON.stringify(input) + "; var pubStylesheet = '" + pubStylesheet + "';&lt;/script>&lt;script src='http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/" + quizType + ".js'>&lt;/script>");
}

function buildquiz(){
    url = $('#url').val();
    init();
    getStylesheet();
}

function buildflowchart() {
	url = $('#url').val();
    init();
    getStylesheet();
}