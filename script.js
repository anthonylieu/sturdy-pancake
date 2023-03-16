// Get references to various HTML elements
var startButton = document.getElementById("start-button");
var timerElement = document.getElementById("timer").querySelector("span");
var questionElement = document.getElementById("question");
var questionContainer = document.getElementById("question-container");
var answerButtons = document
  .getElementById("answer-buttons")
  .querySelectorAll(".answer-button");
var scoreElement = document.getElementById("score");

// Set initial values for variables
var score = 0;
var timeLeft = 60;
var currentQuestionIndex = 0;
var timerId;

// Define an array of questions and answers
var questions = [
  {
    question: "Who is traditionally Spider-Man's secret identity?",
    answers: [
      { text: "Stephen Strange", correct: false },
      { text: "Peter Parker", correct: true },
      { text: "Wade Wilson", correct: false },
      { text: "Tony Stark", correct: false },
    ],
  },
  {
    question: "What is the first name of Spider-Man's aunt?",
    answers: [
      { text: "Beverly", correct: false },
      { text: "May", correct: true },
      { text: "Hailey", correct: false },
      { text: "Maria", correct: false },
    ],
  },
];

// Add a click event listener to the Start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  // Hide the Start button and reset the score and question index
  startButton.classList.add("hide");
  score = 0;
  currentQuestionIndex = 0;
  // Show the first question and begin the timer
  setNextQuestion();
  timerId = setInterval(updateTimer, 1000);
  
  // Refresh the page when the Restart button is clicked
  startButton.addEventListener("click", function () {
  location.reload();
  });
  }
  
  // Show the next question
  function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
  }
  
  // Show a given question and its answers
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
  
  // Reset the state of the quiz
  function resetState() {
  for (var i = 0; i < answerButtons.length; i++) {
  answerButtons[i].classList.remove("correct");
  answerButtons[i].classList.remove("wrong");
  answerButtons[i].removeEventListener("click", selectAnswer);
  }
  questionContainer.classList.add("hide");
  }
  
  // Handle the user selecting an answer
// Handle the user selecting an answer
function selectAnswer() {
    var isCorrect = this.classList.contains("correct");
    if (isCorrect) {
      // If the selected answer is correct, set a flag to true
      this.classList.add("correct-answer");
      score++; // increase the score by 1
      scoreElement.textContent = score;
    } else {
      // If the chosen answer is wrong, remove 5 seconds from the timer
      timeLeft -= 5;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerElement.textContent = timeLeft;
      this.classList.add("wrong-answer");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      // If there are more questions, display the next one
      setNextQuestion();
    } else {
      // Otherwise, end the quiz
      endQuiz();
    }
  }
  // Increase the score if the answer is correct
  if (isCorrect) {
    score++;
    scoreElement.textContent = score;
  }
  
  // Update the timer element by the second
  function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
  // If time runs out, end the quiz
  clearInterval(timerId);
  endQuiz();
  }
  }
  
 // Save the user's score to a scoreboard
function saveScore() {
  var initials = prompt("Enter your initials:");
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
  
  // Save the user's initials and score to localStorage
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  // Display the high scores view
  displayHighScores();
  
  // End the quiz
    function endQuiz() {
      // Stop the timer and reset the state of the quiz
      clearInterval(timerId);
      resetState();
    
      // Show the Restart button and remove answer button click event listeners
      startButton.textContent = "Restart";
      startButton.classList.remove("hide");
      for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeEventListener("click", selectAnswer);
      }
    
      // Check if the user's score is higher than the previous high score
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var initials = prompt("Enter your initials:");
      var userHighScore = score;
      for (var i = 0; i < highScores.length; i++) {
        if (highScores[i].initials === initials && highScores[i].score > userHighScore) {
          userHighScore = highScores[i].score;
        }
      }
    
      // Add the user's score to the high scores list and sort it in descending order
      highScores.push({ initials: initials, score: score });
      highScores.sort(function(a, b) {
        return b.score - a.score;
      });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    
      // Display the high score
      questionElement.textContent = "Game Over! " + initials + "'s" + " high score is: " + userHighScore;
      questionContainer.classList.remove("hide");
      document.getElementById("answer-buttons").classList.add("hide");
    
      // Display the high scores
      displayHighScores();
    }
  
    // If the quiz ends, show the final score
    if (currentQuestionIndex >= questions.length || timeLeft === 0) {
      var initials = prompt("Enter your initials:");
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var newScore = { initials: initials, score: score };
      highScores.push(newScore);
      highScores.sort(function(a, b) {
        return b.score - a.score;
      });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      
      var userHighScore = highScores[0].score;
      questionElement.textContent = "Game Over! " + initials + "'s" + " high score is: " + userHighScore;
      questionContainer.classList.remove("hide");
      document.getElementById("answer-buttons").classList.add("hide");
      
      displayHighScores(); // Display high scores
    }
  
  // High scores form submission
  document.getElementById("score-form").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const initials = document.getElementById("initials").value.toUpperCase();
  
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  const newScore = { initials, score };
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  
  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  displayHighScores();
  });
  
  // Display high scores
  function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const highScoresDiv = document.getElementById("highscores");
  highScoresDiv.innerHTML = "";
  highScores.forEach((score) => {
  const newScore = document.createElement("li");
  newScore.textContent = score.initials + ": " + score.score;
  highScoresDiv.appendChild(newScore);
  });
  document.getElementById("score-form").classList.add("hide");
  document.getElementById("highscores-container").classList.remove("hide");
  }
  
  // Add click event listener to view high scores button
  document.getElementById("view-high-scores").addEventListener("click", function () {
  displayHighScores();
  });
  
  // Add click event listener to go back button
  document.getElementById("go-back").addEventListener("click", function () {
  location.reload();
  });
  
  // Add click event listener to clear high scores button
  document.getElementById("clear-high-scores").addEventListener("click", function () {
  localStorage.removeItem("highScores");
  displayHighScores();
  })