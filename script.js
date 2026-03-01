const questions = [
{
question: "Which language runs in browser?",
answers: [
{ text: "C++", correct: false },
{ text: "JavaScript", correct: true },
{ text: "Python", correct: false },
{ text: "Java", correct: false }
]
},
{
question: "CSS stands for?",
answers: [
{ text: "Cascading Style Sheets", correct: true },
{ text: "Creative Style System", correct: false },
{ text: "Computer Styling", correct: false },
{ text: "Colorful Sheets", correct: false }
]
},
{
question: "Which company developed Java?",
answers: [
{ text: "Microsoft", correct: false },
{ text: "Sun Microsystems", correct: true },
{ text: "Google", correct: false },
{ text: "Apple", correct: false }
]
},
{
question: "Which is not a programming language?",
answers: [
{ text: "HTML", correct: true },
{ text: "Python", correct: false },
{ text: "Java", correct: false },
{ text: "C++", correct: false }
]
},
{
question: "Which symbol is used for comments in JS?",
answers: [
{ text: "//", correct: true },
{ text: "##", correct: false },
{ text: "<!-- -->", correct: false },
{ text: "**", correct: false }
]
},
{
question: "Which method converts JSON to object?",
answers: [
{ text: "JSON.parse()", correct: true },
{ text: "JSON.stringify()", correct: false },
{ text: "JSON.convert()", correct: false },
{ text: "JSON.toObject()", correct: false }
]
},
{
question: "Which CSS property changes text color?",
answers: [
{ text: "background-color", correct: false },
{ text: "color", correct: true },
{ text: "font-style", correct: false },
{ text: "text-align", correct: false }
]
},
{
question: "Which keyword declares variable in JS?",
answers: [
{ text: "var", correct: true },
{ text: "int", correct: false },
{ text: "string", correct: false },
{ text: "define", correct: false }
]
},
{
question: "Which framework is used for frontend?",
answers: [
{ text: "React", correct: true },
{ text: "Django", correct: false },
{ text: "Flask", correct: false },
{ text: "Laravel", correct: false }
]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const highScoreElement = document.getElementById("high-score");
const themeToggle = document.getElementById("theme-toggle");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

function startQuiz() {
shuffle(questions);
currentQuestionIndex = 0;
score = 0;
loadHighScore();
showQuestion();
}

function showQuestion() {
resetState();
startTimer();

let currentQuestion = questions[currentQuestionIndex];
questionElement.innerHTML = currentQuestion.question;

progressText.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
progressFill.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

currentQuestion.answers.forEach(answer => {
const button = document.createElement("button");
button.innerHTML = answer.text;
button.classList.add("btn");

if (answer.correct) {
button.dataset.correct = "true";
}

button.addEventListener("click", selectAnswer);
answerButtons.appendChild(button);
});
}

function resetState() {
clearInterval(timer);
timeLeft = 15;
timerElement.innerHTML = "⏳ " + timeLeft;
nextButton.style.display = "none";
answerButtons.innerHTML = "";
}

function startTimer() {
timer = setInterval(() => {
timeLeft--;
timerElement.innerHTML = "⏳ " + timeLeft;
if (timeLeft <= 0) {
clearInterval(timer);
nextButton.style.display = "block";
}
}, 1000);
}

function selectAnswer(e) {
clearInterval(timer);

const selectedBtn = e.target;
const correct = selectedBtn.dataset.correct === "true";

if (correct) {
score++;
selectedBtn.classList.add("correct");
} else {
selectedBtn.classList.add("wrong");
}

Array.from(answerButtons.children).forEach(button => {
if (button.dataset.correct === "true") {
button.classList.add("correct");
}
button.disabled = true;
});

nextButton.style.display = "block";
}

function showScore() {
resetState();
questionElement.innerHTML = `Your Score: ${score}/${questions.length}`;
saveHighScore();
nextButton.innerHTML = "Restart";
nextButton.style.display = "block";
}

function handleNext() {
currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
showQuestion();
} else {
showScore();
}
}

nextButton.addEventListener("click", () => {
if (currentQuestionIndex < questions.length) {
handleNext();
} else {
nextButton.innerHTML = "Next";
startQuiz();
}
});

function saveHighScore() {
let highScore = localStorage.getItem("highScore") || 0;
if (score > highScore) {
localStorage.setItem("highScore", score);
}
loadHighScore();
}

function loadHighScore() {
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerHTML = "🏆 High Score: " + highScore;
}

themeToggle.addEventListener("click", () => {
document.body.classList.toggle("dark");
});

startQuiz();