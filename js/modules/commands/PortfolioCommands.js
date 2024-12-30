import { ASCIIAnimations } from '../effects/ASCIIAnimations.js';

export class PortfolioCommands {
    static getCommands(terminal) {
        return {
            'about': () => this.showAboutWithAnimation(terminal),
            'education': () => this.showEducationWithAnimation(terminal),
            'experience': () => this.showExperienceWithAnimation(terminal),
            'skills': () => this.showSkillsWithAnimation(terminal),
            'projects': () => this.showProjectsWithAnimation(terminal),
            'achievements': () => this.showAchievementsWithAnimation(terminal),
            'contact': () => this.showContactWithAnimation(terminal)
        };
    }

    static highlightSection(sectionId) {
        // First, remove active class from all sections
        const allSections = document.querySelectorAll('.nav-section');
        allSections.forEach(section => section.classList.remove('active'));

        // Then add active class to the specific section
        const section = document.querySelector(`.nav-section[data-section="${sectionId}"]`);
        if (section) {
            section.classList.add('active');
        }
    }

    static async typeText(text, speed = 5) { // Decreased from default 30
        // ...existing code...
    }

    static async showAboutWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('Loading about me...\n');
            await terminal.typeText(this.getAboutText());
            this.highlightSection('about');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showEducationWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('Loading education...\n');
            await terminal.typeText(this.getEducationText());
            this.highlightSection('education');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showExperienceWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('💼 Loading work experience...\n');
            await terminal.typeText(ASCIIAnimations.computer);
            await terminal.typeText(this.getExperienceText());
            this.highlightSection('experience');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showSkillsWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('🛠️ Loading skills...\n');
            await terminal.typeText(ASCIIAnimations.tools);
            await terminal.typeText(this.getSkillsText());
            this.highlightSection('skills');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showProjectsWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('🚀 Loading projects...\n');
            await terminal.typeText(ASCIIAnimations.rocket);
            await terminal.typeText(this.getProjectsText());
            this.highlightSection('projects');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showAchievementsWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('🏆 Loading achievements...\n');
            await terminal.typeText(ASCIIAnimations.trophy);
            await terminal.typeText(this.getAchievementsText());
            this.highlightSection('achievements');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static async showContactWithAnimation(terminal) {
        try {
            terminal.commandInProgress = true;
            await terminal.typeText('📞 Loading contact details...\n');
            await terminal.typeText(`
    ╔══════════════════════════╗
    ║     Contact Details      ║
    ╚══════════════════════════╝

    📱 Phone
    ───────────────────────
    +91-7417513597

    📧 Email
    ───────────────────────
    priyena.career@gmail.com

    💻 Social
    ───────────────────────
    GitHub: Transcendental-Programmer
    LinkedIn: priyansh-saxena-iiitm
    CodeChef: ps_1729
    LeetCode: transcendental_p

    📍 Location
    ───────────────────────
    ABV-IIITM Gwalior
    Madhya Pradesh, India

    💬 Preferred Contact Method
    ───────────────────────
    Email for professional inquiries
    LinkedIn for networking
\n`);
            this.highlightSection('contact');
        } finally {
            terminal.commandInProgress = false;
        }
    }

    static getAboutText() {
        return `
╔══════════════════════════════════════════════╗
║                  About Me                     ║
╚══════════════════════════════════════════════╝

👨‍💻 Personal Info
   ──────────────
   Name: Priyansh Saxena
   Role: Full-Stack Machine Learning Engineer
   Location: ABV-IIITM Gwalior

📞 Contact Details
   ──────────────
   📱 Phone: +91-7417513597
   📧 Email: priyena.career@gmail.com
   🔗 GitHub: Transcendental-Programmer

🎯 Professional Summary
   ──────────────
   A passionate developer specializing in full-stack 
   development and machine learning, with expertise 
   in building scalable applications and implementing 
   AI solutions.
\n`;
    }

    static getEducationText() {
        return `
┌────────────────────────────────────────┐
│ Education                              │
└────────────────────────────────────────┘
🎓 B.Tech (IT)
   ABV-IIITM Gwalior (2022-PRESENT)
   CGPA: 7.5

🎓 Senior Secondary (2022)
   CBSE Board
   Percentage: 90.2%

🎓 Secondary (2020)
   CBSE Board
   Percentage: 96.6%
\n`;
    }

    static getExperienceText() {
        return `
┌────────────────────────────────────────┐
│ Work Experience                        │
└────────────────────────────────────────┘
💼 Jaffa.ai | Full-Stack Generative AI Engineer Internship
   July 2024 - December 2024

   • Designed Graph-based RAG system (Neo4j, LangChain, Azure OpenAI)
     ↳ Improved query accuracy: 65% → 95%
     ↳ Reduced latency by 40%

   • Created First-Cut Generation Tool
     ↳ Flask + Azure OpenAI with advanced prompt engineering
     ↳ 90% accuracy in AI summaries

   • Optimized XBRL parsing pipeline
     ↳ 25% faster data integration
     ↳ Tech: Python, pyxbrl, BeautifulSoup4

   • DevOps Improvements
     ↳ Optimized Github Actions workflows
     ↳ 99.9% uptime for 5+ microservices
\n`;
    }

    static getProjectsText() {
        return `
┌────────────────────────────────────────┐
│ Projects                               │
└────────────────────────────────────────┘
🚀 Privacy-Preserving Financial Data Generation System
   August 2024 - December 2024
   • Federated learning framework with RAG integration
   • 92% statistical similarity with GDPR compliance
   • Zero data leakage across 10+ institutions
   • 500+ concurrent model training sessions
   • 60% faster deployments with GitHub Actions
   Tech: TensorFlow Federated, Hugging Face, PySyft, Docker, Kubernetes

🚀 Anomaly Detection in IoT Data Streams
   May 2024 - June 2024
   • 10,000 data points/second processing
   • 98% accuracy in anomaly detection
   • 99.9% uptime with auto-scaling
   • 95% model accuracy with MLflow tracking
   Tech: Apache Kafka, MQTT, Python, Docker, Kubernetes, scikit-learn
\n`;
    }

    static getSkillsText() {
        return `
╔══════════════════════════════════════════════╗
║              Technical Skills                 ║
╚══════════════════════════════════════════════╝

🔹 Programming & ML
   ───────────────
   ⚡ Languages: Python, C++, Java, GO, Kotlin, SQL
   ⚡ ML/AI: TensorFlow, Keras, Scikit-Learn, OpenCV
   ⚡ LLMs: LangChain, Hugging Face, Azure OpenAI

🔹 Backend & DevOps
   ───────────────
   ⚡ Frameworks: Django, Flask, FastAPI
   ⚡ Tools: Docker, Kubernetes, MLflow
   ⚡ Testing: Selenium, PyTest, JUnit

🔹 Databases & Cloud
   ───────────────
   ⚡ SQL: MySQL, PostgreSQL
   ⚡ NoSQL: MongoDB, Neo4j
   ⚡ Cloud: AWS, Azure, GCP
\n`;
    }

    static getAchievementsText() {
        return `
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
    }

    static getContactText() {
        return `
Contact:
--------
Email: priyena.career@gmail.com
GitHub: Transcendental-Programmer
\n`;
    }
}
