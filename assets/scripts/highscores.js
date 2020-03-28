var scoreList = document.getElementById('score-list');
var backButton = document.getElementById('return');
var clearButton = document.getElementById('clear');

loadScores();

backButton.addEventListener('click', function() {
    window.location = 'index.html';
});

clearButton.addEventListener('click', function() {
    localStorage.setItem('score-list', null);
    loadScores();
});

function loadScores() {
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