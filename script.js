"use strict";
let points, timeLeft, timerInterval, difficulty, addedTime;

const statsEl = document.querySelector(".game-info");
const pointsEl = document.querySelector(".points");
const timeEl = document.querySelector(".time");
const addedTimeEl = document.querySelector(".added-time");
const difficultyEl = document.querySelector(".difficulty");

const startBtnEl = document.querySelector(".start-btn");
const targetEl = document.querySelector(".target");

const gameContainerEl = document.querySelector(".game-container");
const modeWindowEl = document.querySelector(".mode-choice");
const modeOptionsEls = document.querySelectorAll(".mode-options");

const endGameEl = document.querySelector(".game-end");
const endGameMessageEl = document.querySelector(".game-end-message");

modeOptionsEls.forEach((modeOptionsEl) => {
  modeOptionsEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("mode-option")) return;

    restartStats();
    difficulty = e.target.dataset.mode;

    pointsEl.textContent = points;
    createTimer(timeLeft, timeEl);
    createTimer(addedTime, addedTimeEl);
    difficultyEl.textContent = difficulty;

    endGameEl.classList.add("hide-d");
    modeWindowEl.classList.add("hide-d");
    statsEl.classList.remove("hide-d");
    startBtnEl.classList.remove("hide-d");
  });
});

function restartStats() {
  points = 0;
  addedTime = 0;
  timeLeft = 10;
}

function createTimer(time, el) {
  const mins = Math.floor(time / 60).toString();
  const secs = (time % 60).toString().padStart(2, "0");
  el.textContent = `${mins}:${secs}`;
}

startBtnEl.addEventListener("click", function () {
  this.classList.add("hide-d");
  startTimer();
  targetEl.classList.remove("hide-d");
  positionTarget();
});

function startTimer() {
  createTimer(timeLeft, timeEl);
  timerInterval = setInterval(() => {
    timeLeft > 0 ? timeLeft-- : clearInterval(timerInterval);
    if (timeLeft === 0) {
      endGame();
    }
    createTimer(timeLeft, timeEl);
  }, 1000);

  if (difficulty === "easy") {
    setTargetSize(200);
  }
  if (difficulty === "medium") {
    setTargetSize(150);
  }
}

function endGame() {
  statsEl.classList.add("hide-d");
  targetEl.classList.add("hide-d");

  const message = `${
    points > 50 ? "Great job" : "Not bad"
  }, you've made ${points} points on ${difficulty} mode!`;
  endGameMessageEl.textContent = message;
  endGameEl.classList.remove("hide-d");
}

function randomPercent() {
  return Math.floor(Math.random() * 100 + 1);
}

function positionTarget() {
  const randomX = randomPercent();
  const randomY = randomPercent();

  targetEl.style.top = `${randomY}%`;
  targetEl.style.left = `${randomX}%`;
  targetEl.style.transform = `translate(${-randomX}%, ${-randomY}%)`;
}

targetEl.addEventListener("click", function (e) {
  positionTarget();

  const targetPoints = e.target.dataset.points;
  points += +targetPoints;
  pointsEl.textContent = points;

  if (points > 50 && points < 53) {
    if (difficulty === "easy") {
      setTargetSize(150);
    }
    if (difficulty === "medium") {
      setTargetSize(100);
    }
    if (difficulty === "hard") {
      setTargetSize(50);
    }
  }

  if (!e.target.classList.contains("inner")) return;
  timeLeft++;
  createTimer(++addedTime, addedTimeEl);
});

function setTargetSize(px) {
  targetEl.style.height = `${px}px`;
  targetEl.style.width = `${px}px`;
}
