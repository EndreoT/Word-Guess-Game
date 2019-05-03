export default interface LetterInterface {
    character: string;
    hasBeenGuessed: boolean;
    getChar(): string;
    checkChar(character: string): boolean;
    revealChar(): void;
}
