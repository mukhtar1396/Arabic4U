const question = document.getElementById("question");
const audio = document.getElementById("answer-audio");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const playButton = document.getElementById("button-play");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ذ",
        choice2: "ق",
        choice3: "ت",
        choice4: "ك",
        answer: 3,
        source: "sounds/taa.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "س",
        choice2: "لا",
        choice3: "ي",
        choice4: "ل",
        answer: 4,
        source: "sounds/laam.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ط",
        choice2: "ث",
        choice3: "غ",
        choice4: "م",
        answer: 3,
        source: "sounds/ghayn.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ب",
        choice2: "ض",
        choice3: "ء",
        choice4: "ن",
        answer: 1,
        source: "sounds/baa.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ش",
        choice2: "ا",
        choice3: "ع",
        choice4: "و",
        answer: 4,
        source: "sounds/waaw.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ر",
        choice2: "ه",
        choice3: "ف",
        choice4: "خ",
        answer: 2,
        source: "sounds/haa-2.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ج",
        choice2: "ط",
        choice3: "س",
        choice4: "ب",
        answer: 3,
        source: "sounds/seen.wav"


    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ق",
        choice2: "د",
        choice3: "ز",
        choice4: "و",
        answer: 2,
        source: "sounds/daal.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ظ",
        choice2: "ل",
        choice3: "ف",
        choice4: "لا",
        answer: 1,
        source: "sounds/dhaa.wav"

    },

    {
        question: "Press play, listen carefully and choose the correct letter.",
        choice1: "ص",
        choice2: "ي",
        choice3: "ح",
        choice4: "ء",
        answer: 4,
        source: "sounds/hamzah.wav"

    }


   
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign('end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
  
  playButton.addEventListener("click", e => {
    audio.src = currentQuestion.source;
    audio.play();

  });


};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
