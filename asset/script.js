const quizQuestions = [{
        question: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        question: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];
const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
//const resultsContainer = document.getElementById("results-container");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const quizScore = document.getElementById("quiz-score");
const completedContainer = document.getElementById("completed-container");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name");
const answerState = document.getElementById("answer-state");
const show = document.getElementById("show");


let currentQuestion = 0;
let score = 0;
let finalscore = 0;
// hide the question container and results container
questionContainer.style.display = "none";


// hide the completed container initially
completedContainer.style.display = "none";

// function to start the quiz
function startQuiz() {
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    showQuestion();
}

// function to show the current question
function showQuestion() {
    // get the current question from the quizQuestions array
    const question = quizQuestions[currentQuestion];

    // display the question text
    questionText.textContent = question.question;

    // create the answer options and add them to the answerOptions div
    answerOptions.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        answerOptions.appendChild(label);
    }
}



// function to show the completed page
function showCompletedPage(score) {
    questionContainer.style.display = "none";
    resultsContainer.style.display = "none";
    completedContainer.style.display = "block";
    quizScore.textContent = `You got ${score} out of ${quizQuestions.length} questions correct!`;
}

// function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const name = nameInput.value;
    // Do something with the user's name and score
    console.log("Name:", name);
    console.log("Score:", score);
    // You can also send the data to a server or perform any other desired action
}





// function to check the answer and move to the next question
function checkAnswer() {
    const selectedAnswer = document.querySelector("input[name='answer']:checked").value;
    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
        score++;
        answerState.textContent = "Correct!";
        setTimeout(() => {
            answerState.textContent = "";
        }, 1000);
    } else {
        timer -= 10;
        answerState.textContent = "Incorrect!";
        setTimeout(() => {
            answerState.textContent = "";
        }, 1000);
    }
    setTimeout(() => {
        answerState.textContent = "";
        currentQuestion++;
        if (currentQuestion >= quizQuestions.length) {

            questionContainer.style.display = "none";
            completedContainer.style.display = "block";
            quizScore.textContent = `You got ${score} out of ${quizQuestions.length} questions correct!`;

            showCompletedPage(score);

        } else {
            // move to the next question
            showQuestion();
        }
    }, 1000);
}


const timerEl = document.getElementById("timer");
let timer = 50; // set the default timer value to 50


function startTimer() {
    const intervalId = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerEl.textContent = timer;
            console.log(`Timer: ${timer}`); // update the timer element
        } else {
            clearInterval(intervalId); // stop the timer

            questionContainer.style.display = "none";
            completedContainer.style.display = "block";
            quizScore.textContent = `You got ${score} out of ${quizQuestions.length} questions correct!`;

            showCompletedPage(score); // display the completed page
        }
    }, 1000); // decrement the timer by 1 every second
}

startBtn.addEventListener("click", startTimer); // start the timer when the user clicks on the start quiz button

// add event listener to the start button
startBtn.addEventListener("click", startQuiz);

// add event listener to the next button
nextBtn.addEventListener("click", checkAnswer);

// add event listener to the form submission
nameForm.addEventListener("submit", handleSubmit);


startBtn.addEventListener("click", function() {
    startBtn.dispatchEvent(new Event("mouseover"));
});





function showLeaderboard() {
    // get the leaderboard data from local storage or use an empty array if it doesn't exist
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // get the leaderboard container element and clear its contents
    const leaderboardContainer = document.querySelector("#leaderboard-container");
    leaderboardContainer.innerHTML = "";

    // create a heading for the leaderboard
    const heading = document.createElement("h2");
    heading.textContent = "Leaderboard";
    leaderboardContainer.appendChild(heading);

    // create an ordered list element for the leaderboard
    const ol = document.createElement("ol");
    leaderboardContainer.appendChild(ol);

    // loop through the leaderboard data and create a list item for each user
    leaderboard.forEach((scoreData) => {
        const li = document.createElement("li");
        li.textContent = `${scoreData.name} - ${scoreData.score}`;
        ol.appendChild(li);
    });

    // create a reset button for the quiz
    const resetButton = document.createElement("reset-button");
    resetButton.textContent = "Reset Quiz";
    resetButton.addEventListener("click", function() {
        // reset the leaderboard data in local storage
        localStorage.removeItem("leaderboard");

        // reload the page to restart the quiz
        window.location.reload();
    });

    // add the reset button to the leaderboard container
    leaderboardContainer.appendChild(resetButton);
}


show.addEventListener("click", resetQuiz);

function resetQuiz() {
    // reset all variables and state
    currentQuestion = 0;
    score = 0;
    timer = 50;
    //answerState.textContent = "";
    startContainer.style.display = "block";
    questionContainer.style.display = "none";


    // hide the completed container initially
    completedContainer.style.display = "none";

    // hide the leaderboard and show the quiz question container
    leaderboardContainer.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);

    // reset the form inputs and remove the quiz completed message
    //form.reset();
    //completedContainer.style.display = "none";

    // start the quiz from the beginning
    //showQuestion();
}