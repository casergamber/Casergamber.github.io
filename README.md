<!DOCTYPE html>
<html lang="de" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IronLog</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
<style>
[data-theme="dark"]{
  --bg:#0d0d0f;--bg2:#141418;--bg3:#1c1c22;
  --card:#18181e;--card2:#202028;
  --accent:#e8ff47;--accent-text:#000;
  --accent2:#ff6b35;--accent3:#7c5cfc;
  --text:#f0f0f0;--text2:#909099;--text3:#55555f;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --green:#39e07a;--red:#ff4d6d;--gold:#ffc94d;
  --chart-grid:rgba(255,255,255,0.05);--chart-tick:rgba(255,255,255,0.3);
}
[data-theme="light"]{
  --bg:#f2f2f5;--bg2:#ffffff;--bg3:#e8e8ee;
  --card:#ffffff;--card2:#f8f8fb;
  --accent:#4a3ff7;--accent-text:#fff;
  --accent2:#ff6b35;--accent3:#7c5cfc;
  --text:#111118;--text2:#5a5a6a;--text3:#aaaabc;
  --border:rgba(0,0,0,0.08);--border2:rgba(0,0,0,0.14);
  --green:#16a84a;--red:#e02040;--gold:#d4820a;
  --chart-grid:rgba(0,0,0,0.06);--chart-tick:rgba(0,0,0,0.35);
}
*{box-sizing:border-box;margin:0;padding:0;transition:background-color 0.2s,color 0.2s,border-color 0.2s}
body{font-family:'Barlow',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

/* TOP BAR */
.top-bar{background:var(--bg2);border-bottom:1px solid var(--border);padding:0 1.25rem;display:flex;align-items:center;justify-content:space-between;height:58px;position:sticky;top:0;z-index:100}
.logo-wrap{display:flex;align-items:center;gap:10px}
.logo-icon{width:38px;height:38px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-text{font-family:'Barlow Condensed',sans-serif;font-size:23px;font-weight:900;letter-spacing:0.04em;color:var(--text)}
.logo-text span{color:var(--accent)}
.top-actions{display:flex;align-items:center;gap:8px}
.icon-btn{width:36px;height:36px;border-radius:9px;border:1px solid var(--border2);background:transparent;color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.icon-btn:hover{border-color:var(--accent);color:var(--accent)}
.export-btn{padding:7px 14px;background:transparent;border:1px solid var(--border2);border-radius:9px;color:var(--text2);font-size:12px;font-weight:600;cursor:pointer;font-family:'Barlow',sans-serif;letter-spacing:0.03em;transition:all 0.15s}
.export-btn:hover{border-color:var(--accent);color:var(--accent)}

/* STREAK BAR */
.streak-bar{background:var(--bg2);border-bottom:1px solid var(--border);padding:10px 1.25rem;display:flex;align-items:center;gap:16px;overflow-x:auto}
.streak-info{display:flex;align-items:center;gap:10px;flex-shrink:0}
.streak-flames{display:flex;gap:2px;align-items:center}
.flame-icon{font-size:20px;animation:flicker 1.5s ease-in-out infinite alternate}
.flame-icon:nth-child(2){animation-delay:0.3s}
.flame-icon:nth-child(3){animation-delay:0.6s}
@keyframes flicker{0%{opacity:1;transform:scale(1) rotate(-3deg)}100%{opacity:0.85;transform:scale(1.1) rotate(3deg)}}
.streak-count{font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:900;color:var(--accent);line-height:1}
.streak-sub{font-size:11px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;line-height:1.4}
.week-days{display:flex;gap:6px;flex:1;justify-content:flex-end}
.day-dot{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:36px}
.day-name{font-size:10px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:0.04em}
.day-circle{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;transition:all 0.15s;background:var(--bg3);color:var(--text3);font-weight:700;font-family:'Barlow Condensed',sans-serif}
.day-circle.gym{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.day-circle.rest{background:var(--bg3);border-color:var(--accent2);color:var(--accent2)}
.day-circle.today{box-shadow:0 0 0 2px var(--accent3)}

/* MAIN */
.main{max-width:680px;margin:0 auto;padding:1.25rem}

/* OVERVIEW CHART */
.overview-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:1.25rem}
.overview-label{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px}
.overview-chart-wrap{height:90px;position:relative}

/* TABS */
.day-tabs{display:flex;gap:0;background:var(--bg2);border-radius:12px;border:1px solid var(--border);padding:4px;margin-bottom:1.25rem}
.day-tab{flex:1;padding:10px 8px;border-radius:9px;border:none;font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:800;letter-spacing:0.06em;cursor:pointer;background:transparent;color:var(--text2);transition:all 0.15s;text-transform:uppercase}
.day-tab.active{background:var(--accent);color:var(--accent-text)}

/* TIMERS */
.timer-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.25rem}
.timer-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px}
.tc-label{font-size:10px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px}
.tc-val{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:900;color:var(--accent);letter-spacing:0.04em;margin-bottom:8px;line-height:1}
.tc-val.neutral{color:var(--text)}
.tc-val.done{color:var(--green)}
.tc-progress{height:3px;background:var(--bg3);border-radius:2px;margin-bottom:10px;overflow:hidden}
.tc-fill{height:100%;background:var(--accent);border-radius:2px;transition:width 0.5s linear}
.tc-btns{display:flex;gap:6px}
.tc-btn{padding:7px 13px;border-radius:8px;border:1px solid var(--border2);background:transparent;color:var(--text2);font-size:11px;font-weight:700;cursor:pointer;font-family:'Barlow',sans-serif;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.15s}
.tc-btn:hover{border-color:var(--accent);color:var(--accent)}
.tc-btn.go{background:var(--accent);color:var(--accent-text);border-color:var(--accent)}
.tc-btn.go:hover{opacity:0.88}
.tc-btn.stop{background:var(--red);color:#fff;border-color:var(--red)}

/* EXERCISES */
.ex-card{background:var(--card);border:1px solid var(--border);border-radius:14px;margin-bottom:10px;overflow:hidden;transition:border-color 0.2s}
.ex-card.completed{border-color:rgba(57,224,122,0.35)}
.ex-header{display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer;user-select:none;transition:background 0.15s}
.ex-header:hover{background:var(--card2)}
.ex-name{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:var(--text);letter-spacing:0.03em;flex:1}
.ex-meta{display:flex;align-items:center;gap:8px}
.pr-badge{font-size:10px;font-weight:800;color:var(--gold);background:rgba(255,201,77,0.12);border:1px solid rgba(255,201,77,0.3);padding:2px 7px;border-radius:6px;letter-spacing:0.05em;display:none}
.ex-progress-pill{font-size:11px;font-weight:700;color:var(--text3);background:var(--bg3);padding:3px 10px;border-radius:20px;white-space:nowrap}
.ex-progress-pill.done{color:var(--green);background:rgba(57,224,122,0.1)}
.chevron{width:16px;height:16px;color:var(--text3);transition:transform 0.2s;flex-shrink:0}
.chevron.open{transform:rotate(180deg)}
.ex-body{display:none;border-top:1px solid var(--border)}
.ex-body.open{display:block}

/* CHART in card */
.chart-area{padding:14px 16px 0}
.chart-label{font-size:10px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px}
.chart-container{height:70px;position:relative}
.chart-nodata{font-size:12px;color:var(--text3);padding:18px 0;text-align:center;font-style:italic}

/* SETS */
.sets-area{padding:12px 16px}
.set-row{display:grid;grid-template-columns:26px 26px 78px 1fr;gap:6px;align-items:center;margin-bottom:7px;padding:8px 10px;border-radius:10px;background:var(--bg3);border:1px solid transparent;transition:all 0.2s}
.set-row.checked{background:rgba(57,224,122,0.05);border-color:rgba(57,224,122,0.18)}
.set-check{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--border2);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s}
.set-check.done{background:var(--green);border-color:var(--green)}
.set-num{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--text3);text-align:center}
.ig{display:flex;flex-direction:column;gap:2px}
.ig-label{font-size:10px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:0.04em}
.stepper{display:flex;align-items:center;gap:3px}
.sbtn{width:24px;height:26px;border:1px solid var(--border2);background:var(--card);border-radius:6px;cursor:pointer;font-size:10px;font-weight:700;color:var(--text2);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;font-family:'Barlow',sans-serif}
.sbtn:hover{border-color:var(--accent);color:var(--accent)}
.sbtn.big{width:28px}
.vi{width:40px;height:26px;text-align:center;border:1px solid var(--border2);border-radius:6px;font-size:13px;font-weight:600;background:var(--bg2);color:var(--text);padding:0;font-family:'Barlow',sans-serif}
.vi:focus{outline:none;border-color:var(--accent)}
.vi.reps{width:48px}

/* Set mgmt */
.set-mgmt{display:flex;gap:8px;padding:2px 16px 12px}
.smb{padding:6px 14px;border-radius:8px;border:1px dashed var(--border2);background:transparent;color:var(--text3);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;font-family:'Barlow',sans-serif}
.smb:hover{border-color:var(--accent);color:var(--accent)}
.smb.del:hover{border-color:var(--red);color:var(--red)}

/* Notes */
.notes-area{padding:2px 16px 14px}
.notes-input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:13px;font-family:'Barlow',sans-serif;padding:9px 12px;resize:none;min-height:50px;transition:border-color 0.15s}
.notes-input::placeholder{color:var(--text3)}
.notes-input:focus{outline:none;border-color:var(--accent3)}

/* SAVE */
.save-btn{width:100%;margin-top:1.25rem;padding:15px;background:var(--accent);color:var(--accent-text);border:none;border-radius:14px;font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:900;letter-spacing:0.07em;cursor:pointer;text-transform:uppercase;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:8px}
.save-btn:hover{opacity:0.88;transform:translateY(-1px)}

/* HISTORY */
.history-section{margin-top:2rem}
.section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.section-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:900;letter-spacing:0.06em;color:var(--text);text-transform:uppercase}
.hist-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:8px}
.hist-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.hist-day{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:var(--accent);letter-spacing:0.04em}
.hist-date{font-size:12px;color:var(--text3);font-weight:500}
.hist-del{width:26px;height:26px;border-radius:7px;border:1px solid transparent;background:transparent;color:var(--text3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-size:14px;font-weight:700}
.hist-del:hover{border-color:var(--red);color:var(--red);background:rgba(255,77,109,0.08)}
.hist-row{display:flex;justify-content:space-between;font-size:12px;padding:2px 0;color:var(--text2)}
.hist-row span:last-child{color:var(--text3)}

/* TOAST */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-text);padding:11px 28px;border-radius:12px;font-size:13px;font-weight:800;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:999;font-family:'Barlow Condensed',sans-serif;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap}
.toast.show{opacity:1}

/* MODAL */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:200;display:none;align-items:center;justify-content:center;padding:1rem}
.modal-bg.open{display:flex}
.modal{background:var(--card);border:1px solid var(--border2);border-radius:16px;padding:1.5rem;max-width:320px;width:100%;text-align:center}
.modal h3{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:900;color:var(--text);margin-bottom:8px;letter-spacing:0.03em}
.modal p{font-size:14px;color:var(--text2);margin-bottom:20px;line-height:1.5}
.modal-btns{display:flex;gap:10px;justify-content:center}
.mbtn{padding:10px 22px;border-radius:10px;border:1px solid var(--border2);background:transparent;color:var(--text2);font-size:14px;font-weight:600;cursor:pointer;font-family:'Barlow',sans-serif;transition:all 0.15s}
.mbtn.confirm{background:var(--red);color:#fff;border-color:var(--red)}
.mbtn:hover{opacity:0.85}

::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
</style>
</head>
<body>

<div class="top-bar">
  <div class="logo-wrap">
    <div class="logo-icon">
      <!-- Dumbbell side view SVG -->
      <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="7" width="3" height="8" rx="1.5" fill="#000"/>
        <rect x="3" y="5" width="3" height="12" rx="1.5" fill="#000"/>
        <rect x="6" y="8" width="14" height="6" rx="1" fill="#000"/>
        <rect x="20" y="5" width="3" height="12" rx="1.5" fill="#000"/>
        <rect x="23" y="7" width="3" height="8" rx="1.5" fill="#000"/>
      </svg>
    </div>
    <span class="logo-text">Iron<span>Log</span></span>
  </div>
  <div class="top-actions">
    <button class="icon-btn" onclick="toggleTheme()" id="theme-btn" title="Design wechseln">
      <svg id="theme-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
    <button class="export-btn" onclick="exportCSV()">CSV Export</button>
  </div>
</div>

<!-- STREAK BAR -->
<div class="streak-bar">
  <div class="streak-info">
    <div class="streak-flames" id="streak-flames"></div>
    <div>
      <div class="streak-count" id="streak-num">0</div>
      <div class="streak-sub">Wochen<br>Streak</div>
    </div>
  </div>
  <div class="week-days" id="week-days"></div>
</div>

<div class="main">
  <!-- OVERVIEW CHART -->
  <div class="overview-card">
    <div class="overview-label" id="overview-label">Push — Gesamtfortschritt</div>
    <div class="overview-chart-wrap">
      <canvas id="overview-chart"></canvas>
    </div>
  </div>

  <!-- TABS -->
  <div class="day-tabs">
    <button class="day-tab active" onclick="switchDay('push')">Push</button>
    <button class="day-tab" onclick="switchDay('pull')">Pull</button>
    <button class="day-tab" onclick="switchDay('beine')">Beine</button>
  </div>

  <!-- TIMERS -->
  <div class="timer-row">
    <div class="timer-card">
      <div class="tc-label">Workout-Zeit</div>
      <div class="tc-val neutral" id="wt-display">00:00</div>
      <div class="tc-btns">
        <button class="tc-btn go" id="wt-btn" onclick="toggleWT()">Start</button>
        <button class="tc-btn" onclick="resetWT()">Reset</button>
      </div>
    </div>
    <div class="timer-card">
      <div class="tc-label">Pause</div>
      <div class="tc-val" id="pause-display">3:00</div>
      <div class="tc-progress"><div class="tc-fill" id="pause-fill" style="width:100%"></div></div>
      <div class="tc-btns">
        <button class="tc-btn go" id="pause-btn" onclick="togglePause()">Start</button>
        <button class="tc-btn" onclick="resetPause()">Reset</button>
      </div>
    </div>
  </div>

  <div id="workout-content"></div>

  <button class="save-btn" onclick="saveWorkout()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    Einheit speichern
  </button>

  <div class="history-section">
    <div class="section-head">
      <span class="section-title">Letzte Einheiten</span>
    </div>
    <div id="history-list"></div>
  </div>
</div>

<div class="toast" id="toast"></div>
<div class="modal-bg" id="modal-bg">
  <div class="modal">
    <h3>Einheit loschen?</h3>
    <p>Diese Einheit wird dauerhaft entfernt und kann nicht wiederhergestellt werden.</p>
    <div class="modal-btns">
      <button class="mbtn" onclick="closeModal()">Abbrechen</button>
      <button class="mbtn confirm" onclick="confirmDelete()">Loschen</button>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script>
const DAYS={
  push:{name:"Push",exercises:[
    {name:"Brustpresse",sets:3,unit:"kg"},
    {name:"Butterfly",sets:3,unit:"kg"},
    {name:"Brustpresse (positiv)",sets:3,unit:"kg"},
    {name:"Schulterpresse",sets:3,unit:"kg"},
    {name:"Seitheben am Kabelzug",sets:3,unit:"kg"},
    {name:"Trizepsdruecken am Kabelzug",sets:3,unit:"kg"},
    {name:"Dips (Maschine)",sets:3,unit:"kg"}
  ]},
  pull:{name:"Pull",exercises:[
    {name:"Rudermaschine",sets:3,unit:"kg"},
    {name:"Klimmzuge (Maschine)",sets:3,unit:"kg"},
    {name:"Latzug (enger Griff)",sets:3,unit:"kg"},
    {name:"Butterfly reverse",sets:3,unit:"kg"},
    {name:"Hammer-Curls am Kabelzug",sets:3,unit:"kg"},
    {name:"Bizeps-Curls (Kurzhanteln)",sets:3,unit:"kg"},
    {name:"Sit-Ups",sets:3,unit:""}
  ]},
  beine:{name:"Beine",exercises:[
    {name:"Beinstrecker",sets:3,unit:"kg"},
    {name:"Beinpresse",sets:3,unit:"kg"},
    {name:"Beinbeuger",sets:3,unit:"kg"},
    {name:"Ausfallschritte",sets:3,unit:"kg"},
    {name:"Adduktoren (Maschine)",sets:3,unit:"kg"},
    {name:"Abduktoren (Maschine)",sets:3,unit:"kg"},
    {name:"Wadenheben (stehend)",sets:3,unit:"kg"}
  ]}
};

let currentDay='push', state={}, openCards={}, charts={};
let deleteIndex=null;
let overviewChart=null;

// THEME
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  localStorage.setItem('theme',isDark?'light':'dark');
  updateThemeIcon();
  // redraw charts after theme change
  setTimeout(()=>{
    drawOverviewChart();
    DAYS[currentDay].exercises.forEach((_,ei)=>{if(openCards[currentDay+'-'+ei])drawChart(currentDay,ei);});
  },250);
}
function updateThemeIcon(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.getElementById('theme-icon').innerHTML=isDark
    ?'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    :'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
}

// QUICKSTART: load last weights for this day
function loadLastWeights(day){
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  const last=saved.find(s=>s.day===DAYS[day].name);
  if(!last)return;
  DAYS[day].exercises.forEach((ex,ei)=>{
    const lastEx=last.exercises&&last.exercises.find(e=>e.name===ex.name);
    if(!lastEx)return;
    lastEx.sets.forEach((s,si)=>{
      if(state[day][ei].sets[si]){
        state[day][ei].sets[si].weight=s.weight||20;
        state[day][ei].sets[si].reps=s.reps||10;
      }
    });
  });
}

function initState(day){
  if(state[day])return;
  state[day]=[];
  DAYS[day].exercises.forEach((ex,ei)=>{
    state[day][ei]={sets:[],note:''};
    for(let s=0;s<ex.sets;s++) state[day][ei].sets.push({weight:20,reps:10,done:false});
  });
  loadLastWeights(day);
}

function switchDay(day){
  currentDay=day;
  document.querySelectorAll('.day-tab').forEach((t,i)=>{
    t.classList.toggle('active',['push','pull','beine'][i]===day);
  });
  Object.entries(charts).forEach(([k,c])=>{try{c.destroy();}catch(e){}});
  charts={};
  initState(day);render();
  document.getElementById('overview-label').textContent=DAYS[day].name+' — Gesamtfortschritt';
  setTimeout(drawOverviewChart,100);
}

// STATE OPS
function change(day,ei,si,field,delta){
  let v=state[day][ei].sets[si][field]+delta;if(v<0)v=0;
  state[day][ei].sets[si][field]=v;
  const el=document.getElementById(day+'-'+ei+'-'+si+'-'+field);
  if(el)el.value=v;
}
function setVal(day,ei,si,field,val){
  let v=parseInt(val)||0;if(v<0)v=0;
  state[day][ei].sets[si][field]=v;
}
function setNote(day,ei,val){state[day][ei].note=val;}

function addSet(day,ei){
  const sets=state[day][ei].sets;
  const last=sets[sets.length-1];
  sets.push({weight:last?last.weight:20,reps:last?last.reps:10,done:false});
  renderExercise(day,ei);
}
function removeSet(day,ei){
  if(state[day][ei].sets.length<=1)return;
  state[day][ei].sets.pop();
  renderExercise(day,ei);
}

function toggleSet(day,ei,si){
  const s=state[day][ei].sets[si];
  s.done=!s.done;
  const row=document.getElementById('setrow-'+day+'-'+ei+'-'+si);
  const chk=document.getElementById('chk-'+day+'-'+ei+'-'+si);
  if(row)row.classList.toggle('checked',s.done);
  if(chk){chk.classList.toggle('done',s.done);chk.innerHTML=s.done?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="'+( document.documentElement.getAttribute('data-theme')==='dark'?'#000':'#fff')+'" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':'';}
  updateExCard(day,ei);
  // auto-start workout on first check
  const anyDone=state[day].some(ex=>ex.sets.some(s=>s.done));
  if(anyDone&&!wtRunning)toggleWT();
  // auto-stop if all done
  const allDone=state[day].every(ex=>ex.sets.every(s=>s.done));
  if(allDone&&wtRunning)toggleWT();
  // start pause timer on check
  if(s.done){resetPause();togglePause();}
}

function updateExCard(day,ei){
  const sets=state[day][ei].sets;
  const done=sets.filter(s=>s.done).length,total=sets.length;
  const pill=document.getElementById('pill-'+day+'-'+ei);
  const card=document.getElementById('card-'+day+'-'+ei);
  if(pill){pill.textContent=done+'/'+total+' Satze';pill.className='ex-progress-pill'+(done===total?' done':'');}
  if(card)card.classList.toggle('completed',done===total&&total>0);
}

// PR detection
function getPersonalRecord(dayName,exName){
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  let max=0;
  saved.filter(s=>s.day===dayName).forEach(s=>{
    const ex=s.exercises&&s.exercises.find(e=>e.name===exName);
    if(ex)ex.sets.forEach(s=>{if(s.weight>max)max=s.weight;});
  });
  return max;
}

function renderExercise(day,ei){
  const key=day+'-'+ei;
  const ex=DAYS[day].exercises[ei];
  const exState=state[day][ei];
  const done=exState.sets.filter(s=>s.done).length,total=exState.sets.length;
  const pr=getPersonalRecord(DAYS[day].name,ex.name);
  const currentMax=Math.max(...exState.sets.map(s=>s.weight));
  const isPR=pr>0&&currentMax>pr;

  // update header
  const card=document.getElementById('card-'+key);
  if(card)card.classList.toggle('completed',done===total&&total>0);
  const pill=document.getElementById('pill-'+key);
  if(pill){pill.textContent=done+'/'+total+' Satze';pill.className='ex-progress-pill'+(done===total?' done':'');}
  const prBadge=document.getElementById('pr-'+key);
  if(prBadge)prBadge.style.display=isPR?'inline':'none';

  const bodyEl=document.getElementById('body-'+key);
  if(!bodyEl)return;
  let setsHTML='';
  exState.sets.forEach((s,si)=>{
    const checkColor=document.documentElement.getAttribute('data-theme')==='dark'?'#000':'#fff';
    setsHTML+=`<div class="set-row${s.done?' checked':''}" id="setrow-${key}-${si}">
      <div class="set-check${s.done?' done':''}" id="chk-${key}-${si}" onclick="toggleSet('${day}',${ei},${si})">
        ${s.done?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${checkColor}" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`:''}
      </div>
      <div class="set-num">S${si+1}</div>
      <div class="ig">
        <span class="ig-label">Wdh.</span>
        <div class="stepper">
          <input class="vi reps" id="${key}-${si}-reps" type="number" value="${s.reps}" min="0"
            onchange="setVal('${day}',${ei},${si},'reps',this.value)"
            oninput="setVal('${day}',${ei},${si},'reps',this.value)"/>
        </div>
      </div>
      <div class="ig">
        <span class="ig-label">Gewicht${ex.unit?' (kg)':''}</span>
        <div class="stepper">
          <button class="sbtn big" onclick="change('${day}',${ei},${si},'weight',-5)">-5</button>
          <button class="sbtn" onclick="change('${day}',${ei},${si},'weight',-1)">-1</button>
          <input class="vi" id="${key}-${si}-weight" type="number" value="${s.weight}" min="0"
            onchange="setVal('${day}',${ei},${si},'weight',this.value)"
            oninput="setVal('${day}',${ei},${si},'weight',this.value)"/>
          <button class="sbtn" onclick="change('${day}',${ei},${si},'weight',1)">+1</button>
          <button class="sbtn big" onclick="change('${day}',${ei},${si},'weight',5)">+5</button>
        </div>
      </div>
    </div>`;
  });

  bodyEl.innerHTML=`
    <div class="chart-area">
      <div class="chart-label">Gewichtsentwicklung</div>
      <div class="chart-container" id="chartcon-${key}">
        <canvas id="chart-${key}"></canvas>
      </div>
    </div>
    <div class="sets-area">${setsHTML}</div>
    <div class="set-mgmt">
      <button class="smb" onclick="addSet('${day}',${ei})">+ Satz hinzufuegen</button>
      <button class="smb del" onclick="removeSet('${day}',${ei})">- Satz entfernen</button>
    </div>
    <div class="notes-area">
      <textarea class="notes-input" placeholder="Notizen..." rows="2"
        onchange="setNote('${day}',${ei},this.value)"
        oninput="setNote('${day}',${ei},this.value)">${exState.note||''}</textarea>
    </div>`;
  if(openCards[key])setTimeout(()=>drawChart(day,ei),80);
}

function render(){
  const day=currentDay;
  let html='';
  DAYS[day].exercises.forEach((ex,ei)=>{
    const key=day+'-'+ei;
    const isOpen=!!openCards[key];
    const done=state[day][ei].sets.filter(s=>s.done).length,total=state[day][ei].sets.length;
    html+=`<div class="ex-card${done===total&&total>0?' completed':''}" id="card-${key}">
      <div class="ex-header" onclick="toggleCard('${day}',${ei})">
        <span class="ex-name">${ex.name}</span>
        <div class="ex-meta">
          <span class="pr-badge" id="pr-${key}">PR</span>
          <span class="ex-progress-pill${done===total?' done':''}" id="pill-${key}">${done}/${total} Satze</span>
        </div>
        <svg id="chev-${key}" class="chevron${isOpen?' open':''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="ex-body${isOpen?' open':''}" id="body-${key}"></div>
    </div>`;
  });
  document.getElementById('workout-content').innerHTML=html;
  // use setTimeout 0 to ensure DOM is ready before populating bodies
  setTimeout(()=>{DAYS[day].exercises.forEach((_,ei)=>renderExercise(day,ei));},0);
}

function toggleCard(day,ei){
  const key=day+'-'+ei;
  openCards[key]=!openCards[key];
  document.getElementById('body-'+key).classList.toggle('open',!!openCards[key]);
  document.getElementById('chev-'+key).classList.toggle('open',!!openCards[key]);
  if(openCards[key])setTimeout(()=>drawChart(day,ei),80);
}

// CHARTS
function getCSSVar(name){
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getExHistory(dayName,exName){
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  return saved.filter(s=>s.day===dayName).reverse().slice(-10).map(s=>{
    const ex=s.exercises&&s.exercises.find(e=>e.name===exName);
    if(!ex)return null;
    const maxW=Math.max(...ex.sets.map(x=>x.weight||0));
    return{label:s.date||'',weight:maxW};
  }).filter(Boolean);
}

function drawChart(day,ei){
  const ex=DAYS[day].exercises[ei];
  const key=day+'-'+ei;
  const canvas=document.getElementById('chart-'+key);
  if(!canvas)return;
  if(charts[key]){charts[key].destroy();delete charts[key];}
  const hist=getExHistory(DAYS[day].name,ex.name);
  const con=document.getElementById('chartcon-'+key);
  if(hist.length<2){
    if(con)con.innerHTML='<div class="chart-nodata">Nach 2 gespeicherten Einheiten erscheint hier dein Fortschritt</div>';
    return;
  }
  if(con&&!con.querySelector('canvas')){
    const c=document.createElement('canvas');c.id='chart-'+key;con.innerHTML='';con.appendChild(c);
  }
  const cv=document.getElementById('chart-'+key);
  if(!cv)return;
  const accent=getCSSVar('--accent');
  const grid=getCSSVar('--chart-grid');
  const tick=getCSSVar('--chart-tick');
  charts[key]=new Chart(cv,{
    type:'line',
    data:{
      labels:hist.map(h=>h.label),
      datasets:[{
        data:hist.map(h=>h.weight),
        borderColor:accent,
        backgroundColor:accent+'18',
        borderWidth:2,pointRadius:4,
        pointBackgroundColor:accent,
        pointBorderColor:getCSSVar('--bg'),
        pointBorderWidth:2,tension:0.35,fill:true
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{
        callbacks:{label:c=>`${c.parsed.y} kg`},
        backgroundColor:getCSSVar('--card2'),
        titleColor:accent,bodyColor:getCSSVar('--text'),
        borderColor:getCSSVar('--border2'),borderWidth:1,padding:8,cornerRadius:8
      }},
      scales:{
        x:{grid:{color:grid},ticks:{color:tick,font:{size:10,family:'Barlow'}}},
        y:{grid:{color:grid},ticks:{color:tick,font:{size:10,family:'Barlow'},callback:v=>v+'kg'}}
      }
    }
  });
}

// OVERVIEW CHART: average max weight per session for the day
function drawOverviewChart(){
  if(overviewChart){overviewChart.destroy();overviewChart=null;}
  const day=currentDay;
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  const sessions=saved.filter(s=>s.day===DAYS[day].name).reverse().slice(-10);
  if(sessions.length<2){
    const canvas=document.getElementById('overview-chart');
    if(canvas){
      const ctx=canvas.getContext('2d');
      canvas.height=90;ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle=getCSSVar('--text3');
      ctx.font='12px Barlow,sans-serif';ctx.textAlign='center';
      ctx.fillText('Noch keine Verlaufsdaten vorhanden',canvas.offsetWidth/2,48);
    }
    return;
  }
  const labels=sessions.map(s=>s.date);
  // For each session compute total volume (sum of weight*reps across all exercises)
  const volumes=sessions.map(s=>{
    let vol=0;
    s.exercises.forEach(ex=>ex.sets.forEach(set=>{vol+=(set.weight||0)*(set.reps||0);}));
    return vol;
  });
  const accent=getCSSVar('--accent');
  const grid=getCSSVar('--chart-grid');
  const tick=getCSSVar('--chart-tick');
  const canvas=document.getElementById('overview-chart');
  if(!canvas)return;
  overviewChart=new Chart(canvas,{
    type:'line',
    data:{
      labels,
      datasets:[{
        label:'Volumen (kg)',
        data:volumes,
        borderColor:accent,
        backgroundColor:accent+'15',
        borderWidth:2.5,pointRadius:5,
        pointBackgroundColor:accent,
        pointBorderColor:getCSSVar('--bg'),
        pointBorderWidth:2,tension:0.35,fill:true
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{
        callbacks:{label:c=>`${c.parsed.y} kg Volumen`},
        backgroundColor:getCSSVar('--card2'),
        titleColor:accent,bodyColor:getCSSVar('--text'),
        borderColor:getCSSVar('--border2'),borderWidth:1,padding:8,cornerRadius:8
      }},
      scales:{
        x:{grid:{color:grid},ticks:{color:tick,font:{size:10,family:'Barlow'}}},
        y:{grid:{color:grid},ticks:{color:tick,font:{size:10,family:'Barlow'},callback:v=>v+'kg'}}
      }
    }
  });
}

// TIMERS
let pauseIv=null,pauseLeft=180,pauseRunning=false;
let wtIv=null,wtSecs=0,wtRunning=false;
function fmt(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}

function togglePause(){
  if(pauseRunning){
    clearInterval(pauseIv);pauseRunning=false;
    document.getElementById('pause-btn').textContent='Start';
    document.getElementById('pause-btn').className='tc-btn go';
  } else {
    pauseRunning=true;
    document.getElementById('pause-btn').textContent='Stop';
    document.getElementById('pause-btn').className='tc-btn stop';
    pauseIv=setInterval(()=>{
      pauseLeft--;
      document.getElementById('pause-fill').style.width=(Math.max(0,pauseLeft)/180*100)+'%';
      const d=document.getElementById('pause-display');
      if(pauseLeft<=0){
        clearInterval(pauseIv);pauseRunning=false;
        d.textContent='Los!';d.className='tc-val done';
        document.getElementById('pause-btn').textContent='Start';
        document.getElementById('pause-btn').className='tc-btn go';
        if(navigator.vibrate)navigator.vibrate([300,100,300,100,300]);
      } else {d.textContent=fmt(pauseLeft);d.className='tc-val';}
    },1000);
  }
}
function resetPause(){
  clearInterval(pauseIv);pauseRunning=false;pauseLeft=180;
  document.getElementById('pause-display').textContent='3:00';
  document.getElementById('pause-display').className='tc-val';
  document.getElementById('pause-fill').style.width='100%';
  document.getElementById('pause-btn').textContent='Start';
  document.getElementById('pause-btn').className='tc-btn go';
}
function toggleWT(){
  if(wtRunning){
    clearInterval(wtIv);wtRunning=false;
    document.getElementById('wt-btn').textContent='Weiter';
    document.getElementById('wt-btn').className='tc-btn go';
  } else {
    wtRunning=true;
    document.getElementById('wt-btn').textContent='Pause';
    document.getElementById('wt-btn').className='tc-btn stop';
    wtIv=setInterval(()=>{wtSecs++;document.getElementById('wt-display').textContent=fmt(wtSecs);},1000);
  }
}
function resetWT(){
  clearInterval(wtIv);wtRunning=false;wtSecs=0;
  document.getElementById('wt-display').textContent='00:00';
  document.getElementById('wt-btn').textContent='Start';
  document.getElementById('wt-btn').className='tc-btn go';
}

// WEEK / STREAK
function getWeekStart(date){
  const d=new Date(date);
  const dow=d.getDay();
  d.setDate(d.getDate()-((dow+6)%7));
  d.setHours(0,0,0,0);
  return d;
}
function dateKey(d){return d.toISOString().split('T')[0];}

function calcWeekStreak(){
  const gymDays=JSON.parse(localStorage.getItem('gym_days')||'[]');
  if(!gymDays.length)return 0;
  const today=new Date();
  let streak=0;
  let weekStart=getWeekStart(today);
  // go back week by week
  for(let w=0;w<52;w++){
    const weekEnd=new Date(weekStart);weekEnd.setDate(weekStart.getDate()+6);
    let count=0;
    gymDays.forEach(dk=>{
      const d=new Date(dk);
      if(d>=weekStart&&d<=weekEnd)count++;
    });
    if(count>=3){streak++;}
    else if(w>0){break;} // allow current week to not be done yet only if it's week 0
    else{
      // current week: check if there's still time (not past Thursday)
      const today2=new Date();
      if(today2.getDay()>4&&count<3)break; // past Thursday with <3 days, streak broken
      // else current week still in progress, check previous
    }
    weekStart=new Date(weekStart);weekStart.setDate(weekStart.getDate()-7);
  }
  return streak;
}

function renderWeek(){
  const days=['Mo','Di','Mi','Do','Fr','Sa','So'];
  const today=new Date();
  const monday=getWeekStart(today);
  const gymDays=JSON.parse(localStorage.getItem('gym_days')||'[]');
  const restDays=JSON.parse(localStorage.getItem('rest_days')||'[]');
  const streak=calcWeekStreak();
  document.getElementById('streak-num').textContent=streak;
  // flames
  let flames='';
  const flameCount=Math.min(streak,5);
  for(let i=0;i<flameCount;i++)flames+=`<span class="flame-icon">🔥</span>`;
  document.getElementById('streak-flames').innerHTML=streak>=1?flames:'';

  let html='';
  for(let i=0;i<7;i++){
    const d=new Date(monday);d.setDate(monday.getDate()+i);
    const k=dateKey(d);
    const isToday=d.toDateString()===today.toDateString();
    const isGym=gymDays.includes(k);
    const isRest=restDays.includes(k);
    let cls='day-circle';
    let inner=d.getDate();
    if(isGym){cls+=' gym';inner='✓';}
    else if(isRest){cls+=' rest';inner='Z';}
    if(isToday)cls+=' today';
    html+=`<div class="day-dot">
      <span class="day-name">${days[i]}</span>
      <div class="${cls}" onclick="toggleDayType('${k}')">${inner}</div>
    </div>`;
  }
  document.getElementById('week-days').innerHTML=html;
}

function toggleDayType(key){
  let gymDays=JSON.parse(localStorage.getItem('gym_days')||'[]');
  let restDays=JSON.parse(localStorage.getItem('rest_days')||'[]');
  const isGym=gymDays.includes(key),isRest=restDays.includes(key);
  if(!isGym&&!isRest)gymDays.push(key);
  else if(isGym){gymDays=gymDays.filter(d=>d!==key);restDays.push(key);}
  else restDays=restDays.filter(d=>d!==key);
  localStorage.setItem('gym_days',JSON.stringify(gymDays));
  localStorage.setItem('rest_days',JSON.stringify(restDays));
  renderWeek();
}

// SAVE
function saveWorkout(){
  const day=currentDay;
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  const now=new Date();
  const dk=dateKey(now);
  let gymDays=JSON.parse(localStorage.getItem('gym_days')||'[]');
  if(!gymDays.includes(dk))gymDays.push(dk);
  localStorage.setItem('gym_days',JSON.stringify(gymDays));
  saved.unshift({
    day:DAYS[day].name,
    date:now.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}),
    duration:fmt(wtSecs),
    exercises:DAYS[day].exercises.map((ex,ei)=>({
      name:ex.name,note:state[day][ei].note,
      sets:state[day][ei].sets.map(s=>({weight:s.weight,reps:s.reps,done:s.done}))
    }))
  });
  if(saved.length>40)saved.splice(40);
  localStorage.setItem('fitness_history',JSON.stringify(saved));
  renderHistory();renderWeek();drawOverviewChart();
  DAYS[day].exercises.forEach((_,ei)=>{if(openCards[day+'-'+ei])setTimeout(()=>drawChart(day,ei),100);});
  showToast('Workout gespeichert!');
}

// HISTORY
function renderHistory(){
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  const el=document.getElementById('history-list');
  if(!saved.length){el.innerHTML='<p style="font-size:13px;color:var(--text3);padding:6px 0">Noch keine Einheiten gespeichert.</p>';return;}
  el.innerHTML=saved.slice(0,8).map((e,i)=>{
    const rows=e.exercises.map(ex=>{
      const s=ex.sets.map((s,si)=>`S${si+1}: ${s.weight>0?s.weight+'kg x':''}${s.reps}`).join(' · ');
      return `<div class="hist-row"><span style="font-weight:600">${ex.name}</span><span>${s}</span></div>`;
    }).join('');
    return `<div class="hist-card">
      <div class="hist-head">
        <div><span class="hist-day">${e.day}</span> <span class="hist-date">${e.date}${e.duration?' · '+e.duration:''}</span></div>
        <button class="hist-del" onclick="openModal(${i})">x</button>
      </div>${rows}
    </div>`;
  }).join('');
}

function openModal(i){deleteIndex=i;document.getElementById('modal-bg').classList.add('open');}
function closeModal(){deleteIndex=null;document.getElementById('modal-bg').classList.remove('open');}
function confirmDelete(){
  if(deleteIndex===null)return;
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  saved.splice(deleteIndex,1);
  localStorage.setItem('fitness_history',JSON.stringify(saved));
  closeModal();renderHistory();drawOverviewChart();showToast('Einheit geloscht');
}

// CSV
function exportCSV(){
  const saved=JSON.parse(localStorage.getItem('fitness_history')||'[]');
  if(!saved.length){showToast('Keine Daten vorhanden');return;}
  let csv='Datum,Tag,Dauer,Uebung,Satz,Gewicht (kg),Wiederholungen,Notiz\n';
  saved.forEach(e=>{
    e.exercises.forEach(ex=>{
      ex.sets.forEach((s,si)=>{
        csv+=`"${e.date}","${e.day}","${e.duration||''}","${ex.name}",${si+1},${s.weight},${s.reps},"${(ex.note||'').replace(/"/g,'""')}"\n`;
      });
    });
  });
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='ironlog.csv';a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exportiert!');
}

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2400);
}

// INIT
const savedTheme=localStorage.getItem('theme')||'dark';
document.documentElement.setAttribute('data-theme',savedTheme);
updateThemeIcon();
initState('push');render();renderHistory();renderWeek();
setTimeout(drawOverviewChart,200);
</script>
</body>
</html>
