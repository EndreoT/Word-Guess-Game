"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const letter_1 = require("./letter");
class Word {
    constructor(word) {
        this.correctCharacters = 0;
        this.wordArr = this.constructWord(word);
    }
    // Create an array of Letter objects
    constructWord(word) {
        const wordArr = [];
        for (let i = 0; i < word.length; i++) {
            wordArr.push(new letter_1.Letter(word[i]));
            // Because Letter objects initialized with a space character (' ') has its hasBeenGuessed property set to true,
            // check if character has been guessed 
            if (wordArr[i].hasBeenGuessed) {
                this.correctCharacters++;
            }
        }
        return wordArr;
    }
    /*
    // Returns string representation of space separated characters for the current word.
    // Correctly guessed characters are shown as themselves (eg. 'a'), while non-guessed characters are
    // shown as underscore characters. example: ( _ e l l o  f r i _ n _ )
    */
    getWord() {
        const characterArr = this.wordArr.map(item => {
            return item.getChar();
        });
        return characterArr.join(' ');
    }
    // Check if the character argument exists anywhere in the word field
    guessChar(character) {
        let result = false;
        for (let i = 0; i < this.wordArr.length; i++) {
            const currentCharacter = this.wordArr[i];
            if (currentCharacter.checkChar(character)) {
                // Character is in word
                this.correctCharacters++;
                result = true;
            }
        }
        return result;
    }
    // Check if every character has been correctly guessed
    allCharactersGuessed() {
        return this.correctCharacters === this.wordArr.length;
    }
    // Reveals all characters for the word field
    revealWord() {
        this.wordArr.forEach(item => {
            item.revealChar();
        });
        return this.getWord();
    }
}
exports.Word = Word;
//# sourceMappingURL=word.js.map