const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        answer: 1
    },
    {
        question: "What is the color of the sky?",
        options: ["Green", "Blue", "Red", "Yellow"],
        answer: 1
    },
    {
        question: "What is the smallest continent?",
        options: ["Asia", "Australia", "Europe", "Antarctica"],
        answer: 1
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "What is the boiling point of water?",
        options: ["100°C", "90°C", "80°C", "120°C"],
        answer: 0
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        answer: 2
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Pepper"],
        answer: 1
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Tiger", "Elephant", "Lion", "Cheetah"],
        answer: 2
    },
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: 2
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: 2
    },
    {
        question: "What is the currency of the United States?",
        options: ["Dollar", "Euro", "Yen", "Pound"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('option0').innerText = currentQuestion.options[0];
    document.getElementById('option1').innerText = currentQuestion.options[1];
    document.getElementById('option2').innerText = currentQuestion.options[2];
    document.getElementById('option3').innerText = currentQuestion.options[3];
    document.getElementById('result').innerText = '';
    document.getElementById('nextButton').style.display = 'none';
}

function selectOption(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.answer) {
        score++;
        document.getElementById('result').innerText = "Correct!";
    } else {
        document.getElementById('result').innerText = "Wrong!";
    }
    document.getElementById('nextButton').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Store the score in local storage
        storeScore(score);
        
        // Display the final score and leaderboard
        document.querySelector('.quiz-container').innerHTML = `
            <h1>Quiz Finished!</h1>
            <p>Your score: ${score} out of ${questions.length}</p>
            <div id="scoreBoard"></div>
        `;
        
        // Display the sorted scores
        displayScores();
    }
}

// Function to store the score in local storage
function storeScore(score) {
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.push(score);
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

// Function to retrieve and sort scores
function getSortedScores() {
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.sort((a, b) => b - a); // Sort scores in descending order
    return scores;
}

// Function to display sorted scores
function displayScores() {
    const sortedScores = getSortedScores();
    const scoreList = sortedScores.map((score, index) => `<li>${index + 1}. ${score}</li>`).join('');
    document.getElementById('scoreBoard').innerHTML = `<h2>Leaderboard</h2><ul>${scoreList}</ul>`;
}

window.onload = loadQuestion;