'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const overlay = document.querySelector('.overlay');
const ruleBook = document.querySelector('.rulebook')
const rules = document.querySelector('.rules');


diceEl.classList.add('hidden');

score0El.textContent = '0';
score1El.textContent = '0';
let curPlayer = 0;
let scores = [0, 0];
let curScore = [0, 0];

let playing = true;

const switchPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  document.getElementById(`current--${curPlayer}`).textContent = 0;
  curScore[curPlayer] = 0;
  curPlayer = curPlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice == 1) {
      switchPlayer();
    } else {
      curScore[curPlayer] += dice;
      document.getElementById(`current--${curPlayer}`).textContent =
        curScore[curPlayer];
      console.log(scores[curPlayer]);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[curPlayer] += curScore[curPlayer];
    document.querySelector(`#score--${curPlayer}`).textContent =
      scores[curPlayer];

    if (scores[curPlayer] >= 100) {
      document
        .querySelector(`.player--${curPlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  document
    .querySelector(`.player--${curPlayer}`)
    .classList.remove('player--winner');
  curPlayer = 0;
  scores = [0, 0];
  curScore = [0, 0];
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  current1.textContent = 0;
  current0.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});

ruleBook.addEventListener('click', function() {
   rules.classList.remove('invisible');
   overlay.classList.remove('invisible');
});

overlay.addEventListener('click', function() {
    rules.classList.add('invisible');
   overlay.classList.add('invisible');
})

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        rules.classList.add('invisible');
        overlay.classList.add('invisible');
    }
})