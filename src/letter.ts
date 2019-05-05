const placeholder = '_';


export class Letter {
  character: string;
  hasBeenGuessed: boolean;

  constructor(character: string) {
    this.character = character;

    // Check if character is the space character (' ')
    if (character === ' ') {
      this.hasBeenGuessed = true;
    } else {
      this.hasBeenGuessed = false;
    }
  }

  // If character has been correctly guessed, return the character. Else, return the placeholder character.
  getChar(): string {
    if (this.hasBeenGuessed) {
      return this.character;
    }
    return placeholder;
  }

  // Check if character argument is equal to the actual character field
  checkChar(character: string): boolean {
    if (this.character === character) {
      this.revealChar();
      return true;
    }
    return false;
  }

  revealChar(): void {
    this.hasBeenGuessed = true;
  }
}

