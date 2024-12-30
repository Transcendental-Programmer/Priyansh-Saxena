export class CommandManager {
    constructor(terminal) {
        this.terminal = terminal;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.lastCommand = '';
        this.lastCommandTime = 0;
        this.commandCooldown = 1000; // 1 second cooldown
        
        // ...existing constructor code...
    }

    async executeCommand(commandStr) {
        if (commandStr.trim() === '') return;

        // Check for duplicate command within cooldown period
        const now = Date.now();
        if (commandStr === this.lastCommand && 
            now - this.lastCommandTime < this.commandCooldown) {
            this.terminal.print('Please wait before repeating the same command.\n');
            return;
        }

        this.lastCommand = commandStr;
        this.lastCommandTime = now;
        this.addToHistory(commandStr);

        if (this.terminal.commandInProgress) {
            this.terminal.print('Command in progress, please wait...\n');
            return;
        }

        try {
            this.terminal.commandInProgress = true;
            const [cmd, ...args] = commandStr.split(' ');
            const command = this.commands[cmd];

            if (command) {
                await command(...args);
            } else {
                this.terminal.print(`Command not found: ${cmd}. Type 'help' for available commands.\n`);
            }
        } finally {
            this.terminal.commandInProgress = false;
        }
    }

    // ...existing code...
}
