"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const game_1 = require("./game");
async function main() {
    const game = new game_1.Game();
    // Main game loop
    while (true) {
        console.log('Wins: ' + game.wins);
        console.log('Losses: ' + game.losses);
        await game.playRound();
        // Check if player wants to play again
        const answer = await inquirer.prompt({
            type: 'confirm',
            name: 'playAgain',
            message: 'Play again?',
        });
        if (!answer.playAgain) {
            break;
        }
    }
    console.log('Thanks for playing!');
}
main();
//# sourceMappingURL=index.js.map