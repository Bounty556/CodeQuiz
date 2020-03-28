var questions = [
    {
        descriptionHTML: 'This is a <pre>test</pre> question!',
        answers: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
        correctAnswer: 4,
        nextQuestion: null
    },
]

document.getElementById('start').addEventListener('click', function() {
    startQuiz();
});

function startQuiz() {
    var quizIntroDiv = document.getElementById('quiz-intro');
    var quizQuestionDiv = document.getElementById('quiz-question');

    // Hide quiz intro
    quizIntroDiv.style.display = 'none';

    // Add first question to quiz question div
    populateQuestion(0);

    // Make quiz question div visible
    quizQuestionDiv.style.display = 'block';
}

function populateQuestion(indexNum) {
    
}