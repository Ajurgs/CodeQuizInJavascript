let timer;
let time = 90;
let currentQuestion = 0;
let askedQuestions = [];
let currentScore = 0;
let pointCorrect = 1;
let timerPenelty = 5;
let currentQuestions = [];
let quizRunning = false;

let highscores = [];

let initialsInput = document.querySelector("#initials");

const quizGame = document.querySelector("#quiz-game");
const header = document.querySelector("#header");
const result = document.querySelector("#result");
const quiz = document.querySelector("#quiz");
const quizQuestion = document.querySelector(".quiz-question");
const start = document.querySelector("#start");
const endscreen = document.querySelector("#endscreen");
const highscore = document.querySelector("#highscore");
const addToHighScoreBtn = document.querySelector("#addToScores");
const startBtn = document.querySelector("#startBtn");
const toStartBtn = document.querySelector("#toStart");
const toHighscoreBtn = document.querySelector("#toHighscore");

//questions
const questions = [
  {
    wording: "what is your favorite color",
    choice: ["red", "blue", "yellow", "green"],
    answer: "green",
  },
  {
    wording: "what is your favorite animal",
    choice: ["red", "blue", "yellow", "green"],
    answer: "blue",
  },
  {
    wording: "what is your favorite tree",
    choice: ["red", "blue", "yellow", "green"],
    answer: "yellow",
  },
  {
    wording: "what is your favorite ocean",
    choice: ["red", "blue", "yellow", "green"],
    answer: "red",
  },
];

//pull saved highscores on start

//start button function
startBtn.addEventListener("click", function () {
  startTimer();
  startQuiz();
});

// show highscore button
toHighscoreBtn.addEventListener("click", function () {
  if (!quizRunning) {
    showHide(highscore, header);
    hide(quizGame);
  }
});

// back to the start screen
toStartBtn.addEventListener("click", function () {
  show(header);
  showHide(quizGame, highscore);
});

// add to high scores button
addToHighScoreBtn.addEventListener("click", function () {
  // set quizrunning to false
  quizRunning = false;
  // add to highscores array
  let initialsText = initialsInput.value.trim();
  let player = { initials: initialsText, score: currentScore };
  highscores.push(player);
  console.log(highscores);
  sortScores();
  saveHighscores();
  getSavedHighscores();
  displayHighscoresList();
  showHide(start, endscreen);
  showHide(highscore, quizGame);
  hide(header);
});

// click on answer button
quizQuestion.addEventListener("click", function (event) {
  event.preventDefault;
  if (event.target.className.indexOf("answer")) {
    // answer handler goes here
    // check if correct answer
    checkAnswer(event.target.innerHTML);
    // remove the asked question form the curent questions list
    removeQuestion(currentQuestion);
    // generate the next question
    generateQuestion();
  }
});

// function to start quiz
function startQuiz() {
  // set quiz running to true
  quizRunning = true;
  // show the quiz hide the start menu
  showHide(quiz, start);
  // set currentQuestions array to the full array of questions
  currentQuestions = questions;
  //generateQUestion
  generateQuestion();
}

function startTimer() {
  timer = setInterval(function () {
    //decrement time
    time--;
    //show the time
    document.querySelector("#Time").textContent = time;
    //check if we should end the game
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}
// generate the question
function generateQuestion() {
  if (currentQuestions.length > 0) {
    currentQuestion = pickQuestion();
    const answers = randomAnswerOrder(questions[currentQuestion].choice);
    const template = `
          <h2 class="question">${questions[currentQuestion].wording}</h2>
          <ul class="answers">
          <li class="answer" id="ans1"><button>${answers[0]}</button></li>
          <li class="answer" id="ans2"><button>${answers[1]}</button></li>
          <li class="answer" id="ans3"><button>${answers[2]}</button></li>
          <li class="answer" id="ans4"><button>${answers[3]}</button></li>
          </ul>
      `;
    document.querySelector("#quiz-question").innerHTML = template;
  } else {
    endQuiz();
  }
}

// randomly pick a question to ask and make sure is has not been asked before
function pickQuestion() {
  const test = Math.floor(Math.random() * currentQuestions.length); // randomly choose from the remaining questions
  return test;
}

// set the question answers to a random ordered array
function randomAnswerOrder(answers) {
  const newAnswers = [];
  answers.forEach((answer) => {
    newAnswers.push(answer);
  });
  shuffleArray(newAnswers, 10);
  return newAnswers;
}

// sort of randomizes the order of an array
function shuffleArray(arr, times) {
  if (times > 0) {
    const toSwap = Math.floor(Math.random() * arr.length);
    const temp = arr[0];
    arr[0] = arr[toSwap];
    arr[toSwap] = temp;
    times -= 1;
    shuffleArray(arr, times);
  }
}

// check to see if the answer is correct
function checkAnswer(toCheck) {
  if (toCheck === currentQuestions[currentQuestion]) {
    // answer is true;
    currentScore += pointCorrect;
  } else {
    time -= timerPenelty;
  }
}

function showResults(value) {
  result.classList.remove("hidden");
}

function removeQuestion(index) {
  currentQuestions.splice(index, 1);
}
function endQuiz() {
  console.log("quiz over");

  clearInterval(timer);
  //set timer to 0
  document.querySelector("#Time").textContent = time;
  showHide(endscreen, quiz);
  // display score on the page
  document.querySelector("#score").textContent = currentScore;
}

// shows and hides input containers
function showHide(show, hide) {
  //hide  container
  hide.classList.add("hidden");
  //show  container
  show.classList.remove("hidden");
}
// call to show container
function show(show) {
  show.classList.remove("hidden");
}
// call to hide container
function hide(hide) {
  hide.classList.add("hidden");
}
function displayHighscoresList() {
  let playerScore;
  let newText = ``;

  if (highscores.length >= 1) {
    let range = Math.min(highscores.length, 5);
    for (i = 0; i < range; i++) {
      playerScore = highscores[i];
      let listEntry = document.querySelector(`#list${i}`);
      newText = `${playerScore.initials}  ${playerScore.score}`;

      listEntry.innerHTML = newText;
      show(listEntry);
    }
  }
}

function getSavedHighscores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    highscores = storedScores;
  }
}
// save scores
function saveHighscores() {
  localStorage.setItem("scores", JSON.stringify(highscores));
}

function sortScores() {
  if (highscores.length <= 1) {
    // if one or fewer elements in array
    return;
  } else {
    highscores.sort(function (a, b) {
      return a.score - b.score;
    });
    highscores.reverse();
  }
}
//todo
// end screen functonality
//  save initials
//  save btn goes to leader board
// add leader board
//  leaderboard has button to start menu
//  display leaderboard
// leaderboard button
//  brings up leaderboard if not in a quiz
// style?
