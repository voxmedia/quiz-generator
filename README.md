Quiz Quartet
==========

Quiz Quartet was built to automate the process for generating a quiz so no developer has to be involved and write repetitive code! Check out the project at [http://quiz-generator.herokuapp.com](http://quiz-generator.herokuapp.com)


## Running it locally

This app uses Middleman, so cd to your project directory and just run:

##### Install Middleman

`gem install middleman`

##### Install gems

`bundle install`

##### Run server

`bundle exec middleman server`

##### Generate static site

`bundle exec middleman build`


## How does the tool work?

Editors will use a Google Spreadsheet Template to create the information in the quiz. For each question, you can enter questions, four choices, the correct answer, incorrect message, correct message and a hint. Once the editor is done, they will publish the spreadsheet to the web, and grab the public URL for the spreadsheet.

You will then feed the spreadsheet url into the tool, which goes through tabletop.js to collect the data. In order to make the tool more reliable, the build tool uses tabletop.js to collect the spreadsheet data into a json object, which is then attached in the embed code. This means that the quiz code will need to be regenerated every time a changes is made, but the quiz will be more stable since it does not hit Google Spreadsheet every time it loads.

Then you can pick a vertical, which generates a stylesheet URL e.g. quiz-vox.css. All of that is parsed together with a script tag with the quiz.js library which you can copy and paste. All of these files are hosted on s3 right now.



## How does the quiz work?
The quiz dynamically generates an array of multiple choice questions from spreadsheet data that is stored in a JSON object. Users can click a button to see a hint for each question, which appears below the question. Users’ answers are highlighted when selected, then the chosen string is compared to the correct answer. Scores are incremented if the user answers correctly, and the final result is displayed at the end of the quiz for the user to share on social media.



## What’s next?
The app is fully functional, but we would like to add more options for creating different kinds of quizzes (true/false, flowchart-ish). We’d also like to make options for inserting images/video/audio within questions, answers, and hints (as our project is currently completely text-based). We’d also like to polish/write better Javascript!
