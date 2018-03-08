

$( document ).ready(function() {

    var questionNumber;
    var timerInterval;
    var questionTime;
    var inBetweenTimer;
    var correct=0;
    var incorrect=0;
    var unanswerd=0;


    var triviaQuestions = [
        {
            question: "Adjusted for inflation, what's the highest-grossing movie of all time?",
            correct:1,
            answers:["Titanic","Gone With The WInd","Avatar","Star Wars"]
    
        },
        {
            question: "What was Tim Burton's directorial debut feature film?",
            correct:3,
            answers:["BeetleJuice","Edward Scissorhands","The Nightmare Before Chrismtas","Pee-wee's Big Adventure"]
        },
        {
            question: "Which dramatic film featured Meryl Streep yelling out from a tent: 'The dingo's got my baby!'?",
            correct:0,
            answers:["A Cry in the Dark","Heartburn","Postcards From The Edge","Sophie's Choice"]
        },
        {
            question: "Who is the next door neighbor that Andy’s toys fear in Toy Story?",
            correct:1,
            answers:["Rex","Sid","Hamm","George"]
        },
        {
            question: "In Goodfellas, what is Henry Hill’s job as a teenager that gets him involved with the mob?",
            correct:3,
            answers:["Delivering groceries","Selling newspapers","Picking up trash","Parking Cars"]
        },
        {
            question: "What specific creature does Indiana Jones hate?",
            correct:1,
            answers:["Scorpions","Snakes","Spiders","Cockroaches"]
        },
        {
            question: "What is the name of the sword that Bilbo Baggins wields in the Hobbit?",
            correct:2,
            answers:["Shard","Narsil","Sting","Goblin Killer"]
        },
        {
            question: "What is the name of Batman's love interest in The Dark Knight?",
            correct:3,
            answers:["Selina Kyle","Talia Al Ghul","Miranda Tate","Rachel Dawes"]
        },
        {
            question: "What is the name of Django's bounty hunter partner in Django Unchained",
            correct:0,
            answers:["King Schultz","Calvin Candle","Spencer Bennet","Billy Crash"]
        },
        {
            question: "What country is Mad Max set in?",
            correct:2,
            answers:["USA","England","Australia","Africa"]
        }
    ]
    


$("#startButton").on("click", startGame);

function startGame(){
    questionNumber=0;
    correct=0;
    incorrect=0;
    unanswerd=0;
    nextQuestion();
}

function decrementTimer(){
    
    var timeLeft = parseInt($("#displayTimer").text());
    timeLeft--;
    $("#displayTimer").text(timeLeft);

}

function outOfTime(){

    unanswerd++;
    clearInterval(timerInterval);
    clearTimeout(questionTime);


    $("#answerDiv").remove();
    $("#question").remove();
    $("#trivia-space").append("<h2 class='timeOutDisplay'>Out of time!<h2/>");
    questionNumber++;

    if(questionNumber===triviaQuestions.length)
    {
        inBetweenTimer = setTimeout(displayResults, 5000);
    }
    else{
        inBetweenTimer = setTimeout(nextQuestion, 5000);

    }

}



$(document).on("click",".answerButton",checkAnswer);
$(document).on("click","#restart",startGame);



function checkAnswer(){

    clearInterval(timerInterval);
    clearTimeout(questionTime);

    $("#answerDiv").remove();
    $("#question").remove();
    console.log(this);
    var answerIndex = parseInt($(this).attr("answerindex"));
    var successDisplay = $("<h2>");
    if(answerIndex===triviaQuestions[questionNumber].correct)
    {
        correct++;
        successDisplay.addClass("successDisplay");

        successDisplay.text("You Got it Right!");
        $("#trivia-space").append(successDisplay);

    }
    else{
        incorrect++;
        successDisplay.text("Wrong")
        successDisplay.addClass("wrongDisplay")
        var correctAnswerDisplay = $("<h2>")
        correctAnswerDisplay.text("The right answer was: " +triviaQuestions[questionNumber].answers[triviaQuestions[questionNumber].correct]);
        correctAnswerDisplay.addClass("correctAnswer");
        $("#trivia-space").append(successDisplay);
        $("#trivia-space").append(correctAnswerDisplay);

    }

    questionNumber++;


    if(questionNumber===triviaQuestions.length)
    {
        inBetweenTimer = setTimeout(displayResults, 5000);
    }
    else{
        inBetweenTimer = setTimeout(nextQuestion, 5000);

    }
}


function nextQuestion(){


    $("#trivia-space").empty();


    
    var question = $("<p>");
    var timerDisplay = $("<p>");
    var answerDiv= $("<div>");
    
    timerDisplay.attr("id", "displayTimer");
    timerDisplay.text("30");

    question.attr("id", "question");
    question.text(triviaQuestions[questionNumber].question);

    answerDiv.attr("id", "answerDiv");

    var answers = triviaQuestions[questionNumber].answers;
    for(var i = 0; i<answers.length; i++){

        var answerDisplay = $("<p>");
        answerDisplay.attr({class:"answerButton", answerindex:i});
        answerDisplay.text(answers[i]);
        answerDiv.append(answerDisplay);
    }


    $("#trivia-space").append(timerDisplay);


    $("#trivia-space").append(question);

    $("#trivia-space").append(answerDiv);

    timerInterval=setInterval(decrementTimer, 1000);
    questionTime=setTimeout(outOfTime, 30000);




}




function displayResults(){
    var triviaSpace = $("#trivia-space");
    triviaSpace.empty();
    triviaSpace.append("<h2 id='resultHeader'>Results<h2/>");
    triviaSpace.append("<p class='resultStats'>Correct Answers: " +correct);
    triviaSpace.append("<p class='resultStats'>Wrong Answers: " +incorrect);
    triviaSpace.append("<p class='resultStats'>Unanswered: " +unanswerd);
    triviaSpace.append("<p id='restart'>Try Again?<p/>");


}




});


