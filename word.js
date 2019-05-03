const Letter = require('./letter');

class Word {
  constructor(word) {
    this.wordArr = this.constructWord(word);
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
    this.wordArr.forEach(item => {
      if (item.checkChar(character)) {
        this.correctCharacters++;
      }
    })
  }
}

module.exports = Word;

// const wordStr = 'alphabet';
// const word = new Word(wordStr)
// console.log(word.wordArr)

// word.guessChar('a')
// console.log(word.getWord())
// console.log(word.correctCharacters)