const WEAPON_ARRAY = ["paper", "rock", "scissors"];
const CHOICES = [];

const main = document.querySelector(".main");
const startBtn = document.querySelector(".main__start");
const backdrop = document.querySelector(".main__backdrop--off");
const modal = document.querySelector(".modal__options--hidden");
const board = document.querySelector(".main__board--hidden");
const modalOptions = document.querySelector(".modal__option--container").children;
const playerChoice = document.querySelector(".board__col--left");
const computerChoice = document.querySelector(".board__col--right");
const verdict = document.querySelector(".modal__verdict--text");
const verdictModal = document.querySelector('.modal__verdict--hidden');
const retryBtn = document.querySelector('.main__retryBtn');

const weaponChosen = (e) => {
  if(playerChoice.classList.length > 2){
    playerChoice.classList.remove([...playerChoice.classList][2]);
  }
  playerChoice.classList.add('weapon', `weapon__${e.target.innerText.toLowerCase()}`);
  CHOICES[0] = e.target.innerText;
  modal.classList.toggle("modal__options--shown");
  let choice = [];
  setTimeout(()=>{
    board.classList.toggle("main__board--shown");
  }, 500);
  setTimeout(() => {
    clearInterval(interval);
    checkWinner();
  }, 2500);
  const interval = setInterval(() => {
    choice = Math.floor(Math.random() * 3);
    CHOICES[1] = WEAPON_ARRAY[choice];
    if(computerChoice.classList.length > 2){
      computerChoice.classList.remove([...computerChoice.classList][2]);
    }
    computerChoice.classList.add('weapon', `weapon__${WEAPON_ARRAY[choice].toLowerCase()}`);
  }, 50);
};
const checkWinner = () => {
  CHOICES.forEach((item, i) => {
    CHOICES[i] = item.toLowerCase();
  })
  if (CHOICES[0] === CHOICES[1]) {
    verdict.innerText = "DRAW";
    verdict.setAttribute('value', 'draw');
  } else if (
    (CHOICES[0] === "paper" && CHOICES[1] === "rock") ||
    (CHOICES[0] === "rock" && CHOICES[1] === "scissors") ||
    (CHOICES[0] === "scissors" && CHOICES[1] === "paper")
  ) {
    verdict.innerText = "PLAYER WON";
    verdict.setAttribute('value', 'won');
  } else {
    verdict.innerText = "COMPUTER WON";
    verdict.setAttribute('value', 'lose');
  }
  const retryBtn = document.createElement('button');
  retryBtn.className = 'modal__retryBtn';
  retryBtn.innerHTML = 'Again';
  verdictModal.appendChild(retryBtn);
  verdictModal.classList.toggle('modal__verdict--shown');
  retryBtn.addEventListener("click", () => {
    backdrop.classList.toggle("main__backdrop--on");
    setTimeout(() => {
      verdictModal.classList.toggle('modal__verdict--shown');
      backdrop.classList.toggle("main__backdrop--on");
      board.classList.toggle("main__board--shown");
      retryBtn.remove();
      verdict.innerText = '';
      playerChoice.innerHTML = '';
      computerChoice.innerHTML = '';
    }, 500);
    setTimeout(() => {
      modal.classList.toggle("modal__options--shown");
    }, 500);
    for (const el of modalOptions) {
      el.addEventListener("click", weaponChosen);
    }
  });
};
startBtn.addEventListener("click", () => {
  backdrop.classList.toggle("main__backdrop--on");
  setTimeout(() => {
    backdrop.classList.toggle("main__backdrop--on");
    startBtn.classList.toggle("main__start--hidden");
  }, 500);
  setTimeout(() => {
    modal.classList.toggle("modal__options--shown");
  }, 500);
  for (const el of modalOptions) {
    el.addEventListener("click", weaponChosen);
  }
});