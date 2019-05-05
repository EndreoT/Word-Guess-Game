"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const word_1 = require("./word");
const allowedGuesses = 5;
class Game {
    constructor() {
        this.words = ['alphabet', 'mississippi', 'jurassic world'];
        this.currentWord = '';
        this.wins = 0;
        this.losses = 0;
        this.guessesLeft = 0;
        this.guessedLetters = new Set();
    }
    // Chooses a random word from a word list and then creates a Word object
    chooseRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
        this.wordObj = new word_1.Word(this.currentWord);
    }
    initializeGame() {
        this.guessesLeft = allowedGuesses;
        this.guessedLetters.clear();
    }
    printDivider() {
        console.log('========================================');
    }
    // Initializeds the game, picks a random word, and lets the user guess characters
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
                this.handleWin();
                return true;
            }
            this.printDivider();
        }
        // Player ran out of guesses. Handle loss
        this.handleLoss();
        return false;
    }
    // Check if guessed character has been previously guessed, is contained in current word, or is not in current word
    validateGuess(guessedLetter) {
        guessedLetter = guessedLetter.toLowerCase();
        // Check if input is a valid letter and has not already been guessed
        if (guessedLetter && "abcdefghijklmnopqrstuvwxyz".search(guessedLetter) >= 0 && !this.guessedLetters.has(guessedLetter)) {
            // Check if letter is in word
            const checkGuessResult = this.wordObj.guessChar(guessedLetter);
            this.guessedLetters.add(guessedLetter);
            if (!checkGuessResult) {
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
        // Character has already been guessed or is not valid
        console.log('\nCharacter has either been previously guessed, or is not in the alphabet');
        this.printWord();
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
    handleWin() {
        this.printDivider();
        this.printWord();
        console.log('YOU WIN!');
        this.wins++;
        this.printDivider();
    }
    handleLoss() {
        this.losses++;
        this.printDivider();
        console.log('YOU LOSE!\n');
        console.log('The correct word is: ');
        console.log(this.wordObj.revealWord());
        this.printDivider();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map