export class FileSystem {
    constructor() {
        this.files = {
            'resume.pdf': 'My resume',
            'projects/': {
                'project1.md': 'Project 1 details',
                'project2.md': 'Project 2 details'
            },
            'contacts.txt': 'Contact information'
        };
    }

    listFiles(path = '') {
        let files = this.files;
        if (path) {
            path.split('/').forEach(dir => {
                files = files[dir];
            });
        }
        return Object.keys(files);
    }

    getFile(filename) {
        return this.files[filename] || null;
    }

    getTree() {
        return `
📁 portfolio/
├── 📄 resume.pdf
├── 📁 projects/
│   ├── 📄 project1.md
│   └── 📄 project2.md
└── 📄 contacts.txt
`;
    }
}
