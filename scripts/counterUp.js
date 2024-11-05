const counterOne = document.querySelector(".counter__one");

let countOne = 0;

setInterval(() => {
  if (countOne < 700) {
    countOne++;
    counterOne.innerText = countOne + "+";
  }
}, 1);

const counterTwo = document.querySelector(".counter__two");

let countTwo = 1;

setInterval(() => {
  if (countTwo < 200) {
    countTwo++;
    counterTwo.innerText = countTwo + "+";
  }
}, 8);

const counterThree = document.querySelector(".counter__three");

let countThree = 2;

setInterval(() => {
  if (countThree < 30) {
    countThree++;
    counterThree.innerText = countThree;
  }
}, 30);
