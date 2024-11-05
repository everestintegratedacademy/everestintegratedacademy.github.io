const counterOne = document.querySelector(".counter__one");

let countOne = 0;

setInterval(() => {
  if (countOne < 900) {
    countOne++;
    counterOne.innerText = countOne + "+";
  }
}, 0.1);

const counterTwo = document.querySelector(".counter__two");

let countTwo = 1;

setInterval(() => {
  if (countTwo < 250) {
    countTwo++;
    counterTwo.innerText = countTwo + "+";
  }
}, 8);

const counterThree = document.querySelector(".counter__three");

let countThree = 2;

setInterval(() => {
  if (countThree < 75) {
    countThree++;
    counterThree.innerText = countThree;
  }
}, 30);
