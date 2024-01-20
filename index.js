var initialCount = 0; // Ajout de la variable pour stocker la valeur initiale du minuteur
var count = 0; // Initialiser à 0 secondes
var timerTimeout;
var isTimerRunning = false;
var display = document.querySelector("#time");
var audioElement = new Audio("assets/bang.wav");
var imgBombe = document.querySelector(".img_bombe");

function startTimer(duration) {
  var minutes, seconds;

  function update() {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (duration === 0) {
      handleTimerExpiration();
    } else {
      timerTimeout = setTimeout(function () {
        update();
      }, 1000);
    }

    duration--;
  }

  update();
}

function handleTimerExpiration() {
  imgBombe.src = "assets/boum.png";
  audioElement.play().then(function () {
    audioElement.addEventListener("ended", function () {
      resetTimer();
    });
  });

  isTimerRunning = false;
}

function resetTimer() {
  count = initialCount; // Réinitialiser à la valeur initiale
  isTimerRunning = false;
  updateTimerDisplay();
  imgBombe.src = "assets/bombe.png";
  clearTimeout(timerTimeout);
  timerTimeout = null;
}

function updateTimerDisplay() {
  var minutes = parseInt(count / 60, 10);
  var seconds = parseInt(count % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = minutes + ":" + seconds;
}

document.addEventListener("DOMContentLoaded", function () {
  var plusButton = document.querySelector(".bouton_plus");
  var moinsButton = document.querySelector(".bouton_moins");
  var suivantButton = document.querySelector(".bouton_suivant");
  var goButton = document.querySelector(".bouton_go");
  var resetButton = document.querySelector("#resetTimer");

  plusButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      count += 30;
      initialCount = count; // Mettre à jour la valeur initiale lors de l'ajout de temps
      updateTimerDisplay();
    }
  });

  moinsButton.addEventListener("click", function () {
    if (!isTimerRunning && count >= 30) {
      count -= 30;
      initialCount = count; // Mettre à jour la valeur initiale lors de la soustraction de temps
      updateTimerDisplay();
    }
  });

  suivantButton.addEventListener("click", function () {
    resetTimer();
  });

  updateTimerDisplay();

  goButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      startTimer(count);
      isTimerRunning = true;
    }
  });
});
