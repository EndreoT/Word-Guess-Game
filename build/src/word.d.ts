import { Letter } from './letter';
export declare class Word {
    correctCharacters: number;
    wordArr: Letter[];
    constructor(word: string);
    constructWord(word: string): Letter[];
    getWord(): string;
    guessChar(character: string): boolean;
    allCharactersGuessed(): boolean;
    revealWord(): string;
}
