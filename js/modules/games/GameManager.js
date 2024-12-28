export class GameManager {
    constructor(terminal) {
        this.terminal = terminal;
    }

    createGameContainer() {
        const container = document.createElement('div');
        container.className = 'game-container';
        return container;
    }

    startSnakeGame() {
        const container = this.createGameContainer();
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        container.appendChild(canvas);

        // ... existing snake game code from games.js ...
        
        return container;
    }
}
