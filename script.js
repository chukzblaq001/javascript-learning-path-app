
"use strict";

// =====================================
// JS PATH - JAVASCRIPT LEARNING APP
// =====================================

// 1. LESSON DATA
const lessons = [
    {
        title: "Variables and Data Types",
        notes: "Variables store information. Use let for changeable values and const for values that should not be reassigned.",
        example: 'let name = "Ada";\nlet age = 20;\nconst isStudent = true;\nconsole.log(name, age, isStudent);'
    },
    {
        title: "Operators",
        notes: "Operators perform calculations and comparisons.",
        example: "let a = 10;\nlet b = 5;\nconsole.log(a + b);\nconsole.log(a === b);"
    },
    {
        title: "Conditional Statements",
        notes: "if and else allow programs to make decisions.",
        example: 'let score = 75;\nif (score >= 50) {\n    console.log("Passed");\n} else {\n    console.log("Failed");\n}'
    },
    {
        title: "Loops",
        notes: "Loops repeat a block of code.",
        example: "for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}"
    },
    {
        title: "Functions",
        notes: "Functions are reusable blocks of code.",
        example: 'function greet(name) {\n    return "Hello, " + name;\n}\nconsole.log(greet("Ada"));'
    },
    {
        title: "Arrays",
        notes: "Arrays store multiple values in one variable.",
        example: 'const fruits = ["Apple", "Mango", "Orange"];\nconsole.log(fruits[0]);\nfruits.push("Banana");'
    },
    {
        title: "Objects",
        notes: "Objects store information in key-value pairs.",
        example: 'const student = {\n    name: "Ada",\n    age: 18\n};\nconsole.log(student.name);'
    },
    {
        title: "DOM and Events",
        notes: "The DOM allows JavaScript to interact with HTML elements.",
        example: 'document.querySelector("h1").textContent = "Hello JavaScript!";'
    },
    {
        title: "Forms and Validation",
        notes: "Validation checks whether user input meets requirements.",
        example: 'const email = "student@example.com";\nif (email.includes("@")) {\n    console.log("Email looks valid");\n}'
    },
    {
        title: "Local Storage",
        notes: "Local storage saves text data in your browser.",
        example: 'localStorage.setItem("username", "Ada");\nconsole.log(localStorage.getItem("username"));'
    },
    {
        title: "JSON and Error Handling",
        notes: "JSON represents data as text. try...catch handles errors.",
        example: 'const data = JSON.stringify({ name: "Ada" });\ntry {\n    console.log(JSON.parse(data));\n} catch (error) {\n    console.log("Invalid data");\n}'
    },
    {
        title: "Promises and Async/Await",
        notes: "Promises represent results that may become available later.",
        example: 'async function greet() {\n    return "Hello!";\n}\ngreet().then(console.log);'
    },
    {
        title: "Fetch API",
        notes: "fetch() requests information from a server.",
        example: 'fetch("https://jsonplaceholder.typicode.com/todos/1")\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.log("Request failed", error));'
    },
    {
        title: "Modules and GitHub",
        notes: "Modules allow JavaScript files to share code. GitHub helps store and manage projects.",
        example: '// In math.js:\nexport const add = (a, b) => a + b;\n\n// In another module:\nimport { add } from "./math.js";'
    }
];

// 2. GET HTML ELEMENTS
const homeSection = document.getElementById("home");
const lessonsSection = document.getElementById("lessons");
const quizSection = document.getElementById("quiz");

const lessonList = document.getElementById("lesson-list");
const lessonContent = document.getElementById("lesson-content");
const progressElement = document.getElementById("progress");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("quiz-result");

// 3. NAVIGATION
function hideSections() {
    homeSection.classList.add("hidden");
    lessonsSection.classList.add("hidden");
    quizSection.classList.add("hidden");
}

function showHome() {
    hideSections();
    homeSection.classList.remove("hidden");
    updateProgress();
}

function showLessons() {
    hideSections();
    lessonsSection.classList.remove("hidden");
    displayLessons();
}

function showQuiz() {
    hideSections();
    quizSection.classList.remove("hidden");
    showQuestion();
}

// 4. DISPLAY LESSONS
function displayLessons() {
    lessonList.innerHTML = "";

    lessons.forEach(function (lesson, index) {
        const button = document.createElement("button");

        button.className = "lesson-button";
        button.textContent = (index + 1) + ". " + lesson.title;

        button.addEventListener("click", function () {
            openLesson(index);
        });

        lessonList.appendChild(button);
    });
}

// 5. OPEN A LESSON
function openLesson(index) {
    const lesson = lessons[index];

    lessonContent.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = lesson.title;

    const notes = document.createElement("p");
    notes.textContent = lesson.notes;

    const exampleTitle = document.createElement("h3");
    exampleTitle.textContent = "Code Example";

    const code = document.createElement("pre");
    code.textContent = lesson.example;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Completed";

    const message = document.createElement("p");

    completeButton.addEventListener("click", function () {
        markCompleted(index);
        message.textContent = "Lesson completed successfully!";
    });

    lessonContent.append(
        title,
        notes,
        exampleTitle,
        code,
        completeButton,
        message
    );
}

// 6. SAVE COMPLETED LESSONS
function getCompletedLessons() {
    try {
        const saved = localStorage.getItem("completedLessons");
        const completed = saved ? JSON.parse(saved) : [];

        return Array.isArray(completed) ? completed : [];
    } catch (error) {
        console.error("Could not load lesson progress:", error);
        return [];
    }
}

function markCompleted(index) {
    const completed = getCompletedLessons();

    if (!completed.includes(index)) {
        completed.push(index);

        try {
            localStorage.setItem(
                "completedLessons",
                JSON.stringify(completed)
            );
        } catch (error) {
            console.error("Could not save lesson progress:", error);
        }
    }

    updateProgress();
}

function updateProgress() {
    const completed = getCompletedLessons();

    progressElement.textContent =
        "Lessons completed: " +
        completed.length +
        " / " +
        lessons.length;
}

// 7. QUIZ QUESTIONS
const questions = [
    {
        question: "Which keyword declares a variable that can be reassigned?",
        answers: ["const", "let", "fixed"],
        correct: "let"
    },
    {
        question: "Which operator checks strict equality?",
        answers: ["=", "===", "!="],
        correct: "==="
    },
    {
        question: "Which method adds an item to the end of an array?",
        answers: ["push()", "pop()", "shift()"],
        correct: "push()"
    },
    {
        question: "Which statement makes a decision?",
        answers: ["if", "repeat", "print"],
        correct: "if"
    },
    {
        question: "Which feature saves data in the browser?",
        answers: ["localStorage", "console.log", "alert"],
        correct: "localStorage"
    }
];

// 8. QUIZ VARIABLES
let currentQuestion = 0;
let score = 0;
let answered = false;

// 9. DISPLAY A QUESTION
function showQuestion() {
    answersElement.innerHTML = "";
    resultElement.textContent = "";
    answered = false;

    if (currentQuestion >= questions.length) {
        questionElement.textContent =
            "Quiz finished! Your score is " +
            score +
            " out of " +
            questions.length +
            ".";

        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.addEventListener("click", restartQuiz);

        answersElement.appendChild(restartButton);
        return;
    }

    const item = questions[currentQuestion];

    questionElement.textContent =
        "Question " +
        (currentQuestion + 1) +
        ": " +
        item.question;

    item.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function () {
            checkAnswer(answer, button);
        });

        answersElement.appendChild(button);
    });
}

// 10. CHECK THE ANSWER
function checkAnswer(answer, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    const correct = questions[currentQuestion].correct;

    if (answer === correct) {
        score++;
        resultElement.textContent = "Correct! Well done.";
    } else {
        resultElement.textContent =
            "Incorrect. The correct answer is " + correct + ".";
    }

    selectedButton.disabled = true;
}

// 11. NEXT QUESTION
function nextQuestion() {
    if (currentQuestion >= questions.length) {
        resultElement.textContent =
            "Click Restart Quiz to try again.";
        return;
    }

    if (!answered) {
        resultElement.textContent =
            "Please select an answer first.";
        return;
    }

    currentQuestion++;
    showQuestion();
}

// 12. RESTART THE QUIZ
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
}

// 13. START THE APP
showHome();
