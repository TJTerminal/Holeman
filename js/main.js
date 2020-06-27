/*----- constants -----*/
const LOSE_WRONG_COUNTS = 6
const SPRITE_WIDTH = 75
const WORDS = [
    'DEVELOPER',
    'HTML',
    'CSS',
    'JAVASCRIPT',
    'CODE',
    'FUNCTION',
    'OBJECT'
]

/*----- app's state (variables) -----*/
let secretWord, guessWord, usedLetters, wrongLetters


/*----- cached element references -----*/
const guessWordEl = document.getElementById('word')
const stageEl = document.getElementById('stage')
const messageEl = document.querySelector('h2')
const lettersBtns = document.querySelectorAll('#letters button')
const replayBtn = document.getElementById('replay')

/*----- event listeners -----*/
document.getElementById('letters').addEventListener('click', handleLetterClick)

replayBtn.addEventListener('click', init)

/*----- functions -----*/
function init() {
    console.log('Game Start!');
    
    let randomIdx = Math.floor(Math.random() * WORDS.length); // This is a random number
    secretWord = WORDS[randomIdx]; // Pick a random word from WORDS array
    guessWord = '';

    for (let char of secretWord) {
        guessWord += char === " " ? char : '_';
    }

    usedLetters = [];
    wrongLetters = [];
    render();
}

function handleLetterClick(event) {
    let letter = event.target.textContent;
    if (
        event.target.tagName !== 'BUTTON' ||
        usedLetters.includes(letter) ||
        secretWord === guessWord ||
        wrongLetters.length === LOSE_WRONG_COUNTS
    )

    return usedLetters.push(letter)

    if (secretWord.includes(letter)) {
        // correct guess
        let newGuessWord = ''
        for (let i =0; i< secretWord.length; i++) {
            newGuessWord += secretWord.charAt(i) === letter ? letter : guessWord.charAt(i)
        }
        guessWord = newGuessWord
    } else {
        wrongLetters.push(letter)
    }
    render()
}

function render() {
    // break up render function
    renderMessage()
    // display stage
    stageEl.style.backgroundPositionX = `${-SPRITE_WIDTH * wrongLetters.length}px`
    // display guessWord
    guessWordEl.textContent = guessWord
    // update letters
    lettersBtns.forEach(function(btn) {
        let letter = btn.textContent
        if (wrongLetters.includes(letter)) {
            btn.className = 'wrong'
        } else if (usedLetters.includes(letter)) {
            btn.className = 'correct'
        } else {
            btn.className = ''
        }
    })
    replayBtn.style.visibility = isGameOver() ? 'visible' : 'hidden'
}

function renderMessage() {
    // rendering h2 message
    if (secretWord === guessWord) {
        messageEl.textContent = 'Congrats! You guessed the word!';
    } else if (wrongLetters.length === LOSE_WRONG_COUNTS) {
        messageEl.textContent = 'Sorry you lose!'
    } else {
        messageEl.textContent = `${LOSE_WRONG_COUNTS - wrongLetters.length} of ${LOSE_WRONG_COUNTS} Wrong guesses remaining`
    }
}

function isGameOver() {
    return secretWord === guessWord || wrongLetters.length === LOSE_WRONG_COUNTS
}