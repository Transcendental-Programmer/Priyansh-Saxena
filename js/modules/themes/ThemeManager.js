export class ThemeManager {
    constructor() {
        this.currentTheme = 'dracula'; // Ensure default theme is 'dracula'
        this.themes = {
            'default': {
                name: 'Default',
                description: 'Classic terminal look'
            },
            'cyberpunk': {
                name: 'Cyberpunk',
                description: 'Neon-futuristic style'
            },
            'retro': {
                name: 'Retro',
                description: 'Old-school CRT monitor'
            },
            'dracula': {
                name: 'Dracula',
                description: 'Dark and sophisticated'
            },
            'ocean': {
                name: 'Ocean',
                description: 'Deep sea inspired theme'
            }
        };
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) return false;

        // Remove all existing theme classes from both body and terminal
        document.body.classList.remove(...Object.keys(this.themes).map(t => `theme-${t}`));
        
        // Add new theme class to body
        document.body.classList.add(`theme-${themeName}`);
        
        // Apply theme with transition effect
        this.applyThemeTransition(themeName);
        
        this.currentTheme = themeName;
        return true;
    }

    applyThemeTransition(themeName) {
        const terminal = document.querySelector('.terminal');
        terminal.style.opacity = '0.7';
        
        setTimeout(() => {
            terminal.style.opacity = '1';
        }, 300);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return Object.keys(this.themes);
    }

    getThemes() {
        return Object.entries(this.themes).map(([id, theme]) => ({
            id,
            name: theme.name,
            description: theme.description
        }));
    }
}
