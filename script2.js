
//Array that will store the quiz data
/*
var quizData = [
    {
        question: "Which groups below are affected by Nazi Germany`s policies?",
        choices: ["Jews", "Romani People", "Gays, Lesbians and Bisexuals", "All above"],
        answer: "All above"
    },
    {
        question: "Which country was responsible Holodomor in Ukraine?",
        choices: ["Ukranian SSR", "Nazi Germany", "Soviet Union", "Reichskomistrat at Ukraine"],
        answer: "Soviet Union"
    },
    {
        question: "What political party was in charge, during World War 2 in China?",
        choices: ["Koumintang (KMT)", "Communist Party of China (CPC)", "People First Party", "Social Democratic Party"],
        answer: "Koumintang (KMT)"
    },
    {
        question: "What was the ideology in the US that advocated for blacklisting and purging Communists in 1950s?",
        choices: ["McCarthyism", "Capitalism", "Liberalism", "Conservatism"],
        answer: "McCarthyism"
    },
    {
        question: "Which political party was in charge of East Germany between 1949 and 1990?",
        choices: ["Communist Party of Germany", "Socialist Unity Party", "Social Democratic Party", "The Left"],
        answer: "Socialist Unity Party"
    },
    {
        question: "What was the paramilitary force in Nazi Germany that was responsible for camps, patrolling streets and spying?",
        choices: ["Schutzstaffel (SS)", "Wehrmacht", "Gestapo", "Stasi"],
        answer: "Schutzstaffel (SS)"
    },
    {
        question: "What was the status of West Berlin between 1949 and 1990?",
        choices: ["A territory of West Germany", "Allied Occupied Territory", "Disputed territory with GDR", "Independent State"],
        answer: "Allied Occupied Territory"
    },
    {
        question: "What was the status of racial equality in the United States prior to 1960s?",
        choices: ["Segregation was existed in certain states", "Discrimination was banned", "Diversity and Inclusion was encouraged", "Slavery was legal"],
        answer: "Segregation was existed in certain states"
    },
    {
        question: "Who was the first person that invented the enigma machine and is father of Computer Science?",
        choices: ["Alan Turing", "Bill Gates", "Thomas J Watson", "Steve Jobs"],
        answer: "Alan Turing"
    },
    {
        question: "Which group was responsible for OPEC siege in 1975?",
        choices: ["Popular Front for Liberation of Palestine", "Palestinian Liberation Army", "Soviet Union", "Hamas"],
        answer: "Popular Front for Liberation of Palestine"
    }
];
*/

//Load a custom heading element
//var heading = "WW2 and Cold War History Quiz";

// Retrieve the array from localStorage
var heading = JSON.parse(localStorage.getItem('heading'));
var minutes = JSON.parse(localStorage.getItem('minutes'));
var quizData = JSON.parse(localStorage.getItem('quizData'));

//Trigger LoadMessage function upon loading
document.addEventListener("DOMContentLoaded", loadQuestion);

// Get the timer label element
var timeLabel = document.getElementById("time");
startTimer();

function startTimer() {
    var startTime = Date.now(); // Get the current timestamp
    var targetTime = startTime + minutes * 60 * 1000; // Set the target time to 15 minutes ahead
  
    timerInterval = setInterval(function () {
      var currentTime = Date.now(); // Get the current timestamp
      var elapsedTime = currentTime - startTime; // Calculate the elapsed time in millisecondss

      if (currentTime >= targetTime) {
        // Timer reached the target time (15 minutes)
        clearInterval(timerInterval); // Stop the timer
        timeLabel.style.display = "none";
        //Determine the result when the time is over
        var passingScore = Math.round(quizData.length * 0.8);
        if (score >= passingScore){
            goodResult();
        } else {
            badResult();
        }
      } else {
      var minutes = Math.floor(elapsedTime / 60000); // Convert milliseconds to minutes
      var seconds = Math.floor((elapsedTime % 60000) / 1000); // Convert milliseconds to seconds
  
      // Format minutes and seconds with leading zeros if necessary
      var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  
      // Update the timer label
      timeLabel.innerHTML = "<b>Time left for submission: </b>" + formattedMinutes + ":" + formattedSeconds;
      }
    }, 1000); // Update the timer every second
  }

  
function stopTimer() {
    clearInterval(timerInterval); // Clear the interval to stop the timer
}

var score = 0; //Set up the score
var currentQuestion = 0; //Make an icrement for the current question

//Transform buttons into elements
var headingElement = document.getElementById("heading");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit-btn");
var scoreElement = document.getElementById("score");

function loadQuestion(){
    // Quiz must be the current question.
    var quiz = quizData[currentQuestion];

    if((currentQuestion < quizData.length)){
        headingElement.textContent = heading;
        questionElement.textContent = quiz.question; //Set up the quiz question
        //Set up the choices
        choicesElement.innerHTML = ""; //Set up the choicesElement
        for (var i = 0; i < quiz.choices.length; i++) { //Loop through the choices inner array
            var choice = quiz.choices[i]; //Store each choice
            //Create a radio button
            var radioBtn = document.createElement("input");
            radioBtn.setAttribute("type", "radio");
            radioBtn.setAttribute("name", "answer");
            radioBtn.setAttribute("value", choice);
            
            var label = document.createElement("label");
            label.appendChild(radioBtn);
            label.appendChild(document.createTextNode(choice));
            choicesElement.appendChild(label);
        };
        submitButton.style.backgroundColor = "black"; //Make button green.
        submitButton.style.color = "white"; //Make button font white.
        submitButton.textContent = "Submit"; //Change button into submit

        submitButton.addEventListener("click",checkAnswer); //Check whether the answer is true.
    } else {
        var passingScore = Math.round(quizData.length * 0.8);
        if (score >= passingScore){
            goodResult();
        } else {
            badResult();
        }
    };
}

function goodResult(){
    stopTimer(); //Stop the timer
    headingElement.textContent = "Congratulations";
    questionElement.textContent = "You passed the quiz you made. Study more material and get a good sleep before the exam. You may close the window now.";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.innerHTML = "<b>Your score is " + Math.round(score) + " out of " + quizData.length + ". </b>";
}

function badResult(){
    stopTimer();  //Stop the timer
    headingElement.textContent = "Bad News";
    questionElement.textContent = "You did not pass the quiz you made. Click REFRESH to reload the page";
    choicesElement.style.display = "none";
    submitButton.textContent = "Refresh"; 
    submitButton.addEventListener("click", function() {
        // Reload the current webpage
        location.reload();
    });
}

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="answer"]:checked'); //Get the selected answer from radio button

    if(!selectedOption && (currentQuestion == 0)){
        return;
    }

    //If no option was selected return with a message
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }

    var selectedValue = selectedOption.value; //Selected value should be the selected option
    var currentQuiz = quizData[currentQuestion]; //currentQuiz should be the current

    //Increase score if true otherwise move on to the next question
    if (selectedValue === currentQuiz.answer) {
        score++;
        currentQuestion++;
        loadQuestion();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}