// 1.  4 fields containing questioons 
// 2.  if que is write highlight it in green color and dont allow any other answer to be pressed 
// 3.  if wrong show the write answer and highlight the wrong one in red color 
// 4.  next btn to navigate from one question to another 



// array containing question as an objects

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


// to store current index and score values
let currentQuestionIndex = 0;
let score = 0;


//function to start quiz and display first question from array 

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0 ;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];                                 // consist question index number     
    let questionNo = currentQuestionIndex + 1;                                             
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;              // question innertext to the text mention in questions array


    // creating new button element to store answer text from the arrays object values 
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('btn');
        answerButton.appendChild(button);

        //  setting the dataset value
        // dataset is a native property of any HTML element that provides access to set/get all of the custom data attributes on that element.
        // as here we set the custom attribute  "correct" to answer.correct which is true 
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

//  funtion to response on clicking the one of the button ,
//  here if we hit wrong btn the write one will highligh in green and all button will be disabled 

function  selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";   // here again we set the isCoorect custom attribute dataset value to ture
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {         // The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.
        if(button.dataset.correct === "true"){                    // here it is automated that if any button is clicked then the button with the custom attribute correct === true then it will be highlighted with the green color
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = "flex";
}

// This function is made to ensure that the precious content in the answwerButton is not displayed and also that the nextbtn in not displayed
function resetState(){
    nextBtn.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

// made to change the handle the change in questions 

nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz()
    }
})

// to show score 

function showscore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "flex";
}


// change the currentIndex of the questions and handle nextBtn

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showscore();
    }
}



startQuiz()