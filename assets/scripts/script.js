var startButton = document.getElementById('start');
var submitButton = document.getElementById('submit-score');
var correctnessIndicator = document.getElementById('correctness-indicator');
var quizIntroDiv = document.getElementById('quiz-intro');
var quizQuestionDiv = document.getElementById('quiz-question');
var highscoresDiv = document.getElementById('highscores');
var timerEl = document.getElementById('timer');
var timeLeftEl = document.getElementById('timeLeft');
var timerObject = null;
var userScore = document.getElementById('user-score');
var scoreList = document.getElementById('score-list');
var initialsInput = document.getElementById('initials');

var questions = [
    {
        descriptionHTML: 'What will be logged to the console in the following code? <pre>var myVar = 12;\n\nfunc();\n\nfunction func() {\n  var myVar = 11;\n\n  console.log(myVar);\n}</pre>',
        answers: ['12', 'undefined', '11'],
        correctAnswer: 2,
        nextQuestion: 1
    },
    {
        descriptionHTML: 'How many times will the following loop run?<pre>for (let i = -1; i < 15; i += 2) {\n  ...\n}</pre>',
        answers: ['16', '7', '15', '8'],
        correctAnswer: 3,
        nextQuestion: 2
    },
    {
        descriptionHTML: 'What is the term used for the technique in the following code?<pre>function outer() {\n  var myVar=12;\n\n  function inner() {\n    var a = 3;\n    return myVar + a;\n  }\n  return inner;\n}</pre>',
        answers: ['Closure', 'Pseudo-Coding', 'Recursion', 'Function Overriding'],
        correctAnswer: 0,
        nextQuestion: 3
    },
    {
        descriptionHTML: "What should go in the missing piece of code?<pre>var divElement = $('#myDiv');\n\n// Grab integer value from div\nvar value = parseInt(-----);\nconsole.log(value);</pre>",
        answers: ['divElement.textContent', 'divElement.innerHTML', 'divElement.text()', 'divElement.val()', 'divElement.text'],
        correctAnswer: 2,
        nextQuestion: null
    }
];

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', saveScore);
initialsInput.addEventListener('keyup', sanitizeInput);
initialsInput.addEventListener('change', sanitizeInput);

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
        answerButtonBehavior(indexNum, element);
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

function answerButtonBehavior(indexNum, element) {
    let question = questions[indexNum];
    var target = element.target;

    // Only do stuff if we click an answer button
    if (target.tagName.toLowerCase() === 'button') {
        if (parseInt(target.getAttribute('data-answer')) === question.correctAnswer) {
            // Do correct answer stuff
            // console.log('correct');

            addCorrectnessDiv('Correct!');
        }
        else {
            // Do incorrect answer stuff
            // console.log('incorrect');

            addCorrectnessDiv('Wrong!');

            removeTime(10);
        }
        
        // Move on to the next question if possible, otherwise end game
        if (question.nextQuestion !== null && questions[question.nextQuestion] !== undefined) {
            populateQuestion(question.nextQuestion);
        } else {
            endQuiz();
        }
    }
}

function endQuiz() {
    // Stop timer
    clearInterval(timerObject);

    timerEl.style.display = 'none';
    quizQuestionDiv.style.display = 'none';
    
    highscoresDiv.style.display = 'block';
    userScore.textContent = timeLeftEl.textContent;
    scoreList.innerHTML = '';

    // Populate score list
    let scoreData = JSON.parse(localStorage.getItem('score-list') || null);

    if (scoreData != null) {
        scoreData.forEach(element => {
            let listItem = document.createElement('li');
            listItem.textContent = element.initials + ' - ' + element.score;
            scoreList.appendChild(listItem);
        });
    }
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

function addCorrectnessDiv(text) {
    let correctnessDiv = document.createElement('div');
    correctnessDiv.innerHTML = '<hr />' + text;
    correctnessIndicator.appendChild(correctnessDiv);

    setTimeout(function() {
        correctnessIndicator.removeChild(correctnessDiv);
    }, 500);
}

function saveScore() {
    let scoreData = JSON.parse(localStorage.getItem('score-list') || null);

    // Variable must be an array
    if (scoreData == null) {
        scoreData = [];
    }

    let score = {
        initials: initialsInput.value,
        score: parseInt(userScore.textContent)
    };

    scoreData.push(score);

    scoreData.sort(compareScores);

    localStorage.setItem('score-list', JSON.stringify(scoreData));

    // Redirect to highscore page
    window.location = 'highscores.html';
}

function sanitizeInput(event) {
    // Only accept up to 3 chars - and make them all caps
    var content = event.target.value.substr(0, 3);
    event.target.value = content.toUpperCase();
}

function compareScores(first, second) {
    if (first.score < second.score) {
        return 1;
    } else if (first.score > second.score) {
        return -1;
    } else {
        return 0;
    }
}