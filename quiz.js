const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score-value");
const timerElement = document.getElementById("time-left");
const container = document.querySelector(".container");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        answer: "Mars"
    },
    // Add more questions here
];

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    timer = setInterval(updateTimer, 1000);

    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => {
            checkAnswer(option);
        });
        optionsElement.appendChild(button);
    });
}

function updateTimer() {
    timeLeft--;
    if (timeLeft >= 0) {
        timerElement.textContent = timeLeft;
    } else {
        clearInterval(timer);
        checkAnswer("");
    }
}

function checkAnswer(answer) {
    clearInterval(timer);
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.answer) {
        score++;
        scoreElement.textContent = score;
        resultElement.innerText = "Correct!";
        resultElement.classList.add("correct");
    } else {
        resultElement.innerText = "Incorrect!";
        resultElement.classList.add("incorrect");
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            resultElement.innerText = "";
            resultElement.classList.remove("correct", "incorrect");
            loadQuestion();
        }, 1000);
    } else {
        setTimeout(() => {
            showResult();
        }, 1000);
    }
}

function showResult() {
    resultElement.innerText = `You scored ${score} out of ${quizData.length}`;
    resultElement.classList.add("final");
    submitButton.style.display = "none";
    clearInterval(timer);
}

submitButton.addEventListener("click", loadQuestion);

loadQuestion();
