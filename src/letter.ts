const placeholder = '_'


export class Letter {
  character: string;
  hasBeenGuessed: boolean;

  constructor(character: string) {
    this.character = character;
    if (character === ' ') {
      this.hasBeenGuessed = true;
    } else {
      this.hasBeenGuessed = false;
    }
  }

  getChar(): string {
    if (this.hasBeenGuessed) {
      return this.character;
    }
    return placeholder;
  }

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

