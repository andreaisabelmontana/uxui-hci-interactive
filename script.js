/* =========================================================
   UX · UI · HCI — Interactive Concept Map
   ========================================================= */

/* ---------- THEME TOGGLE ---------- */
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const cur = document.body.dataset.theme;
  document.body.dataset.theme = cur === 'dark' ? 'light' : 'dark';
});

/* ============================================================
   1. 5 PLANES — interactive layered view
   ============================================================ */
const planes = document.querySelectorAll('.plane');
const pdName = document.querySelector('.pd-name');
const pdQ = document.querySelector('.pd-q');
const pdText = document.querySelector('.pd-text');

function activatePlane(p) {
  planes.forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  pdName.textContent = p.dataset.name;
  pdQ.textContent = p.dataset.q;
  pdText.textContent = p.dataset.detail;
}
planes.forEach(p => {
  p.addEventListener('mouseenter', () => activatePlane(p));
  p.addEventListener('click', () => activatePlane(p));
});

/* ============================================================
   2. TIMELINE
   ============================================================ */
const tlData = [
  { y: '1945', t: 'Memex (Vannevar Bush)', b: 'Imagined a personal device that stores books, records, communication — the conceptual seed of hypertext and personal computing.' },
  { y: '1960', t: 'Man–Computer Symbiosis', b: 'J.C.R. Licklider argues computers should augment human thought, not replace it. The DNA of HCI.' },
  { y: '1963', t: 'Sketchpad', b: 'Ivan Sutherland builds the first GUI. Light pen, direct manipulation — the parent of every screen since.' },
  { y: '1968', t: '"Mother of All Demos"', b: 'Engelbart shows mouse, hypertext, video conferencing, real-time collaboration — 50 years before they were mainstream.' },
  { y: '1973', t: 'Xerox Alto', b: 'First desktop with a GUI, mouse, and bitmap display. The template for personal computing.' },
  { y: '1984', t: 'Macintosh', b: 'GUIs become a consumer product. UX leaves the lab.' },
  { y: '1990s', t: 'The Web', b: 'Hypertext explodes. UX becomes about information architecture at planetary scale.' },
  { y: '1993', t: 'Don Norman coins "User Experience"', b: 'At Apple. The discipline gets its name.' },
  { y: '1994', t: 'Nielsen\'s 10 Heuristics', b: 'A toolkit for evaluating usability without users in the room.' },
  { y: '2007', t: 'iPhone', b: 'Multi-touch becomes the default mental model. Mobile-first design starts.' },
  { y: '2011', t: 'Elements of UX (Garrett)', b: 'The five-plane model gets the canonical book.' },
  { y: '2014', t: 'Material Design', b: 'Design systems go global. Tokens, components, documentation.' },
  { y: '2018', t: 'WCAG 2.1', b: 'Accessibility becomes a measurable, legal standard.' },
  { y: '2022→', t: 'Generative AI', b: 'Prompts as a new interaction modality. Conversational UI, agentic interfaces, AI-assisted design.' },
];
const tlEl = document.getElementById('timelineList');
tlData.forEach(d => {
  const el = document.createElement('div');
  el.className = 'tl-item';
  el.innerHTML = `<p class="tl-year">${d.y}</p><p class="tl-title">${d.t}</p><p class="tl-body">${d.b}</p>`;
  tlEl.appendChild(el);
});

/* ============================================================
   3. PERSONA BUILDER
   ============================================================ */
const pName = document.getElementById('pName');
const pAge = document.getElementById('pAge');
const pRole = document.getElementById('pRole');
const pTech = document.getElementById('pTech');
const pTechVal = document.getElementById('pTechVal');
const pGoal = document.getElementById('pGoal');
const pFrust = document.getElementById('pFrust');
const pQuote = document.getElementById('pQuote');
const pDevice = document.getElementById('pDevice');

function syncPersona() {
  document.querySelector('.pc-name').firstChild.textContent = pName.value + ' ';
  document.querySelector('.pc-age').textContent = pAge.value;
  document.querySelector('.pc-role').textContent = pRole.value;
  document.querySelector('.pc-quote').textContent = '"' + pQuote.value + '"';
  document.getElementById('pcGoal').textContent = pGoal.value;
  document.getElementById('pcFrust').textContent = pFrust.value;
  document.getElementById('pcDevice').textContent = pDevice.value;
  document.getElementById('pcAvatar').textContent = (pName.value.trim()[0] || '?').toUpperCase();
  const tech = +pTech.value;
  pTechVal.textContent = tech + ' / 5';
  document.querySelector('.bar span').style.width = (tech / 5 * 100) + '%';
}
[pName, pAge, pRole, pTech, pGoal, pFrust, pQuote, pDevice].forEach(el => {
  el.addEventListener('input', syncPersona);
});

const randomPersonas = [
  { n: 'Idris Okafor', a: 34, r: 'Hospital nurse, night shifts', t: 3, g: 'Log patient vitals in under 30 seconds', f: 'Apps that auto-log me out every 5 minutes', q: 'I have one free hand. Design for that.', d: 'Mobile-first' },
  { n: 'Yuki Tanaka', a: 67, r: 'Retired teacher', t: 2, g: 'Video call grandkids without help', f: 'Pop-ups asking me to update things', q: 'I just want to see their faces.', d: 'Tablet' },
  { n: 'Ana Lima', a: 19, r: 'Computer science student', t: 5, g: 'Customise everything via keyboard shortcuts', f: 'Forced onboarding I can\'t skip', q: 'If there\'s no API, it\'s not finished.', d: 'Multi-device' },
  { n: 'Chen Wei', a: 45, r: 'Small business owner', t: 3, g: 'Reconcile invoices without an accountant', f: 'Tools that hide pricing behind a sales call', q: 'Show me the price or I\'m out.', d: 'Laptop' },
  { n: 'Sofía Marín', a: 23, r: 'Freelance illustrator', t: 4, g: 'Get paid in under a week', f: 'Apps that don\'t support pen pressure', q: 'Latency kills my flow.', d: 'Tablet' },
];
document.getElementById('randPersona').addEventListener('click', () => {
  const r = randomPersonas[Math.floor(Math.random() * randomPersonas.length)];
  pName.value = r.n; pAge.value = r.a; pRole.value = r.r; pTech.value = r.t;
  pGoal.value = r.g; pFrust.value = r.f; pQuote.value = r.q; pDevice.value = r.d;
  syncPersona();
});

/* ============================================================
   4. MOSCOW — drag and drop
   ============================================================ */
function setupDnD(containerSelector, chipSelector) {
  document.querySelectorAll(chipSelector).forEach(chip => {
    chip.addEventListener('dragstart', e => {
      chip.classList.add('dragging');
      e.dataTransfer.setData('text/plain', '');
      window._draggingEl = chip;
    });
    chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
  });
  document.querySelectorAll(containerSelector).forEach(bucket => {
    bucket.addEventListener('dragover', e => { e.preventDefault(); bucket.classList.add('dragover'); });
    bucket.addEventListener('dragleave', () => bucket.classList.remove('dragover'));
    bucket.addEventListener('drop', e => {
      e.preventDefault();
      bucket.classList.remove('dragover');
      if (window._draggingEl) bucket.appendChild(window._draggingEl);
    });
  });
}
setupDnD('.moscow-pool, .moscow-bucket', '.moscow .chip');
setupDnD('.cs-pool, .cs-cat', '.cardsort .card');

/* ============================================================
   5. WIREFRAME SANDBOX
   ============================================================ */
const wfCanvas = document.getElementById('wfCanvas');
const wfGridChk = document.getElementById('wfGrid');
wfGridChk.addEventListener('change', () => wfCanvas.classList.toggle('grid', wfGridChk.checked));
wfCanvas.classList.add('grid');

const wfPresets = {
  header:  { w: 96, h: 8, label: 'Header' },
  nav:     { w: 70, h: 6, label: 'Nav' },
  hero:    { w: 96, h: 28, label: 'Hero' },
  content: { w: 64, h: 36, label: 'Content' },
  card:    { w: 28, h: 22, label: 'Card' },
  sidebar: { w: 28, h: 36, label: 'Sidebar' },
  footer:  { w: 96, h: 10, label: 'Footer' },
  cta:     { w: 24, h: 9,  label: 'CTA' },
};
document.querySelectorAll('.wf-toolbar [data-add]').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = wfPresets[btn.dataset.add];
    const r = wfCanvas.getBoundingClientRect();
    const box = makeWfBox(p.label, r.width * 0.04, 20 + Math.random() * 40, r.width * (p.w / 100), p.h * 6);
    wfCanvas.appendChild(box);
  });
});
document.getElementById('wfClear').addEventListener('click', () => wfCanvas.innerHTML = '');

function makeWfBox(label, x, y, w, h) {
  const el = document.createElement('div');
  el.className = 'wf-box';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  el.style.width = w + 'px'; el.style.height = h + 'px';
  el.textContent = label;
  const handle = document.createElement('div'); handle.className = 'wf-handle';
  const del = document.createElement('div'); del.className = 'wf-del'; del.textContent = '×';
  el.appendChild(handle); el.appendChild(del);

  let dragging = false, resizing = false, sx, sy, ox, oy, ow, oh;
  el.addEventListener('mousedown', e => {
    if (e.target === del) { el.remove(); return; }
    if (e.target === handle) { resizing = true; }
    else { dragging = true; }
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop; ow = el.offsetWidth; oh = el.offsetHeight;
    document.querySelectorAll('.wf-box').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (dragging) {
      el.style.left = Math.max(0, ox + e.clientX - sx) + 'px';
      el.style.top = Math.max(0, oy + e.clientY - sy) + 'px';
    } else if (resizing) {
      el.style.width = Math.max(40, ow + e.clientX - sx) + 'px';
      el.style.height = Math.max(24, oh + e.clientY - sy) + 'px';
    }
  });
  document.addEventListener('mouseup', () => { dragging = false; resizing = false; });
  return el;
}
// seed a default wireframe
setTimeout(() => {
  const r = wfCanvas.getBoundingClientRect();
  if (r.width > 0) {
    wfCanvas.appendChild(makeWfBox('Header', 12, 12, r.width - 24, 48));
    wfCanvas.appendChild(makeWfBox('Hero', 12, 72, r.width - 24, 160));
    wfCanvas.appendChild(makeWfBox('Card', 12, 244, (r.width - 36) / 3, 130));
    wfCanvas.appendChild(makeWfBox('Card', 24 + (r.width - 36) / 3, 244, (r.width - 36) / 3, 130));
    wfCanvas.appendChild(makeWfBox('Card', 36 + 2 * (r.width - 36) / 3, 244, (r.width - 36) / 3, 130));
    wfCanvas.appendChild(makeWfBox('Footer', 12, 388, r.width - 24, 60));
  }
}, 100);

/* ============================================================
   6. SURFACE / DESIGN TOKENS
   ============================================================ */
const tHue = document.getElementById('tHue');
const tSat = document.getElementById('tSat');
const tRad = document.getElementById('tRad');
const tSpace = document.getElementById('tSpace');
const tFont = document.getElementById('tFont');
const tFamily = document.getElementById('tFamily');
const sp = document.getElementById('surfacePreview');
function syncSurface() {
  sp.style.setProperty('--t-hue', tHue.value);
  sp.style.setProperty('--t-sat', tSat.value + '%');
  sp.style.setProperty('--t-rad', tRad.value + 'px');
  sp.style.setProperty('--t-space', tSpace.value + 'px');
  sp.style.setProperty('--t-font', tFont.value + 'px');
  sp.style.setProperty('--t-family', tFamily.value);
}
[tHue, tSat, tRad, tSpace, tFont, tFamily].forEach(el => el.addEventListener('input', syncSurface));
syncSurface();

/* ============================================================
   7. NIELSEN'S 10 HEURISTICS
   ============================================================ */
const heuristics = [
  ['Visibility of system status', 'Always keep users informed about what is going on (loaders, progress, confirmations).'],
  ['Match between system and the real world', 'Use the user\'s language and familiar concepts, not internal jargon.'],
  ['User control and freedom', 'Users need an emergency exit — undo, redo, cancel, go back.'],
  ['Consistency and standards', 'Same word, same action. Follow platform conventions.'],
  ['Error prevention', 'Better than good error messages: prevent errors from happening at all.'],
  ['Recognition rather than recall', 'Make actions and options visible. Don\'t make users memorise.'],
  ['Flexibility and efficiency of use', 'Shortcuts for experts, simple paths for novices. Both must work.'],
  ['Aesthetic and minimalist design', 'Every extra element competes for attention with the relevant ones.'],
  ['Help users recognise, diagnose, and recover from errors', 'Plain language errors, what happened, suggest a fix.'],
  ['Help and documentation', 'When needed, easy to search, focused on the task, concrete steps.'],
];
const heurEl = document.getElementById('heuristics');
heuristics.forEach((h, i) => {
  const el = document.createElement('div');
  el.className = 'heur-item';
  el.innerHTML = `
    <div><h4>${i + 1}. ${h[0]}</h4><p>${h[1]}</p></div>
    <div class="heur-stars" data-i="${i}">
      ${[1, 2, 3, 4, 5].map(n => `<div class="heur-star" data-n="${n}">${n}</div>`).join('')}
    </div>`;
  heurEl.appendChild(el);
});
const heurScores = new Array(10).fill(0);
heurEl.addEventListener('click', e => {
  const star = e.target.closest('.heur-star');
  if (!star) return;
  const row = star.closest('.heur-stars');
  const idx = +row.dataset.i;
  const n = +star.dataset.n;
  heurScores[idx] = n;
  row.querySelectorAll('.heur-star').forEach(s => {
    s.classList.toggle('on', +s.dataset.n <= n);
  });
  updateHeurScore();
});
function updateHeurScore() {
  const total = heurScores.reduce((a, b) => a + b, 0);
  document.getElementById('heurScore').textContent = total;
  document.getElementById('heurBarFill').style.width = (total / 50 * 100) + '%';
  const app = document.getElementById('heurApp').value || 'your product';
  let v;
  if (total === 0) v = 'Score each heuristic to see a verdict.';
  else if (total < 20) v = `${app} has serious usability gaps. Pick the lowest-scoring heuristics and fix those first.`;
  else if (total < 35) v = `${app} is workable but has friction. Focus on the 3 lowest scores.`;
  else if (total < 45) v = `${app} is solid. Polish the remaining rough edges.`;
  else v = `${app} is exemplary. (Or you\'re being generous.)`;
  document.getElementById('heurVerdict').textContent = v;
}
document.getElementById('heurApp').addEventListener('input', updateHeurScore);

/* ============================================================
   8. FITTS'S LAW
   ============================================================ */
const fittsCanvas = document.getElementById('fittsCanvas');
const fittsW = document.getElementById('fittsW');
const fittsD = document.getElementById('fittsD');
const fittsStart = document.getElementById('fittsStart');
const fittsHits = document.getElementById('fittsHits');
const fittsAvg = document.getElementById('fittsAvg');
const fittsPred = document.getElementById('fittsPred');
let fState = null;

function placeFitts() {
  fittsCanvas.innerHTML = '';
  const w = +fittsW.value, d = +fittsD.value;
  const r = fittsCanvas.getBoundingClientRect();
  // place start on left, target on right at distance d
  const startEl = document.createElement('div');
  startEl.className = 'fitts-target start';
  startEl.style.width = startEl.style.height = w + 'px';
  startEl.style.left = '20px';
  startEl.style.top = (r.height / 2 - w / 2) + 'px';
  startEl.dataset.role = 'start';

  const target = document.createElement('div');
  target.className = 'fitts-target';
  target.style.width = target.style.height = w + 'px';
  target.style.left = Math.min(r.width - w - 20, 20 + d) + 'px';
  target.style.top = (r.height / 2 - w / 2) + 'px';
  target.dataset.role = 'target';

  fittsCanvas.appendChild(startEl);
  fittsCanvas.appendChild(target);
}

fittsW.addEventListener('input', () => { if (fState) placeFitts(); });
fittsD.addEventListener('input', () => { if (fState) placeFitts(); });

fittsStart.addEventListener('click', () => {
  fState = { times: [], waitingStart: true, t0: 0 };
  fittsHits.textContent = '0';
  fittsAvg.textContent = '—';
  placeFitts();
  const w = +fittsW.value, d = +fittsD.value;
  // Fitts: MT = 200 + 100 * log2(D/W + 1)  (rough constants for mouse)
  const idx = Math.log2(d / w + 1);
  fittsPred.textContent = Math.round(200 + 100 * idx);
});

fittsCanvas.addEventListener('click', e => {
  if (!fState) return;
  const role = e.target.dataset.role;
  if (!role) return;
  if (fState.waitingStart && role === 'start') {
    fState.waitingStart = false;
    fState.t0 = performance.now();
  } else if (!fState.waitingStart && role === 'target') {
    const dt = performance.now() - fState.t0;
    fState.times.push(dt);
    fittsHits.textContent = fState.times.length;
    const avg = fState.times.reduce((a, b) => a + b, 0) / fState.times.length;
    fittsAvg.textContent = Math.round(avg);
    if (fState.times.length >= 10) { fState = null; return; }
    fState.waitingStart = true;
    placeFitts();
  }
});

/* ============================================================
   9. GESTALT
   ============================================================ */
const gestalt = [
  { name: 'Proximity', desc: 'Objects close together are perceived as a group.',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      ${[0,1,2].flatMap(g => [0,1,2].map(i => `<circle cx="${15 + g*60 + i*12}" cy="50" r="6" fill="#b48cff"/>`)).join('')}
    </svg>` },
  { name: 'Similarity', desc: 'Similar shapes/colours feel related.',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      ${[0,1,2,3,4].map(c => [0,1,2,3].map(r => `<circle cx="${20 + c*40}" cy="${20 + r*20}" r="6" fill="${r === 1 ? '#ff6ec7' : '#b48cff'}"/>`).join('')).join('')}
    </svg>` },
  { name: 'Closure', desc: 'The brain fills in missing pieces.',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M 70 30 A 30 30 0 1 1 100 70" stroke="#b48cff" stroke-width="4" fill="none"/>
      <path d="M 130 70 A 30 30 0 1 1 100 30" stroke="#b48cff" stroke-width="4" fill="none"/>
    </svg>` },
  { name: 'Continuity', desc: 'The eye follows the smoothest path.',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 50 Q 100 0 190 50" stroke="#b48cff" stroke-width="3" fill="none"/>
      <path d="M 10 50 Q 100 100 190 50" stroke="#ff6ec7" stroke-width="3" fill="none"/>
    </svg>` },
  { name: 'Figure / Ground', desc: 'We separate objects from background. (Rubin\'s vase)',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="#221f42"/>
      <path d="M70 10 Q 50 30 60 50 Q 70 70 70 90 L 130 90 Q 130 70 140 50 Q 150 30 130 10 Z" fill="#b48cff"/>
    </svg>` },
  { name: 'Common Region', desc: 'Items inside the same boundary feel grouped.',
    svg: `<svg viewBox="0 0 200 100" class="gestalt-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="60" rx="8" fill="none" stroke="#b48cff" stroke-width="2"/>
      <rect x="110" y="20" width="80" height="60" rx="8" fill="none" stroke="#ff6ec7" stroke-width="2"/>
      ${[0,1,2,3].map(i => `<circle cx="${25 + (i%2)*30}" cy="${35 + Math.floor(i/2)*25}" r="5" fill="#b48cff"/>`).join('')}
      ${[0,1,2,3].map(i => `<circle cx="${125 + (i%2)*30}" cy="${35 + Math.floor(i/2)*25}" r="5" fill="#ff6ec7"/>`).join('')}
    </svg>` },
];
const gestaltEl = document.getElementById('gestaltGrid');
gestalt.forEach(g => {
  const el = document.createElement('div');
  el.className = 'gestalt-card';
  el.innerHTML = `<h4>${g.name}</h4><p>${g.desc}</p>${g.svg}`;
  gestaltEl.appendChild(el);
});

/* ============================================================
   10. RESEARCH METHODS QUADRANT
   ============================================================ */
// Quadrants: top-left Qual+Attitudinal, top-right Quant+Attitudinal
//            bot-left Qual+Behavioral, bot-right Quant+Behavioral
const methods = [
  { name: 'Interviews', cell: 0, when: 'Early in product discovery, to deeply understand user goals, motivations, and context.', gives: 'Rich qualitative insights, unexpected themes.', cost: 'Time-intensive. Hard to scale. Risk of leading questions.' },
  { name: 'Focus groups', cell: 0, when: 'When exploring group dynamics or shared cultural attitudes.', gives: 'Conversation between users surfaces things you wouldn\'t ask.', cost: 'Groupthink. Dominant voices skew results.' },
  { name: 'Diary studies', cell: 0, when: 'Longitudinal — how attitudes evolve over weeks.', gives: 'Real-life context, daily patterns.', cost: 'Drop-off. Self-reporting bias.' },
  { name: 'Surveys', cell: 1, when: 'When you have hypotheses and need to confirm at scale.', gives: 'Stats on attitudes across large samples.', cost: 'Bad questions = bad data. Self-report ≠ behaviour.' },
  { name: 'Card sorting', cell: 1, when: 'Designing information architecture.', gives: 'How users mentally group your content.', cost: 'Not about real tasks. Open vs closed sorts give very different results.' },
  { name: 'Desirability testing', cell: 1, when: 'Brand / visual design decisions.', gives: 'Quantified emotional reaction.', cost: 'Decoupled from real use.' },
  { name: 'Usability testing', cell: 2, when: 'You have a prototype or product. Want to see if real people can use it.', gives: 'Behavioural truth. Watch them struggle.', cost: 'Small samples (5-8 catch 80% of issues — Nielsen).' },
  { name: 'Field studies', cell: 2, when: 'When context matters — hospital, car, factory.', gives: 'Ground truth about how things really happen.', cost: 'Expensive. Observer effect.' },
  { name: 'Heuristic eval', cell: 2, when: 'No users available, fast audit needed.', gives: 'Issue list from expert review.', cost: 'Expert bias. Misses things only real users hit.' },
  { name: 'A/B testing', cell: 3, when: 'Live product, two candidate designs.', gives: 'Statistical proof of which performs better.', cost: 'Needs traffic. Local optima trap.' },
  { name: 'Analytics', cell: 3, when: 'You want to know what users actually do at scale.', gives: 'Funnels, retention, drop-off points.', cost: 'Tells you WHAT but not WHY. Pair with qual.' },
  { name: 'Eye tracking', cell: 3, when: 'You need to know exactly where attention goes.', gives: 'Quantified gaze patterns.', cost: 'Lab equipment, lab artificiality.' },
];
const rGrid = document.getElementById('researchGrid');
[0, 1, 2, 3].forEach(c => {
  const cell = document.createElement('div');
  cell.className = 'r-cell';
  rGrid.appendChild(cell);
});
methods.forEach(m => {
  const el = document.createElement('div');
  el.className = 'r-method';
  el.textContent = m.name;
  el.dataset.method = m.name;
  rGrid.children[m.cell].appendChild(el);
});
const rDetail = document.getElementById('rDetail');
rGrid.addEventListener('click', e => {
  const m = e.target.closest('.r-method');
  if (!m) return;
  document.querySelectorAll('.r-method').forEach(x => x.classList.remove('active'));
  m.classList.add('active');
  const data = methods.find(x => x.name === m.dataset.method);
  rDetail.innerHTML = `<h4 style="margin:0 0 8px">${data.name}</h4>
    <p><strong>When:</strong> ${data.when}</p>
    <p><strong>Gives you:</strong> ${data.gives}</p>
    <p><strong>Cost / caveat:</strong> ${data.cost}</p>`;
});

/* ============================================================
   11. ACCESSIBILITY
   ============================================================ */
const a11yDemo = document.getElementById('a11yDemo');
document.querySelectorAll('.a11y-controls [data-filter]').forEach(box => {
  box.addEventListener('change', () => {
    a11yDemo.classList.toggle(box.dataset.filter, box.checked);
  });
});
const a11yFont = document.getElementById('a11yFont');
a11yFont.addEventListener('input', () => {
  a11yDemo.style.fontSize = a11yFont.value + '%';
  document.getElementById('a11yFontVal').textContent = a11yFont.value + '%';
});

// add SVG filters for color blindness (approximate matrices from Wikipedia)
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('style', 'position:absolute;width:0;height:0');
svg.innerHTML = `
  <filter id="fProt"><feColorMatrix values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter>
  <filter id="fDeut"><feColorMatrix values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter>
  <filter id="fTrit"><feColorMatrix values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/></filter>`;
document.body.appendChild(svg);

// CONTRAST CHECKER
const ccFg = document.getElementById('ccFg');
const ccBg = document.getElementById('ccBg');
const ccSample = document.getElementById('ccSample');
function lum(hex) {
  const c = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(h => {
    const v = parseInt(h, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrastUpdate() {
  const L1 = lum(ccFg.value), L2 = lum(ccBg.value);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  ccSample.style.color = ccFg.value;
  ccSample.style.background = ccBg.value;
  document.getElementById('ccRatio').textContent = ratio.toFixed(2) + ':1';
  document.getElementById('ccAA').textContent = ratio >= 4.5 ? '✓' : '✗';
  document.getElementById('ccAAA').textContent = ratio >= 7 ? '✓' : '✗';
  document.getElementById('ccAA').style.color = ratio >= 4.5 ? 'var(--good)' : 'var(--bad)';
  document.getElementById('ccAAA').style.color = ratio >= 7 ? 'var(--good)' : 'var(--bad)';
}
ccFg.addEventListener('input', contrastUpdate);
ccBg.addEventListener('input', contrastUpdate);
contrastUpdate();

/* ============================================================
   12. FUTURE TRENDS
   ============================================================ */
const futures = [
  { i: '🥽', name: 'VR / AR / Spatial', d: 'Interfaces in 3D space. No more screens, just rooms.',
    up: 'Embodied interaction. Hands-on training. Empathy machines.', down: 'Motion sickness, isolation, expensive hardware, surveillance of gaze.' },
  { i: '🤖', name: 'Generative AI', d: 'Natural language as the new GUI. Agents that do work.',
    up: 'Lower skill floor. Personalisation at scale. Faster prototyping.', down: 'Hallucinations, bias amplification, deskilling, dark-pattern persuasion.' },
  { i: '🧠', name: 'BCI (Brain-Computer Interfaces)', d: 'Direct neural input. Already in medical use.',
    up: 'Accessibility breakthrough for paralysis. Zero-friction input.', down: 'Mental privacy. Who owns your thoughts? Hacking the brain.' },
  { i: '🗣️', name: 'Voice / Multimodal', d: 'Speak, gesture, glance — combined as input.',
    up: 'Hands-free, eyes-free. Accessibility wins.', down: 'Always-listening trust. Cultural / accent bias in models.' },
  { i: '⚖️', name: 'Ethical Design', d: 'Dark patterns, attention engineering, addictive loops.',
    up: 'Regulation (DSA, GDPR). Designers as gatekeepers.', down: 'Profit motives still favour engagement over wellbeing.' },
  { i: '♿', name: 'Universal / Inclusive Design', d: 'Design that works for the widest range of humans by default.',
    up: 'Curb cuts: features for some help everyone.', down: 'Often deprioritised until late. Treated as compliance, not opportunity.' },
];
const fEl = document.getElementById('futureGrid');
futures.forEach(f => {
  const el = document.createElement('div');
  el.className = 'future-card';
  el.innerHTML = `
    <div class="fc-icon">${f.i}</div>
    <h4>${f.name}</h4>
    <p>${f.d}</p>
    <div class="fc-up">↑ Upside · ${f.up}</div>
    <div class="fc-down">↓ Watch out · ${f.down}</div>`;
  el.addEventListener('click', () => el.classList.toggle('open'));
  fEl.appendChild(el);
});

/* ============================================================
   13. QUIZ
   ============================================================ */
const quizData = [
  { q: 'Which of Garrett\'s 5 planes deals with WHY you\'re building the product?',
    o: ['Surface', 'Skeleton', 'Strategy', 'Scope'], a: 2,
    f: 'Strategy is the most abstract plane — user needs + business objectives.' },
  { q: 'Information architecture and interaction design live on which plane?',
    o: ['Strategy', 'Scope', 'Structure', 'Skeleton'], a: 2,
    f: 'Structure: how things are organised and how the user moves through them.' },
  { q: 'Wireframes belong on which plane?',
    o: ['Skeleton', 'Structure', 'Surface', 'Scope'], a: 0,
    f: 'Skeleton — layout, navigation, information design.' },
  { q: 'What is the goal of a persona?',
    o: ['Document everyone who might use the product',
        'Turn vague "users" into a specific person to design for',
        'List all features for the engineering team',
        'Replace user research'], a: 1,
    f: 'A persona is a tool to make design decisions concrete — not a substitute for real research.' },
  { q: 'Nielsen\'s "Visibility of system status" heuristic means…',
    o: ['Show progress, confirmations, current state',
        'Show all system internals to the user',
        'Use status bars only',
        'Avoid loading screens'], a: 0,
    f: 'Always keep the user informed about what is happening, through appropriate feedback.' },
  { q: 'Fitts\'s Law predicts that movement time is…',
    o: ['Constant regardless of size',
        'Linear in distance',
        'Logarithmic in (distance / target size)',
        'Exponential in target size'], a: 2,
    f: 'MT = a + b·log₂(D/W + 1). Bigger targets and shorter distances = faster.' },
  { q: 'WCAG AA requires a normal-text contrast ratio of at least…',
    o: ['2:1', '3:1', '4.5:1', '7:1'], a: 2,
    f: '4.5:1 for AA. 7:1 for AAA. 3:1 is the bare minimum for large text only.' },
  { q: 'Usability testing falls into which quadrant of the NN/g framework?',
    o: ['Attitudinal + Qualitative',
        'Attitudinal + Quantitative',
        'Behavioural + Qualitative',
        'Behavioural + Quantitative'], a: 2,
    f: 'You observe what people DO (behavioural) in depth on small samples (qualitative).' },
  { q: 'Which is NOT one of the Gestalt principles?',
    o: ['Proximity', 'Similarity', 'Hierarchy', 'Closure'], a: 2,
    f: 'Hierarchy is a design principle but not Gestalt. The Gestalt list: proximity, similarity, closure, continuity, figure/ground, common region.' },
  { q: 'A "dark pattern" is…',
    o: ['A dark-mode colour theme',
        'A UI deliberately designed to trick users into actions against their interest',
        'A bug in dark mode',
        'A high-contrast accessibility feature'], a: 1,
    f: 'Designs that exploit cognitive biases — hidden unsubscribe, forced opt-ins, fake urgency, etc.' },
];

const quizEl = document.getElementById('quiz');
let quizScore = 0, quizAnswered = 0;
quizData.forEach((q, i) => {
  const el = document.createElement('div');
  el.className = 'quiz-q';
  el.innerHTML = `<h4>${i + 1}. ${q.q}</h4>
    <div class="quiz-options">
      ${q.o.map((opt, j) => `<button data-i="${i}" data-j="${j}">${opt}</button>`).join('')}
    </div>
    <p class="quiz-feedback" style="display:none"></p>`;
  quizEl.appendChild(el);
});
quizEl.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const i = +b.dataset.i, j = +b.dataset.j;
  const parent = b.closest('.quiz-q');
  if (parent.dataset.done) return;
  parent.dataset.done = '1';
  const correct = quizData[i].a === j;
  if (correct) { b.classList.add('correct'); quizScore++; }
  else {
    b.classList.add('wrong');
    parent.querySelectorAll('button')[quizData[i].a].classList.add('correct');
  }
  const fb = parent.querySelector('.quiz-feedback');
  fb.style.display = 'block';
  fb.textContent = (correct ? '✓ Correct. ' : '✗ ') + quizData[i].f;
  quizAnswered++;
  if (quizAnswered === quizData.length) {
    const r = document.getElementById('quizResult');
    let msg;
    if (quizScore === 10) msg = '🏆 Perfect. You could teach this course.';
    else if (quizScore >= 8) msg = '🎯 Strong — ready for the exam.';
    else if (quizScore >= 6) msg = '👍 Solid base. Re-read the weak ones and try again.';
    else msg = '📚 Time to revisit the slides. Start with the 5 Planes and Nielsen.';
    r.innerHTML = `<strong>Score: ${quizScore} / 10</strong> — ${msg}`;
  }
});
