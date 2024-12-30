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
import { PortfolioCommands } from '../commands/PortfolioCommands.js';

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

        this.setupScrollBehavior();
        this.initialize();
        this.initializeNavigation();
        this.setupKeyboardShortcuts();
        this.setupTabs();
        this.setupAutoScroll();
        this.setupEventListeners();
        this.initializeFloatingNavigation();
        this.commandInProgress = false;
        this.lastCommand = '';
        this.lastCommandTime = 0;
        this.commandCooldown = 1000; // 1 second cooldown between same commands
        this.typingSpeed = 5; // Decreased from 10
        this.lastOutputPosition = 0;
        this.previewContent = document.querySelector('.preview-content');
        this.setupEventListeners();
        this.initializeTabs();
        
        // Print welcome message
        this.print(`Welcome to Priyansh Saxena's Portfolio Terminal
Type 'help' to see available commands\n\n`);
    }

    async initialize() {
        await this.bootManager.startBoot();
        this.eventHandler.setupListeners();
        this.outputManager.printWelcomeMessage();
    }

    async executeCommand(command) {
        if (this.commandInProgress) {
            this.commandQueue.push(command);
            return;
        }
        await this.commandManager.executeCommand(command);
    }

    clear() {
        this.outputManager.clear();
    }

    print(text) {
        this.outputManager.print(text);
        this.output.scrollTop = this.output.scrollHeight;
    }

    async typeText(text, speed = this.typingSpeed) {
        this.isTyping = true;
        for (let char of text) {
            this.print(char);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        this.isTyping = false;
        
        // Process any queued commands
        if (this.commandQueue.length > 0) {
            const nextCommand = this.commandQueue.shift();
            await this.executeCommand(nextCommand);
        }
    }

    scrollToLastOutput() {
        requestAnimationFrame(() => {
            if (this.lastOutputPosition) {
                this.output.scrollTo({
                    top: this.lastOutputPosition,
                    behavior: 'smooth'
                });
            } else {
                this.output.scrollTop = this.output.scrollHeight;
            }
        });
    }

    initializeNavigation() {
        // Setup section navigation
        document.querySelectorAll('.nav-section').forEach(section => {
            section.addEventListener('click', (e) => {
                const command = section.dataset.section;
                this.handleNavClick(command);
            });
        });

        // Setup quick nav
        document.querySelectorAll('.quick-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const command = item.dataset.command;
                this.handleNavClick(command);
            });
        });
    }

    async handleNavClick(command) {
        if (this.commandInProgress) {
            return;
        }

        try {
            this.commandInProgress = true;
            
            // Remove highlight from all sections first
            document.querySelectorAll('.nav-section').forEach(item => {
                item.classList.remove('active');
            });

            // Add highlight to the clicked section
            const section = document.querySelector(`.nav-section[data-section="${command}"]`);
            if (section) {
                section.classList.add('active');
            }

            // Execute the command
            await this.commandManager.executeCommand(command);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            this.commandInProgress = false;
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key.toLowerCase()) {
                    case 'a': this.executeCommand('about'); break;
                    case 'e': this.executeCommand('education'); break;
                    case 'x': this.executeCommand('experience'); break;
                    case 's': this.executeCommand('skills'); break;
                    case 'p': this.executeCommand('projects'); break;
                    case 'h': this.executeCommand('achievements'); break;
                    case 'c': this.executeCommand('contact'); break;
                }
            }
        });
    }

    setupTabs() {
        document.querySelectorAll('.terminal-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.terminal-tab, .terminal-body').forEach(el => {
            el.classList.remove('active');
        });
    
        // Activate selected tab and content
        document.querySelector(`.terminal-tab[data-tab="${tabName}"]`).classList.add('active');
        document.querySelector(`.terminal-body[data-content="${tabName}"]`).classList.add('active');
    
        // Immediately update preview content when switching to preview or combined tabs
        if (tabName === 'preview' || tabName === 'combined') {
            this.updatePreviewContent();
        }
    }
    
    async updatePreviewContent() {
        const sections = ['about', 'education', 'experience', 'skills', 'projects', 'achievements'];
        const previewContent = document.querySelector('.preview-content');
        const combinedPreview = document.querySelector('.preview-side');
        
        let content = '';
        
        // Generate content for each section
        for (const section of sections) {
            content += `
                <div class="preview-section" id="preview-${section}">
                    <div class="preview-title">${section.toUpperCase()}</div>
                    <div class="preview-body">
                        ${await this.commandManager.executeCommand(section, true)}
                    </div>
                </div>
            `;
        }

        // Update both preview and combined view contents
        if (previewContent) previewContent.innerHTML = content;
        if (combinedPreview) combinedPreview.innerHTML = content;
    }

    updateAllPreviews() {
        // Fetch and display all sections in a clean format
        const sections = ['about', 'education', 'experience', 'skills', 'projects', 'achievements'];
        const preview = sections.map(section => this.getPreviewContent(section)).join('\n\n');
        
        if (document.querySelector('.terminal-body[data-content="preview"]')) {
            document.querySelector('.terminal-body[data-content="preview"]').innerHTML = preview;
        }
    }

    setupAutoScroll() {
        // Create an observer for content changes
        this.observer = new MutationObserver(() => this.scrollToBottom());
        
        // Configure the observer
        this.observer.observe(this.output, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            const scrollOptions = {
                top: this.output.scrollHeight,
                behavior: 'smooth'
            };
            this.output.scrollTo(scrollOptions);
        });
    }

    initializeFloatingNavigation() {
        // Setup section navigator clicks
        document.querySelectorAll('.nav-section').forEach(section => {
            section.addEventListener('click', () => {
                const command = section.dataset.section;
                this.executeCommand(command);
                this.scrollToLatestOutput();
            });
        });

        // Setup quick nav clicks
        document.querySelectorAll('.quick-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const command = item.dataset.command;
                this.executeCommand(command);
                this.scrollToLatestOutput();
            });
        });
    }

    scrollToLatestOutput() {
        // Find the last command output
        const lastOutput = this.output.lastElementChild;
        if (lastOutput) {
            lastOutput.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add method to scroll in preview mode
    scrollToSection(sectionId) {
        const previewSection = document.querySelector(`#preview-${sectionId}`);
        if (previewSection) {
            previewSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Enhanced command execution with better scrolling
    handleCommand(command) {
        // Execute in terminal mode
        if (this.currentTab === 'terminal') {
            this.executeCommand(command);
        }
        // Scroll to section in preview mode
        else if (this.currentTab === 'preview') {
            this.scrollToSection(command);
        }
        // Handle both in combined mode
        else if (this.currentTab === 'combined') {
            this.executeCommand(command);
            this.scrollToSection(command);
        }
    }

    setupScrollBehavior() {
        // Create MutationObserver to watch for content changes
        this.observer = new MutationObserver(() => {
            this.scrollToBottom();
        });

        // Configure the observer
        this.observer.observe(this.output, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    setupEventListeners() {
        // Remove any existing listeners first to prevent duplicates
        const navItems = document.querySelectorAll('.nav-section, .quick-nav-item');
        navItems.forEach(item => {
            item.replaceWith(item.cloneNode(true));
        });

        // Add new listeners
        document.querySelectorAll('.nav-section, .quick-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const command = item.dataset.section || item.dataset.command;
                this.handleNavClick(command);
            }, { once: true }); // Use once: true to prevent multiple attachments
        });

        this.input.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim();
                this.input.value = '';
                await this.executeCommand(command);
            }
        });
    }

    scrollToLatest() {
        const elements = this.output.children;
        if (elements.length > 0) {
            const lastElement = elements[elements.length - 1];
            this.observer.observe(lastElement);
            
            // Force scroll after a small delay to ensure content is rendered
            setTimeout(() => {
                lastElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }

    initializeTabs() {
        document.querySelectorAll('.terminal-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        this.updatePreviewContent();
    }

    switchTabById(tabId) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.terminal-tab, .terminal-body').forEach(el => {
            el.classList.remove('active');
        });

        // Activate selected tab and content
        document.querySelector(`.terminal-tab[data-tab="${tabId}"]`).classList.add('active');
        document.querySelector(`.terminal-body[data-content="${tabId}"]`).classList.add('active');

        // Auto-update preview when switching to preview or combined tabs
        if (tabId === 'preview' || tabId === 'combined') {
            this.updatePreviewContent();
        }
    }

    async updatePreviewContent() {
        const sections = [
            { id: 'about', icon: '📌', title: 'About Me' },
            { id: 'education', icon: '📚', title: 'Education' },
            { id: 'experience', icon: '💼', title: 'Experience' },
            { id: 'skills', icon: '🛠️', title: 'Skills' },
            { id: 'projects', icon: '🚀', title: 'Projects' },
            { id: 'achievements', icon: '🏆', title: 'Achievements' }
        ];
    
        const previewContent = document.querySelector('.preview-content');
        const combinedPreview = document.querySelector('.preview-side');
        
        let content = '';
        
        for (const section of sections) {
            const sectionContent = await this.getSectionContent(section.id);
            content += `
                <div class="preview-section" id="preview-${section.id}">
                    <div class="preview-title">${section.icon} ${section.title}</div>
                    <div class="preview-body">
                        ${sectionContent}
                    </div>
                </div>
            `;
        }
    
        if (previewContent) previewContent.innerHTML = content;
        if (combinedPreview) combinedPreview.innerHTML = content;
    }
    
    getSectionContent(section) {
        switch (section) {
            case 'about':
                return this.commandManager.getAboutText();
            case 'education':
                return this.commandManager.getEducationText();
            case 'experience':
                return this.commandManager.getExperienceText();
            case 'skills':
                return this.commandManager.getSkillsText();
            case 'projects':
                return this.commandManager.getProjectsText();
            case 'achievements':
                return this.commandManager.getAchievementsText();
            default:
                return '';
        }
    }
}
