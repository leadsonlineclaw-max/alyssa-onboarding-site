// ============ STATIC MOCK BACKEND (NO SERVER REQUIRED) ============
const STATIC_MODE = true;

function createMockApi() {
  const storeKey = 'onboarding_static_mock_v1';
  const today = new Date().toISOString().slice(0, 10);

  const seed = {
    departments: [
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Sales' },
      { id: 3, name: 'Support' },
      { id: 4, name: 'People Ops' },
    ],
    users: [
      { id: 1, uuid: 'u-hr-1', email: 'sarah.chen@leadsonline.com', first_name: 'Sarah', last_name: 'Chen', role: 'hr_admin', job_title: 'VP of People Operations', department_id: 4, manager_id: null, location: 'Plano, TX' },
      { id: 2, uuid: 'u-mgr-1', email: 'mike.torres@leadsonline.com', first_name: 'Mike', last_name: 'Torres', role: 'manager', job_title: 'Engineering Manager', department_id: 1, manager_id: null, location: 'Plano, TX' },
      { id: 3, uuid: 'u-buddy-1', email: 'priya.patel@leadsonline.com', first_name: 'Priya', last_name: 'Patel', role: 'manager', job_title: 'Senior Software Engineer', department_id: 1, manager_id: 2, location: 'Plano, TX', fun_fact: 'I roast my own coffee beans.' },
      { id: 4, uuid: 'u-alyssa-1', email: 'ea@onboarding.com', first_name: 'Alyssa', last_name: 'Reed', role: 'new_hire', job_title: 'Executive Assistant', department_id: 4, manager_id: 1, location: 'Plano, TX', fun_fact: 'I can solve a Rubik\'s cube in under 90 seconds.' },
    ],
    sessions: [
      { id: 1, user_id: 4, buddy_id: 3, magic_token: 'alyssa-demo-token', start_date: today, current_phase: 1, status: 'active', created_at: new Date().toISOString() },
    ],
    phases: [
      { id: 1, phase_number: 0, name: 'Preboarding — Get Ready', icon: '📬' },
      { id: 2, phase_number: 1, name: 'Week 1 — Foundation', icon: '🚀' },
      { id: 3, phase_number: 2, name: 'Month 1 — Learn the System', icon: '📚' },
      { id: 4, phase_number: 3, name: 'Month 2-3 — Build Momentum', icon: '🔨' },
      { id: 5, phase_number: 4, name: 'Graduation — 90 Days', icon: '🎓' },
    ],
    tasks: [
      { id: 1, phase_id: 1, phase_number: 0, phase_name: 'Preboarding — Get Ready', phase_icon: '📬', title: 'Complete personal profile', description: 'Add contact details and emergency info.', task_type: 'form', is_required: 1, sort_order: 1, department_id: null },
      { id: 2, phase_id: 1, phase_number: 0, phase_name: 'Preboarding — Get Ready', phase_icon: '📬', title: 'Review employee handbook', description: 'Read and acknowledge key policies.', task_type: 'acknowledgment', is_required: 1, sort_order: 2, department_id: null },
      { id: 3, phase_id: 2, phase_number: 1, phase_name: 'Week 1 — Foundation', phase_icon: '🚀', title: 'IT setup checklist', description: 'Confirm email, Slack, and device setup.', task_type: 'checkbox', is_required: 1, sort_order: 1, department_id: null },
      { id: 4, phase_id: 2, phase_number: 1, phase_name: 'Week 1 — Foundation', phase_icon: '🚀', title: 'Meet your manager', description: 'First 1:1 and role expectations.', task_type: 'checkbox', is_required: 1, sort_order: 2, department_id: null },
      { id: 5, phase_id: 3, phase_number: 2, phase_name: 'Month 1 — Learn the System', phase_icon: '📚', title: 'Shadow team workflows', description: 'Observe core workflows and processes.', task_type: 'checkbox', is_required: 1, sort_order: 1, department_id: null },
      { id: 6, phase_id: 4, phase_number: 3, phase_name: 'Month 2-3 — Build Momentum', phase_icon: '🔨', title: 'Own a process improvement', description: 'Propose and implement one improvement.', task_type: 'checkbox', is_required: 1, sort_order: 1, department_id: null },
      { id: 7, phase_id: 5, phase_number: 4, phase_name: 'Graduation — 90 Days', phase_icon: '🎓', title: '90-day reflection', description: 'Submit wins, blockers, and next goals.', task_type: 'form', is_required: 1, sort_order: 1, department_id: null },
    ],
    completions: [
      { session_id: 1, task_id: 1, completed: 1 },
      { session_id: 1, task_id: 2, completed: 1 },
      { session_id: 1, task_id: 3, completed: 0 },
      { session_id: 1, task_id: 4, completed: 0 },
      { session_id: 1, task_id: 5, completed: 0 },
      { session_id: 1, task_id: 6, completed: 0 },
      { session_id: 1, task_id: 7, completed: 0 },
    ],
    resources: [
      { id: 1, title: 'Welcome to LeadsOnline', category: 'Company', tags: 'welcome,company,culture', sort_order: 1, content: 'Welcome to LeadsOnline!\n\nWe help law enforcement agencies investigate faster with modern technology.' },
      { id: 2, title: 'IT Setup Guide', category: 'IT', tags: 'it,setup,access', sort_order: 2, content: '**Day 1 Setup**\n- Sign into Google Workspace\n- Join Slack channels\n- Configure MFA\n- Install required tools' },
      { id: 3, title: 'Benefits Overview', category: 'HR', tags: 'benefits,health,pto', sort_order: 3, content: '**Benefits at a glance**\n- Medical, dental, vision\n- 401(k)\n- Paid time off\n- Employee assistance program' },
      { id: 4, title: 'Office & Remote Norms', category: 'Culture', tags: 'culture,remote,office', sort_order: 4, content: 'We default to clear async communication and thoughtful documentation.' },
    ],
    nextIds: { user: 100, session: 100 },
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    localStorage.setItem(storeKey, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  };
  let db = load();
  const save = () => localStorage.setItem(storeKey, JSON.stringify(db));

  const jsonRes = (obj, ok = true, status = 200) => Promise.resolve({ ok, status, json: async () => obj });
  const getUser = (id) => db.users.find(u => u.id === Number(id));
  const getSession = (id) => db.sessions.find(s => s.id === Number(id));

  const attachTaskState = (sessionId) => {
    const sid = Number(sessionId);
    return db.tasks
      .slice()
      .sort((a, b) => (a.phase_number - b.phase_number) || (a.sort_order - b.sort_order))
      .map(t => {
        const c = db.completions.find(x => x.session_id === sid && x.task_id === t.id) || { completed: 0 };
        return { ...t, completed: c.completed, completed_at: c.completed ? new Date().toISOString() : null, notes: null, form_data_json: null };
      });
  };

  const computeProgress = (sessionId) => {
    const session = getSession(sessionId);
    const tasks = attachTaskState(sessionId);
    const phases = db.phases
      .slice()
      .sort((a, b) => a.phase_number - b.phase_number)
      .map(p => {
        const pTasks = tasks.filter(t => t.phase_number === p.phase_number);
        const total = pTasks.length;
        const done = pTasks.filter(t => t.completed).length;
        return { ...p, total, done, percent: total ? Math.round((done / total) * 100) : 0 };
      });
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.completed).length;

    let currentPhase = session.current_phase;
    for (const p of phases) {
      if (p.total > 0 && p.done >= p.total && p.phase_number >= currentPhase) currentPhase = p.phase_number + 1;
    }
    currentPhase = Math.min(currentPhase, 4);
    session.current_phase = currentPhase;
    save();

    return { overall: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0, totalTasks, doneTasks, currentPhase, phases };
  };

  const parseBody = async (opts) => {
    if (!opts || !opts.body) return {};
    try { return JSON.parse(opts.body); } catch { return {}; }
  };

  return async function mockFetch(input, opts = {}) {
    const method = (opts.method || 'GET').toUpperCase();
    const raw = typeof input === 'string' ? input : input.url;
    const url = new URL(raw, window.location.origin);
    const path = url.pathname;

    // AUTH
    const tokenMatch = path.match(/^\/api\/auth\/token\/([^/]+)$/);
    if (method === 'GET' && tokenMatch) {
      const token = decodeURIComponent(tokenMatch[1]);
      const s = db.sessions.find(x => x.magic_token === token);
      if (!s) return jsonRes({ error: 'Invalid token' }, false, 404);
      const u = getUser(s.user_id);
      const d = db.departments.find(x => x.id === u.department_id);
      const m = u.manager_id ? getUser(u.manager_id) : null;
      const b = s.buddy_id ? getUser(s.buddy_id) : null;
      return jsonRes({
        ...s,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        role: u.role,
        job_title: u.job_title,
        department_id: u.department_id,
        department_name: d?.name || null,
        location: u.location,
        user_uuid: u.uuid,
        manager_first: m?.first_name || null,
        manager_last: m?.last_name || null,
        manager_email: m?.email || null,
        buddy_first: b?.first_name || null,
        buddy_last: b?.last_name || null,
        buddy_email: b?.email || null,
        buddy_fun_fact: b?.fun_fact || null,
      });
    }

    if (method === 'POST' && path === '/api/auth/login') {
      const { email } = await parseBody(opts);
      const u = db.users.find(x => x.email.toLowerCase() === String(email || '').toLowerCase());
      if (!u) return jsonRes({ error: 'User not found' }, false, 404);
      const d = db.departments.find(x => x.id === u.department_id);
      return jsonRes({ ...u, department_name: d?.name || null });
    }

    // SESSIONS TASKS/PROGRESS
    const tasksMatch = path.match(/^\/api\/sessions\/(\d+)\/tasks$/);
    if (method === 'GET' && tasksMatch) return jsonRes(attachTaskState(tasksMatch[1]));

    const progressMatch = path.match(/^\/api\/sessions\/(\d+)\/progress$/);
    if (method === 'GET' && progressMatch) return jsonRes(computeProgress(progressMatch[1]));

    const toggleMatch = path.match(/^\/api\/sessions\/(\d+)\/tasks\/(\d+)\/toggle$/);
    if (method === 'POST' && toggleMatch) {
      const sid = Number(toggleMatch[1]);
      const tid = Number(toggleMatch[2]);
      const c = db.completions.find(x => x.session_id === sid && x.task_id === tid);
      if (c) c.completed = c.completed ? 0 : 1;
      else db.completions.push({ session_id: sid, task_id: tid, completed: 1 });
      save();
      return jsonRes({ success: true });
    }

    // RESOURCES
    if (method === 'GET' && path === '/api/resources/categories') {
      const cats = [...new Set(db.resources.map(r => r.category))].sort();
      return jsonRes(['All', ...cats]);
    }

    if (method === 'GET' && path === '/api/resources') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      const category = url.searchParams.get('category') || 'All';
      let rows = db.resources.slice().sort((a, b) => a.sort_order - b.sort_order);
      if (category && category !== 'All') rows = rows.filter(r => r.category === category);
      if (q) rows = rows.filter(r => [r.title, r.content, r.tags].join(' ').toLowerCase().includes(q));
      return jsonRes(rows);
    }

    const resourceMatch = path.match(/^\/api\/resources\/(\d+)$/);
    if (method === 'GET' && resourceMatch) {
      const r = db.resources.find(x => x.id === Number(resourceMatch[1]));
      if (!r) return jsonRes({ error: 'Not found' }, false, 404);
      return jsonRes(r);
    }

    if (method === 'POST' && path === '/api/ask-hr') {
      const { question } = await parseBody(opts);
      const q = String(question || '').toLowerCase();
      let answer = "I couldn't find a specific answer to that question. Reach out to HR at hr@leadsonline.com.";
      if (q.includes('benefit')) answer = db.resources.find(r => r.id === 3)?.content || answer;
      else if (q.includes('it') || q.includes('setup') || q.includes('laptop')) answer = db.resources.find(r => r.id === 2)?.content || answer;
      else if (q.includes('welcome') || q.includes('company')) answer = db.resources.find(r => r.id === 1)?.content || answer;
      return jsonRes({ answer, sources: db.resources.slice(0, 2).map(r => ({ id: r.id, title: r.title, category: r.category })) });
    }

    // MANAGER
    const managerReports = path.match(/^\/api\/manager\/(\d+)\/reports$/);
    if (method === 'GET' && managerReports) {
      const managerId = Number(managerReports[1]);
      const reports = db.users
        .filter(u => u.manager_id === managerId)
        .map(u => {
          const s = db.sessions.find(x => x.user_id === u.id);
          if (!s) return null;
          const p = computeProgress(s.id);
          return {
            id: u.id,
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            job_title: u.job_title,
            location: u.location,
            session_id: s.id,
            start_date: s.start_date,
            current_phase: s.current_phase,
            status: s.status,
            created_at: s.created_at,
            department_name: db.departments.find(d => d.id === u.department_id)?.name || null,
            total: p.totalTasks,
            done: p.doneTasks,
            percent: p.overall,
            overdue: Math.max(0, 2 - Math.floor(p.overall / 50)),
          };
        })
        .filter(Boolean);
      return jsonRes(reports);
    }

    // HR ADMIN
    if (method === 'GET' && path === '/api/admin/departments') return jsonRes(db.departments);
    if (method === 'GET' && path === '/api/admin/managers') return jsonRes(db.users.filter(u => u.role === 'manager').map(u => ({ id: u.id, first_name: u.first_name, last_name: u.last_name, email: u.email, job_title: u.job_title })));

    if (method === 'GET' && path === '/api/admin/onboardees') {
      const rows = db.sessions.map(s => {
        const u = getUser(s.user_id);
        const p = computeProgress(s.id);
        const m = u.manager_id ? getUser(u.manager_id) : null;
        return {
          id: u.id,
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          job_title: u.job_title,
          location: u.location,
          session_id: s.id,
          magic_token: s.magic_token,
          start_date: s.start_date,
          current_phase: s.current_phase,
          status: s.status,
          created_at: s.created_at,
          department_name: db.departments.find(d => d.id === u.department_id)?.name || null,
          manager_first: m?.first_name || null,
          manager_last: m?.last_name || null,
          total: p.totalTasks,
          done: p.doneTasks,
          percent: p.overall,
        };
      });
      return jsonRes(rows.sort((a, b) => (a.start_date < b.start_date ? 1 : -1)));
    }

    if (method === 'GET' && path === '/api/admin/analytics') {
      const onboardees = db.sessions.length;
      const completed = db.sessions.filter(s => s.status === 'completed').length;
      const active = onboardees - completed;
      const byDepartment = db.departments.map(d => ({
        name: d.name,
        count: db.users.filter(u => u.department_id === d.id && u.role === 'new_hire').length,
        avg_days: 30,
      })).filter(d => d.count > 0);

      const bottlenecks = db.tasks.slice(0, 5).map(t => ({
        title: t.title,
        incomplete_count: db.sessions.reduce((n, s) => {
          const c = db.completions.find(x => x.session_id === s.id && x.task_id === t.id);
          return n + ((c && c.completed) ? 0 : 1);
        }, 0),
      })).sort((a, b) => b.incomplete_count - a.incomplete_count);

      return jsonRes({ totalOnboardees: onboardees, active, completed, byDepartment, bottlenecks });
    }

    if (method === 'POST' && path === '/api/admin/create-onboarding') {
      const body = await parseBody(opts);
      const userId = db.nextIds.user++;
      const sessionId = db.nextIds.session++;
      const token = (body.first_name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + Math.random().toString(36).slice(2, 10);

      const u = {
        id: userId,
        uuid: `u-${userId}`,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        role: 'new_hire',
        job_title: body.job_title || 'New Hire',
        department_id: Number(body.department_id) || 1,
        manager_id: body.manager_id ? Number(body.manager_id) : null,
        location: body.location || 'Remote',
      };
      db.users.push(u);

      const s = {
        id: sessionId,
        user_id: userId,
        buddy_id: 3,
        magic_token: token,
        start_date: body.start_date || today,
        current_phase: 0,
        status: 'active',
        created_at: new Date().toISOString(),
      };
      db.sessions.push(s);

      db.tasks.forEach(t => db.completions.push({ session_id: sessionId, task_id: t.id, completed: 0 }));
      save();

      return jsonRes({ success: true, token, link: `${window.location.origin}/index.html?token=${token}`, userId, sessionId });
    }

    return jsonRes({ error: `Unhandled mock route: ${method} ${path}` }, false, 404);
  };
}

if (STATIC_MODE) {
  window.fetch = createMockApi();
}

// ============ APP STATE ============
const App = {
  user: null,
  session: null,
  currentPage: 'dashboard',
  tasks: [],
  progress: null,

  // ============ AUTH ============
  async loginWithToken() {
    let token = document.getElementById('token-input').value.trim();
    // Extract token from URL if pasted
    if (token.includes('token=')) token = new URLSearchParams(token.split('?')[1]).get('token');
    if (!token) return App.showLoginError('Please enter a token');
    
    try {
      const res = await fetch(`/api/auth/token/${token}`);
      if (!res.ok) throw new Error('Invalid token');
      const data = await res.json();
      App.session = data;
      App.user = { id: data.user_id, first_name: data.first_name, last_name: data.last_name, email: data.email, role: 'new_hire', job_title: data.job_title, department_name: data.department_name };
      localStorage.setItem('auth', JSON.stringify({ type: 'token', value: token }));
      App.showApp();
    } catch (e) {
      App.showLoginError('Invalid or expired token. Please check your link.');
    }
  },

  async loginWithEmail() {
    const email = document.getElementById('email-input').value.trim();
    if (!email) return App.showLoginError('Please enter your email');
    
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      App.user = data;
      localStorage.setItem('auth', JSON.stringify({ type: 'email', value: email }));
      App.showApp();
    } catch (e) {
      App.showLoginError('Account not found. Check your email address.');
    }
  },

  showLoginError(msg) {
    const el = document.getElementById('login-error');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 4000);
  },

  logout() {
    localStorage.removeItem('auth');
    App.user = null;
    App.session = null;
    location.reload();
  },

  // ============ INIT ============
  async init() {
    // Tab switching on login
    document.querySelectorAll('.login-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('newhire-login').style.display = tab.dataset.tab === 'newhire' ? 'block' : 'none';
        document.getElementById('staff-login').style.display = tab.dataset.tab === 'staff' ? 'block' : 'none';
      });
    });

    // Check URL for token
    const params = new URLSearchParams(location.search);
    if (params.get('token')) {
      document.getElementById('token-input').value = params.get('token');
      await App.loginWithToken();
      return;
    }

    // Check stored auth
    const stored = localStorage.getItem('auth');
    if (stored) {
      const { type, value } = JSON.parse(stored);
      if (type === 'token') {
        document.getElementById('token-input').value = value;
        await App.loginWithToken();
      } else {
        document.getElementById('email-input').value = value;
        await App.loginWithEmail();
      }
    }
  },

  showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    const initials = (App.user.first_name[0] + App.user.last_name[0]).toUpperCase();
    document.getElementById('sidebar-avatar').textContent = initials;
    document.getElementById('sidebar-name').textContent = `${App.user.first_name} ${App.user.last_name}`;
    document.getElementById('sidebar-title').textContent = App.user.job_title || App.user.role;

    App.buildNav();
    App.navigate('dashboard');
  },

  buildNav() {
    const nav = document.getElementById('sidebar-nav');
    let items = [];

    if (App.user.role === 'new_hire') {
      items = [
        { icon: 'fa-house', label: 'Dashboard', page: 'dashboard' },
        { icon: 'fa-road', label: 'My Journey', page: 'journey' },
        { icon: 'fa-book-open', label: 'Resources', page: 'resources' },
        { icon: 'fa-robot', label: 'Ask HR', page: 'askhr' },
      ];
    } else if (App.user.role === 'manager') {
      items = [
        { icon: 'fa-house', label: 'Dashboard', page: 'dashboard' },
        { icon: 'fa-users', label: 'My Reports', page: 'reports' },
        { icon: 'fa-clipboard-list', label: 'Manager Playbook', page: 'playbook' },
        { section: 'Resources' },
        { icon: 'fa-book-open', label: 'Resource Library', page: 'resources' },
      ];
    } else if (App.user.role === 'hr_admin') {
      items = [
        { icon: 'fa-house', label: 'Dashboard', page: 'dashboard' },
        { icon: 'fa-user-plus', label: 'New Onboarding', page: 'create' },
        { icon: 'fa-users', label: 'All Onboardees', page: 'onboardees' },
        { icon: 'fa-chart-bar', label: 'Analytics', page: 'analytics' },
        { section: 'Resources' },
        { icon: 'fa-book-open', label: 'Resource Library', page: 'resources' },
      ];
    }

    nav.innerHTML = items.map(item => {
      if (item.section) return `<li class="nav-section">${item.section}</li>`;
      return `<li><a href="#" data-page="${item.page}" onclick="App.navigate('${item.page}'); return false;"><i class="fas ${item.icon}"></i> ${item.label}</a></li>`;
    }).join('');
  },

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
  },

  // ============ NAVIGATION ============
  navigate(page) {
    App.currentPage = page;
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.toggle('active', a.dataset.page === page));
    document.getElementById('sidebar').classList.remove('open');

    const pages = {
      dashboard: App.user.role === 'new_hire' ? App.renderNewHireDashboard : App.user.role === 'manager' ? App.renderManagerDashboard : App.renderHRDashboard,
      journey: App.renderJourney,
      resources: App.renderResources,
      askhr: App.renderAskHR,
      reports: App.renderManagerReports,
      playbook: App.renderPlaybook,
      create: App.renderCreateOnboarding,
      onboardees: App.renderOnboardees,
      analytics: App.renderAnalytics,
    };

    if (pages[page]) pages[page]();
  },

  setPage(title, html) {
    document.getElementById('page-title').textContent = title;
    document.getElementById('page-content').innerHTML = html;
  },

  // ============ NEW HIRE DASHBOARD ============
  async renderNewHireDashboard() {
    const s = App.session;
    const progress = await (await fetch(`/api/sessions/${s.id}/progress`)).json();
    App.progress = progress;
    const tasks = await (await fetch(`/api/sessions/${s.id}/tasks`)).json();
    App.tasks = tasks;

    const phaseNames = ['Preboarding', 'Week 1', 'Month 1', 'Month 2-3', 'Graduation'];
    const incompleteTasks = tasks.filter(t => !t.completed && t.phase_number <= s.current_phase).slice(0, 5);

    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (progress.overall / 100) * circumference;

    let html = `
      <div class="welcome-banner">
        <h2>Welcome, ${s.first_name}! 👋</h2>
        <p>You're joining as <strong>${s.job_title}</strong> on the <strong>${s.department_name}</strong> team</p>
        <div class="welcome-meta">
          <span><i class="fas fa-calendar"></i> Start date: ${new Date(s.start_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span><i class="fas fa-user-tie"></i> Manager: ${s.manager_first} ${s.manager_last}</span>
          <span><i class="fas fa-map-pin"></i> ${s.location || 'Remote'}</span>
        </div>
      </div>

      <div class="card">
        <div class="progress-ring-container">
          <div class="progress-ring">
            <svg width="120" height="120">
              <circle class="bg" cx="60" cy="60" r="50"></circle>
              <circle class="fg" cx="60" cy="60" r="50" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"></circle>
            </svg>
            <div class="percent">${progress.overall}%</div>
          </div>
          <div>
            <h3 style="color:var(--navy); margin-bottom:4px;">Overall Progress</h3>
            <p style="color:var(--gray-500); font-size:14px;">${progress.doneTasks} of ${progress.totalTasks} tasks completed</p>
            <p style="color:var(--turquoise); font-size:14px; font-weight:600; margin-top:8px;">
              Currently in: ${phaseNames[progress.currentPhase] || 'Getting Started'}
            </p>
          </div>
        </div>
      </div>

      <div class="phase-tracker">
        ${progress.phases.map((p, i) => `
          <div class="phase-step">
            ${i > 0 ? `<div class="phase-connector ${i <= progress.currentPhase ? 'done' : ''}"></div>` : ''}
            <div class="phase-dot ${i < progress.currentPhase ? 'completed' : i === progress.currentPhase ? 'current' : 'upcoming'}">
              ${i < progress.currentPhase ? '<i class="fas fa-check" style="font-size:14px"></i>' : p.icon}
            </div>
            <div class="phase-label">${p.name.split('—')[0].trim()}</div>
            <div class="phase-sublabel">${p.done}/${p.total}</div>
          </div>
        `).join('')}
      </div>
    `;

    if (incompleteTasks.length) {
      html += `
        <div class="due-today">
          <h3><i class="fas fa-clock"></i> What's Due Now</h3>
          ${incompleteTasks.map(t => `
            <div class="due-item" onclick="App.navigate('journey')" style="cursor:pointer">
              <i class="fas fa-circle-dot"></i>
              <span>${t.title}</span>
              <span class="task-badge ${t.is_required ? 'required' : 'optional'}">${t.is_required ? 'Required' : 'Optional'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (s.buddy_first) {
      html += `
        <div class="card">
          <div class="card-header"><h3 class="card-title">👋 Your Onboarding Buddy</h3></div>
          <div style="display:flex; align-items:center; gap:16px;">
            <div class="avatar avatar-lg">${s.buddy_first[0]}${s.buddy_last[0]}</div>
            <div>
              <h4 style="color:var(--navy)">${s.buddy_first} ${s.buddy_last}</h4>
              <p style="font-size:14px; color:var(--gray-500)">Your go-to person for questions, tips, and finding the best coffee spots</p>
              ${s.buddy_fun_fact ? `<p style="font-size:13px; color:var(--turquoise); margin-top:4px;">⚡ ${s.buddy_fun_fact}</p>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    html += `
      <div class="card">
        <div class="card-header"><h3 class="card-title">Quick Links</h3></div>
        <div class="quick-links">
          <a class="quick-link" onclick="App.navigate('journey')"><i class="fas fa-road"></i><span>My Journey</span></a>
          <a class="quick-link" onclick="App.navigate('resources')"><i class="fas fa-book-open"></i><span>Resources</span></a>
          <a class="quick-link" onclick="App.navigate('askhr')"><i class="fas fa-robot"></i><span>Ask HR</span></a>
          <a class="quick-link" href="https://slack.com" target="_blank"><i class="fab fa-slack"></i><span>Open Slack</span></a>
          <a class="quick-link" href="mailto:helpdesk@leadsonline.com"><i class="fas fa-headset"></i><span>IT Help</span></a>
          <a class="quick-link" href="#" onclick="App.openResourceById(3); return false;"><i class="fas fa-heart-pulse"></i><span>Benefits</span></a>
        </div>
      </div>
    `;

    App.setPage('Dashboard', html);
  },

  // ============ JOURNEY ============
  async renderJourney() {
    const s = App.session;
    const tasks = await (await fetch(`/api/sessions/${s.id}/tasks`)).json();
    App.tasks = tasks;
    const progress = await (await fetch(`/api/sessions/${s.id}/progress`)).json();

    const grouped = {};
    tasks.forEach(t => {
      if (!grouped[t.phase_number]) grouped[t.phase_number] = { name: t.phase_name, icon: t.phase_icon, tasks: [] };
      grouped[t.phase_number].tasks.push(t);
    });

    const typeIcons = { checkbox: 'fa-check', form: 'fa-file-pen', upload: 'fa-cloud-upload', link: 'fa-external-link', acknowledgment: 'fa-file-signature', video: 'fa-play-circle' };

    let html = '';
    Object.entries(grouped).forEach(([num, phase]) => {
      const done = phase.tasks.filter(t => t.completed).length;
      const total = phase.tasks.length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      const isActive = parseInt(num) <= progress.currentPhase;

      html += `
        <div class="task-phase">
          <div class="task-phase-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
            <span class="phase-icon">${phase.icon}</span>
            <h3>${phase.name}</h3>
            <span class="phase-count">${done}/${total}</span>
            <div class="phase-progress"><div class="phase-progress-bar" style="width:${pct}%"></div></div>
          </div>
          <div style="${isActive ? '' : 'display:none'}">
            ${phase.tasks.map(t => `
              <div class="task-item ${t.completed ? 'completed' : ''}" onclick="App.toggleTask(${s.id}, ${t.id}, this)" data-task-id="${t.id}">
                <div class="task-check">${t.completed ? '<i class="fas fa-check" style="font-size:12px"></i>' : ''}</div>
                <div class="task-info">
                  <div class="task-title">${t.title}</div>
                  <div class="task-desc">${t.description || ''}</div>
                </div>
                <i class="fas ${typeIcons[t.task_type] || 'fa-check'} task-type-icon"></i>
                ${t.is_required ? '<span class="task-badge required">Required</span>' : '<span class="task-badge optional">Optional</span>'}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    App.setPage('My Onboarding Journey', html);
  },

  async toggleTask(sessionId, taskId, el) {
    await fetch(`/api/sessions/${sessionId}/tasks/${taskId}/toggle`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    
    const wasCompleted = el.classList.contains('completed');
    el.classList.toggle('completed');
    const check = el.querySelector('.task-check');
    check.innerHTML = wasCompleted ? '' : '<i class="fas fa-check" style="font-size:12px"></i>';

    // Check for phase completion → confetti
    if (!wasCompleted) {
      const progress = await (await fetch(`/api/sessions/${sessionId}/progress`)).json();
      const prevPhase = App.progress?.currentPhase ?? 0;
      if (progress.currentPhase > prevPhase) App.fireConfetti();
      App.progress = progress;
    }
  },

  // ============ RESOURCES ============
  async renderResources() {
    const categories = await (await fetch('/api/resources/categories')).json();
    const resources = await (await fetch('/api/resources')).json();

    let html = `
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search resources..." oninput="App.searchResources(this.value)">
      </div>
      <div class="resource-filter" id="resource-filter">
        ${categories.map(c => `<button class="filter-btn ${c === 'All' ? 'active' : ''}" onclick="App.filterResources('${c}')">${c}</button>`).join('')}
      </div>
      <div class="resource-grid" id="resource-grid">
        ${App.renderResourceCards(resources)}
      </div>
    `;

    App.setPage('Resource Library', html);
  },

  renderResourceCards(resources) {
    if (!resources.length) return '<div class="empty-state"><i class="fas fa-search"></i><h3>No results found</h3><p>Try a different search term or category</p></div>';
    return resources.map(r => `
      <div class="resource-card" onclick="App.openResource(${r.id})">
        <div class="resource-cat">${r.category}</div>
        <h3>${r.title}</h3>
        <p>${r.content.substring(0, 150)}...</p>
      </div>
    `).join('');
  },

  async searchResources(q) {
    const category = document.querySelector('.filter-btn.active')?.textContent || 'All';
    const resources = await (await fetch(`/api/resources?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`)).json();
    document.getElementById('resource-grid').innerHTML = App.renderResourceCards(resources);
  },

  async filterResources(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.textContent === cat));
    const q = document.querySelector('.search-bar input')?.value || '';
    const resources = await (await fetch(`/api/resources?q=${encodeURIComponent(q)}&category=${encodeURIComponent(cat)}`)).json();
    document.getElementById('resource-grid').innerHTML = App.renderResourceCards(resources);
  },

  async openResource(id) {
    const r = await (await fetch(`/api/resources/${id}`)).json();
    App.showModal(r.title, `<div class="resource-content">${App.formatMarkdown(r.content)}</div>`);
  },

  async openResourceById(id) {
    await App.openResource(id);
  },

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>• ')
      .replace(/\n(\d+)\. /g, '<br>$1. ')
      .replace(/\n/g, '<br>');
  },

  // ============ ASK HR ============
  renderAskHR() {
    App.setPage('Ask HR', `
      <div class="chat-container">
        <div class="card">
          <h3 class="card-title" style="margin-bottom:8px">🤖 HR Assistant</h3>
          <p style="font-size:14px; color:var(--gray-500); margin-bottom:16px;">Ask me anything about LeadsOnline — benefits, policies, IT setup, office info, and more.</p>
          <div class="chat-messages" id="chat-messages">
            <div class="chat-msg">
              <div class="avatar avatar-sm" style="background:var(--navy)">🤖</div>
              <div class="msg-bubble">Hi! I'm the LeadsOnline HR assistant. Ask me about benefits, policies, IT setup, office info, or anything else. I'll search our knowledge base to find answers for you!</div>
            </div>
          </div>
          <div class="chat-input-row">
            <input type="text" id="chat-input" class="input" style="margin:0" placeholder="Type your question..." onkeydown="if(event.key==='Enter') App.askHR()">
            <button class="btn btn-primary" onclick="App.askHR()"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    `);
  },

  async askHR() {
    const input = document.getElementById('chat-input');
    const q = input.value.trim();
    if (!q) return;
    input.value = '';

    const messages = document.getElementById('chat-messages');
    messages.innerHTML += `
      <div class="chat-msg user">
        <div class="avatar avatar-sm">${App.user.first_name[0]}${App.user.last_name[0]}</div>
        <div class="msg-bubble">${q}</div>
      </div>
    `;

    const res = await (await fetch('/api/ask-hr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q }) })).json();

    let sourcesHtml = '';
    if (res.sources.length) {
      sourcesHtml = `<div class="chat-sources">📚 Sources: ${res.sources.map(s => `<a href="#" onclick="App.openResource(${s.id}); return false;">${s.title}</a>`).join(', ')}</div>`;
    }

    messages.innerHTML += `
      <div class="chat-msg">
        <div class="avatar avatar-sm" style="background:var(--navy)">🤖</div>
        <div class="msg-bubble">${App.formatMarkdown(res.answer)}${sourcesHtml}</div>
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  },

  // ============ MANAGER DASHBOARD ============
  async renderManagerDashboard() {
    const reports = await (await fetch(`/api/manager/${App.user.id}/reports`)).json();

    let html = `
      <div class="welcome-banner">
        <h2>Welcome back, ${App.user.first_name} 👋</h2>
        <p>You have <strong>${reports.length}</strong> team member${reports.length !== 1 ? 's' : ''} currently onboarding</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fas fa-users"></i></div>
          <div><div class="stat-value">${reports.length}</div><div class="stat-label">Active Onboardees</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fas fa-exclamation-triangle"></i></div>
          <div><div class="stat-value">${reports.reduce((s, r) => s + r.overdue, 0)}</div><div class="stat-label">Overdue Items</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i class="fas fa-chart-line"></i></div>
          <div><div class="stat-value">${reports.length ? Math.round(reports.reduce((s, r) => s + r.percent, 0) / reports.length) : 0}%</div><div class="stat-label">Avg Progress</div></div>
        </div>
      </div>
    `;

    if (reports.length) {
      html += '<div class="card"><div class="card-header"><h3 class="card-title">Your Team</h3></div><div class="table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>Start Date</th><th>Progress</th><th>Phase</th><th>Overdue</th></tr></thead><tbody>';
      const phaseNames = ['Preboarding', 'Week 1', 'Month 1', 'Month 2-3', 'Graduation'];
      reports.forEach(r => {
        const pctClass = r.percent >= 100 ? 'done' : r.percent >= 60 ? 'high' : r.percent >= 30 ? 'mid' : 'low';
        html += `<tr>
          <td><strong>${r.first_name} ${r.last_name}</strong><br><span style="font-size:12px;color:var(--gray-500)">${r.email}</span></td>
          <td>${r.job_title}</td>
          <td>${new Date(r.start_date).toLocaleDateString()}</td>
          <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar"><div class="progress-bar-fill ${pctClass}" style="width:${r.percent}%"></div></div><span style="font-size:13px;font-weight:600">${r.percent}%</span></div></td>
          <td>${phaseNames[r.current_phase] || '—'}</td>
          <td>${r.overdue > 0 ? `<span class="overdue-badge">${r.overdue} overdue</span>` : '<span style="color:var(--green)">✓ On track</span>'}</td>
        </tr>`;
      });
      html += '</tbody></table></div></div>';
    } else {
      html += '<div class="card empty-state"><i class="fas fa-users"></i><h3>No active onboardees</h3><p>When new hires join your team, they\'ll appear here.</p></div>';
    }

    App.setPage('Manager Dashboard', html);
  },

  async renderManagerReports() {
    await App.renderManagerDashboard();
  },

  // ============ MANAGER PLAYBOOK ============
  renderPlaybook() {
    App.setPage('Manager Playbook', `
      <div class="card" style="margin-bottom:24px">
        <h3 class="card-title" style="margin-bottom:12px">📋 Your Guide to Onboarding New Hires</h3>
        <p style="color:var(--gray-500);font-size:14px;">This playbook covers what you should do each phase to help your new hire succeed. The portal handles the logistics — you focus on connection and context.</p>
      </div>

      <div class="playbook-item">
        <h4>🏠 Before Day 1 (Preboarding)</h4>
        <ul>
          <li>Send a personal welcome message (email or Slack) — let them know you're excited</li>
          <li>Ensure their buddy is assigned and has reached out</li>
          <li>Confirm their desk/equipment setup with IT</li>
          <li>Plan their first week calendar (orientation, 1:1s, team lunch)</li>
        </ul>
      </div>

      <div class="playbook-item">
        <h4>🚀 Week 1 — Foundation</h4>
        <ul>
          <li><strong>Day 1:</strong> Greet them personally. Office tour. Team introductions.</li>
          <li>Schedule your first 1:1 (30 min) — discuss expectations, communication preferences, questions</li>
          <li>Introduce them in team standup and Slack channels</li>
          <li>End of week: Quick check-in — how are they feeling? Any blockers?</li>
        </ul>
      </div>

      <div class="playbook-item">
        <h4>📚 Month 1 — Learning</h4>
        <ul>
          <li>Weekly 1:1s — transition from logistics to role-specific discussions</li>
          <li>Assign a small, well-defined first task with clear success criteria</li>
          <li>Introduce them to key cross-functional partners</li>
          <li><strong>30-day check-in:</strong> Review their self-assessment, share your feedback, adjust plan</li>
        </ul>
      </div>

      <div class="playbook-item">
        <h4>🔨 Month 2-3 — Building</h4>
        <ul>
          <li>Increase autonomy — give them ownership of a feature or project</li>
          <li>Include them in planning and design discussions</li>
          <li><strong>60-day check-in:</strong> Discuss trajectory, fill gaps, set 90-day goals</li>
          <li>Encourage them to shadow customer calls or cross-team meetings</li>
        </ul>
      </div>

      <div class="playbook-item">
        <h4>🎓 Graduation (90 Days)</h4>
        <ul>
          <li><strong>90-day review:</strong> Celebrate progress, set forward-looking goals</li>
          <li>Transition from onboarding cadence to regular management cadence</li>
          <li>Ask for their feedback on the onboarding experience</li>
          <li>Celebrate with the team! 🎉</li>
        </ul>
      </div>

      <div class="card" style="background:var(--teal-light);">
        <h4 style="color:var(--navy);margin-bottom:8px">💡 Pro Tips</h4>
        <ul style="font-size:14px;color:var(--gray-700);padding-left:20px;line-height:1.8">
          <li>Over-communicate in the first month. Silence is scary for new hires.</li>
          <li>Protect their calendar — too many meetings in Week 1 is overwhelming.</li>
          <li>Celebrate small wins loudly. Their first PR, first customer call, first presentation.</li>
          <li>Ask "What do you need from me?" regularly. Simple but powerful.</li>
          <li>Share context, not just tasks. Help them understand the WHY.</li>
        </ul>
      </div>
    `);
  },

  // ============ HR ADMIN DASHBOARD ============
  async renderHRDashboard() {
    const data = await (await fetch('/api/admin/analytics')).json();
    const onboardees = await (await fetch('/api/admin/onboardees')).json();

    const html = `
      <div class="welcome-banner">
        <h2>People Operations Dashboard 📊</h2>
        <p>Manage onboarding for the entire organization</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fas fa-user-plus"></i></div>
          <div><div class="stat-value">${data.totalOnboardees}</div><div class="stat-label">Total Onboardees</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i class="fas fa-spinner"></i></div>
          <div><div class="stat-value">${data.active}</div><div class="stat-label">Active</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple"><i class="fas fa-graduation-cap"></i></div>
          <div><div class="stat-value">${data.completed}</div><div class="stat-label">Completed</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fas fa-building"></i></div>
          <div><div class="stat-value">${data.byDepartment.length}</div><div class="stat-label">Departments</div></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Recent Onboardees</h3>
          <button class="btn btn-primary btn-small" onclick="App.navigate('create')"><i class="fas fa-plus"></i> New Onboarding</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Department</th><th>Manager</th><th>Start Date</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              ${onboardees.map(o => {
                const pctClass = o.percent >= 100 ? 'done' : o.percent >= 60 ? 'high' : o.percent >= 30 ? 'mid' : 'low';
                return `<tr>
                  <td><strong>${o.first_name} ${o.last_name}</strong><br><span style="font-size:12px;color:var(--gray-500)">${o.job_title}</span></td>
                  <td>${o.department_name || '—'}</td>
                  <td>${o.manager_first ? o.manager_first + ' ' + o.manager_last : '—'}</td>
                  <td>${new Date(o.start_date).toLocaleDateString()}</td>
                  <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar"><div class="progress-bar-fill ${pctClass}" style="width:${o.percent}%"></div></div><span style="font-size:13px;font-weight:600">${o.percent}%</span></div></td>
                  <td><span class="status-badge ${o.status}">${o.status}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${data.bottlenecks.length ? `
      <div class="card">
        <div class="card-header"><h3 class="card-title">⚠️ Common Bottlenecks</h3></div>
        ${data.bottlenecks.map(b => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100)">
            <span style="font-size:14px">${b.title}</span>
            <span class="overdue-badge">${b.incomplete_count} incomplete</span>
          </div>
        `).join('')}
      </div>
      ` : ''}
    `;

    App.setPage('HR Dashboard', html);
  },

  // ============ CREATE ONBOARDING ============
  async renderCreateOnboarding() {
    const depts = await (await fetch('/api/admin/departments')).json();
    const managers = await (await fetch('/api/admin/managers')).json();

    App.setPage('Create New Onboarding', `
      <div class="card create-form">
        <h3 class="card-title" style="margin-bottom:20px">New Hire Information</h3>
        <div class="form-row">
          <div class="form-group"><label>First Name *</label><input type="text" id="f-first" class="input"></div>
          <div class="form-group"><label>Last Name *</label><input type="text" id="f-last" class="input"></div>
        </div>
        <div class="form-group"><label>Email *</label><input type="email" id="f-email" class="input"></div>
        <div class="form-group"><label>Job Title *</label><input type="text" id="f-title" class="input"></div>
        <div class="form-row">
          <div class="form-group"><label>Department *</label>
            <select id="f-dept" class="input">
              <option value="">Select...</option>
              ${depts.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label>Manager</label>
            <select id="f-manager" class="input">
              <option value="">Select...</option>
              ${managers.map(m => `<option value="${m.id}">${m.first_name} ${m.last_name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Start Date *</label><input type="date" id="f-start" class="input"></div>
          <div class="form-group"><label>Location</label><input type="text" id="f-location" class="input" placeholder="e.g. Plano, TX"></div>
        </div>
        <button class="btn btn-primary" onclick="App.createOnboarding()"><i class="fas fa-magic"></i> Generate Onboarding Link</button>
        <div id="create-result"></div>
      </div>
    `);
  },

  async createOnboarding() {
    const body = {
      first_name: document.getElementById('f-first').value,
      last_name: document.getElementById('f-last').value,
      email: document.getElementById('f-email').value,
      job_title: document.getElementById('f-title').value,
      department_id: document.getElementById('f-dept').value || null,
      manager_id: document.getElementById('f-manager').value || null,
      start_date: document.getElementById('f-start').value,
      location: document.getElementById('f-location').value,
    };

    if (!body.first_name || !body.last_name || !body.email || !body.start_date) {
      document.getElementById('create-result').innerHTML = '<p class="error-msg" style="text-align:left;margin-top:12px">Please fill all required fields.</p>';
      return;
    }

    try {
      const res = await (await fetch('/api/admin/create-onboarding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json();
      if (res.error) throw new Error(res.error);
      document.getElementById('create-result').innerHTML = `
        <div class="magic-link-result">
          <strong>✅ Onboarding created!</strong><br><br>
          Send this magic link to the new hire:<br>
          <a href="${res.link}" target="_blank">${res.link}</a><br><br>
          <button class="btn btn-small btn-secondary" onclick="navigator.clipboard.writeText('${res.link}')"><i class="fas fa-copy"></i> Copy Link</button>
        </div>
      `;
      App.fireConfetti();
    } catch (e) {
      document.getElementById('create-result').innerHTML = `<p class="error-msg" style="text-align:left;margin-top:12px">${e.message}</p>`;
    }
  },

  // ============ ALL ONBOARDEES ============
  async renderOnboardees() {
    const onboardees = await (await fetch('/api/admin/onboardees')).json();
    const phaseNames = ['Preboarding', 'Week 1', 'Month 1', 'Month 2-3', 'Graduation'];

    let html = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Onboardees (${onboardees.length})</h3>
          <button class="btn btn-primary btn-small" onclick="App.navigate('create')"><i class="fas fa-plus"></i> New</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Dept</th><th>Manager</th><th>Start</th><th>Phase</th><th>Progress</th><th>Status</th><th>Link</th></tr></thead>
            <tbody>
              ${onboardees.map(o => {
                const pctClass = o.percent >= 100 ? 'done' : o.percent >= 60 ? 'high' : o.percent >= 30 ? 'mid' : 'low';
                return `<tr>
                  <td><strong>${o.first_name} ${o.last_name}</strong></td>
                  <td style="font-size:13px">${o.job_title || '—'}</td>
                  <td>${o.department_name || '—'}</td>
                  <td style="font-size:13px">${o.manager_first ? o.manager_first + ' ' + o.manager_last : '—'}</td>
                  <td style="white-space:nowrap">${new Date(o.start_date).toLocaleDateString()}</td>
                  <td style="font-size:13px">${phaseNames[o.current_phase]}</td>
                  <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar"><div class="progress-bar-fill ${pctClass}" style="width:${o.percent}%"></div></div>${o.percent}%</div></td>
                  <td><span class="status-badge ${o.status}">${o.status}</span></td>
                  <td><button class="btn btn-small btn-secondary" onclick="navigator.clipboard.writeText(location.origin+'/?token=${o.magic_token}')"><i class="fas fa-copy"></i></button></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    App.setPage('All Onboardees', html);
  },

  // ============ ANALYTICS ============
  async renderAnalytics() {
    const data = await (await fetch('/api/admin/analytics')).json();

    App.setPage('Analytics', `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fas fa-users"></i></div>
          <div><div class="stat-value">${data.totalOnboardees}</div><div class="stat-label">Total Onboardees</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i class="fas fa-check-circle"></i></div>
          <div><div class="stat-value">${data.completed}</div><div class="stat-label">Graduated</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fas fa-clock"></i></div>
          <div><div class="stat-value">${data.active}</div><div class="stat-label">In Progress</div></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:16px">By Department</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Department</th><th>Onboardees</th><th>Avg Completion (days)</th></tr></thead>
            <tbody>
              ${data.byDepartment.map(d => `<tr><td>${d.name || 'Unassigned'}</td><td>${d.count}</td><td>${d.avg_days ? Math.round(d.avg_days) : '—'}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:16px">⚠️ Top Bottleneck Tasks</h3>
        ${data.bottlenecks.length ? data.bottlenecks.map((b, i) => `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--gray-100)">
            <span style="font-size:18px;font-weight:700;color:var(--gray-300);width:24px">${i + 1}</span>
            <span style="flex:1;font-size:14px">${b.title}</span>
            <span class="overdue-badge">${b.incomplete_count} pending</span>
          </div>
        `).join('') : '<p style="color:var(--gray-400);font-size:14px;">No bottleneck data yet</p>'}
      </div>
    `);
  },

  // ============ MODAL ============
  showModal(title, bodyHtml) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-overlay').style.display = 'flex';
  },

  closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
  },

  // ============ CONFETTI ============
  fireConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#003B5C', '#0092BC', '#6AD1E3', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.5 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }
    setTimeout(() => container.innerHTML = '', 4000);
  },
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
