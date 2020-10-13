var currentQuestion = 0;
var score = 0;
var startTime = new Date().getTime();
var answers = [];
var questions = [
	{
	"question": "What country does this flag represent?",
	"a": "United States",
	"b": "Canada",
	"c": "Germany",
	"d": "England",
	"image":"images/america.jpg",
	"answer": "a"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Canada",
	"b": "Romania",
	"c": "England",
	"d": "New Zealand",
	"image":"images/england.jpg",
	"answer": "c"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Indonesia",
	"b": "Thailand",
	"c": "Mexico",
	"d": "Monaco",
	"image":"images/mexico.jpg",
	"answer": "c"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Turkey",
	"b": "France",
	"c": "Portugal",
	"d": "Spain",
	"image":"images/spain.jpg",
	"answer": "d"
	},
	{
	"question": "What country does this flag represent?",
	"a": "France",
	"b": "Italy",
	"c": "Switzerland",
	"d": "Canada",
	"image":"images/france.jpg",
	"answer": "a"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Slovakia",
	"b": "Russia",
	"c": "Ukraine",
	"d": "Poland",
	"image":"images/russia.jpg",
	"answer": "b"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Scotland",
	"b": "Sweeden",
	"c": "Norway",
	"d": "Greenland",
	"image":"images/sweeden.jpg",
	"answer": "b"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Veitnam",
	"b": "India",
	"c": "Japan",
	"d": "China",
	"image":"images/china.jpg",
	"answer": "d"
	},
	{
	"question": "What country does this flag represent?",
	"a": "India",
	"b": "Indonesia",
	"c": "Pakistan",
	"d": "China",
	"image":"images/india.jpg",
	"answer": "a"
	},
	{
	"question": "What country does this flag represent?",
	"a": "Afghanistan",
	"b": "Bolivia",
	"c": "Ghana",
	"d": "Nigeria",
	"image":"images/ghana.jpg",
	"answer": "c"
	},
   
];

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js');
}

// Runs when body is loaded
function initialize() {
	document.getElementById("numQuestion").innerHTML = "Q. " + currentQuestion + "/" + questions.length;
	loadQuestion();
}

function nextQuestion() {
	if ((currentQuestion + 2) === (questions.length)) {
		document.getElementById("next").innerHTML = "Submit";
	} else if ((currentQuestion + 1) === questions.length) {
		evaluate();
		return;
	}
	
	currentQuestion++;
	loadQuestion();
}

function previousQuestion() {
	if (currentQuestion === 0) {
		return;
	} else if (currentQuestion === (questions.length - 1)) {
		document.getElementById("next").innerHTML = "Next Question";
	}
	
	currentQuestion--;
	loadQuestion();
}

function loadQuestion() {
	let image = document.getElementById("image");
	let preLoadImage = new Image();
	
	// Preload the image
	preLoadImage.src = questions[currentQuestion].image;
	preLoadImage.onLoad = function () {
		image.width = this.width;
	}
	image.style.maxWidth = "500px";
	image.src = preLoadImage.src;
	
	document.getElementById("numQuestion").innerHTML = "Q. " + (currentQuestion + 1) + "/" + questions.length;
	
	// Loop through question object and set questions/answers
  	for (const [key, value] of Object.entries(questions[currentQuestion])) {
		let elem = document.getElementById(key);
		
		if (elem) {
			if (elem.nodeName === "LABEL" || elem.nodeName === "DIV") {
				elem.innerHTML = value;
			}
		}
	}
	
	if (answers[currentQuestion]) {
		let label = document.getElementById(answers[currentQuestion]);
		let radio = document.getElementById(label.getAttribute("for"));
	
		radio.checked = true
	} else {
		let inputs = document.getElementsByTagName("INPUT");
		
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].checked = false;
		}
	}
} // loadQuestion

function evaluate() {
	let endTime = new Date().getTime();
	
	for (let i = 0; i < questions.length; i++) {
		if (answers[i] && questions[i].answer === answers[i]) {
			score++;
		}
	}
	
	document.getElementById("correct").innerHTML = score;
	document.getElementById("incorrect").innerHTML = questions.length - score;
	document.getElementById("attempted").innerHTML = answers.length;
	document.getElementById("total").innerHTML = score + "/" + questions.length + " (" + ((score/questions.length) * 100) + "%)";
	document.getElementById("time").innerHTML = msToTime(endTime - startTime);
	
	document.getElementById("page1").style.display = "none";
	document.getElementById("page2").style.display = "block";
}

function retry() {
	currentQuestion = 0;
	score = 0;
	answers = [];
	
	loadQuestion();
	startTime = new Date().getTime();
	
	document.getElementById("page1").style.display = "block";
	document.getElementById("page2").style.display = "none";
	document.getElementById("next").innerHTML = "Next Question";
}

function displayAnswers() {
	for (let i = 0; i < questions.length; i++) {
		if (questions[i] !== answers[i]) {
			document.getElementById("answers").innerHTML = "<div> " + questions[i].question + "";
		}
	}
}

function changed(letter) {
	answers[currentQuestion] = letter;
}

function msToTime(s) {
	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;
	
	return mins + ':' + secs + ":" + ms;
}