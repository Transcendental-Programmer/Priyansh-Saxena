class TerminalPortfolio {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('output');
        this.commands = {
            'help': this.showHelp,
            'about': this.showAbout,
            'education': this.showEducation,
            'experience': this.showExperience,
            'projects': this.showProjects,
            'skills': this.showSkills,
            'achievements': this.showAchievements,
            'clear': this.clear,
            'theme': this.changeTheme,
            'social': this.showSocial,
            'games': this.showGames,
            'download': this.downloadResume,
            'ls': this.listFiles,
            'cat': this.catFile,
            'matrix': this.toggleMatrix,
            'date': this.showDate,
            'weather': this.showWeather,
            'whoami': this.showWhoami,
            'echo': this.echo,
            'tree': this.showTree
        };
        this.commandHistory = [];
        this.historyIndex = -1;
        this.typing = false;
        this.isTyping = false;
        this.commandQueue = [];
        this.currentTheme = 'default';
        this.themes = {
            'default': {
                bg: '#1e1e1e',
                text: '#f0f0f0',
                prompt: '#00ff00'
            },
            'cyberpunk': {
                bg: '#2b0035',
                text: '#ff00ff',
                prompt: '#00ffff'
            },
            'retro': {
                bg: '#000000',
                text: '#33ff33',
                prompt: '#33ff33'
            }
        };
        this.fileSystem = {
            'resume.pdf': 'My resume',
            'projects/': {
                'project1.md': 'Project 1 details',
                'project2.md': 'Project 2 details'
            },
            'contacts.txt': 'Contact information'
        };
        this.easterEggs = {
            'matrix': this.toggleMatrixEffect,
            'rainbow': this.enableRainbowMode,
            'hack': this.startHackingEffect,
            'konami': this.handleKonamiCode
        };
        this.konamiSequence = [];
        this.bootSequence();
        this.setupEventListeners();
        this.setupEasterEggs();
    }

    async bootSequence() {
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
            await new Promise(r => setTimeout(r, 800));
        }

        await new Promise(r => setTimeout(r, 500));
        loadingScreen.style.opacity = '0';
        await new Promise(r => setTimeout(r, 500));
        loadingScreen.style.display = 'none';

        this.initializeTerminal();
    }

    initializeTerminal() {
        this.input.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim().toLowerCase();
                this.input.value = '';
                
                if (this.isTyping) {
                    // If typing, store command in queue
                    this.commandQueue.push(command);
                    return;
                }
                
                await this.executeCommand(command);
            }
        });

        this.printWelcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateHistory('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateHistory('down');
                    break;
                case 'Tab':
                    e.preventDefault();
                    this.autoComplete();
                    break;
            }
        });
    }

    async typeText(text, speed = 30) {
        this.isTyping = true;
        let index = 0;
        
        try {
            while (index < text.length) {
                await new Promise(resolve => setTimeout(resolve, speed));
                this.output.innerHTML += text.charAt(index);
                this.output.scrollTop = this.output.scrollHeight;
                index++;
            }
        } finally {
            this.isTyping = false;
            // Process any queued commands
            if (this.commandQueue.length > 0) {
                const nextCommand = this.commandQueue.shift();
                await this.executeCommand(nextCommand);
            }
        }
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

    async executeCommand(command) {
        if (command.trim() !== '') {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
        }

        // If currently typing, add command to queue and return
        if (this.isTyping) {
            return;
        }

        this.print(`visitor@portfolio:~$ ${command}\n`);
        
        if (command in this.commands) {
            await this.commands[command].call(this);
        } else if (command !== '') {
            this.print(`Command not found: ${command}. Type 'help' for available commands.\n`);
        }

        // Add command execution sound
        const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAgmgAICAgPDw8PDxcXFxcXHx8fHx8mJiYmJi4uLi4uNTU1NTU9PT09PUVFRUVFTU1NTU1UVFRUVFxcXFxcY2NjY2Nra2tra3Jycn//');
        audio.volume = 0.1;
        audio.play();
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length) {
            this.historyIndex++;
        }

        this.input.value = this.commandHistory[this.historyIndex] || '';
    }

    autoComplete() {
        const input = this.input.value.toLowerCase();
        const possibilities = Object.keys(this.commands).filter(cmd => 
            cmd.startsWith(input)
        );

        if (possibilities.length === 1) {
            this.input.value = possibilities[0];
        } else if (possibilities.length > 1) {
            this.print('\nPossible commands:\n' + possibilities.join('  ') + '\n');
        }
    }

    print(text) {
        this.output.innerHTML += text;
        this.output.scrollTop = this.output.scrollHeight;
    }

    showHelp() {
        const help = `
┌────────────────────────────────────────┐
│ Available Commands                      │
└────────────────────────────────────────┘
help         Show this help message
about        About me and contact information
education    My educational background
experience   Work experience
projects     My projects
skills       Technical skills
achievements Notable achievements
clear        Clear the terminal
theme        Change terminal theme
social       Show social media links
games        Show available games
download     Download my resume
ls           List files in the file system
cat          Display file content
matrix       Toggle matrix animation
date         Show current date and time
weather      Show current weather
whoami       Show user information
echo         Echo input text
tree         Show file system tree
\n`;
        this.typeText(help);
    }

    showAbout() {
        const about = `
┌────────────────────────────────────────┐
│ About Me                               │
└────────────────────────────────────────┘
Name: Priyansh Saxena
Roll Number: 2022IMT089
Institute: ABV-IIITM Gwalior
Role: Full-Stack Machine Learning Engineer

Contact:
📱 +91-7417513597
📧 priyena.career@gmail.com
🔗 GitHub: Transcendental-Programmer

I'm a passionate developer specializing in full-stack development and machine learning,
currently pursuing B.Tech in IT at IIITM Gwalior.
\n`;
        this.typeText(about);
    }

    showEducation() {
        const education = `
┌────────────────────────────────────────┐
│ Education                              │
└────────────────────────────────────────┘
🎓 B.Tech (IT)
   IIITM Gwalior (2022-PRESENT)
   CGPA: 7.5

🎓 Senior Secondary (2022)
   CBSE Board
   Percentage: 90.2%

🎓 Secondary (2020)
   CBSE Board
   Percentage: 96.6%
\n`;
        this.typeText(education);
    }

    showExperience() {
        const experience = `
┌────────────────────────────────────────┐
│ Work Experience                        │
└────────────────────────────────────────┘
💼 Jaffa.ai | Full-Stack Generative AI Engineer Internship
   July 2024 - December 2024

   • Designed Graph-based RAG system (Neo4j, LangChain, Azure OpenAI)
     ↳ Improved query accuracy: 65% → 95%
     ↳ Reduced latency by 40%

   • Created First-Cut Generation Tool
     ↳ Used Flask and Azure OpenAI
     ↳ Achieved 90% accuracy in AI summaries

   • Optimized XBRL parsing pipeline
     ↳ 25% faster data integration
     ↳ Technologies: Python, pyxbrl, BeautifulSoup4

   • DevOps Improvements
     ↳ Optimized Github Actions workflows
     ↳ 99.9% uptime for 5+ microservices
\n`;
        this.typeText(experience);
    }

    showProjects() {
        const projects = `
┌────────────────────────────────────────┐
│ Projects                               │
└────────────────────────────────────────┘
🚀 Privacy-Preserving Financial Data Generation System
   August 2024 - December 2024
   • Federated learning framework with RAG integration
   • 92% statistical similarity achievement
   • Zero data leakage across 10+ institutions
   • 500+ concurrent model training sessions
   Tech: TensorFlow Federated, Hugging Face, PySyft, Docker, Kubernetes

🚀 Anomaly Detection in IoT Data Streams
   May 2024 - June 2024
   • Real-time processing of 10,000 data points/second
   • 98% accuracy in anomaly detection
   • 99.9% uptime with auto-scaling
   Tech: Apache Kafka, MQTT, Python, Docker, Kubernetes, MLflow
\n`;
        this.typeText(projects);
    }

    showSkills() {
        const skills = `
┌────────────────────────────────────────┐
│ Skills                                 │
└────────────────────────────────────────┘
💻 Programming & ML
   Python, C++, Java, GO, Kotlin, SQL
   TensorFlow, Keras, Scikit-Learn, OpenCV, LangChain

🔧 Backend & Data
   Django, Flask, FastAPI, Docker
   Streamlit, MLflow, Selenium, BeautifulSoup

☁️ Databases & Cloud
   MySQL, PostgreSQL, MongoDB, Neo4j
   AWS, Azure, MQTT, CI/CD (GitHub Actions), Kubernetes
\n`;
        this.typeText(skills);
    }

    showAchievements() {
        const achievements = `
┌────────────────────────────────────────┐
│ Achievements                           │
└────────────────────────────────────────┘
🏆 Institute Rank 5 in ICPC 2024-25
   Highest rank in the entire year batch

⭐ 4-Star rating on CodeChef (1803)
   Top 2% of 200,000+ active competitive programmers

👨‍💻 Knight badge on LeetCode
   350+ algorithmic problems solved

🔭 Indian Olympiad in Astronomy 2021-22
   Top 264 students nationwide among 20,000+ participants

📐 Aryabhatta Ganit Challenge
   Top 100 in CBSE Noida Region from 10,000+ participants
\n`;
        this.typeText(achievements);
    }

    clear() {
        this.output.innerHTML = '';
        this.printWelcomeMessage();
    }

    showTree() {
        const tree = `
📁 portfolio/
├── 📄 resume.pdf
├── 📁 projects/
│   ├── 📄 project1.md
│   └── 📄 project2.md
└── 📄 contacts.txt
`;
        this.typeText(tree);
    }

    async showWeather() {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Gwalior&appid=YOUR_API_KEY');
            const data = await response.json();
            const weather = `
🌤️ Current Weather in Gwalior:
Temperature: ${Math.round(data.main.temp - 273.15)}°C
Conditions: ${data.weather[0].description}
`;
            this.typeText(weather);
        } catch (error) {
            this.typeText('Weather service temporarily unavailable\n');
        }
    }

    showDate() {
        const now = new Date();
        this.typeText(`📅 ${now.toLocaleString()}\n`);
    }

    async changeTheme(themeName) {
        if (this.themes[themeName]) {
            document.documentElement.style.setProperty('--terminal-bg', this.themes[themeName].bg);
            document.documentElement.style.setProperty('--terminal-text', this.themes[themeName].text);
            document.documentElement.style.setProperty('--terminal-prompt', this.themes[themeName].prompt);
            this.currentTheme = themeName;
            this.playSound('theme');
            const themeAnnouncement = `
╔════════════════════════════╗
║ Theme changed to ${themeName.padEnd(10)} ║
╚════════════════════════════╝
`;
            await this.typeText(themeAnnouncement);
        } else {
            this.typeText(`Available themes: ${Object.keys(this.themes).join(', ')}\n`);
        }
    }

    playSound(type) {
        const sounds = {
            'keypress': 'data:audio/wav;base64,...', // Add base64 audio
            'error': 'data:audio/wav;base64,...',
            'success': 'data:audio/wav;base64,...',
            'theme': 'data:audio/wav;base64,...',
            'special': 'data:audio/wav;base64,...'
        };
        
        const audio = new Audio(sounds[type]);
        audio.volume = 0.1;
        audio.play();
    }

    showGames() {
        const container = document.createElement('div');
        container.className = 'games-menu';
        const gamesList = `
🎮 Available Games:
1. Snake (Press 1 to play)
2. Tetris (Coming Soon)
3. Pong (Coming Soon)

Use arrow keys to control the snake!
Press ESC to exit any game.
`;
        this.typeText(gamesList);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === '1') {
                const gameContainer = TerminalGames.snake();
                this.output.appendChild(gameContainer);
            }
            if (e.key === 'Escape') {
                const games = document.querySelectorAll('.game-container');
                games.forEach(game => game.remove());
            }
        });
    }

    listFiles(path = '') {
        let files = this.fileSystem;
        if (path) {
            path.split('/').forEach(dir => {
                files = files[dir];
            });
        }
        
        const fileList = Object.keys(files).map(file => {
            return file.endsWith('/') ? `📁 ${file}` : `📄 ${file}`;
        }).join('\n');
        
        this.typeText(fileList + '\n');
    }

    catFile(filename) {
        if (this.fileSystem[filename]) {
            this.typeText(this.fileSystem[filename] + '\n');
        } else {
            this.typeText(`File ${filename} not found\n`);
        }
    }

    downloadResume() {
        this.typeText('Preparing resume for download...\n');
        // Add actual resume download logic
        setTimeout(() => {
            this.typeText('Resume downloaded successfully!\n');
            this.playSound('success');
        }, 1000);
    }

    setupEasterEggs() {
        document.addEventListener('keydown', (e) => {
            this.konamiSequence.push(e.key);
            if (this.konamiSequence.length > 10) this.konamiSequence.shift();
            
            const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
            
            if (this.konamiSequence.join(',') === konami.join(',')) {
                this.easterEggs.konami();
            }
        });
    }

    enableRainbowMode() {
        document.body.classList.add('rainbow-mode');
        this.playSound('special');
        this.typeText('🌈 Rainbow mode activated!\n');
    }

    async startHackingEffect() {
        const text = 'HACKING THE MAINFRAME...\n';
        for (const char of text) {
            this.print(char);
            await new Promise(r => setTimeout(r, 100));
            this.playSound('keypress');
        }
        this.typeText('Access granted! Just kidding 😄\n');
    }

    toggleMatrixEffect() {
        document.querySelector('.matrix-bg').classList.toggle('visible');
    }

    // Add other command methods (showResume, showExperience, etc.)
}

// Initialize the terminal
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalPortfolio();
});
