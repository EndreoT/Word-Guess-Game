const inquirer = require('inquirer');

import { Game } from './game';


async function main(): Promise<any> {
  const game: Game = new Game();

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
