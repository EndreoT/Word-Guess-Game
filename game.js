const inquirer = require('inquirer')

const { Word, guessResult } = require('./word');

const allowedGuesses = 4;

class Game {
  constructor() {
    // this.words = ['alphabet', 'two words'];
    this.words = ['two words'];
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

  printDivider() {
    console.log('========================================')
  }

  async playRound() {
    this.initializeGame()
    this.chooseRandomWord();

    while (this.guessesLeft) {
      console.log("Guesses left: " + this.guessesLeft);

      await inquirer.prompt({
        type: 'input',
        name: 'guess',
        message: 'Choose a character',
        validate: (guessedLetter) => {
          guessedLetter = guessedLetter.toLowerCase()
          const checkGuessResult = this.wordObj.guessChar(guessedLetter);
          // Check if input is a valid letter
          if ("abcdefghijklmnopqrstuvwxyz".search(guessedLetter) >= 0 && checkGuessResult != guessResult.ALREADY_GUESSED) {
            if (checkGuessResult === guessResult.INCORRECT_GUESS) {
              // Guessed letter not in word
              this.guessesLeft--;
              console.log('\n\nIncorrect!\n')
            }
            else {
              // Guessed letter is in word
              console.log('\n\nCORRECT!\n')
            }
            this.printWord();
            return true;
          }
          return false;
        }
      });
      
      if (this.wordObj.allCharactersGuessed()) {
        // Win
        this.printDivider()
        console.log('You win!')
        this.wins++;
        return true
      }
    }
    // Loss
    this.losses++;
    this.printDivider()
    console.log('You Lose!')
    console.log('The correct word is: ')
    console.log(this.wordObj.revealWord())
    return false
  }

  printWord() {
    console.log(this.wordObj.getWord() + '\n')
  }
}

module.exports = Game;