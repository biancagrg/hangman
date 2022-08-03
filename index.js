var word = ["M", "A", "R", "I", "A", "N", "E"];
var hiddenWord = document.getElementById("word");
var hangman = document.getElementById("counter");
var counter = 0;

function secretWord(word) {
  for (var i = 0; i < word.length; i++) {
    hiddenWord.innerHTML += `<div class="hiddenLetter" name="hidden-${word[i]}">${word[i]}</div>`;
  }
}

secretWord(word);

function revealLetter(correctLetter) {
  console.log("hier");
  var letter = document.getElementsByName(`hidden-${correctLetter}`);
  console.log(letter[0]);
  for (var i = 0; i < letter.length; i++) {
    console.log("muuuu");
    letter[i].classList.remove("hiddenLetter");
    letter[i].classList.add("revealedLetter");
  }
}

function initEvents() {
  document.getElementById("letters").addEventListener("click", function (e) {
    var letterId = e.target.getAttribute("id");
    console.log("aici");
    if (checkLetter(letterId)) {
      console.log(letterId);
      revealLetter(letterId);
    } else if (counter < 7) {
      counter++;
    } else {
      counter = 0;
      hiddenWord.innerHTML = "";
      secretWord(word);
    }
    hangman.innerText = counter;
  });
}

function checkLetter(id) {
  for (var i = 0; i < word.length; i++) {
    if (word[i] == id) {
      return true;
    }
  }
  return false;
}

initEvents();
