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

The quiz tool is powered by (you guessed it!) Google Spreadsheets. Editors use a Google Spreadsheet Template to input the content of the quiz. For each question, there is the question, four choices, correct answer, incorrect message, correct message and a hint. Once the editor is done, they will publish the spreadsheet to the web, and grab the public URL.

The editor then feeds the spreadsheet url into our authoring tool, which uses tabletop.js to collect the spreadsheet data. In order to make the tool more reliable, the authoring tool uses tabletop.js to collect the spreadsheet data into a json object, which is then attached to the embed code. This means that the quiz code will need to be regenerated every time a change is made, but the quiz will be more stable since it does not hit Google Spreadsheet every time it loads.

In the authoring tool, the editor can pick a vertical within Vox. A vertical-specific stylesheet URL is then generated, e.g. quiz-vox.css. That together with the quiz data is parsed together with a script tag with the quiz.js library. All of these files are hosted on s3 right now. Now editors can copy-and-paste the embed code in the CMS and Voilà!



## How does the quiz work?
The quiz dynamically generates an array of multiple choice questions from a JSON object. Users’ answers are highlighted when selected, then the chosen string is compared to the correct answer. Users can also see a hint for each question. Scores are incremented if the user answers correctly, and the final result is displayed at the end of the quiz for users to share on social media.



## What’s next?
The app is fully functional, but we would like to add more options for creating different kinds of quizzes (true/false, flowchart-ish). We’d also like to make options for inserting images/video/audio within questions, answers, and hints (as our project is currently completely text-based). We’d also like to polish/write better Javascript!


## License

Copyright (c) 2014 Vox Media Inc., KK Rebecca Lai, Nicole Zhu, Adam Baumgartner

BSD license

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
