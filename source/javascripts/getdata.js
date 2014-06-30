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
	quiz();
	embed();
	buildQuiz();
}