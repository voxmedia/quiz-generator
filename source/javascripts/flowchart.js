// initialize tabletop library
function init() {
        Tabletop.init( { key: '0AlMgrVuuAI0MdFV6TmgxR0ZZeVpEWmppQnltZzVOWnc',
                   callback: readData,
                   simpleSheet: true } );
    }

var input;
var that;
var row;
var connections = [];

// get spreadsheet data
function readData(data, tabletop) { 
    input = data;
    console.log(input);
    that = this;
    buildQuestion();
    makeConnections();
}

// make story from spreadsheet data
/* make_story_data_from_spreadsheet_data: function(data) {
                var story = {};
                that.start_page = 'cyoa_page_' + that.clean_slug(data[0].slug);
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    var page = {}; 
                    page.html = that.build_story_page_html_from_row(row);
                    page.connects = that.make_connects_data_from_row(row);
                    story['cyoa_page_' + that.clean_slug(row.slug)] = page;
                }
                return story;
            },
*/

// builds all questions - temporary
function buildQuestion() {
    for (i=0; i < input.length; i++) {
        $(".chart_wrapper").append("<h4>" + input[i].text + "</h4><p>" + input[i].connectstext + "</p>");
    }
}

// makes connections between questions
function makeConnections() {
    var separator = ",";
    for (var i=0; i < input.length; i++) {
        var row = input[i];
        var connects_to = row.connectsto.split(separator);
        var connects_labels = row.connectstext.split(separator);
        $(".chart_wrapper").append("<p>" + connects_to + "</p>");
        console.log(connects_to);
        for (var j=0; j < connects_to.length; j++) {
            var connection = connects_to[j];
            connections.push({
                'link' : connection,
                'html' : connects_labels[j]
            });
        }
    }

/*make_connects_data_from_row: function(row) {
                var connections = [];
                var connects_to = row.connectsto.split(that.separator);
                var connects_labels = row.connectstext.split(that.separator);
                for (var i = 0; i < connects_to.length; i++) {
                    connection = connects_to[i].toLowerCase();
                    var connection = connection.replace(/[^a-zA-Z0-9]/g, '');
                    connections.push({
                        'link' : 'cyoa_page_' + connection,
                        'html' : connects_labels[i]
                    });
                }
                return connections;
            },
*/

// build question from spreadsheet row



$(document).ready(function(){
    init();
    
    // build story page from row (html)
    

    // make connects data from row

    // display page
});