'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let currentScoreEl;
let scoreEl;
let activePlayer;
let gameState;
let winnerPlayer;

const activeIntialState = function () {
  activePlayer = 0;
  gameState = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

const switchPlayer = function () {
  currentScoreEl.textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let getRandomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

activeIntialState();

const resetGame = function () {
  currentScoreEl.textContent = 0;
  activeIntialState();
  winnerPlayer.classList.remove('player--winner');
  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
};

const hold = function () {
  if (gameState) {
    scoreEl = document.getElementById(`score--${activePlayer}`);
    scoreEl.textContent =
      Number(scoreEl.textContent) + Number(currentScoreEl.textContent);
    if (Number(scoreEl.textContent) >= 100) {
      winnerPlayer = document.querySelector(`.player--${activePlayer}`);
      winnerPlayer.classList.add('player--winner');
      gameState = false;
    } else {
      switchPlayer();
    }
  }
};

const rollDice = function () {
  if (gameState) {
    const diceNumber = getRandomNumber();
    diceEl.src = `imgs/dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    if (diceNumber !== 1) {
      currentScoreEl = document.getElementById(`current--${activePlayer}`);
      currentScoreEl.textContent =
        Number(currentScoreEl.textContent) + diceNumber;
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollDice);

btnHold.addEventListener('click', hold);

btnNew.addEventListener('click', resetGame);
