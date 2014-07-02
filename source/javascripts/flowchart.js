// initialize tabletop library
function init() {
        Tabletop.init( { key: '0AlMgrVuuAI0MdFV6TmgxR0ZZeVpEWmppQnltZzVOWnc',
                   callback: readData,
                   simpleSheet: true } );
    }

var input; 

function readData(data, tabletop) { 
    input = data;
    console.log(input);
    buildQuestion();
}

function buildQuestion() {
    for (i=0; i < input.length; i++) {
        $(".chart_wrapper").append("<h4>" + input[i].text + "</h4><p>" + input[i].connectstext + "</p>");
    }
}

$(document).ready(function(){
    init();
    
    // build story page from row (html)
    

    // make connects data from row

    // display page
});