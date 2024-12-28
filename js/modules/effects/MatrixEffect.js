export class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.isActive = false;
        this.animationFrame = null;
        this.initialize();
    }

    initialize() {
        if (!this.canvas) {
            console.warn('Matrix canvas element not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.setupDrops();
    }

    setupCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Set initial drop positions
        this.drops = new Array(this.columns).fill(1);
        
        // Configure canvas context
        if (this.ctx) {
            this.ctx.font = `${this.fontSize}px monospace`;
        }
    }

    setupDrops() {
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }

    draw() {
        if (!this.ctx || !this.isActive) return;

        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set text color
        this.ctx.fillStyle = '#0F0';
        
        // Draw the symbols
        for (let i = 0; i < this.drops.length; i++) {
            // Random character to print
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset to top when hitting bottom
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        // Request next frame
        if (this.isActive) {
            this.animationFrame = requestAnimationFrame(() => this.draw());
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.canvas.style.display = 'block';
            this.draw();
        } else {
            this.canvas.style.display = 'none';
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            // Clear canvas
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}
