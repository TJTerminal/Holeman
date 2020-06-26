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
