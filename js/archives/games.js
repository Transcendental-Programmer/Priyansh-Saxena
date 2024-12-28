class TerminalGames {
    static createGameContainer() {
        const container = document.createElement('div');
        container.className = 'game-container';
        return container;
    }

    static snake() {
        const container = this.createGameContainer();
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const scale = 10;
        const rows = canvas.height / scale;
        const columns = canvas.width / scale;

        let snake = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale,
            dx: scale,
            dy: 0,
            cells: [],
            maxCells: 4
        };

        let food = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };

        let gameLoop = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            snake.x += snake.dx;
            snake.y += snake.dy;

            if (snake.x < 0) snake.x = canvas.width - scale;
            if (snake.x >= canvas.width) snake.x = 0;
            if (snake.y < 0) snake.y = canvas.height - scale;
            if (snake.y >= canvas.height) snake.y = 0;

            snake.cells.unshift({ x: snake.x, y: snake.y });
            if (snake.cells.length > snake.maxCells) snake.cells.pop();

            // Draw food
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.x, food.y, scale, scale);

            // Draw snake
            ctx.fillStyle = '#0f0';
            snake.cells.forEach((cell, index) => {
                ctx.fillRect(cell.x, cell.y, scale - 1, scale - 1);
                if (cell.x === food.x && cell.y === food.y) {
                    snake.maxCells++;
                    food.x = Math.floor(Math.random() * columns) * scale;
                    food.y = Math.floor(Math.random() * rows) * scale;
                }
                for (let i = index + 1; i < snake.cells.length; i++) {
                    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                        clearInterval(gameLoop);
                        alert('Game Over! Score: ' + (snake.maxCells - 4));
                        return;
                    }
                }
            });
        }, 100);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && snake.dx === 0) {
                snake.dx = -scale;
                snake.dy = 0;
            }
            else if (e.key === 'ArrowRight' && snake.dx === 0) {
                snake.dx = scale;
                snake.dy = 0;
            }
            else if (e.key === 'ArrowUp' && snake.dy === 0) {
                snake.dx = 0;
                snake.dy = -scale;
            }
            else if (e.key === 'ArrowDown' && snake.dy === 0) {
                snake.dx = 0;
                snake.dy = scale;
            }
        });

        return container;
    }
}
