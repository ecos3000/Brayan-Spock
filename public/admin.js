/**
 * ADMIN PANEL V4 - DASHBOARD PROFESIONAL
 * Control Total por Secciones y Multimedia
 * Diseñado para ADAN_CB90
 */

(function() {
    let ADMIN_PASSWORD = sessionStorage.getItem('admin_pwd') || 'ADAN2025';
    let isAdminAuthenticated = sessionStorage.getItem('admin_auth') === 'true';

    const style = document.createElement('style');
    style.textContent = `
        #admin-secret-trigger {
            position: fixed; bottom: 32px; right: 32px; width: 40px; height: 40px;
            z-index: 9999; cursor: pointer; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
        }
        #admin-secret-trigger span { font-size: 20px; opacity: 0; transition: opacity 0.3s ease; }
        #admin-secret-trigger:hover span { opacity: 0.5; }

        #admin-dashboard {
            position: fixed; inset: 0; background: #050508; z-index: 10000;
            color: white; font-family: 'Inter', sans-serif; display: none;
            grid-template-columns: 280px 1fr; overflow: hidden;
        }
        #admin-dashboard.active { display: grid; }

        /* Sidebar Navigation */
        .dash-sidebar {
            background: #0c0c14; border-right: 1px solid rgba(0, 245, 196, 0.1);
            display: flex; flex-direction: column; padding: 20px 0;
        }
        .dash-logo {
            padding: 0 30px 30px; border-bottom: 1px solid rgba(255,255,255,0.05);
            font-family: 'JetBrains Mono'; font-weight: bold; color: #00f5c4; font-size: 14px;
        }
        .dash-nav { flex: 1; padding: 20px 0; overflow-y: auto; }
        .nav-item {
            padding: 12px 30px; font-size: 11px; font-family: 'JetBrains Mono';
            text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;
            color: rgba(255,255,255,0.5); transition: 0.3s; display: flex; align-items: center; gap: 10px;
        }
        .nav-item:hover { background: rgba(0, 245, 196, 0.05); color: #00f5c4; }
        .nav-item.active { background: rgba(0, 245, 196, 0.1); color: #00f5c4; border-right: 3px solid #00f5c4; }

        /* Main Content */
        .dash-main { display: flex; flex-direction: column; background: #050508; height: 100vh; }
        .dash-header {
            height: 70px; border-bottom: 1px solid rgba(255,255,255,0.05);
            display: flex; align-items: center; justify-content: space-between; padding: 0 40px;
        }
        .dash-scroll { flex: 1; overflow-y: auto; padding: 40px; }

        /* Cards and Elements */
        .section-group { margin-bottom: 40px; }
        .section-title {
            font-family: 'JetBrains Mono'; font-size: 12px; color: #00f5c4;
            margin-bottom: 20px; text-transform: uppercase; display: flex; align-items: center; gap: 10px;
        }
        .section-title::after { content: ''; flex: 1; height: 1px; background: rgba(0, 245, 196, 0.2); }

        .edit-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .edit-card {
            background: #0c0c14; border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px; padding: 20px; transition: 0.3s;
        }
        .edit-card:hover { border-color: rgba(0,245,196,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .edit-card label { display: block; font-size: 9px; color: #00f5c4; text-transform: uppercase; margin-bottom: 8px; opacity: 0.7; }
        .edit-card textarea, .edit-card input {
            width: 100%; background: #1a1a24; border: 1px solid #333; color: white; padding: 12px;
            font-size: 13px; border-radius: 4px; outline: none; transition: 0.3s;
        }
        .edit-card textarea:focus { border-color: #00f5c4; }

        .media-prev-dash {
            width: 100%; height: 140px; object-fit: cover; border-radius: 4px;
            margin-bottom: 15px; background: #000; border: 1px solid #333;
        }

        .btn-dash {
            padding: 10px 20px; font-size: 10px; font-family: 'JetBrains Mono'; font-weight: bold;
            text-transform: uppercase; border: none; cursor: pointer; border-radius: 4px; transition: 0.2s;
        }
        .btn-primary { background: #00f5c4; color: #050508; }
        .btn-danger { background: #ff3d6b; color: white; }
        .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: white; }
        .btn-outline:hover { background: rgba(255,255,255,0.05); }

        #admin-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 9999;
            display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);
            opacity: 0; pointer-events: none; transition: 0.3s;
        }
        #admin-overlay.active { opacity: 1; pointer-events: auto; }

        .login-card {
            background: #0c0c14; border: 1px solid #00f5c4; border-radius: 8px;
            padding: 40px; width: 100%; max-width: 400px; text-align: center;
        }

        /* Utils */
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .gap-10 { gap: 10px; }
        .mt-20 { margin-top: 20px; }
        .badge-online {
            position: fixed; top: 20px; right: 20px; background: #00f5c4; color: #050508;
            font-family: 'JetBrains Mono'; font-size: 10px; padding: 5px 15px; border-radius: 20px;
            z-index: 10001; pointer-events: none; box-shadow: 0 0 20px rgba(0,245,196,0.3);
        }
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const trigger = document.createElement('div');
    trigger.id = 'admin-secret-trigger'; trigger.innerHTML = '<span>🔑</span>';
    document.body.appendChild(trigger);

    const loginOverlay = document.createElement('div');
    loginOverlay.id = 'admin-overlay';
    loginOverlay.innerHTML = `
        <div class="login-card">
            <h2 style="font-family:'JetBrains Mono'; color:#00f5c4; letter-spacing:0.4em; margin-bottom:30px;">AUTH_REQUIRED</h2>
            <input type="password" id="admin-pass" placeholder="PASSWORD" style="width:100%; padding:15px; background:#1a1a24; border:1px solid #333; color:white; text-align:center; margin-bottom:20px; font-family:'JetBrains Mono';" />
            <button id="admin-login" class="btn-dash btn-primary" style="width:100%; padding:15px;">INITIALIZE_DASHBOARD</button>
        </div>
    `;
    document.body.appendChild(loginOverlay);

    const dashboard = document.createElement('div');
    dashboard.id = 'admin-dashboard';
    dashboard.innerHTML = `
        <div class="dash-sidebar">
            <div class="dash-logo">ADAN_CORE_INTERFACE</div>
            <div class="dash-nav" id="dash-sections">
                <!-- Sections map here -->
            </div>
            <div style="padding:20px;">
                <button id="apply-dash" class="btn-dash btn-primary" style="width:100%; margin-bottom:10px; background: #00f5c4; color: #050508;">APLICAR CAMBIOS</button>
                <button id="export-dash" class="btn-dash btn-outline" style="width:100%; margin-bottom:10px;">GENERAR HTML FINAL</button>
                <div style="display:flex; gap:10px;">
                    <button id="close-dash" class="btn-dash btn-outline" style="flex:1;">CERRAR</button>
                    <button id="logout-dash" class="btn-dash btn-danger">SALIR</button>
                </div>
            </div>
        </div>
        <div class="dash-main">
            <div class="dash-header">
                <div>
                    <span id="active-sec-name" style="font-family:'JetBrains Mono'; color:#00f5c4; font-size:14px; text-transform:uppercase;">DASHBOARD_HOME</span>
                </div>
                <div class="flex-center gap-10">
                    <button id="picker-dash" class="btn-dash btn-outline">🔍 SELECCIONAR ELEMENTO</button>
                    <button id="sync-dash" class="btn-dash btn-outline">🔄 SINCRONIZAR</button>
                </div>
            </div>
            <div class="dash-scroll" id="dash-content">
                <!-- Content here -->
                <div style="text-align:center; padding-top:100px; opacity:0.3;">
                    <h1 style="font-size:60px; font-weight:900;">ADMIN</h1>
                    <p style="font-family:'JetBrains Mono';">SELECCIONA UNA SECCIÓN PARA EMPEZAR A EDITAR</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dashboard);

    const badge = document.createElement('div');
    badge.className = 'badge-online'; badge.textContent = 'SYSTEM_MODE: ADMIN';
    badge.style.display = isAdminAuthenticated ? 'block' : 'none';
    document.body.appendChild(badge);

    // --- LOGIC ---
    let activeSectionId = null;

    function scanSections() {
        const sections = Array.from(document.querySelectorAll('section, header, footer, main'));
        const nav = document.getElementById('dash-sections');
        
        let navHtml = `
            <div class="nav-item" id="nav-global" style="border-bottom:1px solid rgba(255,255,255,0.05); margin-bottom:10px; padding-bottom:15px;">
                <span>⚙️</span> CONFIGURACIÓN GLOBAL
            </div>
        `;

        navHtml += sections.map(s => {
            const name = s.id || s.tagName.toLowerCase();
            let icon = '📁';
            if (name.includes('inicio')) icon = '🏠';
            if (name.includes('servicios')) icon = '⚡';
            if (name.includes('contacto')) icon = '✉️';
            if (name.includes('testimonios')) icon = '💬';
            if (name.includes('resultados')) icon = '📊';
            if (name.includes('blog')) icon = '📝';
            if (name.includes('sobre-mi')) icon = '👤';
            return `<div class="nav-item" data-sec="${name}"><span>${icon}</span> ${name.replace(/-/g, ' ')}</div>`;
        }).join('');

        navHtml += `
            <div class="nav-item" id="nav-security" style="border-top:1px solid rgba(255,255,255,0.05); margin-top:10px; padding-top:15px; color: #ff3d6b;">
                <span>🔐</span> SEGURIDAD Y CLAVE
            </div>
        `;
        
        nav.innerHTML = navHtml;

        document.querySelectorAll('.nav-item').forEach(item => {
            item.onclick = () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                if (item.id === 'nav-global') loadGlobal();
                else if (item.id === 'nav-security') loadSecurity();
                else loadSection(item.dataset.sec);
            };
        });
    }

    function loadSecurity() {
        activeSectionId = 'security';
        document.getElementById('active-sec-name').textContent = `GESTIÓN DE SEGURIDAD`;
        const container = document.getElementById('dash-content');
        container.innerHTML = `
            <div class="section-group">
                <div class="section-title">Cambiar Contraseña de Acceso</div>
                <div class="edit-grid">
                    <div class="edit-card" style="border-color: #ff3d6b;">
                        <label>Contraseña Actual / Nueva</label>
                        <p style="font-size:10px; opacity:0.5; margin-bottom:15px;">Introduce la nueva clave para acceder a este panel. El cambio se aplicará inmediatamente en esta sesión.</p>
                        <input type="text" id="security-pwd-input" value="${ADMIN_PASSWORD}" style="font-size:20px; text-align:center; letter-spacing:0.2em; border-color: #ff3d6b;">
                        <button class="btn-dash btn-danger mt-20" style="width:100%; border-radius: 0; padding: 15px;" onclick="updatePassword('security-pwd-input')">ACTUALIZAR CLAVE DE ACCESO</button>
                    </div>
                </div>
            </div>
            
            <div class="section-group">
                <div class="section-title">Estado del Sistema</div>
                <div class="edit-grid">
                    <div class="edit-card">
                        <label>Privilegios</label>
                        <p style="font-size:12px; color: #00f5c4;">NIVEL: ADMINISTRADOR_ROOT</p>
                    </div>
                    <div class="edit-card">
                        <label>Sesión</label>
                        <p style="font-size:12px; opacity:0.7;">ACTIVA (LocalStorage Persistence)</p>
                    </div>
                </div>
            </div>
        `;
    }

    function loadGlobal() {
        activeSectionId = 'global';
        document.getElementById('active-sec-name').textContent = `DASHBOARD / CONFIGURACIÓN GLOBAL`;
        const container = document.getElementById('dash-content');
        
        const socialKeywords = ['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin', 'x', 'github', 'whatsapp'];
        const socialLinks = Array.from(document.querySelectorAll('a')).filter(a => {
            const txt = a.innerText.toLowerCase();
            const classes = a.className.toLowerCase();
            const title = (a.getAttribute('title') || '').toLowerCase();
            const href = a.href.toLowerCase();
            return socialKeywords.some(k => txt.includes(k) || classes.includes(k) || title.includes(k) || href.includes(k));
        });

        container.innerHTML = `
            <div class="section-group">
                <div class="section-title">Enlaces de Redes Sociales</div>
                <p style="font-size:11px; opacity:0.5; margin-bottom:20px;">Gestiona los destinos de todos tus botones sociales detectados en la página.</p>
                <div class="edit-grid">
                    ${socialLinks.map((a, i) => {
                        a.id = a.id || `admin-social-${i}`;
                        const label = a.innerText.trim() || a.getAttribute('aria-label') || `Enlace ${i+1}`;
                        return `
                            <div class="edit-card">
                                <label>${label}</label>
                                <input type="text" value="${a.href}" oninput="document.getElementById('${a.id}').href = this.value" placeholder="https://...">
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1" onclick="closeDash(); document.getElementById('${a.id}').scrollIntoView({behavior:'smooth', block:'center'});">UBICAR</button>
                                    <button class="btn-dash btn-danger" onclick="if(confirm('¿ELIMINAR BOTÓN?')) { document.getElementById('${a.id}').remove(); loadGlobal(); }">BORRAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="section-group">
                <div class="section-title">Identidad del Sitio</div>
                <div class="edit-grid">
                    <div class="edit-card">
                        <label>Título de la Pestaña (HTML Title)</label>
                        <input type="text" value="${document.title}" oninput="document.title = this.value">
                    </div>
                </div>
            </div>
        `;
    }

    window.updatePassword = (inputId) => {
        const id = inputId || 'new-pwd-input';
        const input = document.getElementById(id);
        if (!input) return;
        const val = input.value;
        if (val.trim()) {
            ADMIN_PASSWORD = val;
            sessionStorage.setItem('admin_pwd', val);
            alert('CONTRASEÑA ACTUALIZADA CON ÉXITO.\n\nNueva clave: ' + val);
            if (activeSectionId === 'security') loadSecurity();
        }
    };

    function loadSection(id) {
        activeSectionId = id;
        document.getElementById('active-sec-name').textContent = `EDITANDO: ${id}`;
        const container = document.getElementById('dash-content');
        container.innerHTML = '';

        const target = document.getElementById(id) || document.querySelector(id);
        if (!target) return;

        // Group 1: Textos y Enlaces
        const texts = Array.from(target.querySelectorAll('h1, h2, h3, h4, h5, p, span, li, button, a')).filter(el => {
            const isText = el.innerText.trim().length > 0 && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3;
            return isText && !el.closest('#admin-dashboard') && !el.closest('#admin-overlay');
        });

        // Group 2: Multimedia
        const images = Array.from(target.querySelectorAll('img')).filter(el => !el.closest('#admin-dashboard'));
        const videos = Array.from(target.querySelectorAll('video')).filter(el => !el.closest('#admin-dashboard'));
        const iframes = Array.from(target.querySelectorAll('iframe')).filter(el => !el.closest('#admin-dashboard'));
        
        // Find background images
        const withBg = Array.from(target.querySelectorAll('*')).filter(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            return bg && bg !== 'none' && bg.includes('url(') && !el.closest('#admin-dashboard');
        });

        let html = `
            <div class="section-group">
                <div class="section-title">Contenido de Texto</div>
                <div class="edit-grid">
                    ${texts.map((el, i) => {
                        el.id = el.id || `admin-txt-${id}-${i}`;
                        return `
                            <div class="edit-card">
                                <label>[${el.tagName}] Bloque ${i+1}</label>
                                <textarea oninput="document.getElementById('${el.id}').innerText = this.value">${el.innerText}</textarea>
                                ${el.tagName === 'A' ? `
                                    <div class="mt-20">
                                        <label>DESTINO (URL)</label>
                                        <input type="text" value="${el.href}" oninput="document.getElementById('${el.id}').href = this.value">
                                    </div>
                                ` : ''}
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1;" onclick="closeDash(); document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'});">VER EN WEB</button>
                                    <button class="btn-dash btn-danger" onclick="document.getElementById('${el.id}').remove(); loadSection('${id}');">ELIMINAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    <div class="edit-card flex-center" style="border: 1px dashed rgba(255,255,255,0.2); cursor:pointer; min-height:100px;" onclick="addItem('${id}', 'link')">
                        <span style="font-size:24px; color:#00f5c4;">+</span>
                        <div style="font-family:'JetBrains Mono'; font-size:10px; margin-left:10px;">AÑADIR NUEVO ENLACE / BOTÓN</div>
                    </div>
                </div>
            </div>

            <div class="section-group">
                <div class="section-title">Multimedia y Visuales</div>
                <div class="edit-grid">
                    ${images.map((el, i) => {
                        el.id = el.id || `admin-med-${id}-${i}`;
                        return `
                            <div class="edit-card">
                                <label>Imagen ${i+1}</label>
                                <img src="${el.src}" class="media-prev-dash">
                                <input type="text" value="${el.getAttribute('src') || el.src}" oninput="document.getElementById('${el.id}').src = this.value" placeholder="Nueva URL de imagen...">
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1;" onclick="closeDash(); document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'});">UBICAR</button>
                                    <button class="btn-dash btn-danger" onclick="if(confirm('¿ELIMINAR IMAGEN?')) { document.getElementById('${el.id}').remove(); loadSection('${id}'); }">ELIMINAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${videos.map((el, i) => {
                        el.id = el.id || `admin-vid-${id}-${i}`;
                        const source = el.querySelector('source');
                        const src = source ? (source.getAttribute('src') || source.src) : (el.getAttribute('src') || el.src);
                        return `
                            <div class="edit-card">
                                <label>Video ${i+1}</label>
                                <div class="media-prev-dash flex-center" style="background:#000; color:#00f5c4;">VIDEO</div>
                                <input type="text" value="${src}" onchange="updateMedia('${el.id}', this.value)" placeholder="URL .mp4...">
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1;" onclick="closeDash(); document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'});">UBICAR</button>
                                    <button class="btn-dash btn-danger" onclick="if(confirm('¿ELIMINAR VIDEO?')) { document.getElementById('${el.id}').remove(); loadSection('${id}'); }">ELIMINAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${withBg.map((el, i) => {
                        el.id = el.id || `admin-bg-${id}-${i}`;
                        const bg = window.getComputedStyle(el).backgroundImage;
                        const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                        const url = match ? match[1] : '';
                        if (!url) return '';
                        return `
                            <div class="edit-card">
                                <label>Fondo / Background ${i+1}</label>
                                <div class="media-prev-dash" style="background-image:url(${url}); background-size:cover; background-position:center;"></div>
                                <input type="text" value="${url}" oninput="document.getElementById('${el.id}').style.backgroundImage = 'url(' + this.value + ')'" placeholder="Nueva URL de fondo...">
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1;" onclick="closeDash(); document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'});">UBICAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${iframes.map((el, i) => {
                        el.id = el.id || `admin-ifr-${id}-${i}`;
                        return `
                            <div class="edit-card">
                                <label>Iframe / Mapa / Video Ext ${i+1}</label>
                                <div class="media-prev-dash flex-center" style="background:#222; color:#00f5c4; font-size:10px;">EMBED</div>
                                <input type="text" value="${el.src}" oninput="document.getElementById('${el.id}').src = this.value" placeholder="Nueva URL embed...">
                                <div class="mt-20 flex-center gap-10">
                                    <button class="btn-dash btn-outline" style="flex:1;" onclick="closeDash(); document.getElementById('${el.id}').scrollIntoView({behavior:'smooth', block:'center'});">UBICAR</button>
                                    <button class="btn-dash btn-danger" onclick="if(confirm('¿ELIMINAR IFRAME?')) { document.getElementById('${el.id}').remove(); loadSection('${id}'); }">ELIMINAR</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    <div class="edit-card flex-center" style="border: 1px dashed rgba(0,245,196,0.3); cursor:pointer; min-height:140px; flex-direction:column;" onclick="addItem('${id}', 'media')">
                        <span style="font-size:30px; color:#00f5c4;">+</span>
                        <div style="font-family:'JetBrains Mono'; font-size:10px; margin-top:10px;">AÑADIR IMAGEN O VIDEO</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html || '<p style="text-align:center; opacity:0.3;">SECCIÓN LISTA PARA EDITAR</p>';
    }

    window.updateMedia = (id, url) => {
        const el = document.getElementById(id);
        if (el.tagName === 'IMG' || el.tagName === 'IFRAME') {
            el.src = url;
        } else if (el.tagName === 'VIDEO') {
            const source = el.querySelector('source');
            if (source) source.src = url;
            else el.src = url;
            el.load();
            el.play();
        }
    };

    window.addItem = (secId, type) => {
        const target = document.getElementById(secId) || document.querySelector(secId);
        if (type === 'text') {
            const p = document.createElement('p');
            p.innerText = "NUEVO PÁRRAFO - EDITAR EN PANEL";
            p.style.textAlign = "center"; p.style.padding = "20px"; p.style.color = "white";
            p.style.fontFamily = "'JetBrains Mono', monospace"; p.style.fontSize = "12px";
            target.appendChild(p);
        } else if (type === 'link') {
            const a = document.createElement('a');
            a.innerText = "BOTÓN NUEVO";
            a.href = "#";
            a.style.display = "inline-block"; a.style.padding = "10px 20px"; a.style.margin = "10px";
            a.style.border = "1px solid #00f5c4"; a.style.color = "#00f5c4"; a.style.fontFamily = "'JetBrains Mono'";
            a.style.fontSize = "10px"; a.style.textDecoration = "none";
            target.appendChild(a);
        } else {
            const url = prompt("URL DE LA IMAGEN O VIDEO (.mp4):");
            if (url) {
                if (url.endsWith('.mp4') || url.includes('video')) {
                    const video = document.createElement('video');
                    video.src = url; video.autoplay = true; video.loop = true; video.muted = true;
                    video.style.width = "100%"; video.style.maxWidth = "800px"; video.style.margin = "40px auto"; video.style.display = "block";
                    target.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = url; img.style.width = "100%"; img.style.maxWidth = "800px"; img.style.margin = "40px auto"; img.style.display = "block";
                    target.appendChild(img);
                }
            }
        }
        loadSection(secId);
    };

    window.closeDash = () => dashboard.classList.remove('active');

    // --- EVENTS ---
    trigger.onclick = () => {
        if (isAdminAuthenticated) {
            scanSections();
            dashboard.classList.add('active');
        } else {
            loginOverlay.classList.add('active');
        }
    };

    document.getElementById('admin-login').onclick = () => {
        if (document.getElementById('admin-pass').value === ADMIN_PASSWORD) {
            isAdminAuthenticated = true;
            sessionStorage.setItem('admin_auth', 'true');
            loginOverlay.classList.remove('active');
            dashboard.classList.add('active');
            badge.style.display = 'block';
            scanSections();
        } else {
            document.querySelector('.login-card').style.borderColor = '#ff3d6b';
        }
    };

    document.getElementById('close-dash').onclick = closeDash;
    
    document.getElementById('apply-dash').onclick = () => {
        const btn = document.getElementById('apply-dash');
        const originalText = btn.textContent;
        btn.textContent = '✓ CAMBIOS APLICADOS';
        btn.style.background = '#0affd2';
        
        // Simular persistencia o simplemente confirmar
        console.log("Cambios aplicados a la sesión actual");
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#00f5c4';
        }, 2000);
        
        // Opcional: Cerrar el dash para ver cambios
        // closeDash();
    };

    document.getElementById('logout-dash').onclick = () => {
        sessionStorage.removeItem('admin_auth');
        window.location.reload();
    };

    document.getElementById('sync-dash').onclick = () => {
        scanSections();
        if (activeSectionId) loadSection(activeSectionId);
        alert('DATOS SINCRONIZADOS');
    };

    document.getElementById('export-dash').onclick = () => {
        const clone = document.documentElement.cloneNode(true);
        clone.querySelectorAll('#admin-dashboard, #admin-overlay, #admin-secret-trigger, .badge-online, style, script[src*="admin.js"]').forEach(el => el.remove());
        const html = '<!DOCTYPE html>\n' + clone.outerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'web_control_total.html'; a.click();
    };

    // Picker
    let isPicking = false;
    document.getElementById('picker-dash').onclick = () => {
        isPicking = true;
        closeDash();
        document.body.style.cursor = 'crosshair';
        alert('MODO PICKER: Haz clic en cualquier elemento de la web para editarlo.');
    };

    document.addEventListener('click', (e) => {
        if (!isPicking) return;
        if (e.target.closest('#admin-dashboard') || e.target.closest('#admin-overlay')) return;
        
        e.preventDefault(); e.stopPropagation();
        isPicking = false;
        document.body.style.cursor = 'default';
        
        const sec = e.target.closest('section, header, footer');
        if (sec) {
            dashboard.classList.add('active');
            const secName = sec.id || sec.tagName.toLowerCase();
            setTimeout(() => {
                const navItem = document.querySelector(`.nav-item[data-sec="${secName}"]`);
                if (navItem) navItem.click();
            }, 100);
        }
    }, true);

    if (isAdminAuthenticated) {
        setTimeout(() => {
            scanSections();
            dashboard.classList.add('active');
        }, 1500); 
    }
})();


