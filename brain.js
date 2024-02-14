// 1.  4 fields containing questioons 
// 2.  if que is write highlight it in green color and dont allow any other answer to be pressed 
// 3.  if wrong show the write answer and highlight the wrong one in red color 
// 4.  next btn to navigate from one question to another 

const questions = [
    {
        question: "Which is largest animal in the world?",
        answers : [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Dolphin", correct: false},
            { text: "Carp", correct: false},
        ]
    },
    {
        question: "Which country has largest area?",
        answers : [
            { text: "USA", correct: false},
            { text: "India", correct: false},
            { text: "china", correct: false},
            { text: "Russia", correct: true},
        ]
    },
    {
        question: "How many continents are there?",
        answers : [
            { text: "10", correct: false},
            { text: "8", correct: false},
            { text: "7", correct: true},
            { text: "11", correct: false},
        ]
    },
    {
        question: "which is the Largest Ocean of the world ?",
        answers : [
            { text: "Pacefic Ocean", correct: true},
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian OCean", correct: false},
            { text: "Red Sea", correct: false},
        ]
    }
];


// storing the value of the question answeres and next button 

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0 ;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];     
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function  selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = "flex";
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz()
    }
})

function showscore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "flex";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showscore();
    }
}



startQuiz()