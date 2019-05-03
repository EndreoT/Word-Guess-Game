const Letter = require('./letter');

class Word {
  constructor(word) {
    this.wordArr = this.constructWord(word); // Letter[]
    this.correctCharacters = 0;
  }

  constructWord(word) {
    const wordArr = [];
    for (let i = 0; i < word.length; i++) {
      wordArr.push(new Letter(word[i]))
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
    // this.wordArr.forEach(item => {
    //   if (!item.hasBeenGuessed() && item.checkChar(character)) {
    //     this.correctCharacters++;
    //   }
    // })
    
    for (let i = 0; i < this.wordArr.length; i++) {
      const currentCharacter = this.wordArr[i]
      if (currentCharacter.hasBeenGuessed && currentCharacter.character === character) {
        return false; // Character has been guessed already
      }
      if (currentCharacter.checkChar(character)) {
        this.correctCharacters++;
      }
    }
    return true;
    
  }

  allCharactersGuessed() {
    return this.correctCharacters === this.wordArr.length;
  }
}

module.exports = Word;

// const wordStr = 'alphabet';
// const word = new Word(wordStr)
// console.log(word.wordArr)

// word.guessChar('a')
// console.log(word.getWord())
// console.log(word.correctCharacters)