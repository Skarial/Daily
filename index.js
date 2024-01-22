// document.addEventListener("DOMContentLoaded", function () {
//   let initialCount = 0;
//   let count = 0;
//   let timerTimeout;
//   let isTimerRunning = false;
//   let bangSound = new Audio("assets/bang.wav"); // Utiliser une nouvelle instance pour le son "bang"
//   let ticTacSound = new Audio("assets/tictac2.wav");
//   const display = document.querySelector("#time");
//   const imgBombe = document.querySelector(".img_bombe");

//   const ticTacVolume = 0.2;
//   ticTacSound.volume = ticTacVolume;
//   const audioElementVolume = 1;
//   bangSound.volume = audioElementVolume;

//   function updateTimerDisplay() {
//     const minutes = String(Math.floor(count / 60)).padStart(2, "0");
//     const seconds = String(count % 60).padStart(2, "0");
//     display.textContent = `${minutes}:${seconds}`;
//   }

//   function handleTimerExpiration() {
//     imgBombe.src = "assets/boum.png";
//     bangSound.play().then(() => {
//       bangSound.addEventListener("ended", resetTimer);
//     });

//     ticTacSound.pause();
//     ticTacSound.currentTime = 0;

//     isTimerRunning = false;
//   }

//   function resetTimer() {
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

//   const plusButton = document.querySelector(".btn_plus");
//   const moinsButton = document.querySelector(".btn_moins");
//   const suivantButton = document.querySelector(".btn_suivant");
//   const goButton = document.querySelector(".btn_go");
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
//     resetTimer();
//     bangSound.pause();
//     bangSound.currentTime = 0;
//     startTimer(count);
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
  let bangSound = new Audio("assets/bang.wav");
  let ticTacSound = new Audio("assets/tictac2.wav");
  const display = document.querySelector("#time");
  const imgBombe = document.querySelector(".img_bombe");

  const ticTacVolume = 0.2;
  ticTacSound.volume = ticTacVolume;
  const audioElementVolume = 1;
  bangSound.volume = audioElementVolume;

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

    // Pause le son "ticTac" et remet le temps de lecture au début
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

  const plusButton = document.querySelector(".btn_plus");
  const moinsButton = document.querySelector(".btn_moins");
  const suivantButton = document.querySelector(".btn_suivant");
  const goButton = document.querySelector(".btn_go");
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
    bangSound.pause();
    bangSound.currentTime = 0;
    startTimer(count);
  });

  updateTimerDisplay();

  goButton.addEventListener("click", function () {
    if (!isTimerRunning) {
      startTimer(count);
      isTimerRunning = true;
    }
  });
});
