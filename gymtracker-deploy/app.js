// ─── DATA STRUCTURE ────────────────────────────────────────────────────────────
const WORKOUT_PLAN = {
  1: {
    name: "Oberkörper Push",
    emoji: "",
    exercises: [
      { id: "bench_press",      name: "Bankdrücken",           sets: 4, reps: "8–10" },
      { id: "incline_db",       name: "Schrägbank Hantel",     sets: 3, reps: "10–12" },
      { id: "ohp",              name: "Schulterdrücken",       sets: 3, reps: "8–10" },
      { id: "lat_raise",        name: "Seitheben",             sets: 3, reps: "12–15" },
      { id: "tricep_pushdown",  name: "Trizeps Pushdown",      sets: 3, reps: "12–15" },
      { id: "tricep_dips",      name: "Trizeps Dips",          sets: 3, reps: "10–12" },
    ]
  },
  2: {
    name: "Unterkörper",
    emoji: "",
    exercises: [
      { id: "squat",            name: "Kniebeuge",             sets: 4, reps: "6–8"  },
      { id: "leg_press",        name: "Beinpresse",            sets: 3, reps: "10–12" },
      { id: "leg_curl",         name: "Leg Curl",              sets: 3, reps: "10–12" },
      { id: "leg_ext",          name: "Leg Extension",         sets: 3, reps: "12–15" },
      { id: "calf_raise",       name: "Wadenheben",            sets: 4, reps: "15–20" },
      { id: "hip_thrust",       name: "Hip Thrust",            sets: 3, reps: "10–12" },
    ]
  },
  3: {
    name: "Oberkörper Pull",
    emoji: "",
    exercises: [
      { id: "deadlift",         name: "Kreuzheben",            sets: 4, reps: "5–6"  },
      { id: "pullup",           name: "Klimmzüge",             sets: 3, reps: "6–10" },
      { id: "cable_row",        name: "Kabelrudern",           sets: 3, reps: "10–12" },
      { id: "face_pull",        name: "Face Pulls",            sets: 3, reps: "15–20" },
      { id: "bicep_curl",       name: "Bizeps Curl",           sets: 3, reps: "10–12" },
      { id: "hammer_curl",      name: "Hammer Curl",           sets: 3, reps: "10–12" },
    ]
  },
  4: {
    name: "Unterkörper",
    emoji: "",
    exercises: [
      { id: "rdl",              name: "Romanian Deadlift",     sets: 4, reps: "8–10" },
      { id: "hack_squat",       name: "Hack Squat",            sets: 3, reps: "10–12" },
      { id: "leg_curl2",        name: "Leg Curl (liegend)",    sets: 3, reps: "10–12" },
      { id: "walking_lunge",    name: "Walking Lunge",         sets: 3, reps: "12/Bein" },
      { id: "calf_seated",      name: "Wadenheben sitzend",    sets: 4, reps: "15–20" },
      { id: "ab_rollout",       name: "Ab Rollout",            sets: 3, reps: "10–12" },
    ]
  }
};

// ─── INDEXEDDB ─────────────────────────────────────────────────────────────────
class GymDB {
  constructor() {
    this.db = null;
    this.dbName = 'GymTrackerDB';
    this.version = 1;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, this.version);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        // Store: { id: "day_exerciseId_date", dayId, exerciseId, date, sets: [{weight, reps}] }
        if (!db.objectStoreNames.contains('sessions')) {
          const store = db.createObjectStore('sessions', { keyPath: 'id' });
          store.createIndex('by_exercise', 'exerciseId', { unique: false });
          store.createIndex('by_day_date', ['dayId', 'date'], { unique: false });
        }
        // Timer state
        if (!db.objectStoreNames.contains('timer')) {
          db.createObjectStore('timer', { keyPath: 'key' });
        }
      };
      req.onsuccess = e => { this.db = e.target.result; resolve(); };
      req.onerror = () => reject(req.error);
    });
  }

  async saveSession(session) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('sessions', 'readwrite');
      tx.objectStore('sessions').put(session);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  async getLastSession(exerciseId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('sessions', 'readonly');
      const idx = tx.objectStore('sessions').index('by_exercise');
      const req = idx.getAll(exerciseId);
      req.onsuccess = () => {
        const all = req.result.sort((a, b) => b.date.localeCompare(a.date));
        resolve(all[0] || null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getHistory(exerciseId, limit = 10) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('sessions', 'readonly');
      const idx = tx.objectStore('sessions').index('by_exercise');
      const req = idx.getAll(exerciseId);
      req.onsuccess = () => {
        const sorted = req.result.sort((a, b) => b.date.localeCompare(a.date));
        resolve(sorted.slice(0, limit));
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getTodaySession(dayId, exerciseId) {
    const today = new Date().toISOString().slice(0, 10);
    const id = `${dayId}_${exerciseId}_${today}`;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('sessions', 'readonly');
      const req = tx.objectStore('sessions').get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async saveTimer(state) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('timer', 'readwrite');
      tx.objectStore('timer').put({ key: 'current', ...state });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  async getTimer() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('timer', 'readonly');
      const req = tx.objectStore('timer').get('current');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }
}

// ─── TIMER (Timestamp-based) ───────────────────────────────────────────────────
class RestTimer {
  constructor(db, onTick, onDone) {
    this.db = db;
    this.onTick = onTick;
    this.onDone = onDone;
    this.intervalId = null;
    this.startTs = null;
    this.duration = null;
  }

  async start(seconds) {
    this.startTs = Date.now();
    this.duration = seconds * 1000;
    await this.db.saveTimer({ startTs: this.startTs, duration: this.duration });
    this._tick();
  }

  async resume() {
    const saved = await this.db.getTimer();
    if (!saved || !saved.startTs) return false;
    const elapsed = Date.now() - saved.startTs;
    if (elapsed >= saved.duration) {
      await this.db.saveTimer({ startTs: null, duration: null });
      return false;
    }
    this.startTs = saved.startTs;
    this.duration = saved.duration;
    this._tick();
    return true;
  }

  _tick() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const elapsed = Date.now() - this.startTs;
      const remaining = Math.max(0, this.duration - elapsed);
      this.onTick(Math.ceil(remaining / 1000));
      if (remaining <= 0) {
        clearInterval(this.intervalId);
        this.startTs = null;
        this.db.saveTimer({ startTs: null, duration: null });
        this.onDone();
      }
    }, 250);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.startTs = null;
    this.db.saveTimer({ startTs: null, duration: null });
  }

  isRunning() { return !!this.startTs; }
}

// ─── APP STATE ─────────────────────────────────────────────────────────────────
let db, timer;
let currentDay = null;
let currentExercise = null;
let timerDuration = 90;
let currentSetData = {}; // { exerciseId: [{weight, reps}, ...] }
let lastSessions = {};   // { exerciseId: session }

// ─── INIT ──────────────────────────────────────────────────────────────────────
async function init() {
  db = new GymDB();
  await db.init();

  timer = new RestTimer(
    db,
    (secs) => updateTimerDisplay(secs),
    () => {
      timerDoneAnimation();
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
    }
  );

  // Resume timer if was running
  const resumed = await timer.resume();
  if (resumed) showTimerBar();

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  }

  renderHome();
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function navigate(view, ...args) {
  window.scrollTo(0, 0);
  if (view === 'home') renderHome();
  else if (view === 'day') renderDay(args[0]);
  else if (view === 'exercise') renderExercise(args[0], args[1]);
  else if (view === 'history') renderHistory(args[0], args[1]);
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="screen home-screen">
      <header class="app-header">
        <div class="logo-mark">
          <div class="logo-dot"></div>
          <span class="logo-text">GymTracker</span>
        </div>
        <h1 class="app-title">Mein Training</h1>
        <div class="header-sub">${formatDate(new Date())}</div>
      </header>

      <div class="days-grid">
        ${Object.entries(WORKOUT_PLAN).map(([dayId, day]) => `
          <button class="day-card" onclick="navigate('day', ${dayId})">
            
            <div class="day-info">
              <div class="day-label">Tag ${dayId}</div>
              <div class="day-name">${day.name}</div>
              <div class="day-count">${day.exercises.length} Übungen</div>
            </div>
            <div class="day-arrow"></div>
          </button>
        `).join('')}
      </div>

      <div class="timer-config-card">
        <div class="tc-label">Pause-Timer</div>
        <div class="tc-buttons">
          ${[60,75,90,120].map(s => `
            <button class="tc-btn ${timerDuration===s?'active':''}" onclick="setTimerDuration(${s})">${s}s</button>
          `).join('')}
        </div>
      </div>
    </div>
    ${timerBarHTML()}
  `;
}

// ─── DAY VIEW ─────────────────────────────────────────────────────────────────
async function renderDay(dayId) {
  currentDay = dayId;
  const day = WORKOUT_PLAN[dayId];
  const app = document.getElementById('app');

  // Load last sessions for all exercises
  for (const ex of day.exercises) {
    lastSessions[ex.id] = await db.getLastSession(ex.id);
  }

  app.innerHTML = `
    <div class="screen day-screen">
      <header class="page-header">
        <button class="back-btn" onclick="navigate('home')">Zurück</button>
        <div>
          
          <h2 class="page-title">Tag ${dayId}: ${day.name}</h2>
        </div>
      </header>

      <div class="exercise-list">
        ${day.exercises.map(ex => {
          const last = lastSessions[ex.id];
          const lastWeight = last ? getTopWeight(last.sets) : null;
          return `
            <button class="exercise-row" onclick="navigate('exercise', ${dayId}, '${ex.id}')">
              <div class="ex-left">
                <div class="ex-name">${ex.name}</div>
                <div class="ex-meta">${ex.sets} Sätze × ${ex.reps}</div>
              </div>
              <div class="ex-right">
                ${lastWeight !== null
                  ? `<div class="last-weight">${lastWeight}<span class="unit">kg</span></div><div class="last-label">letztes Mal</div>`
                  : `<div class="no-data">Neu</div>`}
              </div>
            </button>
          `;
        }).join('')}
      </div>
    </div>
    ${timerBarHTML()}
  `;
}

// ─── EXERCISE VIEW ────────────────────────────────────────────────────────────
async function renderExercise(dayId, exerciseId) {
  currentDay = dayId;
  currentExercise = exerciseId;
  const day = WORKOUT_PLAN[dayId];
  const ex = day.exercises.find(e => e.id === exerciseId);
  const lastSession = await db.getLastSession(exerciseId);
  const todaySession = await db.getTodaySession(dayId, exerciseId);

  // Init set data from today's session or empty
  if (!currentSetData[exerciseId]) {
    currentSetData[exerciseId] = todaySession
      ? todaySession.sets.map(s => ({ ...s }))
      : Array.from({ length: ex.sets }, (_, i) => {
          const lw = lastSession?.sets[i]?.weight ?? '';
          return { weight: lw, reps: ex.reps.split('–')[0] };
        });
  }

  const sets = currentSetData[exerciseId];

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="screen exercise-screen">
      <header class="page-header">
        <button class="back-btn" onclick="navigate('day', ${dayId})">Zurück</button>
        <div class="header-titles">
          <h2 class="page-title">${ex.name}</h2>
          <div class="ex-target">${ex.sets} × ${ex.reps} Wdh.</div>
        </div>
        <button class="history-btn" onclick="navigate('history', '${exerciseId}', ${dayId})">Verlauf</button>
      </header>

      ${lastSession ? `
        <div class="last-session-banner">
          <span class="ls-label">Letztes Training (${formatDate(new Date(lastSession.date))}):</span>
          <span class="ls-weights">${lastSession.sets.map(s => s.weight ? s.weight+'kg' : '–').join(' · ')}</span>
        </div>
      ` : ''}

      <div class="sets-container" id="sets-container">
        ${sets.map((set, i) => renderSetRow(i, set, lastSession?.sets[i])).join('')}
      </div>

      <button class="add-set-btn" onclick="addSet('${exerciseId}', ${dayId})">+ Satz hinzufügen</button>

      <div class="action-bar">
        <button class="timer-trigger-btn" onclick="startTimer()">
          ${timerDuration}s Pause
        </button>
        <button class="save-btn" onclick="saveExercise(${dayId}, '${exerciseId}')">
          Speichern
        </button>
      </div>
    </div>
    ${timerBarHTML()}
  `;
}

function renderSetRow(index, set, lastSet) {
  return `
    <div class="set-row" id="set-${index}">
      <div class="set-number">${index + 1}</div>
      <div class="set-inputs">
        <div class="input-group">
          <label>Gewicht</label>
          <div class="weight-control">
            <button class="adj-btn" onclick="adjustWeight(${index}, -2.5)">−</button>
            <input
              type="number"
              class="weight-input"
              id="weight-${index}"
              value="${set.weight}"
              step="0.5"
              min="0"
              inputmode="decimal"
              onchange="updateSet(${index}, 'weight', this.value)"
            />
            <button class="adj-btn" onclick="adjustWeight(${index}, 2.5)">+</button>
          </div>
          <div class="input-unit">kg</div>
        </div>
        <div class="input-group">
          <label>Wdh.</label>
          <div class="weight-control">
            <button class="adj-btn" onclick="adjustReps(${index}, -1)">−</button>
            <input
              type="number"
              class="reps-input"
              id="reps-${index}"
              value="${set.reps}"
              min="1"
              inputmode="numeric"
              onchange="updateSet(${index}, 'reps', this.value)"
            />
            <button class="adj-btn" onclick="adjustReps(${index}, 1)">+</button>
          </div>
        </div>
      </div>
      ${lastSet ? `<div class="set-prev">Letztes: ${lastSet.weight||'–'}kg × ${lastSet.reps}</div>` : ''}
      <div class="set-actions">
        <button class="set-done-btn" id="done-${index}" onclick="markSetDone(${index})">OK</button>
        <button class="set-delete-btn" onclick="removeSet(${index})">X</button>
      </div>
    </div>
  `;
}

// ─── HISTORY VIEW ─────────────────────────────────────────────────────────────
async function renderHistory(exerciseId, dayId) {
  const day = Object.values(WORKOUT_PLAN).find(d => d.exercises.find(e => e.id === exerciseId));
  const ex = day.exercises.find(e => e.id === exerciseId);
  const history = await db.getHistory(exerciseId, 15);
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="screen history-screen">
      <header class="page-header">
        <button class="back-btn" onclick="navigate('exercise', ${dayId ? dayId : 'currentDay'}, '${exerciseId}')">Zurück</button>
        <div class="header-titles">
          <h2 class="page-title">${ex.name}</h2>
          <div class="ex-target">Verlauf</div>
        </div>
      </header>

      ${history.length === 0 ? `
        <div class="empty-state">
          
          <div>Noch keine Daten.<br>Fang heute an!</div>
        </div>
      ` : `
        <div class="history-list">
          ${history.map(session => `
            <div class="history-entry">
              <div class="he-date">${formatDate(new Date(session.date))}</div>
              <div class="he-sets">
                ${session.sets.map((s, i) => `
                  <div class="he-set">
                    <span class="he-num">${i+1}</span>
                    <span class="he-weight">${s.weight || '–'} kg</span>
                    <span class="he-reps">× ${s.reps}</span>
                  </div>
                `).join('')}
              </div>
              <div class="he-volume">Vol: ${calcVolume(session.sets)} kg</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────
function updateSet(index, field, value) {
  if (!currentSetData[currentExercise]) return;
  currentSetData[currentExercise][index][field] = value;
}

function adjustWeight(index, delta) {
  const input = document.getElementById(`weight-${index}`);
  const current = parseFloat(input.value) || 0;
  const newVal = Math.max(0, Math.round((current + delta) * 2) / 2);
  input.value = newVal;
  updateSet(index, 'weight', newVal);
}

function adjustReps(index, delta) {
  const input = document.getElementById(`reps-${index}`);
  const current = parseInt(input.value) || 0;
  const newVal = Math.max(1, current + delta);
  input.value = newVal;
  updateSet(index, 'reps', newVal);
}

function markSetDone(index) {
  const btn = document.getElementById(`done-${index}`);
  const row = document.getElementById(`set-${index}`);
  row.classList.toggle('set-completed');
  btn.classList.toggle('done-active');
  if (row.classList.contains('set-completed')) {
    startTimer();
  }
}

function addSet(exerciseId, dayId) {
  const sets = currentSetData[exerciseId];
  const last = sets[sets.length - 1];
  sets.push({ weight: last?.weight || '', reps: last?.reps || 10 });
  rerenderSets();
}

function removeSet(index) {
  const sets = currentSetData[currentExercise];
  if (sets.length <= 1) return;
  sets.splice(index, 1);
  rerenderSets();
}

function rerenderSets() {
  const container = document.getElementById('sets-container');
  if (container) {
    container.innerHTML = currentSetData[currentExercise]
      .map((s, i) => renderSetRow(i, s, null)).join('');
  }
}

async function saveExercise(dayId, exerciseId) {
  const sets = currentSetData[exerciseId];
  const today = new Date().toISOString().slice(0, 10);
  const session = {
    id: `${dayId}_${exerciseId}_${today}`,
    dayId: parseInt(dayId),
    exerciseId,
    date: today,
    sets: sets.map(s => ({ weight: parseFloat(s.weight) || 0, reps: s.reps }))
  };
  await db.saveSession(session);

  // Flash confirmation
  const btn = document.querySelector('.save-btn');
  if (btn) {
    btn.textContent = 'Gespeichert!';
    btn.classList.add('saved');
    setTimeout(() => {
      btn.textContent = 'Speichern';
      btn.classList.remove('saved');
    }, 1800);
  }
}

function setTimerDuration(secs) {
  timerDuration = secs;
  // Update buttons
  document.querySelectorAll('.tc-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.textContent) === secs);
  });
  // Update timer trigger button if visible
  const trigBtn = document.querySelector('.timer-trigger-btn');
  if (trigBtn) trigBtn.textContent = `${secs}s Pause`;
}

// ─── TIMER ────────────────────────────────────────────────────────────────────
async function startTimer() {
  await timer.start(timerDuration);
  showTimerBar();
}

function showTimerBar() {
  const bar = document.getElementById('timer-bar');
  if (bar) bar.classList.add('visible');
}

function updateTimerDisplay(secs) {
  const bar = document.getElementById('timer-bar');
  if (!bar) return;
  bar.classList.add('visible');
  const fill = document.getElementById('timer-fill');
  const label = document.getElementById('timer-label');
  const pct = (secs / timerDuration) * 100;
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${secs}s`;
}

function timerDoneAnimation() {
  const bar = document.getElementById('timer-bar');
  if (!bar) return;
  bar.classList.add('timer-done');
  const label = document.getElementById('timer-label');
  if (label) label.textContent = 'Los geht es!';
  setTimeout(() => {
    bar.classList.remove('visible', 'timer-done');
  }, 2500);
}

function stopTimer() {
  timer.stop();
  const bar = document.getElementById('timer-bar');
  if (bar) bar.classList.remove('visible', 'timer-done');
}

function timerBarHTML() {
  return `
    <div id="timer-bar" class="${timer?.isRunning() ? 'visible' : ''}">
      <div id="timer-fill"></div>
      <span id="timer-label">–</span>
      <button id="timer-stop" onclick="stopTimer()">✕</button>
    </div>
  `;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getTopWeight(sets) {
  const weights = sets.map(s => parseFloat(s.weight)).filter(w => !isNaN(w));
  return weights.length ? Math.max(...weights) : null;
}

function calcVolume(sets) {
  return sets.reduce((acc, s) => {
    const w = parseFloat(s.weight) || 0;
    const r = parseInt(s.reps) || 0;
    return acc + w * r;
  }, 0).toFixed(0);
}

function formatDate(d) {
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

// ─── START ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
