export class OutputManager {
    constructor(terminal) {
        this.terminal = terminal;
        this.output = terminal.output;
    }

    print(text) {
        this.output.innerHTML += text;
        this.scrollToBottom();
    }

    async typeText(text, speed = 30) {
        this.terminal.isTyping = true;
        let index = 0;
        
        try {
            while (index < text.length) {
                await new Promise(resolve => setTimeout(resolve, speed));
                this.output.innerHTML += text.charAt(index);
                this.scrollToBottom();
                index++;
            }
        } finally {
            this.terminal.isTyping = false;
            if (this.terminal.commandQueue.length > 0) {
                const nextCommand = this.terminal.commandQueue.shift();
                await this.terminal.executeCommand(nextCommand);
            }
        }
    }

    clear() {
        this.output.innerHTML = '';
        this.printWelcomeMessage();
    }

    printWelcomeMessage() {
        const welcome = `
╔════════════════════════════════════════════════╗
║     Welcome to Priyansh Saxena's Portfolio     ║
╚════════════════════════════════════════════════╝

Type 'help' to see available commands
Type 'about' to learn more about me
Type 'clear' to clear the terminal

`;
        this.typeText(welcome);
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
}
