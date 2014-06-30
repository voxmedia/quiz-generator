var input; 
// initialize tabletop library
function init() {
		Tabletop.init( { key: url,
                   callback: readData,
                   simpleSheet: true } );
	}

function readData(data, tabletop) { 
	console.log(data);
	input = data;
	embed();
  $('body').append('<script src="/javascripts/quiz.js" type="text/javascript"><\/script>');
}
;
