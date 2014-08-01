(function ($) {
  var key, pub, quizType;

  // initialize tabletop library
  function init() {
  		Tabletop.init( { key: url,
                     callback: readData,
                     simpleSheet: true } );
  	}

  function readData(data, tabletop) {
  	input = [];
  	for ( var i = 0; i < data.length; i++ ) {
  		input[i] = findUrlinObject( data[i] );
  	}
  	embed(input);
  }

  function findUrlinObject ( data ) {
  	$.each( data, function( key, value ){
  		if ( key == 'correct' || key == 'incorrect' ) {
  			data[key] = converttoHex( data[key] );
  		}
  	} );
  	return data;
  }

  function converttoHex ( string ) {
  	var hex, i;
  	var result = "";
  	for ( i = 0; i < string.length; i++ ) {
  		hex = string.charCodeAt( i ).toString( 16 );
  		result += ( "000" + hex ).slice( -4 );
  	}
  	return result;
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
      $('#quiz-template').attr('href', 'https://drive.google.com/previewtemplate?id=0AlMgrVuuAI0MdGl6NngwMGYtX3RHQjlic0xzNnBjUGc&mode=public').addClass('template');
      $('#example-spreadsheet').val('https://docs.google.com/spreadsheet/pub?key=0AlMgrVuuAI0MdGl6NngwMGYtX3RHQjlic0xzNnBjUGc&output=html');
    } else {
      $('#quiz-template').attr('href', 'https://drive.google.com/previewtemplate?id=0AlMgrVuuAI0MdE9ZNVhnYmk0TUdidGhiZTgwT0F6MGc&mode=public').addClass('template');
      $('#example-spreadsheet').val('https://docs.google.com/spreadsheet/pub?key=0ArcRX35HpjojdGlSR012UjVDZkpIM19ObVY5TE03U2c&output=html');
    }
  }

  function submitquiz() {
  	quizType = $('input[name="quiz-type"]:checked').val();
  	if (quizType == 'quiz') {
  		$('.quiz-container').empty();
  		buildquiz();
  	} else {
  		$('.quiz-container').empty();
  		buildflowchart();
  	}
  }

  function getStylesheet() {
  	pub = $('input[name="pub"]:checked').val();
    $('body').append('<script type="text/javascript">var pub ="' + pub + '"</script>');
    pubStylesheet = "http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/quiz-" + pub + ".css";
    // pubStylesheet = "/stylesheets/quiz-" + pub + ".css";
  }

  function embed(input) {
    $("#embedcode").html("&lt;div class='quiz-container'></div>&lt;script type='text/javascript'>window.jQuery || document.write('&lt;script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'>&lt;&#92;/script>');&lt;/script>&lt;script type='text/javascript'>var input = " + JSON.stringify(input) + "; var pubStylesheet = '" + pubStylesheet + "'; var pub = '" + pub + "'; &lt;/script>&lt;script src='http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/" + quizType + ".js'>&lt;/script>");
    // $("#embedcode").html("&lt;div class='quiz-container'></div>&lt;script type='text/javascript'>window.jQuery || document.write('&lt;script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'>&lt;&#92;/script>');&lt;/script>&lt;script type='text/javascript'>var input = " + JSON.stringify(input) + "; var pubStylesheet = '" + pubStylesheet + "';&lt;/script>&lt;script src='/javascripts/" + quizType + ".js'>&lt;/script>");
    addJS();
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

  $(document).ready(function() {
    $('input:radio[name=quiz-type]').click(function() {
      quizType = $('input:radio[name=quiz-type]:checked').val();
      changeTemplate();
    });

    $('#build').on('click', submitquiz)
  })
})(jQuery);