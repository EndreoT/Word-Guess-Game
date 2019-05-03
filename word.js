const Letter = require('./letter');

const guessResult = {
  INCORRECT_GUESS: -1,
  ALREADY_GUESSED: 0,
  CORRECT_GUESS: 1
}

class Word {
  constructor(word) {
    this.correctCharacters = 0;
    this.wordArr = this.constructWord(word); // Letter[]
  }

  constructWord(word) {
    const wordArr = [];
    for (let i = 0; i < word.length; i++) {
      wordArr.push(new Letter(word[i]))
      // Check if character is a space (' ')
      if (wordArr[i].hasBeenGuessed) {
        this.correctCharacters++;
      }
    }
    return wordArr;
  }

  getWord() {
    const characterArr = this.wordArr.map(item => {
      return item.getChar();
    });
    return characterArr.join(' ');
  }

  guessChar(character) {
    let result;
    for (let i = 0; i < this.wordArr.length; i++) {
      const currentCharacter = this.wordArr[i]
      if (currentCharacter.hasBeenGuessed && currentCharacter.character === character) {
        return guessResult.ALREADY_GUESSED; // Character has been guessed already
      }
      if (currentCharacter.checkChar(character)) {
        this.correctCharacters++;
        result = guessResult.CORRECT_GUESS
      }
    }

    if (result === guessResult.CORRECT_GUESS) {
      return result;
    }
    return guessResult.INCORRECT_GUESS;
  }

  allCharactersGuessed() {
    return this.correctCharacters === this.wordArr.length;
  }

  revealWord() {
    this.wordArr.forEach(item => {
      item.revealChar();
    })
    return this.getWord();
  }
}

module.exports = {
  Word: Word,
  guessResult: guessResult,
};

// const wordStr = 'alphabet';
// const word = new Word(wordStr)
// console.log(word.wordArr)

// word.guessChar('a')
// console.log(word.getWord())
// console.log(word.correctCharacters)