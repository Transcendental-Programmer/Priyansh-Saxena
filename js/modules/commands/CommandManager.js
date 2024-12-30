import { SystemCommands } from './SystemCommands.js';
import { PortfolioCommands } from './PortfolioCommands.js';
import { GameCommands } from './GameCommands.js';

export class CommandManager {
    constructor(terminal) {
        this.terminal = terminal;
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Define commands mapping
        this.commands = {
            'about': async () => await PortfolioCommands.showAboutWithAnimation(terminal),
            'education': async () => await PortfolioCommands.showEducationWithAnimation(terminal),
            'experience': async () => await PortfolioCommands.showExperienceWithAnimation(terminal),
            'skills': async () => await PortfolioCommands.showSkillsWithAnimation(terminal),
            'projects': async () => await PortfolioCommands.showProjectsWithAnimation(terminal),
            'achievements': async () => await PortfolioCommands.showAchievementsWithAnimation(terminal),
            'contact': async () => await PortfolioCommands.showContactWithAnimation(terminal),
            ...SystemCommands.getCommands(terminal),
            ...GameCommands.getCommands(terminal)
        };
    }

    async executeCommand(commandStr) {
        if (commandStr.trim() === '') return;

        this.addToHistory(commandStr);
        const [cmd, ...args] = commandStr.toLowerCase().trim().split(' ');
        
        try {
            if (this.commands[cmd]) {
                await this.commands[cmd](...args);
            } else {
                this.terminal.print(`Command not found: ${cmd}. Type 'help' for available commands.\n`);
            }
        } catch (error) {
            console.error('Error executing command:', error);
            this.terminal.print('An error occurred while executing the command.\n');
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
