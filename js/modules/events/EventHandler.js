export class EventHandler {
    constructor(terminal) {
        this.terminal = terminal;
        this.konamiSequence = [];
    }

    setupListeners() {
        this.setupInputListener();
        this.setupKeyboardListener();
        this.setupEasterEggs();
    }

    setupInputListener() {
        this.terminal.input.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const command = this.terminal.input.value.trim();
                this.terminal.input.value = '';
                await this.terminal.executeCommand(command);
            }
        });
    }

    setupKeyboardListener() {
        this.terminal.input.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    const prevCommand = this.terminal.commandManager.navigateHistory('up');
                    this.terminal.input.value = prevCommand;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const nextCommand = this.terminal.commandManager.navigateHistory('down');
                    this.terminal.input.value = nextCommand;
                    break;
                case 'Tab':
                    e.preventDefault();
                    this.handleTabCompletion();
                    break;
            }
        });
    }

    setupEasterEggs() {
        document.addEventListener('keydown', (e) => {
            this.konamiSequence.push(e.key);
            if (this.konamiSequence.length > 10) {
                this.konamiSequence.shift();
            }
            
            this.checkKonamiCode();
        });
    }

    checkKonamiCode() {
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        if (this.konamiSequence.join(',') === konami.join(',')) {
            this.terminal.themeManager.setTheme('cyberpunk');
            this.terminal.typeText('🎮 Konami code activated!\n');
        }
    }

    handleTabCompletion() {
        const input = this.terminal.input.value.toLowerCase();
        const commands = Object.keys(this.terminal.commandManager.commands);
        const possibilities = commands.filter(cmd => cmd.startsWith(input));

        if (possibilities.length === 1) {
            this.terminal.input.value = possibilities[0];
        } else if (possibilities.length > 1) {
            this.terminal.print('\nPossible commands:\n' + possibilities.join('  ') + '\n');
        }
    }
}
