var wordList;
var word;
var hiddenWord = document.getElementById("word");
var hangman = document.getElementById("counter");
var counter = 0;

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
    if (checkLetter(letterId)) {
      revealLetter(letterId);
    } else if (counter < 7) {
      counter++;
    } else {
      counter = 0;
      hiddenWord.innerHTML = "";
      secretWord();
    }
    hangman.innerText = counter;
  });
}

function checkLetter(id) {
  for (var i = 0; i < word.length; i++) {
    if (word[i] === id) {
      return true;
    }
  }
  return false;
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
