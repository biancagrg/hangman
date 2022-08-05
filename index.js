var wordList;
var word;
var hiddenWord = document.getElementById("word");
var hangman = document.getElementById("counter");
var counter = 0;
hangman.innerHTML = counter;
var chosenLetterString = "";
var correctLetterCounter = 0;

function initEvents() {
  letterEvent();
  document.getElementById("new-game").addEventListener("click", function () {
    resetGame();
  });
}

function letterEvent() {
  [...document.querySelectorAll(".keyboard")].forEach(function (item) {
    item.addEventListener("click", respond);
  });
}

function respond(e) {
  var letterId = e.target.getAttribute("id");
  document.getElementById(letterId).classList.remove("keyboard");
  document.getElementById(letterId).classList.add("chosenLetter");
  document.getElementById(letterId).removeEventListener("click", respond);
  chosenLetterString += letterId;
  if (checkLetter(letterId)) {
    revealLetter(letterId);
    if (correctLetterCounter === word.length) {
      document.getElementById("message").innerHTML =
        "Congratulations! You won!";
      [...document.querySelectorAll(".keyboard")].forEach(function (item) {
        item.removeEventListener("click", respond);
      });
    }
  } else if (counter < 7) {
    counter++;
    hangman.innerText = counter;
  } else {
    document.getElementById("message").innerHTML = "You lost! Try again!";
    [...document.querySelectorAll(".keyboard")].forEach(function (item) {
      item.removeEventListener("click", respond);
    });
  }
}

initEvents();

function loadWord() {
  fetch("words.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      wordList = result[0];
      secretWord();
    });
}

loadWord();

function secretWord() {
  word = wordList.words[Math.floor(Math.random() * wordList.words.length)];
  for (var i = 0; i < word.length; i++) {
    hiddenWord.innerHTML += `<div class="hiddenLetter" name="hidden-${word[i]}">${word[i]}</div>`;
  }
}

function checkLetter(id) {
  var foundLetter = false;
  for (var i = 0; i < word.length; i++) {
    if (word[i] === id) {
      correctLetterCounter++;
      foundLetter = true;
    }
  }
  return foundLetter;
}

function revealLetter(correctLetter) {
  var letter = document.getElementsByName(`hidden-${correctLetter}`);

  for (var i = 0; i < letter.length; i++) {
    letter[i].classList.remove("hiddenLetter");
    letter[i].classList.add("revealedLetter");
  }
}

function resetLetters() {
  for (var i = 0; i < chosenLetterString.length; i++) {
    document
      .getElementById(chosenLetterString[i])
      .classList.remove("chosenLetter");
    document.getElementById(chosenLetterString[i]).classList.add("keyboard");
  }
}

function resetGame() {
  hiddenWord.innerHTML = "";
  secretWord();
  resetLetters();
  counter = 0;
  hangman.innerText = counter;
  correctLetterCounter = 0;
  document.getElementById("message").innerHTML = "";
  letterEvent();
}
