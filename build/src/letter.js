"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const placeholder = '_';
class Letter {
    constructor(character) {
        this.character = character;
        // Check if character is the space character (' ')
        if (character === ' ') {
            this.hasBeenGuessed = true;
        }
        else {
            this.hasBeenGuessed = false;
        }
    }
    // If character has been correctly guessed, return the character. Else, return the placeholder character.
    getChar() {
        if (this.hasBeenGuessed) {
            return this.character;
        }
        return placeholder;
    }
    // Check if character argument is equal to the actual character field
    checkChar(character) {
        if (this.character === character) {
            this.revealChar();
            return true;
        }
        return false;
    }
    revealChar() {
        this.hasBeenGuessed = true;
    }
}
exports.Letter = Letter;
//# sourceMappingURL=letter.js.map