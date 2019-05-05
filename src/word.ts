import {Letter} from './letter';

export class Word {
  correctCharacters: number;
  wordArr: Letter[];

  constructor(word: string) {
    this.correctCharacters = 0;
    this.wordArr = this.constructWord(word);
  }

  // Create an array of Letter objects
  constructWord(word: string): Letter[] {
    const wordArr: Letter[] = [];
    for (let i = 0; i < word.length; i++) {
      wordArr.push(new Letter(word[i]));
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
  getWord(): string {
    const characterArr: string[] = this.wordArr.map(item => {
      return item.getChar();
    });
    return characterArr.join(' ');
  }

  // Check if the character argument exists anywhere in the word field
  guessChar(character: string): boolean {
    let result = false;
    for (let i = 0; i < this.wordArr.length; i++) {
      const currentCharacter: Letter = this.wordArr[i];
      if (currentCharacter.checkChar(character)) {
        // Character is in word
        this.correctCharacters++;
        result = true;
      }
    }
    return result;
  }

  // Check if every character has been correctly guessed
  allCharactersGuessed(): boolean {
    return this.correctCharacters === this.wordArr.length;
  }

  // Reveals all characters for the word field
  revealWord(): string {
    this.wordArr.forEach(item => {
      item.revealChar();
    });
    return this.getWord();
  }
}
