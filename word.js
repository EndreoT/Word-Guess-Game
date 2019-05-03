const Letter = require('./letter');

class Word {
  constructor(word) {
    this.wordArr = this.constructWord(word);
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
      item.checkChar(character)
    })
  }
}

const wordStr = 'alphabet';
const word = new Word(wordStr)
console.log(word.wordArr)

word.guessChar('a')
console.log(word.getWord())