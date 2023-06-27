var quizData = [];
var heading = "";
var minutes = 0;
var questionNumber = 0;

// Handle form submission
    document.getElementById('quizForm').addEventListener('submit', function(event) {
        event.preventDefault();
  
        heading = document.getElementById('quizName').value;
        minutes = document.getElementById('minutes1').value;
        var questions = document.getElementsByClassName('question');
  
        for (var i = 0; i < questions.length; i++) {
          var question = questions[i].querySelector('input[name^="question"]').value;
          var choices = questions[i].querySelector('input[name^="choices"]').value.split(',');
          var answer = questions[i].querySelector('input[name^="answer"]').value;
  
          quizData.push({
            question: question,
            choices: choices,
            answer: answer
          })
        }

    // Store the array in localStorage
    localStorage.setItem('heading', JSON.stringify(heading));
    localStorage.setItem('minutes', JSON.stringify(minutes));
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // Redirect to the destination page
    window.location.href = 'quiz.html';
});

    // Add event listener to the "Add Question" button
    document.getElementById('addQuestionBtn').addEventListener('click', function() {
        questionNumber++;
        var questionsContainer = document.getElementById('questionsContainer');
  
        // Create new question elements
        var newQuestionDiv = document.createElement('div');
        newQuestionDiv.classList.add('question');
  
        var questionNumber = questionsContainer.getElementsByClassName('question').length + 1;
  
        var questionLabel = document.createElement('label');
        questionLabel.innerHTML = 'Question'+'-'+ questionNumber +': ';
        var questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.name = 'question' + questionNumber;
        questionInput.required = true;
  
        var choicesLabel = document.createElement('label');
        choicesLabel.innerHTML = 'Choices (comma-separated)'+'-'+ questionNumber +': ';
        var choicesInput = document.createElement('input');
        choicesInput.type = 'text';
        choicesInput.name = 'choices' + questionNumber;
        choicesInput.required = true;
  
        var answerLabel = document.createElement('label');
        answerLabel.innerHTML = 'Answer'+'-'+ questionNumber +': ';
        var answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.name = 'answer' + questionNumber;
        answerInput.required = true;
  
        newQuestionDiv.appendChild(questionLabel);
        newQuestionDiv.appendChild(questionInput);
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(choicesLabel);
        newQuestionDiv.appendChild(choicesInput);
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(answerLabel);
        newQuestionDiv.appendChild(answerInput);
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(document.createElement('br'));
  
        questionsContainer.appendChild(newQuestionDiv);
      });