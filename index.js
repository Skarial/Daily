// document.addEventListener("DOMContentLoaded", function () {
//   let initialCount = 0;
//   let count = 0;
//   let timerTimeout;
//   let isTimerRunning = false;
//   const display = document.querySelector("#time");
//   const audioElement = new Audio("assets/bang.wav");
//   const ticTacSound = new Audio("assets/tictac2.wav");
//   const imgBombe = document.querySelector(".img_bombe");

//   function updateTimerDisplay() {
//     const minutes = String(Math.floor(count / 60)).padStart(2, "0");
//     const seconds = String(count % 60).padStart(2, "0");
//     display.textContent = `${minutes}:${seconds}`;
//   }

//   function handleTimerExpiration() {
//     imgBombe.src = "assets/boum.png";
//     audioElement.play().then(() => {
//       audioElement.addEventListener("ended", resetTimer);
//     });

//     isTimerRunning = false;
//   }

//   function resetTimer() {
//     // Pause et réinitialisation du son tictac
//     ticTacSound.pause();
//     ticTacSound.currentTime = 0;

//     count = initialCount;
//     isTimerRunning = false;
//     updateTimerDisplay();
//     imgBombe.src = "assets/bombe.png";
//     clearTimeout(timerTimeout);
//     timerTimeout = null;
//   }

//   function startTimer(duration) {
//     function update() {
//       if (duration === 0) {
//         handleTimerExpiration();
//       } else {
//         timerTimeout = setTimeout(update, 1000);
//       }

//       const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
//       const seconds = String(duration % 60).padStart(2, "0");
//       display.textContent = `${minutes}:${seconds}`;
//       duration--;
//     }

//     update();
//     ticTacSound.play();
//   }

//   const plusButton = document.querySelector(".bouton_plus");
//   const moinsButton = document.querySelector(".bouton_moins");
//   const suivantButton = document.querySelector(".bouton_suivant");
//   const goButton = document.querySelector(".bouton_go");
//   const resetButton = document.querySelector("#resetTimer");

//   plusButton.addEventListener("click", function () {
//     if (!isTimerRunning) {
//       count += 30;
//       initialCount = count;
//       updateTimerDisplay();
//     }
//   });

//   moinsButton.addEventListener("click", function () {
//     if (!isTimerRunning && count >= 30) {
//       count -= 30;
//       initialCount = count;
//       updateTimerDisplay();
//     }
//   });

//   suivantButton.addEventListener("click", function () {
//     // Pause et réinitialisation du son tictac
//     ticTacSound.pause();
//     ticTacSound.currentTime = 0;

//     resetTimer();
//   });

//   updateTimerDisplay();

//   goButton.addEventListener("click", function () {
//     if (!isTimerRunning) {
//       startTimer(count);
//       isTimerRunning = true;
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  let initialCount = 0;
  let count = 0;
  let timerTimeout;
  let isTimerRunning = false;
  const display = document.querySelector("#time");
  const audioElement = new Audio("assets/bang.wav");
  const ticTacSound = new Audio("assets/tictac2.wav");
  const imgBombe = document.querySelector(".img_bombe");

  function updateTimerDisplay() {
    const minutes = String(Math.floor(count / 60)).padStart(2, "0");
    const seconds = String(count % 60).padStart(2, "0");
    display.textContent = `${minutes}:${seconds}`;
  }

  function handleTimerExpiration() {
    imgBombe.src = "assets/boum.png";
    audioElement.play().then(() => {
      audioElement.addEventListener("ended", resetTimer);
    });

    // Pause et réinitialisation du son tictac
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

  const plusButton = document.querySelector(".bouton_plus");
  const moinsButton = document.querySelector(".bouton_moins");
  const suivantButton = document.querySelector(".bouton_suivant");
  const goButton = document.querySelector(".bouton_go");
  const resetButton = document.querySelector("#resetTimer");

  plusButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      count += 30;
      initialCount = count;
      updateTimerDisplay();
    }
  });

  moinsButton.addEventListener("click", function () {
    if (!isTimerRunning && count >= 30) {
      count -= 30;
      initialCount = count;
      updateTimerDisplay();
    }
  });

  suivantButton.addEventListener("click", function () {
    resetTimer();
    ticTacSound.pause();
    ticTacSound.currentTime = 0;
  });

  updateTimerDisplay();

  goButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      startTimer(count);
      isTimerRunning = true;
    }
  });
});
