var startButton = document.getElementById("start-button");
var timerElement = document.getElementById("timer").querySelector("span");
var questionElement = document.getElementById("question");
var questionContainer = document.getElementById("question-container");
var answerButtons = document.getElementById("answer-buttons").querySelectorAll(".answer-button");
var scoreElement = document.getElementById("score");

var score = 0;
var timeLeft = 60; 
var currentQuestionIndex = 0;

var questions = [  {  question: "Who is traditionally Spider-Man's secret identity?",
answers: [
  { text: "Stephen Strange", correct: false },
  { text: "Peter Parker", correct: true },
  { text: "Wade Wilson", correct: false },
  { text: "Tony Stark", correct: false }    ]
  },
  {
    question: "What is the first name of Spider Man's aunt?",
    answers: [
      { text: "Beverly", correct: false },
      { text: "May", correct: true },
      { text: "Hailey", correct: false },
      { text: "Maria", correct: false }
    ]
  }
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hide");
  score = 0;
  currentQuestionIndex = 0;
  setNextQuestion();
  timerId = setInterval(updateTimer, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  questionContainer.classList.remove("hide");
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = question.answers[i].text;
    if (question.answers[i].correct) {
      answerButtons[i].classList.add("correct");
    } else {
      answerButtons[i].classList.add("wrong");
    }
    answerButtons[i].addEventListener("click", selectAnswer);
  }
}

function resetState() {
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].classList.remove("correct");
    answerButtons[i].classList.remove("wrong");
    answerButtons[i].removeEventListener("click", selectAnswer);
  }
  questionContainer.classList.add("hide");
}

function selectAnswer() {
  if (this.classList.contains("correct")) {
    score++;
    scoreElement.textContent = score;
  } else {
    timeLeft -= 5; 
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    endQuiz();
  }
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerId);
    endQuiz();
  }
}

function saveScore() {
    var initials = prompt("Enter your initials:");
    var scoreBoard = document.getElementById("scoreboard");
    var newScore = document.createElement("div");
    newScore.textContent = initials + ": " + score;
    scoreBoard.appendChild(newScore);
  }
  
  function endQuiz() {
    clearInterval(timerId);
    resetState();
    startButton.textContent = "Restart";
    startButton.classList.remove("hide");
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].removeEventListener("click", selectAnswer);
    }
  
    if (currentQuestionIndex >= questions.length || timeLeft === 0) {
      questionElement.textContent = "Game Over!";
      questionContainer.classList.remove("hide");
      document.getElementById("answer-buttons").classList.add("hide");
    }
  }