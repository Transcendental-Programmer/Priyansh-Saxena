export class GameCommands {
    static getCommands(terminal) {
        return {
            'games': () => terminal.print(this.getGamesText()),
            'matrix': () => terminal.matrixEffect.toggle(),
            'snake': () => terminal.gameManager.startGame('snake')
        };
    }

    static getGamesText() {
        return `
Available Games:
---------------
snake   - Classic Snake Game
matrix  - Toggle Matrix Effect
\n`;
    }
}
