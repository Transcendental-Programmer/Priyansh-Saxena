class ASCIIAnimations {
    static loading = [
        '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'
    ];

    static rocket = [
        `
   /\\
  /  \\
 |    |
 |    |
/      \\
▀▀▀▀▀▀▀▀`,
        `
   /\\
  /  \\
 | || |
 |    |
/      \\
▀▀████▀▀`,
        `
   /\\
  /  \\
 | || |
 |    |
/ 🔥🔥 \\
▀▀████▀▀`
    ];

    static matrix = [
        '1010101',
        '0101010',
        '1010101'
    ];

    static animate(frames, element, speed = 100) {
        let i = 0;
        return setInterval(() => {
            element.textContent = frames[i];
            i = (i + 1) % frames.length;
        }, speed);
    }
}
