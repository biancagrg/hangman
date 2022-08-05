var wordList;
var word;
var hiddenWord = document.getElementById("word");
var hangman = document.getElementById("counter");
var counter = 0;
var chosenLetterString = "";
var correctLetterCounter = 0;

function secretWord() {
  word = wordList.words[Math.floor(Math.random() * wordList.words.length)];
  for (var i = 0; i < word.length; i++) {
    hiddenWord.innerHTML += `<div class="hiddenLetter" name="hidden-${word[i]}">${word[i]}</div>`;
  }
}

function revealLetter(correctLetter) {
  var letter = document.getElementsByName(`hidden-${correctLetter}`);

  for (var i = 0; i < letter.length; i++) {
    letter[i].classList.remove("hiddenLetter");
    letter[i].classList.add("revealedLetter");
  }
}

function initEvents() {
  document.getElementById("letters").addEventListener("click", function (e) {
    var letterId = e.target.getAttribute("id");
    document.getElementById(letterId).classList.remove("keyboard");
    document.getElementById(letterId).classList.add("chosenLetter");
    chosenLetterString += letterId;
    if (checkLetter(letterId)) {
      revealLetter(letterId);
      if (correctLetterCounter === word.length) {
        hiddenWord.innerHTML = "";
        secretWord();
        resetLetters();
        counter = 0;
        correctLetterCounter = 0;
      }
    } else if (counter < 7) {
      counter++;
    } else {
      counter = 0;
      hiddenWord.innerHTML = "";
      resetLetters();
      secretWord();
    }
    hangman.innerText = counter;
  });
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

function resetLetters() {
  for (var i = 0; i < chosenLetterString.length; i++) {
    document
      .getElementById(chosenLetterString[i])
      .classList.remove("chosenLetter");
    document.getElementById(chosenLetterString[i]).classList.add("keyboard");
  }
}
loadWord();
