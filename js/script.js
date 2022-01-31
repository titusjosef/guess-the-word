const lettersToGuess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const emptyParagraph = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
remainingSpanGuesses = document.querySelector(".remainning span");
const emptyParagraphMessages = document.querySelector(".message");

const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const paragraphSymbols = function (word) {
    const dotLetterHolders = [];
    for (const letter of word ) {
    console.log(letter);
    dotLetterHolders.push("●");
    }
    emptyParagraph.innerText = dotLetterHolders.join("");
};
paragraphSymbols(word);

guessButton.addEventListener("click", function (e) {

    e.preventDefault();
    emptyParagraphMessages.innerText = "";
    const inputValue = textInput.value;
    const goodGuess =  acceptInput(inputValue);
    if (goodGuess) {
        makeGuess(inputValue);
    }
    textInput.value = "";
    const inputCheck = acceptInput(inputValue);
});

const acceptInput =  function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {

    emptyParagraphMessages.innerText = "Enter a letter"
    } else if (input.length > 1) {
    emptyParagraphMessages.innerText = "Enter only one letter."; 
    } else if (!input.match(acceptedLetter)) {
        emptyParagraphMessages.innerText = "Enter a letter from A-Z.";
    } else {
        return input; 
    }
};
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        emptyParagraphMessages.innerText = "Try again. You've already gussed that letter."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        lettersGuessed();
        updateWordProgress(guessedLetters);
    } 
};

const lettersGuessed = function () {
    lettersToGuess.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        lettersToGuess.append(li); 
      }
    };

    const updateWordProgress = function (guessedLetters) {
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        console.log (wordArray);
        const revealWord = [];
        for (const letter of wordArray) {
            if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
            } else {
                revealWord.push("●")
            }
        }
        emptyParagraph.innerText = revealWord.join("");
        checkIfTheyWon();
    };
    const checkIfTheyWon = function () {
        if(word.toUpperCase() === emptyParagraph.innerText) {
            emptyParagraphMessages.classList.add("win");
           emptyParagraphMessages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
       }
    };

    

    