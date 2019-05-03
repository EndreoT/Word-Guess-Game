const inquirer = require('inquirer')

const Word = require('./word');

const allowedGuesses = 10;

class Game {
  constructor() {
    this.words = ['alphabet'];
    this.currentWordStr;
    this.wordObj;  // Word()
    this.wins = 0;
    this.losses = 0;
    this.guessesLeft;
  }

  chooseRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length)
    this.currentWord = this.words[randomIndex];
    this.wordObj = new Word(this.currentWord)
  }

  initializeGame() {
    this.guessesLeft = allowedGuesses;
  }

  async playRound() {
    this.initializeGame()
    this.chooseRandomWord();

    for (let i = 0; i < this.guessesLeft; i++) {
      console.log("Guesses left: " + this.guessesLeft);

      await inquirer.prompt({
        type: 'input',
        name: 'guess',
        message: 'Choose a character',
        validate: (guessedLetter) => {
          guessedLetter = guessedLetter.toLowerCase()
          // Check if input is a valid letter
          if ("abcdefghijklmnopqrstuvwxyz".search(guessedLetter) >= 0 && this.wordObj.guessChar(guessedLetter)) {
            return true;
          }
          return false;
        }
      });
      this.printWord();
      if (this.wordObj.allCharactersGuessed()) {
        return true
      }
    }
    return false
  }

  printWord() {
    console.log(this.wordObj.getWord())
  }
}

async function main() {
  const game = new Game();

  while (true) {
    console.log('Wins: ' + game.wins);
    console.log('Losses: ' + game.losses);
    const outcome = await game.playRound(); // bool
    if (outcome) {
      console.log('You win!')
      game.wins++;
    } else {
      console.log('You Lose!')
      game.losses++;
    }
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'playAgain',
      message: 'Play again?'
    })
    if (!answer.playAgain) {
      break;
    }
  }
  console.log('Thanks for playing!')
}
main()
