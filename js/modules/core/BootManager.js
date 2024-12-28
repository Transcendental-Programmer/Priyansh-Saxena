export class BootManager {
    constructor(terminal) {
        this.terminal = terminal;
    }

    async startBoot() {
        const loadingScreen = document.querySelector('.loading-screen');
        const loadingText = document.querySelector('.loading-text');
        
        const bootMessages = [
            'Initializing system...',
            'Loading kernel...',
            'Mounting file systems...',
            'Starting terminal services...',
            'Loading portfolio data...',
            'System ready!'
        ];

        for (const message of bootMessages) {
            loadingText.textContent = message;
            await this.delay(800);
        }

        await this.delay(500);
        loadingScreen.style.opacity = '0';
        await this.delay(500);
        loadingScreen.style.display = 'none';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
