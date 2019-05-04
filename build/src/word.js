"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Letter = require('./letter');
class Word {
    constructor(word) {
        this.correctCharacters = 0;
        this.wordArr = this.constructWord(word);
    }
    constructWord(word) {
        const wordArr = [];
        for (let i = 0; i < word.length; i++) {
            wordArr.push(new Letter(word[i]));
            // Check if character is a space character (' ')
            if (wordArr[i].hasBeenGuessed) {
                this.correctCharacters++;
            }
        }
        return wordArr;
    }
    /*
    // Returns string representation of space separated character for the current word.
    // Correctly guessed characters are shown as themselves (eg. 'a'), while non-guessed characters are
    // shown as underscore characters. example: ( _ e l l o  f r i _ n _ )
    */
    getWord() {
        const characterArr = this.wordArr.map(item => {
            return item.getChar();
        });
        return characterArr.join(' ');
    }
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
    allCharactersGuessed() {
        return this.correctCharacters === this.wordArr.length;
    }
    revealWord() {
        this.wordArr.forEach(item => {
            item.revealChar();
        });
        return this.getWord();
    }
}
module.exports = Word;
//# sourceMappingURL=word.js.map