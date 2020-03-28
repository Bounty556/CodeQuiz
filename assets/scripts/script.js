var quizIntroDiv = document.getElementById('quiz-intro');
var quizQuestionDiv = document.getElementById('quiz-question');

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

    // Add first question to quiz question div
    populateQuestion(0);

    // Make quiz question div visible
    quizQuestionDiv.style.display = 'block';
}

function populateQuestion(indexNum) {
    var question = questions[indexNum];

    // Clear last question
    quizQuestionDiv.children[0].innerHTML = '';

    // Populate question description
    var headerElement = document.createElement('h1');
    headerElement.innerHTML =  question.descriptionHTML;

    quizQuestionDiv.children[0].appendChild(headerElement);

    // Set up div for event delegation for quiz buttons
    var answersDiv = document.createElement('div');

    answersDiv.addEventListener('click', function(element) {
        var target = element.target;

        if (target.tagName.toLowerCase() === 'button') {
            if (parseInt(target.getAttribute('data-answer')) === question.correctAnswer) {
                // Do correct answer stuff
                console.log('correct');
            }
            else {
                // Do incorrect answer stuff
                console.log('incorrect');
            }
            
            // Move on to the next question if possible

            // Otherwise go to high score screen
        }
    });
    quizQuestionDiv.children[0].appendChild(answersDiv);

    // Add answer buttons
    for (var i = 0; i < question.answers.length; i++) {
        var button = document.createElement('button');
        button.className = 'btn btn-purple btn-answer';
        button.setAttribute('data-answer', '' + i);
        button.textContent = '' + (i + 1) + ': ' + question.answers[i];

        answersDiv.appendChild(button);
    }
}