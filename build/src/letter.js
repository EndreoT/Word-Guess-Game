"use strict";
const placeholder = '_';
class Letter {
    constructor(character) {
        this.character = character;
        if (character === ' ') {
            this.hasBeenGuessed = true;
        }
        else {
            this.hasBeenGuessed = false;
        }
    }
    getChar() {
        if (this.hasBeenGuessed) {
            return this.character;
        }
        return placeholder;
    }
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
module.exports = Letter;
//# sourceMappingURL=letter.js.map