const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web apps?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None"],
        answer: "Hyper Text Markup Language"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);

    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const options = document.getElementById("options");
    options.innerHTML = "";
    q.options.forEach(opt => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="radio" name="option" value="${opt}"> ${opt}</label>`;
        options.appendChild(li);
    });
}

function nextQuestion() {
    clearInterval(timer);
    const selected = document.querySelector("input[name='option']:checked");
    if (selected && selected.value === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = score + "/" + questions.length;
}

window.onload = loadQuestion;
