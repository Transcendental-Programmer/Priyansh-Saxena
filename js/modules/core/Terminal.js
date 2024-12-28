import { CommandManager } from '../commands/CommandManager.js';
import { ThemeManager } from '../themes/ThemeManager.js';
import { EventHandler } from '../events/EventHandler.js';
import { FileSystem } from '../filesystem/FileSystem.js';
import { BootManager } from './BootManager.js';
import { OutputManager } from './OutputManager.js';
import { GameManager } from '../games/GameManager.js';
import { MatrixEffect } from '../effects/MatrixEffect.js';
import { ASCIIAnimations } from '../effects/ASCIIAnimations.js';
import { WeatherService } from '../services/WeatherService.js';

export class Terminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('output');
        this.isTyping = false;
        this.commandQueue = [];
        
        this.commandManager = new CommandManager(this);
        this.themeManager = new ThemeManager();
        this.eventHandler = new EventHandler(this);
        this.fileSystem = new FileSystem();
        this.bootManager = new BootManager(this);
        this.outputManager = new OutputManager(this);
        this.gameManager = new GameManager(this);
        this.matrixEffect = new MatrixEffect();
        this.weatherService = new WeatherService();

        this.initialize();
    }

    async initialize() {
        await this.bootManager.startBoot();
        this.eventHandler.setupListeners();
        this.outputManager.printWelcomeMessage();
    }

    async executeCommand(command) {
        return this.commandManager.executeCommand(command);
    }

    clear() {
        this.outputManager.clear();
    }

    print(text) {
        this.outputManager.print(text);
    }

    async typeText(text, speed = 30) {
        return this.outputManager.typeText(text, speed);
    }
}
