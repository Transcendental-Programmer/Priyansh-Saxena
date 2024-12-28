export class ASCIIAnimations {
    static loading = [
        '[    ]',
        '[=   ]',
        '[==  ]',
        '[=== ]',
        '[====]'
    ];

    static rocket = `
      /\\
     /  \\
    |    |
   /|    |\\
  / |    | \\
 |  |    |  |
  '      '
   ' 🔥 '
`;

    static matrix = [
        '1010101',
        '0101010',
        '1010101'
    ];

    static profile = `
    ┌─────────────┐
    │  ┌─┐ ╭──╮  │
    │  │ │ │  │  │
    │  └─┘ ╰──╯  │
    └─────────────┘
`;

    static book = `
    ┌─────────────┐
    │  EDUCATION  │
    │  📚 B.Tech  │
    │  📘 +90%    │
    └─────────────┘
`;

    static computer = `
    ╔════════════╗
    ║ ▄▄▄▄▄▄▄▄▄▄ ║
    ║ █ JAFFA █ ║
    ║ █  .AI  █ ║
    ╚═══[––]════╝
`;

    static tools = `
    🔧 ⚙️  🛠️  🔨
     \\ │ /  
      \\│/   
       ▼    
`;

    static trophy = `
     ___________
    '._==_==_=_.'
    .-\\:      /-.
   | (|:.     |) |
    '-|:.     |-'
      \\::.    /
       '::. .'
         ) (
       _.' '._
      '-------'
`;

    static async animate(terminal, frames, speed = 100, cycles = 3) {
        for (let i = 0; i < cycles; i++) {
            for (const frame of frames) {
                await terminal.typeText('\r' + frame);
                await new Promise(r => setTimeout(r, speed));
            }
        }
        await terminal.typeText('\n');
    }

    static async showLoading(terminal) {
        await this.animate(terminal, this.loading, 200);
    }
}
