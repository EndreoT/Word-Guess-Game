declare const placeholder = "_";
declare class Letter {
    character: string;
    hasBeenGuessed: boolean;
    constructor(character: string);
    getChar(): string;
    checkChar(character: string): boolean;
    revealChar(): void;
}
