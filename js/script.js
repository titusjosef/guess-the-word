const lettersToGuess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const emptyParagraph = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpanGuesses = document.querySelector(".remaining span");
const emptyParagraphMessages = document.querySelector(".message");

const hiddenButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let theRemainingGuesses = 8;
let test = 9;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");

    const differentWords = await res.text ();
    const wordArray = differentWords.split("\n");
    const randomWordGrab = Math.floor(Math.random()* 
    wordArray.length);
    word = wordArray[randomWordGrab].trim();
    paragraphSymbols(word); 
};

getWord();

const paragraphSymbols = function (word) {
    const dotLetterHolders = [];
    for (const letter of word ) {
        console.log(letter);
        dotLetterHolders.push("●");
    }
    emptyParagraph.innerText = dotLetterHolders.join("");
}

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
}

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        emptyParagraphMessages.innerText = "Try again. You've already gussed that letter."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        lettersGuessed();
        updateWordProgress(guessedLetters);
        theRestOfTheGuesses(guess);
    } 
}

const lettersGuessed = function () {
    lettersToGuess.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        lettersToGuess.append(li); 
    }
}

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
}

const theRestOfTheGuesses = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes (guess)) {
        emptyParagraphMessages.innerText = `This word does not have a ${guess}.`;
        theRemainingGuesses -= 1;
    } else { 
        emptyParagraphMessages.innerText = `Good job! The letter ${guess} is in the word`;
    }

    if (theRemainingGuesses === 0) {
        emptyParagraphMessages.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
        textInput.setAttribute("disabled", "");

    } 
    else if (theRemainingGuesses === 1) {
        remainingSpanGuesses.innerText = `${theRemainingGuesses} guess`;
    } else {
        remainingSpanGuesses.innerText = `${theRemainingGuesses} guesses`;
    }
}



const checkIfTheyWon = function () {
    if (word.toUpperCase() === emptyParagraph.innerText) {
        emptyParagraphMessages.classList.add("win");
        emptyParagraphMessages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
        startOver();
        textInput.setAttribute("disabled", "");
    }
    
}

 const startOver = function () {
     guessButton.classList.add("hide");
     remainingGuesses.classList.add("hide");
     lettersToGuess.classList.add("hide");
     hiddenButton.classList.remove("hide");
 };

 hiddenButton.addEventListener("click", function () {

    emptyParagraphMessages.classList.remove("win");
    guessedLetters = [];
    theRemainingGuesses = 8;
    remainingSpanGuesses.innerText = `${theRemainingGuesses} guesses`;
    lettersToGuess.innerHTML = "";
    emptyParagraphMessages.innerText = "";
     getWord();
 

 guessButton.classList.remove("hide");
 hiddenButton.classList.add("hide");
 remainingGuesses.classList.remove("hide");
 lettersToGuess.classList.remove("hide");
 textInput.removeAttribute("disabled", "");
 });










    