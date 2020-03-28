var correctAnswerIndicator = document.getElementById('correct-answer-indicator');
var incorrectAnswerIndicator = document.getElementById('incorrect-answer-indicator');
var quizIntroDiv = document.getElementById('quiz-intro');
var quizQuestionDiv = document.getElementById('quiz-question');
var highscoresDiv = document.getElementById('highscores');
var timerEl = document.getElementById('timer');
var timeLeftEl = document.getElementById('timeLeft');
var timerObject = null;

var questions = [
    {
        descriptionHTML: 'This is a question!',
        answers: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
        correctAnswer: 0,
        nextQuestion: 1
    },
    {
        descriptionHTML: 'Holy crap... This is another question!',
        answers: ['answer part uno', 'answer part dos', 'answer part tres', 'answer part quatro'],
        correctAnswer: 1,
        nextQuestion: null
    },
]

document.getElementById('start').addEventListener('click', function() {
    startQuiz();
});

function startQuiz() {
    // Hide quiz intro
    quizIntroDiv.style.display = 'none';

    // Unhide timer
    timeLeftEl.textContent = '90';
    timerEl.style.display = 'block';

    // Start timer
    timerObject = setInterval(function() {
        removeTime(1);
    }, 1000);

    // Add first question to quiz question div
    populateQuestion(0);

    // Make quiz question div visible
    quizQuestionDiv.style.display = 'block';
}

function populateQuestion(indexNum) {
    let question = questions[indexNum];

    // Clear last question
    quizQuestionDiv.children[0].innerHTML = '';

    // Populate question description
    let headerElement = document.createElement('h1');
    headerElement.innerHTML =  question.descriptionHTML;

    quizQuestionDiv.children[0].appendChild(headerElement);

    // Set up div for event delegation to quiz buttons
    let answersDiv = document.createElement('div');

    answersDiv.addEventListener('click', element => {
        var target = element.target;

        // Only do stuff if we click an answer button
        if (target.tagName.toLowerCase() === 'button') {
            if (parseInt(target.getAttribute('data-answer')) === question.correctAnswer) {
                // Do correct answer stuff
                // console.log('correct');

                correctAnswerIndicator.style.display = 'block';
                setTimeout(function() {
                    correctAnswerIndicator.style.display = 'none';
                }, 500);
            }
            else {
                // Do incorrect answer stuff
                // console.log('incorrect');

                incorrectAnswerIndicator.style.display = 'block';
                setTimeout(function() {
                    incorrectAnswerIndicator.style.display = 'none';
                }, 500);

                removeTime(10);
            }
            
            // Move on to the next question if possible, otherwise end game
            if (question.nextQuestion !== null && questions[question.nextQuestion] !== undefined) {
                populateQuestion(question.nextQuestion);
            } else {
                endQuiz();
            }
        }
    });

    quizQuestionDiv.children[0].appendChild(answersDiv);

    // Add answer buttons
    for (let i = 0; i < question.answers.length; i++) {
        let button = document.createElement('button');
        button.className = 'btn btn-purple btn-answer';
        button.setAttribute('data-answer', '' + i);
        button.textContent = '' + (i + 1) + ': ' + question.answers[i];

        answersDiv.appendChild(button);
    }
}

function endQuiz() {
    // Stop timer
    clearInterval(timerObject);



    console.log('This is the end of the quiz');
}

function removeTime(time) {
    let timeLeft = parseInt(timeLeftEl.textContent);
    timeLeft -= time;
    timeLeftEl.textContent = '' + timeLeft;

    if (timeLeft <= 0) {
        timeLeft = 0;
        endQuiz();
    }
}