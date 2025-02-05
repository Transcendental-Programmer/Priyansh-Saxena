# Terminal Portfolio - Priyansh Saxena

Welcome to the Terminal Portfolio project. This website is a unique, interactive terminal-based portfolio that lets visitors explore your background, projects, and skills through commands. The site leverages dynamic effects, custom themes, and an engaging user interface to create an immersive experience.

---

## Overview

The website simulates a terminal interface where users can type commands to learn about you. The experience is enriched with:
- **Animated Boot Sequence & Welcome Message:** A boot manager displays an animated startup and a detailed welcome message ([`Terminal`](js/modules/core/Terminal.js)).
- **Interactive Commands:** Users can run custom commands to view sections like About, Education, Experience, Skills, Projects, Achievements, and Contact ([`PortfolioCommands`](js/modules/commands/PortfolioCommands.js)).
- **File System Navigation:** Commands like `ls`, `cat`, and `tree` mimic file system exploration.
- **Games & Effects:** Enjoy interactive games (e.g., Snake) and visual effects such as the Matrix rain effect ([`GameCommands`](js/modules/commands/GameCommands.js)).

---

## Features

### Terminal Interface
- **Custom Terminal Design:** Styled using our CSS in [css/style.css](css/style.css). The UI uses a modern look with gradients, shadows, and smooth transitions.
- **Dynamic Tabs:** Switch between Terminal, Preview, and Combined modes for different layouts ([`Terminal`](js/modules/core/Terminal.js)).
- **Auto-scrolling & Mutations:** The output auto-scrolls based on content changes with MutationObservers for smooth viewing.

### Command Handling
- **Command Manager:** The central hub for executing commands is located in [CommandManager.js](js/modules/commands/CommandManager.js). It maps commands to functions and handles history navigation.
- **Portfolio Commands:** Detailed textual content for each portfolio section is provided by [`PortfolioCommands`](js/modules/commands/PortfolioCommands.js) and displayed with animations.
- **System & File System Commands:** Commands like `clear`, `help`, and file system operations (e.g., `ls`, `cat`, `tree`, `download`) allow users to interact with the simulated system.
- **Game Commands:** Explore games with commands such as `snake` – which starts the classic Snake game – and visual effects like `matrix` to toggle a dynamic matrix-like background ([`GameCommands`](js/modules/commands/GameCommands.js)).

### Dynamic Visual Effects
- **Matrix Effect:** Toggle the Matrix rain animation that gives a futuristic look ([`MatrixEffect`](js/modules/effects/MatrixEffect.js)).
- **ASCII Animations:** Enjoy various ASCII art animations like loading spinners and creative text-based displays ([`ASCIIAnimations`](js/modules/effects/ASCIIAnimations.js)).
- **Theme Management:** Change the look-and-feel of the terminal interface using different themes, customized in [css/style.css](css/style.css) and managed via [`ThemeManager`](js/modules/themes/ThemeManager.js).

### Navigation & Layout
- **Section Navigator:** A quick-access navigation panel on both sides of the screen lets users jump to specific sections (About, Education, Experience, Skills, Projects, Achievements, Contact) instantly.
- **Keyboard Shortcuts:** Use Alt-based shortcuts to execute commands without typing, enhancing accessibility.
- **Responsive Layout:** The website layout adapts to different screen sizes using CSS media queries and custom layout adjustments, ensuring a smooth experience across devices.

### Additional Features
- **Command Queue & History:** Commands entered during an ongoing execution are queued and executed sequentially. Navigation through command history helps recall previous inputs.
- **Audio & Visual Feedback:** Commands trigger visual and audio feedback, helping users to know when themes change or a command has been successfully executed.
- **Boot Sequence & Locking:** The boot sequence locks command input until startup is complete, ensuring the initialization process is smooth.

---

## Getting Started

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/terminal-portfolio.git
   ```
2. **Install Dependencies**
   Use your package manager to install dependencies (if any are provided in a package.json file).
   ```sh
   npm install
   ```
3. **Run the Project**
   Launch the project by opening `index.html` in your browser or by using a development server.
   ```sh
   npm start
   ```

### File Structure

- **Root Files:**
  - 

.gitignore

 – Lists files and directories to be ignored by Git.
  - 

index.html

 – The main HTML file that loads the terminal interface.
  - 

README.md

 – This documentation file.
- **CSS:**
  - 

style.css

 – Contains the styling for the terminal, navigation, and overall layout.
- **JavaScript Modules:**
  - **Core Functionality:**
    - 

Terminal

 – Implements the main terminal logic.
    - 

OutputManager

 – Manages terminal output.
    - Boot and theme management modules.
  - **Commands:**
    - 

CommandManager

 – Maps command strings to functions.
    - 

PortfolioCommands

 – Provides portfolio text and animations.
    - 

GameCommands

 – Provides commands related to games and interactive effects.
  - **Effects:**
    - 

MatrixEffect

 – Handles the matrix animation.
    - 

ASCIIAnimations

 – Contains various ASCII art effects.

---

## Usage

Once the website is loaded:
- **Begin Typing Commands:** The prompt (`visitor@portfolio:~$`) awaits your input. Type commands like 

about

, 

education

, or 

snake

 to explore different sections.
- **Navigate Using the Side Panels:** Click on any section in the left or combined navigation panel to jump directly to that section.
- **Shortcut Keys:** Utilize Alt+A for About, Alt+E for Education, Alt+X for Experience, etc. to quickly view content.
- **Switch Views:** Use the tab controls at the top (Terminal, Preview, Combined) to change the viewing layout.

---

## Contributing

Feel free to fork or submit pull requests to improve the project. Contributions to new commands, design enhancements, or adding more game features are welcome.

---

## License

This project is licensed under an open-source license. See 

LICENSE

 for more information.

---

## Acknowledgements

- The project is inspired by terminal interfaces and creative coding.
- Special thanks to contributors and the open-source community.

---

Enjoy exploring the Terminal Portfolio and learning more about Priyansh Saxena's work!