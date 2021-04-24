let timer;
let time = 90;
let currentQuestion = 0;
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
const clearHighscores = document.querySelector("#clearHighscores");
//questions
const questions = [
  {
    wording: "Question 1",
    choice: ["ans1", "ans2", "ans3", "ans4"],
    answer: "ans1",
  },
  {
    wording: "Question 2",
    choice: ["ans1", "ans2", "ans3", "ans4"],
    answer: "ans1",
  },
  {
    wording: "Question 3",
    choice: ["ans1", "ans2", "ans3", "ans4"],
    answer: "ans1",
  },
  {
    wording: "Question 4",
    choice: ["ans1", "ans2", "ans3", "ans4"],
    answer: "ans1",
  },
];

//pull saved highscores on start
getSavedHighscores();
displayHighscoresList();
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
  let initialsText = initialsInput.value.trim();
  if (initialsText !== null && initialsText !== "") {
    // require initials
    // set quizrunning to false
    quizRunning = false;
    // add to highscores array

    let player = { initials: initialsText, score: currentScore };
    highscores.push(player);
    console.log(highscores);
    sortScores(); // arrange scores form high to low
    saveHighscores();
    getSavedHighscores();
    displayHighscoresList();
    showHide(start, endscreen);
    showHide(highscore, quizGame);
    hide(header);
  } else {
    alert("please enter initials");
  }
});

// clear highscores button
clearHighscores.addEventListener("click", function () {
  localStorage.removeItem("scores");
  getSavedHighscores();
  displayHighscoresList();
  console.log("cleared highscores");
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

  currentQuestions = questions.slice(0, questions.length);
  console.log("current Questions");
  console.log(currentQuestions);
  console.log("question list");
  console.log(questions);
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
    const answers = randomAnswerOrder(currentQuestions[currentQuestion].choice);
    const template = `
          <h2 class="question">${currentQuestions[currentQuestion].wording}</h2>
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
  if (toCheck === currentQuestions[currentQuestion].answer) {
    // answer is true add points to score
    currentScore += pointCorrect;
  } else {
    // lower time
    time -= timerPenelty;
  }
}

function showResults(value) {
  result.classList.remove("hidden");
}
// remove asked questions from the current list of questions
function removeQuestion(index) {
  currentQuestions.splice(index, 1);
  console.log(currentQuestions);
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
// displays the highscore list to the ordered list
function displayHighscoresList() {
  let playerScore;
  let newText = ``;
  let listEntry = ``;
  for (i = 0; i < 5; i++) {
    listEntry = document.querySelector(`#list${i}`);
    if (i < highscores.length) {
      playerScore = highscores[i];

      newText = `${playerScore.initials}  ${playerScore.score}`;
    } else {
      newText = "";
    }
    listEntry.innerHTML = newText;
  }
}
// pull highscores form local storeage
function getSavedHighscores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    highscores = storedScores;
  } else {
    highscores = [];
  }
}
// save scores to local sotreage
function saveHighscores() {
  localStorage.setItem("scores", JSON.stringify(highscores));
}
// sort sores from highest to lowest
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
// style?
