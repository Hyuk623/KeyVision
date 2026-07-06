// mapper.js - Maps Event.code to SVG Element IDs

const KeyMapper = {
    // Maps standard browser Event.code to our SVG group IDs
    getCodeToIdMap: function(osType) {
        // Shared base map for all OS
        const baseMap = {
            // Top Row
            'Escape': 'Escape',
            'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4',
            'F5': 'F5', 'F6': 'F6', 'F7': 'F7', 'F8': 'F8',
            'F9': 'F9', 'F10': 'F10', 'F11': 'F11', 'F12': 'F12',

            // Row 1
            'Backquote': 'Backquote',
            'Digit1': 'Digit1',
            'Digit2': 'Digit2',
            'Digit3': 'Digit3',
            'Digit4': 'Digit4',
            'Digit5': 'Digit5',
            'Digit6': 'Digit6',
            'Digit7': 'Digit7',
            'Digit8': 'Digit8',
            'Digit9': 'Digit9',
            'Digit0': 'Digit0',
            'Minus': 'Minus',
            'Equal': 'Equal',
            'Backspace': 'Backspace',
            
            // Row 2
            'Tab': 'Tab',
            'KeyQ': 'KeyQ',
            'KeyW': 'KeyW',
            'KeyE': 'KeyE',
            'KeyR': 'KeyR',
            'KeyT': 'KeyT',
            'KeyY': 'KeyY',
            'KeyU': 'KeyU',
            'KeyI': 'KeyI',
            'KeyO': 'KeyO',
            'KeyP': 'KeyP',
            'BracketLeft': 'BracketLeft',
            'BracketRight': 'BracketRight',
            'Backslash': 'Backslash',

            // Row 3
            'CapsLock': 'CapsLock',
            'KeyA': 'KeyA',
            'KeyS': 'KeyS',
            'KeyD': 'KeyD',
            'KeyF': 'KeyF',
            'KeyG': 'KeyG',
            'KeyH': 'KeyH',
            'KeyJ': 'KeyJ',
            'KeyK': 'KeyK',
            'KeyL': 'KeyL',
            'Semicolon': 'Semicolon',
            'Quote': 'Quote',
            'Enter': 'Enter',

            // Row 4
            'ShiftLeft': 'ShiftLeft',
            'KeyZ': 'KeyZ',
            'KeyX': 'KeyX',
            'KeyC': 'KeyC',
            'KeyV': 'KeyV',
            'KeyB': 'KeyB',
            'KeyN': 'KeyN',
            'KeyM': 'KeyM',
            'Comma': 'Comma',
            'Period': 'Period',
            'Slash': 'Slash',
            'ShiftRight': 'ShiftRight',

            // Bottom Row (Shared)
            'Space': 'Space',
            'ControlLeft': 'ControlLeft',
            'ControlRight': 'ControlRight',
            'AltLeft': 'AltLeft',
            'AltRight': 'AltRight'
        };

        // Apply OS specific overrides
        if (osType === 'windows') {
            baseMap['MetaLeft'] = 'MetaLeft'; // Windows Key
            baseMap['MetaRight'] = 'MetaRight'; // Windows Key
            baseMap['ContextMenu'] = 'ContextMenu'; // Menu Key
        } else if (osType === 'mac') {
            baseMap['MetaLeft'] = 'MetaLeft'; // Command Left
            baseMap['MetaRight'] = 'MetaRight'; // Command Right
        } else if (osType === 'chrome') {
            baseMap['MetaLeft'] = 'Search'; // Search key instead of Win/Cmd
            
            // Map media keys to F-keys so they visually trigger the correct icon row
            baseMap['BrowserBack'] = 'F1';
            baseMap['BrowserForward'] = 'F2';
            baseMap['BrowserRefresh'] = 'F3';
            baseMap['MediaTrackPrevious'] = 'F1';
            baseMap['MediaTrackNext'] = 'F2';
            baseMap['AudioVolumeMute'] = 'F8';
            baseMap['AudioVolumeDown'] = 'F9';
            baseMap['AudioVolumeUp'] = 'F10';
        }

        return baseMap;
    },

    getSvgId: function(eventCode, osType) {
        const map = this.getCodeToIdMap(osType);
        return map[eventCode] || null;
    }
};
