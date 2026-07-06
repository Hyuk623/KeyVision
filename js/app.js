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
            this.updateHelperText(osType);
        } else {
            console.error(`Layout for ${osType} not found.`);
        }
    }

    updateHelperText(osType) {
        const helperEl = document.getElementById('helper-text');
        if (!helperEl) return;

        if (osType === 'windows') {
            helperEl.innerHTML = `
                <strong>Windows 팁</strong><br>
                시작 메뉴가 열리는 것을 방지하려면, 실제 키보드의 <strong>[우측 Ctrl]</strong>을 누르세요.<br>화면 상의 <strong>[Windows 로고]</strong> 키에 안전하게 불이 들어옵니다.
            `;
        } else if (osType === 'mac') {
            helperEl.innerHTML = `
                <strong>Mac 팁</strong><br>
                • <strong>[Cmd ⌘]</strong> 켜기: 물리적 <strong>[우측 Ctrl]</strong> 키 누름<br>
                • <strong>[Option ⌥]</strong> 켜기: 물리적 <strong>[Alt]</strong> 또는 <strong>[Menu(우클릭)]</strong> 키 누름
            `;
        } else if (osType === 'chrome') {
            helperEl.innerHTML = `
                <strong>Chromebook 팁</strong><br>
                • <strong>[Search 🔍]</strong> 켜기: 물리적 <strong>[CapsLock]</strong> 또는 <strong>[우측 Ctrl]</strong> 키 누름<br>
                • 상단 특수 아이콘(⬅️, 🔅, 🔇 등)은 <strong>F1~F10</strong> 키와 매칭되어 있습니다.
            `;
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
