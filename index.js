document.addEventListener("DOMContentLoaded", function () {
  const muteButton = document.querySelector(".btn_mute");
  let initialCount = 0;
  let count = 0;
  let timerTimeout;
  let isTimerRunning = false;
  let isGoButtonClicked = false;
  let bangSound = new Audio("assets/bang.wav");
  let ticTacSound = new Audio("assets/tictac2.wav");
  const display = document.querySelector("#time");
  const imgBombe = document.querySelector(".img_bombe");
  const suivantButton = document.querySelector(".btn_suivant");
  const goButton = document.querySelector(".btn_go");
  const plusButton = document.querySelector(".btn_plus");
  const moinsButton = document.querySelector(".btn_moins");

  let siteOpened = false;

  function updateTimerDisplay() {
    const minutes = String(Math.floor(count / 60)).padStart(2, "0");
    const seconds = String(count % 60).padStart(2, "0");
    display.textContent = `${minutes}:${seconds}`;
  }

  function handleTimerExpiration() {
    imgBombe.src = "assets/boum.png";
    bangSound.play().then(() => {
      bangSound.addEventListener("ended", resetTimer);
    });

    ticTacSound.pause();
    ticTacSound.currentTime = 0;

    isTimerRunning = false;
  }

  function resetTimer() {
    count = initialCount;
    isTimerRunning = false;
    updateTimerDisplay();
    imgBombe.src = "assets/bombe.png";
    clearTimeout(timerTimeout);
    timerTimeout = null;

    ticTacSound.pause();
    ticTacSound.currentTime = 0;
  }

  function startTimer(duration) {
    function update() {
      if (duration === 0) {
        handleTimerExpiration();
      } else {
        timerTimeout = setTimeout(update, 1000);
      }

      const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
      const seconds = String(duration % 60).padStart(2, "0");
      display.textContent = `${minutes}:${seconds}`;
      duration--;
    }

    update();
    ticTacSound.play();
  }

  plusButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      count += 30;
      initialCount = count;
      updateTimerDisplay();

      if (!siteOpened) {
        siteOpened = true;
        goButton.disabled = false;
        suivantButton.disabled = false;
      }
    }
  });

  moinsButton.addEventListener("click", function () {
    if (!isTimerRunning && count >= 30) {
      count -= 30;
      initialCount = count;
      updateTimerDisplay();

      if (!siteOpened) {
        siteOpened = true;
        goButton.disabled = false;
        suivantButton.disabled = false;
      }
    }
  });

  function disablePlusMinusButtons() {
    plusButton.disabled = true;
    moinsButton.disabled = true;
  }

  function enablePlusMinusButtons() {
    plusButton.disabled = false;
    moinsButton.disabled = false;
  }

  goButton.addEventListener("click", function () {
    if (!isTimerRunning && !isGoButtonClicked) {
      startTimer(count);
      isTimerRunning = true;
      isGoButtonClicked = true;

      goButton.disabled = true;

      disablePlusMinusButtons();
    }
  });

  suivantButton.addEventListener("click", function () {
    resetTimer();
    bangSound.pause();
    bangSound.currentTime = 0;
    startTimer(count);
  });

  suivantButton.disabled = true;
  goButton.disabled = true;

  muteButton.addEventListener("click", function () {
    if (bangSound.volume > 0 || ticTacSound.volume > 0) {
      bangSound.volume = 0;
      ticTacSound.volume = 0;
    } else {
      bangSound.volume = 1;
      ticTacSound.volume = 1;
    }
  });

  updateTimerDisplay();
});
