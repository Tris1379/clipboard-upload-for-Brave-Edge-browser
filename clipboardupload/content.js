let activeFileInput = null;

document.addEventListener('click', (e) => {
    const input = e.target.closest('input[type="file"]');
    if (input) {
        e.preventDefault(); 
        e.stopPropagation();
        activeFileInput = input;
        showOverlay();
    }
}, true);

// đóng popup khi đổi tab
window.onblur = removeOverlay;

function showOverlay() {
    if (document.getElementById('gx-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'gx-overlay';
    overlay.innerHTML = `
        <div id="gx-container">
            <div class="gx-header">
                <span>SELECT FILE</span>
                <span id="gx-close">✕</span>
            </div>
            <div class="gx-main-layout">
                <div class="gx-section">
                    <div class="gx-label">CLIPBOARD IMAGE</div>
                    <div id="gx-drop-zone" class="gx-box">
                        <div class="gx-hint">Click to Load or Paste (Ctrl+V)</div>
                    </div>
                </div>
            </div>
            <div class="gx-footer">
                <button id="gx-native-btn">Show All File</button>
            </div>
            <input type="text" id="gx-paste-tracker" style="position:absolute; opacity:0; height:0;">
        </div>
    `;
    document.body.appendChild(overlay);

    // Native Bypass: Opens real File Explorer
    document.getElementById('gx-native-btn').onclick = () => {
        if (activeFileInput) {
            removeOverlay();
            setTimeout(() => {
                if (activeFileInput.showPicker) activeFileInput.showPicker();
                else activeFileInput.click();
            }, 50);
        }
    };

    document.getElementById('gx-close').onclick = removeOverlay;
    document.getElementById('gx-drop-zone').onclick = loadClipboard;

    // Focus for Ctrl+V (Bypasses Brave's API blocks)
    const tracker = document.getElementById('gx-paste-tracker');
    tracker.focus();
    tracker.onpaste = handlePaste;
}

async function loadClipboard() {
    const box = document.getElementById('gx-drop-zone');
    try {
        const items = await navigator.clipboard.read();
        for (const item of items) {
            const type = item.types.find(t => t.startsWith('image/'));
            if (type) {
                const blob = await item.getType(type);
                renderPreview(blob, type);
                return;
            }
        }
    } catch (err) {
        box.innerHTML = '<div class="gx-hint" style="color:#00ff99">Brave blocked API.<br>Try pressing Ctrl+V.</div>';
    }
}

function handlePaste(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            renderPreview(blob, items[i].type);
            return;
        }
    }
}

function renderPreview(blob, type) {
    const url = URL.createObjectURL(blob);
    const box = document.getElementById('gx-drop-zone');
    box.innerHTML = `<img src="${url}" class="gx-preview">`;
    box.onclick = (e) => { e.stopPropagation(); handleUpload(blob, type); };
}

function handleUpload(blob, type) {
    if (!activeFileInput) return;
    const file = new File([blob], `upload-${Date.now()}.${type.split('/')[1] || 'png'}`, {type});
    const dt = new DataTransfer();
    dt.items.add(file);
    activeFileInput.files = dt.files;
    activeFileInput.dispatchEvent(new Event('change', { bubbles: true }));
    removeOverlay();
}

function removeOverlay() {
    const el = document.getElementById('gx-overlay');
    if (el) el.remove();
}