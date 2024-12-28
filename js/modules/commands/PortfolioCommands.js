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

    static async showAboutWithAnimation(terminal) {
        await terminal.typeText('Loading profile...\n');
        await terminal.typeText(ASCIIAnimations.profile);
        await terminal.typeText(this.getAboutText());
    }

    static async showEducationWithAnimation(terminal) {
        await terminal.typeText('📚 Loading education details...\n');
        await terminal.typeText(ASCIIAnimations.book);
        await terminal.typeText(this.getEducationText());
    }

    static async showExperienceWithAnimation(terminal) {
        await terminal.typeText('💼 Loading work experience...\n');
        await terminal.typeText(ASCIIAnimations.computer);
        await terminal.typeText(this.getExperienceText());
    }

    static async showSkillsWithAnimation(terminal) {
        await terminal.typeText('🛠️ Loading skills...\n');
        await terminal.typeText(ASCIIAnimations.tools);
        await terminal.typeText(this.getSkillsText());
    }

    static async showProjectsWithAnimation(terminal) {
        await terminal.typeText('🚀 Loading projects...\n');
        await terminal.typeText(ASCIIAnimations.rocket);
        await terminal.typeText(this.getProjectsText());
    }

    static async showAchievementsWithAnimation(terminal) {
        await terminal.typeText('🏆 Loading achievements...\n');
        await terminal.typeText(ASCIIAnimations.trophy);
        await terminal.typeText(this.getAchievementsText());
    }

    static async showContactWithAnimation(terminal) {
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
    }

    static getAboutText() {
        return `
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
