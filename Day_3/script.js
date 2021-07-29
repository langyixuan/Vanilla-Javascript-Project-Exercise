const questions = [
  {
    name: "1.  Which of the following is a server- side JavaScript object ?",
    a_1: "A. Function",
    a_2: "B. File",
    a_3: "C. FileUpload",
    a_4: "D. Date",
    correct: "C"
  },
  {
    name: "2. How does JavaScript store dates in objects of Date type?",
    a_1: "A. The number of days since January 1st, 1900",
    a_2: "B. The number of seconds since January 1st, 1970",
    a_3: "C. The number of milliseconds since January 1st, 1970",
    a_4: "D. The number of picoseconds since January 1st, 1970",
    correct: "C"
  },
  {
    name: "3. Which of the following is not a valid JavaScript variable name?",
    a_1: "A. 2java",
    a_2: "B. _java_and_ java _names",
    a_3: "C. javaandjava",
    a_4: "D. None of the above",
    correct: "A"
  },
  {
    name: "4. What language defines the behavior of a web page?",
    a_1: "A. HTML",
    a_2: "B. CSS",
    a_3: "C. XML",
    a_4: "D. Java Script",
    correct: "D"
  },
  {
    name: "5. What is the alternate name for Javascript?",
    a_1: "A. LimeScript",
    a_2: "B. Both a and d",
    a_3: "C. ECMScript",
    a_4: "D. ECMAScript ",
    correct: "D"
  },
  {
    name: "6. Which of the following is a client-side Java Script object?",
    a_1: "A. File",
    a_2: "B. Function",
    a_3: "C. FileUpload",
    a_4: "D. Time",
    correct: "C"
  },
  {
    name: "7. Which attribute needs to be changed to make elements invisible?",
    a_1: "A. visibilty",
    a_2: "B. visible",
    a_3: "C. invisibility",
    a_4: "D. invisible",
    correct: "A"
  },
  {
    name: "8. What JavaScript is also called client-side JavaScript?",
    a_1: "A. Microsoft",
    a_2: "B. Navigator ",
    a_3: "C. LiveWire",
    a_4: "D. Native",
    correct: "B"
  },
]

const quizText = document.querySelector('.quiz_text');

const a_text = document.querySelector('.a_text');
const b_text = document.querySelector('.b_text');
const c_text = document.querySelector('.c_text');
const d_text = document.querySelector('.d_text');

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const radioEls = document.querySelectorAll(`input[type="radio"]`);
const correctAnswer = document.querySelector('.correct_answer');
const labelEls = document.querySelectorAll('label');

let currentQuiz = 0;

loadQuiz();

function loadQuiz() {
  const currentQuizDate = questions[currentQuiz];

  quizText.innerHTML = currentQuizDate["name"];
  a_text.innerHTML = currentQuizDate["a_1"];
  b_text.innerHTML = currentQuizDate["a_2"];
  c_text.innerHTML = currentQuizDate["a_3"];
  d_text.innerHTML = currentQuizDate["a_4"];
}



nextBtn.addEventListener('click', () => {
  //每次点击跳转到下一题时，清空选中
  radioEls.forEach((radioEl) => {
    radioEl.checked = false;
  })
  correctAnswer.innerHTML = "Check Answer";
  correctAnswer.style.backgroundColor = "#000";

  currentQuiz++;
  if (currentQuiz < questions.length) {
    loadQuiz();
  } else {
    alert("Quiz finished!!");
  }
})

prevBtn.addEventListener('click', () => {
  correctAnswer.innerHTML = "Check Answer";
  correctAnswer.style.backgroundColor = "#000";

  currentQuiz--;
  if (currentQuiz >= 0) {
    loadQuiz();
  } else {
    currentQuiz++;
    alert("This is the first quiz");
  }
})

correctAnswer.addEventListener('click', (e) => {
  e.target.innerHTML = `Correct Answer: ${questions[currentQuiz].correct}`;
  e.target.style.backgroundColor = " rgb(57, 219, 65)";
})