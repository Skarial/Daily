var count = 0;
var timerInterval;
var isTimerRunning = false;
var display = document.querySelector("#time");
var audioElement = new Audio("assets/bang.wav");

function startTimer(duration) {
  var timer = duration + count,
    minutes,
    seconds;

  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      handleTimerExpiration();
    }
  }, 1000);
}

function handleTimerExpiration() {
  var imgBombe = document.querySelector(".img_bombe");
  imgBombe.src = "assets/boum.png";

  // Jouer le son
  audioElement.play();

  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  count = 0;
  isTimerRunning = false;
  updateTimerDisplay();
  var imgBombe = document.querySelector(".img_bombe");
  imgBombe.src = "assets/bombe.png";
  clearInterval(timerInterval);
  timerInterval = null;
}

function addTimeToTimer(seconds) {
  if (!isTimerRunning) {
    count += seconds;
    updateTimerDisplay();
  } else {
    count += seconds;
    clearInterval(timerInterval);
    startTimer(count);
  }
}

function subtractTimeFromTimer(seconds) {
  if (!isTimerRunning && count >= seconds) {
    count -= seconds;
    updateTimerDisplay();
  } else if (isTimerRunning && count >= seconds) {
    count -= seconds;
    clearInterval(timerInterval);
    startTimer(count);
  }
}

function updateTimerDisplay() {
  var minutes = parseInt(count / 60, 10);
  var seconds = parseInt(count % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = minutes + ":" + seconds;
}

document.addEventListener("DOMContentLoaded", function () {
  var goButton = document.querySelector(".go");
  var resetButton = document.querySelector("#resetTimer");

  goButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      resetTimer();
      startTimer(10); // Démarrer le minuteur avec la durée souhaitée (10 secondes dans cet exemple)
      isTimerRunning = true;
    }
    addTimeToTimer(30);
  });

  resetButton.addEventListener("click", function () {
    resetTimer();
  });

  var addButton = document.querySelector(".bouton_plus");
  var subtractButton = document.querySelector(".bouton_moins");

  addButton.addEventListener("click", function () {
    addTimeToTimer(30);
  });

  subtractButton.addEventListener("click", function () {
    subtractTimeFromTimer(30);
  });
  resetTimer();
});
