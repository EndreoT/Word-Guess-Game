"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const { Word, guessResult } = require('./word');
const allowedGuesses = 4;
class Game {
    constructor() {
        // this.words = ['alphabet', 'two words'];
        this.words = ['two words'];
        this.currentWord = '';
        this.wordObj; // Word()
        this.wins = 0;
        this.losses = 0;
        this.guessesLeft = 0;
        this.guessedLetters = new Set();
    }
    chooseRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
        this.wordObj = new Word(this.currentWord);
    }
    initializeGame() {
        this.guessesLeft = allowedGuesses;
        this.guessedLetters.clear();
    }
    printDivider() {
        console.log('========================================');
    }
    async playRound() {
        this.initializeGame();
        this.chooseRandomWord();
        this.printWord();
        while (this.guessesLeft) {
            // Get user guess
            await inquirer.prompt({
                type: 'input',
                name: 'guess',
                message: 'Choose a character',
                validate: (guessedLetter) => { return this.validateGuess(guessedLetter); }
            });
            // Check for win
            if (this.wordObj.allCharactersGuessed()) {
                this.printDivider();
                this.printWord();
                console.log('YOU WIN!');
                this.wins++;
                this.printDivider();
                return true;
            }
            this.printDivider();
        }
        // Loss
        this.losses++;
        this.printDivider();
        console.log('YOU LOSE!\n');
        console.log('The correct word is: ');
        console.log(this.wordObj.revealWord());
        this.printDivider();
        return false;
    }
    // Check if guessed character has been previously guessed, is contained in current word, or is not in current word
    validateGuess(guessedLetter) {
        guessedLetter = guessedLetter.toLowerCase();
        // Check if input is a valid letter and has not already been guessed
        if (guessedLetter && "abcdefghijklmnopqrstuvwxyz".search(guessedLetter) >= 0 && !this.guessedLetters.has(guessedLetter)) {
            const checkGuessResult = this.wordObj.guessChar(guessedLetter);
            this.guessedLetters.add(guessedLetter);
            if (checkGuessResult === guessResult.INCORRECT_GUESS) {
                // Guessed letter not in word
                this.guessesLeft--;
                console.log('\n\nIncorrect!\n');
            }
            else {
                // Guessed letter is in word
                console.log('\n\nCORRECT!\n');
            }
            this.printWord();
            return true;
        }
        // Character has already been guessed
        console.log('\nCharacter has either been previously guessed, or is not in the alphabet');
        this.printWord();
        ;
        this.printDivider();
        return false;
    }
    printWord() {
        const guessedLettersArr = [];
        this.guessedLetters.forEach(item => guessedLettersArr.push(item));
        console.log("Guessed letters: " + guessedLettersArr.join(', '));
        console.log("Guesses left: " + this.guessesLeft + '\n');
        console.log(this.wordObj.getWord() + '\n');
    }
}
module.exports = Game;
//# sourceMappingURL=game.js.map