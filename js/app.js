// app.js - Main Application Logic

class KeyVisionApp {
    constructor() {
        this.currentOs = 'windows'; // Default OS
        this.container = document.getElementById('keyboard-container');
        this.buttons = document.querySelectorAll('.layout-switcher button');
        
        this.activeKeys = new Set();
        
        this.init();
    }

    init() {
        this.setupLayoutSwitcher();
        this.setupKeyboardListeners();
        this.loadLayout(this.currentOs);
    }

    setupLayoutSwitcher() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const os = e.target.dataset.os;
                if (os !== this.currentOs) {
                    // Update active button
                    this.buttons.forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Switch layout
                    this.currentOs = os;
                    this.loadLayout(os);
                }
            });
        });
    }

    loadLayout(osType) {
        // Layouts object is provided by layouts.js
        if (Layouts && Layouts[osType]) {
            this.container.innerHTML = Layouts[osType];
            this.activeKeys.clear(); // Reset active keys on layout switch
        } else {
            console.error(`Layout for ${osType} not found.`);
        }
    }

    setupKeyboardListeners() {
        // Prevent default actions for many shortcuts so they can be visualized
        window.addEventListener('keydown', (e) => {
            // Only allow F12 for debugging, block everything else to prevent browser shortcuts
            if (e.code !== 'F12') {
                e.preventDefault();
            }

            const svgId = KeyMapper.getSvgId(e.code, this.currentOs);
            if (svgId) {
                this.highlightKey(svgId, true);
            }
        });

        window.addEventListener('keyup', (e) => {
            const svgId = KeyMapper.getSvgId(e.code, this.currentOs);
            if (svgId) {
                this.highlightKey(svgId, false);
            }
        });

        // Handle window blur to clear all keys (e.g. user alt-tabs away)
        window.addEventListener('blur', () => {
            this.clearAllKeys();
        });
    }

    highlightKey(id, isActive) {
        const keyGroup = document.getElementById(id);
        if (keyGroup) {
            if (isActive) {
                keyGroup.classList.add('active');
                this.activeKeys.add(id);
            } else {
                keyGroup.classList.remove('active');
                this.activeKeys.delete(id);
            }
        }
    }

    clearAllKeys() {
        this.activeKeys.forEach(id => {
            const keyGroup = document.getElementById(id);
            if (keyGroup) {
                keyGroup.classList.remove('active');
            }
        });
        this.activeKeys.clear();
    }
}

// Bootstrap the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new KeyVisionApp();
});
