import { SystemCommands } from './SystemCommands.js';
import { PortfolioCommands } from './PortfolioCommands.js';
import { GameCommands } from './GameCommands.js';

export class CommandManager {
    constructor(terminal) {
        this.terminal = terminal;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.commands = {
            ...SystemCommands.getCommands(terminal),
            ...PortfolioCommands.getCommands(terminal),
            ...GameCommands.getCommands(terminal)
        };
    }

    async executeCommand(commandStr) {
        if (commandStr.trim() === '') return;

        this.addToHistory(commandStr);

        if (this.terminal.isTyping) {
            this.terminal.commandQueue.push(commandStr);
            return;
        }

        const [cmd, ...args] = commandStr.split(' ');
        const command = this.commands[cmd];

        if (command) {
            await command(...args);
        } else {
            this.terminal.print(`Command not found: ${cmd}. Type 'help' for available commands.\n`);
        }
    }

    addToHistory(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length) {
            this.historyIndex++;
        }
        
        return this.commandHistory[this.historyIndex] || '';
    }
}
