export class SystemCommands {
    static getCommands(terminal) {
        return {
            'clear': () => terminal.clear(),
            'help': () => terminal.print(this.getHelpText()),
            'theme': (themeName) => {
                if (!themeName) {
                    const themes = terminal.themeManager.getThemes();
                    terminal.print('\nAvailable Themes:\n');
                    themes.forEach(theme => {
                        terminal.print(`${theme.id.padEnd(12)} - ${theme.description}\n`);
                    });
                    terminal.print('\nUsage: theme <name>\n');
                    return;
                }
                const success = terminal.themeManager.setTheme(themeName);
                if (success) {
                    terminal.print(`Theme changed to ${themeName}\n`);
                } else {
                    terminal.print(`Theme '${themeName}' not found. Use 'theme' to see available themes.\n`);
                }
            },
            'date': () => terminal.print(new Date().toLocaleString() + '\n'),
            'weather': async () => {
                terminal.print('Fetching weather data...\n');
                try {
                    const weather = await terminal.weatherService.getWeather();
                    terminal.print(terminal.weatherService.formatWeatherOutput(weather));
                } catch (error) {
                    terminal.print('Failed to fetch weather data. Please try again later.\n');
                }
            }
        };
    }

    static getHelpText() {
        return `
┌────────────────────────────────────────┐
│ Available Commands                      │
└────────────────────────────────────────┘

Portfolio Commands:
-----------------
about        Show my profile and contact info
education    Show educational background
experience   Display work experience
projects     View my project portfolio
skills       List technical skills
achievements Show notable achievements

File System Commands:
------------------
ls           List files in current directory
cat          Display file contents
tree         Show file system structure
download     Download my resume

System Commands:
--------------
clear        Clear terminal screen
help         Show this help message
theme        Change terminal theme (use 'theme' to see available options)
date         Show current date and time
whoami       Display current user info
echo         Echo input text

Weather & Games:
--------------
weather      Show current weather in Gwalior
games        Access available games
matrix       Toggle matrix animation

Type any command to execute it.
Add --help after a command for detailed usage.
\n`;
    }
}
