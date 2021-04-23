let timer;
let time = 90;
let currentQuestion = 0;
let askedQuestions = [];
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

//start button function
document.querySelector("#startBtn").addEventListener("click", function () {
  startTimer();
  startQuiz();
});

//answer click function

//input form submit
// make
document
  .querySelector(".quiz-question")
  .addEventListener("click", function (event) {
    if (event.target.className.indexOf("answer")) {
      //answer hndler goes here
      console.log(event.target.innerHTML);
    }
  });

// function to start quiz
function startQuiz() {
  //hide start screen
  document.querySelector("#start").classList.add("hidden");
  //show quiz question container
  document.querySelector("#quiz").classList.remove("hidden");
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
  currentQuestion = pickQuestion();
  const answers = randomAnswerOrder(questions[currentQuestion].choice);
  console.log(answers);
  const template = `
        <h2 class="question">${questions[currentQuestion].wording}</h2>
        <ul class="answers">
        <li class="answer" id="ans1"><button>${answers[0]}</button></li>
        <li class="answer" id="ans2"><button>${answers[1]}</button></li>
        <li class="answer" id="ans3"><button>${answers[2]}</button></li>
        <li class="answer" id="ans4"><button>${answers[3]}</button></li>
        </ul>
    `;

  console.log(template);
  document.querySelector("#quiz-question").innerHTML = template;
}

// randomly pick a question to ask and make sure is has not been asked before
function pickQuestion() {
  const test = Math.floor(Math.random() * questions.length);
  //   while (true) {
  //     if (askedQuestions.includes(test)) {
  //       test = Math.floor(Math.random() * questions.length);
  //     }
  //     if (askedQuestions.length === questions.length) {
  //       break;
  //     }
  //   }
  return test;
}

// set the question answers to a random ordered array
function randomAnswerOrder(answers) {
  const newAnswers = [];
  answers.forEach((answer) => {
    newAnswers.push(answer);
  });
  console.log(newAnswers);
  shuffleArray(newAnswers, 10);
  console.log(newAnswers);
  return newAnswers;
}

// randomize the order of an array
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

function endQuiz() {}
