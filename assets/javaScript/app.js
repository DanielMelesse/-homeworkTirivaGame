// golabl varabile to hold win or loss count. 
var correctAnswerCount = 0;
var wrongAnswerCount = 0;
var answers = "";
var userQuestions = []
var totalTime = "2:10";
var clearquestion = $('.questions');
var timerHtml = $('.timer');

// loop the array assign html element
// var queryURL = 'http://jservice.io/api/clues';
var categoryId = 42;
var numQuestion = 100;

// queryUrl     url jservice api url 
// categoryId   category jservice api categoryId 42 = Sport category
// numQuestion  value defualt return 100 question it seen passing value 100 return 50 question. 

function getQuestion() {
 
    var queryURL = " http://jservice.io/api/clues?category=" + categoryId + "&value=" + numQuestion;
    console.log(queryURL);

    $(document).on('click', '.startGame', function () {
        console.log(this)
        // timer()
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            userQuestions = response
            console.log("am response user questions array ", userQuestions)
            createUserQuestion();
        })
    });
}


function createUserQuestion() {
    caches: false
    console.log("hello")
    var questionNum = Math.floor(Math.random() * 50) + 1;
    // hide start game button 
    $(".startGame").hide();

    // build question html block
    var questionHtm = $('<div></div>').css({
        "padding": 10,
        "color": "red",
        "font-size": 21
    });

    var nextQuestion = userQuestions[questionNum]
    console.log("am question number", questionNum)

    answers = nextQuestion.answer
    questionHtm.addClass("question");
    questionHtm.attr("data-name", "working");
    questionHtm.text(nextQuestion.question);
    console.log("this is create question funcation", nextQuestion.question)
    console.log("we made it here!!!")
    $(".questions").append(questionHtm);

    var optionAnswers = []
    optionAnswers.push(answers)
    console.log(optionAnswers)

    for (var i = 0; i < 2; i++) {
        var qNum = Math.floor(Math.random() * 50) + 1
        optionAnswers.push(userQuestions[qNum].answer)
    }
    for (let i = 0; i < optionAnswers.length; i++) {
        var radioBtn = $('<input type="radio" class="radioBtn" name="radiobtn"></input>')
        radioBtn.text(optionAnswers[i])
        radioBtn.appendTo($(".questions"))
    }
    scoreCounter();
}


// funcation Timer
var timer2 = totalTime
function timer() {
    
    var interval = setInterval(function () {

        var timer = timer2.split(':');
        //by parsing integer, I avoid all extra string processing
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = (seconds < 0) ? --minutes : minutes;
        if (minutes < 0) clearInterval(interval);
        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        //minutes = (minutes < 10) ?  minutes : minutes;
        $('.timer').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;
        console.log("timer 2", timer2)

        if (timer2 === "2:00") {
            // final score funcation here!!! 
           gameOver();
        }
    }, 1000);

}

 function scoreCounter(){
    $(document).on("click", '.radioBtn', function () {
        var clearquestion = $('.questions');
        if (this.innerText === answers) {
            correctAnswerCount++
            clearquestion.empty()
            createUserQuestion();
        } if (this.innerText != answers) {
            wrongAnswerCount++
            clearquestion.empty()
            createUserQuestion();   
        } 
    });
 }

function startGame(){
    getQuestion();
    timer();
}

function gameOver(){


    alert("time up!! "  + answers + " Wrong count " + wrongAnswerCount + " correct count " + correctAnswerCount )
    timerHtml.empty()
    clearquestion.empty()
    $('.startGame').show()
    this.wrongAnswerCount = 0;
    this.correctAnswerCount = 0
    this.timer = totalTime;
}


startGame();