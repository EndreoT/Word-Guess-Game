import {Letter} from './letter';

export class Word {
  correctCharacters: number;
  wordArr: Letter[];

  constructor(word: string) {
    this.correctCharacters = 0;
    this.wordArr = this.constructWord(word);
  }

  constructWord(word: string): Letter[] {
    const wordArr: Letter[] = [];
    for (let i: number = 0; i < word.length; i++) {
      wordArr.push(new Letter(word[i]))
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
  getWord(): string {
    const characterArr: string[] = this.wordArr.map(item => {
      return item.getChar();
    });
    return characterArr.join(' ');
  }

  guessChar(character: string): boolean {
    let result: boolean = false;
    for (let i: number = 0; i < this.wordArr.length; i++) {
      const currentCharacter: Letter = this.wordArr[i]
      if (currentCharacter.checkChar(character)) {
        // Character is in word
        this.correctCharacters++;
        result = true
      }
    }
    return result;
  }

  allCharactersGuessed(): boolean {
    return this.correctCharacters === this.wordArr.length;
  }

  revealWord(): string {
    this.wordArr.forEach(item => {
      item.revealChar();
    })
    return this.getWord();
  }
}
