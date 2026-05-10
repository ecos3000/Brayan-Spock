/**
 * ADMIN PANEL - CONTROL TOTAL
 * Diseñado para ADAN_CB90
 */

(function() {
    let ADMIN_PASSWORD = sessionStorage.getItem('admin_pwd') || 'ADAN2025';
    let isAdminAuthenticated = sessionStorage.getItem('admin_auth') === 'true';

    const style = document.createElement('style');
    style.textContent = `
        #admin-secret-trigger {
            position: fixed; bottom: 15px; right: 15px; width: 30px; height: 30px;
            z-index: 9999; cursor: pointer; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
        }
        #admin-secret-trigger span { font-size: 14px; opacity: 0.1; transition: opacity 0.3s ease; }
        #admin-secret-trigger:hover span { opacity: 0.8; }

        #admin-dashboard {
            position: fixed; inset: 0; background: #050508; z-index: 10000;
            color: white; font-family: 'Inter', sans-serif; display: none;
            grid-template-columns: 280px 1fr; overflow: hidden;
        }
        #admin-dashboard.active { display: grid; }

        @media (max-width: 900px) {
            #admin-dashboard { grid-template-columns: 1fr; }
            .dash-sidebar { 
                position: fixed; left: -100%; top: 0; bottom: 0; width: 280px; 
                z-index: 10002; transition: left 0.3s ease; 
            }
            .dash-sidebar.mobile-active { left: 0; }
            .dash-main { width: 100vw; }
        }

        .dash-sidebar {
            background: #0c0c14; border-right: 1px solid rgba(0, 245, 196, 0.1);
            display: flex; flex-direction: column; height: 100%;
        }
        .dash-logo { padding: 25px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-family: 'JetBrains Mono'; font-weight: bold; color: #00f5c4; font-size: 13px; }
        .dash-nav { flex: 1; padding: 15px 0; overflow-y: auto; }
        .nav-item { padding: 12px 20px; font-size: 10px; font-family: 'JetBrains Mono'; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; color: rgba(255,255,255,0.5); transition: 0.3s; display: flex; align-items: center; gap: 10px; }
        .nav-item:hover { background: rgba(0, 245, 196, 0.05); color: #00f5c4; }
        .nav-item.active { background: rgba(0, 245, 196, 0.1); color: #00f5c4; border-right: 3px solid #00f5c4; }

        .dash-actions { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); background: #0c0c14; }
        .dash-main { display: flex; flex-direction: column; background: #050508; height: 100vh; min-width: 0; }
        .dash-header { height: auto; min-height: 70px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; padding: 15px 40px; gap: 15px; }
        .dash-scroll { flex: 1; overflow-y: auto; padding: 40px; scrollbar-width: thin; }

        .section-group { margin-bottom: 40px; }
        .section-title { font-family: 'JetBrains Mono'; font-size: 12px; color: #00f5c4; margin-bottom: 20px; text-transform: uppercase; display: flex; align-items: center; gap: 10px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: rgba(0, 245, 196, 0.2); }

        .edit-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .edit-card { background: #0c0c14; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; }
        .edit-card label { display: block; font-size: 9px; color: #00f5c4; text-transform: uppercase; margin-bottom: 8px; opacity: 0.7; }
        .edit-card textarea, .edit-card input { width: 100%; background: #1a1a24; border: 1px solid #333; color: white; padding: 12px; font-size: 13px; border-radius: 4px; outline: none; }

        .btn-dash { padding: 10px 20px; font-size: 10px; font-family: 'JetBrains Mono'; font-weight: bold; text-transform: uppercase; border: none; cursor: pointer; border-radius: 4px; transition: 0.2s; }
        .btn-primary { background: #00f5c4; color: #050508; }
        .btn-danger { background: #ff3d6b; color: white; }
        .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: white; }

        #admin-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: 0.3s; }
        #admin-overlay.active { opacity: 1; pointer-events: auto; }
        .login-card { background: #0c0c14; border: 1px solid #00f5c4; border-radius: 8px; padding: 40px; width: 100%; max-width: 400px; text-align: center; }

        .badge-online { position: fixed; top: 20px; right: 20px; background: #00f5c4; color: #050508; font-family: 'JetBrains Mono'; font-size: 10px; padding: 5px 15px; border-radius: 20px; z-index: 10001; pointer-events: none; }
    `;
    document.head.appendChild(style);

    // --- DOM Elements ---
    const trigger = document.createElement('div');
    trigger.id = 'admin-secret-trigger'; trigger.innerHTML = '<span>🔑</span>';
    document.body.appendChild(trigger);

    const loginOverlay = document.createElement('div');
    loginOverlay.id = 'admin-overlay';
    loginOverlay.innerHTML = `
        <div class="login-card">
            <h2 style="font-family:'JetBrains Mono'; color:#00f5c4; letter-spacing:0.4em; margin-bottom:30px;">AUTH</h2>
            <input type="password" id="admin-pass" placeholder="PASSWORD" style="width:100%; padding:15px; background:#1a1a24; border:1px solid #333; color:white; text-align:center; margin-bottom:20px;" />
            <button id="admin-login" class="btn-dash btn-primary" style="width:100%; padding:15px;">LOGIN</button>
        </div>
    `;
    document.body.appendChild(loginOverlay);

    const dashboard = document.createElement('div');
    dashboard.id = 'admin-dashboard';
    dashboard.innerHTML = `
        <div class="dash-sidebar" id="sidebar-dash">
            <div class="dash-logo">ADAN_CORE</div>
            <div class="dash-nav" id="dash-sections"></div>
            <div class="dash-actions">
                <button id="apply-dash" class="btn-dash btn-primary" style="width:100%; margin-bottom:10px;">GUARDAR CAMBIOS</button>
                <div style="display:flex; gap:10px;">
                    <button id="close-dash" class="btn-dash btn-outline" style="flex:1;">CERRAR</button>
                    <button id="logout-dash" class="btn-dash btn-danger">SALIR</button>
                </div>
            </div>
        </div>
        <div class="dash-main">
            <div class="dash-header">
                <span id="active-sec-name" style="font-family:'JetBrains Mono'; color:#00f5c4; font-size:12px;">DASHBOARD</span>
                <button id="sync-dash" class="btn-dash btn-outline">🔄 SINCRONIZAR</button>
            </div>
            <div class="dash-scroll" id="dash-content">
                <div style="text-align:center; padding-top:100px; opacity:0.1;">
                    <h1 style="font-size:60px; font-weight:900;">ADMIN</h1>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dashboard);

    const badge = document.createElement('div');
    badge.className = 'badge-online'; badge.textContent = 'ADMIN MODE';
    badge.style.display = isAdminAuthenticated ? 'block' : 'none';
    document.body.appendChild(badge);

    // --- Logic ---
    let activeSectionId = null;
    let draftData = null;

    function syncDraft() {
        if (window.siteData && !draftData) {
            draftData = JSON.parse(JSON.stringify(window.siteData));
        }
    }

    function updateDraft(path, value) {
        syncDraft();
        if (!draftData) return;
        const parts = path.split('.');
        let current = draftData;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        if (window.setSiteData) window.setSiteData(draftData);
    }

    function scanSections() {
        const sections = ['inicio', 'servicios', 'resultados', 'testimonios', 'contacto'];
        const nav = document.getElementById('dash-sections');
        nav.innerHTML = sections.map(s => `<div class="nav-item" data-sec="${s}">${s.toUpperCase()}</div>`).join('');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.onclick = () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                loadSection(item.dataset.sec);
            };
        });
    }

    function loadSection(id) {
        syncDraft();
        activeSectionId = id;
        document.getElementById('active-sec-name').textContent = `EDITANDO: ${id.toUpperCase()}`;
        const container = document.getElementById('dash-content');
        
        if (!draftData) {
            container.innerHTML = '<p style="text-align:center; padding:20px; opacity:0.5;">Cargando...</p>';
            setTimeout(() => loadSection(id), 500);
            return;
        }

        let html = '';
        if (id === 'inicio') {
            html = `
                <div class="section-group">
                    <div class="section-title">Hero</div>
                    <div class="edit-grid">
                        <div class="edit-card"><label>Título</label><input type="text" value="${draftData.hero?.title || ''}" oninput="updateDraft('hero.title', this.value)"></div>
                        <div class="edit-card"><label>Subtítulo</label><input type="text" value="${draftData.hero?.subtitle || ''}" oninput="updateDraft('hero.subtitle', this.value)"></div>
                        <div class="edit-card"><label>Botón</label><input type="text" value="${draftData.hero?.cta || ''}" oninput="updateDraft('hero.cta', this.value)"></div>
                    </div>
                </div>
            `;
        } else if (id === 'resultados') {
            html = `
                <div class="section-group">
                    <div class="section-title">Métricas</div>
                    <div class="edit-grid">
                        ${(draftData.metrics || []).map((m, i) => `
                            <div class="edit-card">
                                <label>Métrica ${i+1}</label>
                                <input type="number" value="${m.value}" oninput="updateDraft('metrics.${i}.value', parseInt(this.value) || 0)">
                                <input type="text" value="${m.suffix}" oninput="updateDraft('metrics.${i}.suffix', this.value)" style="margin-top:10px;">
                                <textarea oninput="updateDraft('metrics.${i}.label', this.value)" style="margin-top:10px;">${m.label}</textarea>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (id === 'contacto') {
          html = `
              <div class="section-group">
                  <div class="section-title">Redes Sociales</div>
                  <div class="edit-grid">
                      ${(draftData.socials || []).map((s, i) => `
                          <div class="edit-card">
                              <label>${s.label}</label>
                              <input type="text" value="${s.href}" oninput="updateDraft('socials.${i}.href', this.value)">
                          </div>
                      `).join('')}
                  </div>
              </div>
          `;
        }

        container.innerHTML = html || '<p style="text-align:center; opacity:0.3; padding:40px;">Edición disponible para esta sección.</p>';
    }

    // --- Event Listeners ---
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
        }
    };

    document.getElementById('close-dash').onclick = () => dashboard.classList.remove('active');
    document.getElementById('logout-dash').onclick = () => { sessionStorage.removeItem('admin_auth'); window.location.reload(); };

    document.getElementById('apply-dash').onclick = async () => {
        const btn = document.getElementById('apply-dash');
        btn.textContent = 'GUARDANDO...';
        try {
            syncDraft();
            const response = await fetch('/api/save-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: draftData })
            });
            const result = await response.json();
            if (result.success) {
                btn.textContent = '✅ GUARDADO';
                setTimeout(() => btn.textContent = 'GUARDAR CAMBIOS', 2000);
            }
        } catch (error) {
            btn.textContent = '❌ ERROR';
            alert("Error: " + error.message);
        }
    };

    document.getElementById('sync-dash').onclick = () => {
        draftData = null;
        scanSections();
        if (activeSectionId) loadSection(activeSectionId);
    };

    if (isAdminAuthenticated) {
        setTimeout(() => { scanSections(); dashboard.classList.add('active'); }, 1000);
    }
})();
