const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const emptyParagraph = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
remainingSpanGuesses = document.querySelector(".remainning span");
const emptyParagraphMessages = document.querySelector(".message");

const hiddenButton = document.querySelector(".play-again");

const word = "magnolia"

const paragraphSymbols = function (word) {
    const dotLetterHolders = [];
    for (const letter of word ) {
    console.log(letter);
    dotLetterHolders.push("●");
    }
    emptyParagraph.innerText = dotLetterHolders.join("");
};
paragraphSymbols(word);

button.addEventListener("click", function (e) {

    e.preventDefault();
    const inputValue = textInput.value; 
    console.log(inputValue);
    textInput.value="";


});



