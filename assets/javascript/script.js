let timer;
let time = 90;
let currentQuestion = 0;
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
  const ansers = randomAnswerOrder(questions[currentQuestion].choice);
  const tempalte = `
        <h2 class="question">${questions[currentQuestion].wording}</h2>
        <ul class="answers">
        <li class="answer" id="ans1"><button>answer1</button></li>
        <li class="answer" id="ans2"><button>answer2</button></li>
        <li class="answer" id="ans3"><button>answer3</button></li>
        <li class="answer" id="ans4"><button>answer4</button></li>
        </ul>
    `;

  //selector.innerHTML = template
}

function pickQuestion() {
  return Math.floor(Math.random() * questions.length);
}

function randomAnswerOrder(answers) {
  const newAnswers = [];
  answers.forEach((answer) => {
    newAnswers.push(answer);
  });
  console.log(newAnswers);
}
function endQuiz() {}
