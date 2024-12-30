import { Terminal } from './modules/core/Terminal.js';

// Log browser info for debugging
console.log('POLYFILL => User Agent Browser:', getBrowserInfo());

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
    
    // Set up navigation section click handlers
    document.querySelectorAll('.nav-section').forEach(section => {
        section.addEventListener('click', () => {
            const command = section.dataset.section;
            if (command) {
                // Remove active class from all sections
                document.querySelectorAll('.nav-section').forEach(s => {
                    s.classList.remove('active');
                });
                
                // Add active class to clicked section
                section.classList.add('active');
                
                // Execute the command
                terminal.executeCommand(command);
            }
        });
    });
});

// Helper function to get browser info
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';

    // Extract browser and version
    if (ua.includes('Chrome')) {
        browser = 'Chrome';
        version = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)[1];
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        version = ua.match(/Firefox\/(\d+\.\d+)/)[1];
    } else if (ua.includes('Safari')) {
        browser = 'Safari';
        version = ua.match(/Version\/(\d+\.\d+)/)[1];
    }

    return `${browser}, Version: ${version}`;
}
