var word = ["M", "A", "R", "I", "A", "N", "E"];
var hiddenWord = document.getElementById("word");

function secretWord(word) {
  for (var i = 0; i < word.length; i++) {
    hiddenWord.innerHTML += `<div class="hiddenLetter" name="hidden-${word[i]}">${word[i]}</div>`;
  }
}

secretWord(word);

function revealLetter(correctLetter) {
  var letter = document.getElementsByName(correctLetter);
  for (var i = 0; i < letter.length; i++) {
    letter[i].classList.remove("hiddenLetter");
    letter[i].classList.add("revealedLetter");
  }
}

// revealLetter("hidden-A");
