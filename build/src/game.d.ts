import { Word } from './word';
export declare class Game {
    words: string[];
    currentWord: string;
    wordObj: Word;
    wins: number;
    losses: number;
    guessesLeft: number;
    guessedLetters: Set<string>;
    constructor();
    chooseRandomWord(): void;
    initializeGame(): void;
    printDivider(): void;
    playRound(): Promise<any>;
    validateGuess(guessedLetter: string): boolean;
    printWord(): void;
}
