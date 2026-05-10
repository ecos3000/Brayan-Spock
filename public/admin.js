/**
 * ADMIN PANEL V3 - CONTROL TOTAL
 * Implementado para ADAN_CB90
 */

(function() {
    const ADMIN_PASSWORD = "ADAN2025";
    let isAdminAuthenticated = sessionStorage.getItem('admin_auth') === 'true';
    let isEditingEnabled = false;

    // --- STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        #admin-secret-trigger {
            position: fixed; bottom: 32px; right: 32px; width: 40px; height: 40px;
            z-index: 9999; cursor: pointer; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
        }
        #admin-secret-trigger span { font-size: 20px; opacity: 0; transition: opacity 0.3s ease; }
        #admin-secret-trigger:hover span { opacity: 0.3; }

        #admin-modal-overlay {
            position: fixed; inset: 0; background: rgba(5, 5, 8, 0.85); backdrop-filter: blur(10px);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        #admin-modal-overlay.active { opacity: 1; pointer-events: auto; }
        .admin-card {
            background: #0c0c14; border: 1px solid #00f5c4; padding: 40px; border-radius: 4px;
            width: 100%; max-width: 400px; text-align: center; box-shadow: 0 0 40px rgba(0, 245, 196, 0.1);
        }

        #admin-sidebar {
            position: fixed; top: 0; right: -420px; width: 400px; height: 100vh;
            background: #0c0c14; border-left: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 10001; transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            color: white; font-family: 'Inter', sans-serif; display: flex; flex-direction: column;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
        }
        #admin-sidebar.active { right: 0; }
        
        .admin-tabs { display: flex; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .admin-tab {
            flex: 1; padding: 12px; font-size: 10px; font-family: 'JetBrains Mono';
            text-align: center; cursor: pointer; opacity: 0.5; transition: 0.3s;
            border-bottom: 2px solid transparent; text-transform: uppercase;
        }
        .admin-tab.active { opacity: 1; border-color: #00f5c4; color: #00f5c4; background: rgba(0,245,196,0.05); }

        .sidebar-content { flex: 1; overflow-y: auto; padding: 20px; }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; }

        .sidebar-section { margin-bottom: 30px; }
        .sidebar-section h3 {
            font-family: 'JetBrains Mono'; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em;
            color: #00f5c4; margin-bottom: 15px; border-left: 2px solid #00f5c4; padding-left: 10px;
        }

        .edit-card {
            background: rgba(255,255,255,0.03); padding: 15px; border-radius: 4px; margin-bottom: 15px; border: 1px solid transparent;
            transition: border 0.3s;
        }
        .edit-card:hover { border-color: rgba(0,245,196,0.2); }
        .edit-card label { display: block; font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 5px; }
        .edit-card textarea, .edit-card input {
            width: 100%; background: #1a1a24; border: 1px solid #333; color: white; padding: 10px;
            font-size: 12px; outline: none; border-radius: 2px; font-family: inherit;
        }
        .edit-card textarea { height: 60px; resize: vertical; }

        .media-preview {
            width: 100%; height: 100px; object-fit: cover; border-radius: 2px; margin-bottom: 10px;
            background: #000; border: 1px solid #333;
        }

        .action-row { display: flex; gap: 10px; margin-top: 10px; }
        .btn-small {
            flex: 1; padding: 8px; font-size: 9px; font-family: 'JetBrains Mono'; cursor: pointer; border: none;
            font-weight: bold; text-transform: uppercase; transition: transform 0.1s;
        }
        .btn-small:active { transform: scale(0.95); }
        .btn-primary { background: #00f5c4; color: #050508; }
        .btn-danger { background: #ff3d6b; color: white; }
        .btn-ghost { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); }

        .admin-toggle { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .switch { position: relative; display: inline-block; width: 34px; height: 18px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #00f5c4; }
        input:checked + .slider:before { transform: translateX(16px); }

        [contenteditable="true"] { position: relative; transition: all 0.2s; }
        [contenteditable="true"]:hover { box-shadow: 0 0 0 2px #00f5c4 !important; border-radius: 2px; }

        #admin-badge {
            position: fixed; top: 80px; right: 20px; background: #00f5c4; color: #050508;
            font-family: 'JetBrains Mono'; font-size: 9px; padding: 4px 10px; z-index: 10002;
            display: none; font-weight: bold; box-shadow: 0 0 10px rgba(0,245,196,0.3);
        }

        .add-element-bar {
            background: rgba(0,245,196,0.05); border: 1px dashed rgba(0,245,196,0.3);
            padding: 15px; border-radius: 4px; margin-top: 20px; text-align: center;
        }
    `;
    document.head.appendChild(style);

    // --- DOM SETUP ---
    const trigger = document.createElement('button');
    trigger.id = 'admin-secret-trigger'; trigger.innerHTML = '<span>🔑</span>';
    document.body.appendChild(trigger);

    const overlay = document.createElement('div');
    overlay.id = 'admin-modal-overlay';
    overlay.innerHTML = `
        <div class="admin-card">
            <h2 style="font-family:'JetBrains Mono'; color:#00f5c4; letter-spacing:0.3em; margin-bottom:20px;">SYSTEM_ACCESS</h2>
            <input type="password" id="admin-pass-input" style="width:100%; padding:12px; margin-bottom:20px; background:#1a1a24; border:1px solid #333; color:white; text-align:center; font-family:'JetBrains Mono';" placeholder="PASSWORD" />
            <button id="admin-login-btn" style="width:100%; padding:12px; background:#00f5c4; border:none; cursor:pointer; font-weight:bold; font-family:'JetBrains Mono';">INITIALIZE</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const sidebar = document.createElement('div');
    sidebar.id = 'admin-sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header" style="padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-family:'JetBrains Mono'; font-size:12px; color:#00f5c4; font-weight:bold;">CORE_CONTROL_v3</span>
            <span id="close-admin" style="cursor:pointer; font-size:18px; opacity:0.5;">&times;</span>
        </div>
        <div class="admin-tabs">
            <div class="admin-tab active" data-tab="diseno">Estructura</div>
            <div class="admin-tab" data-tab="contenido">Textos</div>
            <div class="admin-tab" data-tab="multimedia">Multimedia</div>
        </div>
        <div class="sidebar-content">
            <!-- TAB DISENO (ESTRUCTURA) -->
            <div class="tab-panel active" id="tab-diseno">
                <div class="sidebar-section">
                    <h3>Identidad Visual</h3>
                    <div id="colors-container"></div>
                </div>
                <div class="sidebar-section">
                    <h3>Secciones del Sitio</h3>
                    <div id="sections-container"></div>
                </div>
            </div>

            <!-- TAB CONTENIDO (TEXTOS) -->
            <div class="tab-panel" id="tab-contenido">
                <div class="sidebar-section">
                    <h3>Edición Rápida</h3>
                    <div class="admin-toggle">
                        <span style="font-size:12px;">Escritura Directa (Habilitar)</span>
                        <label class="switch">
                            <input type="checkbox" id="edit-text-toggle">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
                <div class="sidebar-section">
                    <h3>Listado de Textos</h3>
                    <div id="texts-container"></div>
                    <div class="add-element-bar">
                        <button id="add-text-btn" class="btn-small btn-primary">➕ AGREGAR NUEVO BLOQUE DE TEXTO</button>
                    </div>
                </div>
            </div>

            <!-- TAB MULTIMEDIA -->
            <div class="tab-panel" id="tab-multimedia">
                <div class="sidebar-section">
                    <h3>Gestión de Medios</h3>
                    <div id="media-container"></div>
                    <div class="add-element-bar">
                        <button id="add-media-btn" class="btn-small btn-primary">➕ AGREGAR NUEVA IMAGEN/VIDEO</button>
                    </div>
                </div>
            </div>

            <!-- FOOTER -->
            <div style="margin-top:auto; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1); background:#0c0c14;">
                <button id="export-btn" style="width:100%; padding:12px; background:#00f5c4; border:none; margin-bottom:10px; cursor:pointer; font-weight:bold; font-family:'JetBrains Mono';">DESCARGAR PROYECTO (.HTML)</button>
                <div style="display:flex; gap:10px;">
                    <button id="reset-btn" class="btn-small btn-ghost" style="flex:1;">CANCELAR</button>
                    <button id="logout-btn" class="btn-small btn-danger" style="flex:1;">LOCK OUT</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(sidebar);

    const badge = document.createElement('div');
    badge.id = 'admin-badge'; badge.textContent = 'ADMIN_SESSION_ACTIVE';
    document.body.appendChild(badge);

    // --- LOGIC ---

    function updateLists() {
        // --- COLORS ---
        const colors = [
            { id: 1, label: 'Neon Cyan', var: '--neon-cyan' },
            { id: 2, label: 'Cyber Purple', var: '--cyber-purple' },
            { id: 3, label: 'Dark Background', var: '--cyber-dark' }
        ];
        const colorsContainer = document.getElementById('colors-container');
        colorsContainer.innerHTML = colors.map(c => {
            const val = getComputedStyle(document.documentElement).getPropertyValue(c.var).trim() || '#000000';
            return `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center; font-size:11px;">
                    <span>${c.label}</span>
                    <input type="color" value="${val}" onchange="document.documentElement.style.setProperty('${c.var}', this.value)">
                </div>
            `;
        }).join('');

        // --- SECTIONS ---
        const sectionsContainer = document.getElementById('sections-container');
        const sections = Array.from(document.querySelectorAll('section'));
        sectionsContainer.innerHTML = sections.map((s, i) => `
            <div class="edit-card" style="padding:10px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:11px; font-weight:bold; font-family:'JetBrains Mono';">#${s.id || 'sec_'+i}</span>
                    <div style="display:flex; gap:10px;">
                        <label class="switch">
                            <input type="checkbox" ${s.style.display !== 'none' ? 'checked' : ''} onchange="document.getElementById('${s.id}').style.display = this.checked ? '' : 'none'">
                            <span class="slider"></span>
                        </label>
                        <button onclick="if(confirm('¿BORRAR SECCIÓN COMPLETA?')) document.getElementById('${s.id}').remove(); updateLists();" style="background:none; border:none; color:#ff3d6b; cursor:pointer;">&times;</button>
                    </div>
                </div>
            </div>
        `).join('');

        // --- TEXTS ---
        const textsContainer = document.getElementById('texts-container');
        const textElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button, .text-xl, .text-lg, span:not([id^="admin"])'));
        textsContainer.innerHTML = textElements.filter(el => {
            return el.innerText.trim().length > 0 && 
                   !el.closest('#admin-sidebar') && 
                   !el.closest('#admin-modal-overlay') &&
                   el.children.length === 0; // Solo elementos de texto "hoja"
        }).map((el, i) => {
            el.id = el.id || 'admin-txt-' + i;
            const preview = el.innerText.substring(0, 30) + (el.innerText.length > 30 ? '...' : '');
            return `
                <div class="edit-card">
                    <label>Bloque ${i+1} [${el.tagName}] - "${preview}"</label>
                    <textarea oninput="document.getElementById('${el.id}').innerText = this.value">${el.innerText}</textarea>
                    <div class="action-row">
                        <button class="btn-small btn-ghost" onclick="document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'}); document.getElementById('${el.id}').style.boxShadow='0 0 20px #00f5c4'; setTimeout(()=>document.getElementById('${el.id}').style.boxShadow='', 2000);">📍 MIRAR</button>
                    </div>
                </div>
            `;
        }).join('');

        // --- MEDIA ---
        const mediaContainer = document.getElementById('media-container');
        mediaContainer.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><span style="font-size:10px; opacity:0.5;">RECURSOS DETECTADOS</span><button class="btn-small btn-ghost" id="sync-media-btn" style="flex:0; padding:4px 8px;">🔄 SINCRONIZAR</button></div>';
        
        document.getElementById('sync-media-btn').onclick = () => updateLists();
        
        const images = Array.from(document.querySelectorAll('img:not([id^="admin"])'));
        const videos = Array.from(document.querySelectorAll('video'));
        const iframes = Array.from(document.querySelectorAll('iframe:not([id^="admin"])'));
        
        let mediaHtml = '';
        
        // Render Images
        images.forEach((img, i) => {
            img.id = img.id || 'admin-img-' + i;
            mediaHtml += `
                <div class="edit-card">
                    <label>Imagen ${i+1}</label>
                    <img src="${img.src}" class="media-preview">
                    <input type="text" value="${img.getAttribute('src') || img.src}" placeholder="URL de la imagen..." oninput="document.getElementById('${img.id}').src = this.value">
                    <div class="action-row">
                        <button class="btn-small btn-ghost" onclick="document.getElementById('${img.id}').scrollIntoView({behavior:'smooth', block:'center'})">📍 MIRAR</button>
                        <button class="btn-small btn-danger" onclick="document.getElementById('${img.id}').remove(); updateLists();">BORRAR</button>
                    </div>
                </div>
            `;
        });

        // Render Videos
        videos.forEach((vid, i) => {
            vid.id = vid.id || 'admin-vid-' + i;
            const sources = Array.from(vid.querySelectorAll('source'));
            const currentSrc = sources.length > 0 ? sources[0].src : vid.src;
            
            mediaHtml += `
                <div class="edit-card">
                    <label>Video Local ${i+1}</label>
                    <video src="${currentSrc}" class="media-preview" muted loop autoplay></video>
                    <input type="text" value="${currentSrc}" placeholder="URL del video (.mp4)..." 
                        onchange="
                            const v = document.getElementById('${vid.id}');
                            const s = v.querySelector('source');
                            if(s) { s.src = this.value; } else { v.src = this.value; }
                            v.load(); v.play();
                        ">
                    <div class="action-row">
                        <button class="btn-small btn-ghost" onclick="document.getElementById('${vid.id}').scrollIntoView({behavior:'smooth', block:'center'})">📍 MIRAR</button>
                    </div>
                </div>
            `;
        });

        // Render Iframes (YouTube/Vimeo)
        iframes.forEach((iframe, i) => {
            iframe.id = iframe.id || 'admin-iframe-' + i;
            mediaHtml += `
                <div class="edit-card">
                    <label>Contenido Externo (Iframe) ${i+1}</label>
                    <div class="media-preview" style="display:flex; align-items:center; justify-content:center; background:#000; font-size:10px; color:#00f5c4;">IFRAME_PREVIEW</div>
                    <input type="text" value="${iframe.src}" placeholder="URL del Iframe (src)..." oninput="document.getElementById('${iframe.id}').src = this.value">
                    <div class="action-row">
                        <button class="btn-small btn-ghost" onclick="document.getElementById('${iframe.id}').scrollIntoView({behavior:'smooth', block:'center'})">📍 MIRAR</button>
                    </div>
                </div>
            `;
        });

        mediaContainer.innerHTML += mediaHtml || '<p style="font-size:10px; opacity:0.5; text-align:center; padding:20px;">No se encontraron recursos multimedia.</p>';
    }

    // --- EVENTS ---
    trigger.onclick = () => overlay.classList.add('active');
    document.getElementById('close-admin').onclick = () => sidebar.classList.remove('active');

    document.getElementById('admin-login-btn').onclick = () => {
        const val = document.getElementById('admin-pass-input').value;
        if (val === ADMIN_PASSWORD) {
            isAdminAuthenticated = true;
            sessionStorage.setItem('admin_auth', 'true');
            overlay.classList.remove('active');
            sidebar.classList.add('active');
            badge.style.display = 'block';
            updateLists();
        } else {
            document.querySelector('.admin-card').style.borderColor = '#ff3d6b';
        }
    };

    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.admin-tab, .tab-panel').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
            updateLists();
        };
    });

    document.getElementById('edit-text-toggle').onchange = (e) => {
        const tags = ["P", "H1", "H2", "H3", "SPAN", "LI", "BUTTON"];
        document.querySelectorAll('main *').forEach(el => {
            if (tags.includes(el.tagName)) el.contentEditable = e.target.checked;
        });
    };

    document.getElementById('add-text-btn').onclick = () => {
        const target = document.querySelector('section:first-of-type') || document.body;
        const p = document.createElement('p');
        p.innerText = "Nuevo bloque de texto editable.";
        p.style.padding = "20px";
        p.style.color = "white";
        target.appendChild(p);
        updateLists();
        p.scrollIntoView({behavior:'smooth'});
    };

    document.getElementById('add-media-btn').onclick = () => {
        const type = confirm('¿Presiona OK para IMAGEN o CANCELAR para VIDEO?') ? 'img' : 'video';
        const url = prompt(`Ingresa la URL del ${type === 'img' ? 'la imagen' : 'del video'}:`);
        
        if (url) {
            const target = document.querySelector('section:first-of-type') || document.body;
            let el;
            if (type === 'img') {
                el = document.createElement('img');
                el.src = url;
                el.className = "w-full max-w-md mx-auto my-8 block rounded-lg border border-white/10";
            } else {
                el = document.createElement('video');
                el.src = url;
                el.controls = true;
                el.autoplay = true;
                el.muted = true;
                el.loop = true;
                el.className = "w-full max-w-2xl mx-auto my-8 block rounded-lg border border-white/10";
            }
            target.appendChild(el);
            updateLists();
            el.scrollIntoView({behavior:'smooth'});
        }
    };

    document.getElementById('export-btn').onclick = () => {
        const clone = document.documentElement.cloneNode(true);
        clone.querySelectorAll('#admin-sidebar, #admin-modal-overlay, #admin-secret-trigger, #admin-badge, style, script[src$="admin.js"]').forEach(el => el.remove());
        clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
        const html = '<!DOCTYPE html>\n' + clone.outerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'web_actualizada.html';
        a.click();
    };

    document.getElementById('logout-btn').onclick = () => {
        sessionStorage.removeItem('admin_auth');
        window.location.reload();
    };

    document.getElementById('reset-btn').onclick = () => {
        if(confirm('¿Deseas descartar todos los cambios?')) window.location.reload();
    }

    if (isAdminAuthenticated) {
        setTimeout(() => {
            sidebar.classList.add('active');
            badge.style.display = 'block';
            updateLists();
        }, 500);
    }
})();

