import { Terminal } from './modules/core/Terminal.js';

// Log browser info for debugging
console.log('POLYFILL => User Agent Browser:', getBrowserInfo());

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
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
