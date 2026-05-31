/* ==========================================================================
   YOSDAY — PERSONAL LIFE OPERATING SYSTEM JAVASCRIPT
   Core State Management, Templates Engine, SVG Mascot, and Analytics Review
   ========================================================================== */

// --- Global Application State ---
const State = {
  user: {
    name: "Yohanes",
    email: "yohanes@gmail.com",
    connected: true
  },
  currentDate: new Date(), // Simulating current system time
  activeTab: 'home',
  templates: [],
  history: {}, // Key: "YYYY-MM-DD"
  holidays: [
    { date: "01-01", name: "Tahun Baru Masehi", type: "holiday" },
    { date: "05-01", name: "Hari Buruh Internasional", type: "holiday" },
    { date: "05-25", name: "Hari Raya Waisak", type: "holiday" },
    { date: "08-17", name: "Hari Kemerdekaan RI", type: "holiday" },
    { date: "12-25", name: "Hari Raya Natal", type: "holiday" }
  ],
  events: [
    { date: "2026-05-31", title: "Meeting Evaluasi Tim", time: "10:00", type: "event" },
    { date: "2026-05-31", title: "Dokter Gigi Rutin", time: "18:00", type: "event" },
    { date: "2026-06-01", title: "Ulang Tahun Ibu", time: "00:00", type: "event" },
    { date: "2026-06-02", title: "Review Kontrak Project", time: "14:00", type: "event" }
  ],
  reminders: [
    { date: "2026-05-31", title: "Bayar Tagihan Internet", done: false, type: "reminder" },
    { date: "2026-06-05", title: "Bayar Listrik Bulanan", done: false, type: "reminder" }
  ],
  smartVerses: {
    ketekunan: [
      { text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.", ref: "Filipi 4:13" },
      { text: "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai.", ref: "Galatia 6:9" },
      { text: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali.", ref: "Yesaya 40:31" }
    ],
    disiplin: [
      { text: "Sebab Allah memberikan kepada kita bukan roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih dan ketertiban.", ref: "2 Timotius 1:7" },
      { text: "Memang tiap-tiap ganjaran pada waktu ia diberikan tidak mendatangkan sukacita, tetapi dukacita. Tetapi kemudian ia menghasilkan buah kebenaran.", ref: "Ibrani 12:11" },
      { text: "Hai pemalas, pergilah kepada semut, perhatikanlah lakunya dan jadilah bijak.", ref: "Galatia 6:9" }
    ],
    harapan: [
      { text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera.", ref: "Yeremia 29:11" },
      { text: "Tetapi kuatkanlah hatimu, jangan lemah semangatmu, karena ada upah bagi usahamu!", ref: "2 Tawarikh 15:7" },
      { text: "Serahkanlah perbuatanmu kepada TUHAN, maka terlaksanalah segala rencanamu.", ref: "Amsal 16:3" }
    ],
    syukur: [
      { text: "Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.", ref: "1 Tesalonika 5:18" },
      { text: "Pujilah TUHAN, hai jiwaku, dan janganlah lupakan segala kebaikan-Nya!", ref: "Mazmur 103:2" }
    ],
    humility: [
      { text: "Kerendahan hati mendahului kehormatan.", ref: "Amsal 15:33" },
      { text: "Allah menentang orang yang congkak, tetapi mengasihani orang yang rendah hati.", ref: "Yakobus 4:6" }
    ],
    konsistensi: [
      { text: "Barangsiapa setia dalam perkara-perkara kecil, ia setia juga dalam perkara-perkara besar.", ref: "Lukas 16:10" },
      { text: "Sebab itu, saudara-saudaraku yang kekasih, berdirilah teguh, jangan goyah, dan giatlah selalu dalam pekerjaan Tuhan!", ref: "1 Korintus 15:58" }
    ]
  },
  focusActiveTaskId: null,
  focusTimerInterval: null,
  focusTimeRemaining: 0,
  wrappedActiveSlide: 0,
  openedSubtaskTasks: new Set(), // Keeps track of open subtask lists to avoid closure during update renders
  googleCalendarEvents: null,
  theme: 'light',
  notificationInterval: 'disabled',
  notificationTimer: null
};

// --- Initial Setup & Data Persistence ---

function initApp() {
  if (!localStorage.getItem('yosday_force_clear_once_v2')) {
    localStorage.setItem('yosday_templates', '[]');
    localStorage.setItem('yosday_history', '{}');
    localStorage.setItem('yosday_seeded', 'cleared');
    localStorage.setItem('yosday_force_clear_once_v2', 'true');
  }

  loadDataFromStorage();
  
  // Seed demo data if first-time user and not explicitly cleared
  if (Object.keys(State.history).length === 0 && localStorage.getItem('yosday_seeded') !== 'cleared') {
    seedHistoricalData();
  }
  
  setupCurrentDateDisplay();
  startRealtimeClock();
  

  
  checkAndGenerateTodayTasks();
  renderMascot('sidebar-hoot-mascot-target', calculateWeeklyProgressRate());
  renderWeeklyStreak();
  renderDailyVerse();
  renderTodayProgressSummary();
  renderDailyTasks();
  renderCalendarInformation();
  renderTemplatesCatalog();
  renderReviewTab();
  
  setupEventListeners();
  initGoogleSync();
  initTheme();
  initNotifications();
  
  // Restore saved active tab
  const savedTab = localStorage.getItem('yosday_active_tab') || 'home';
  switchTab(savedTab);
}

function switchTab(tabName) {
  const navItems = document.querySelectorAll('.nav-item');
  const targetItem = Array.from(navItems).find(item => item.getAttribute('data-tab') === tabName);
  if (!targetItem) return;
  
  navItems.forEach(n => n.classList.remove('active'));
  targetItem.classList.add('active');
  
  State.activeTab = tabName;
  localStorage.setItem('yosday_active_tab', tabName);
  
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  const panel = document.getElementById(`tab-${tabName}`);
  if (panel) panel.classList.add('active');
  
  const titles = { 'home': 'Home Dashboard', 'custom': 'Template Center', 'review': 'Review & Analytics' };
  const tabTitleEl = document.getElementById('active-tab-title');
  if (tabTitleEl) {
    tabTitleEl.style.display = 'block';
    tabTitleEl.textContent = titles[tabName] || 'Home Dashboard';
  }
  
  if (tabName === 'review') {
    renderReviewTab();
  }
}

function loadDataFromStorage() {
  const localTemplates = localStorage.getItem('yosday_templates');
  const localHistory = localStorage.getItem('yosday_history');
  
  if (localTemplates) {
    State.templates = JSON.parse(localTemplates);
  } else {
    // Standard template presets
    State.templates = [
      {
        id: "tpl_bangun",
        name: "Bangun Pagi & Saat Teduh",
        startTime: "05:00",
        endTime: "06:00",
        category: "Spiritual",
        priority: "Tinggi",
        activeDays: [1, 2, 3, 4, 5, 6, 0], // everyday
        subtasks: ["Minum Air Hangat", "Saat Teduh / Berdoa", "Membaca Alkitab 1 Pasal"],
        notes: "Mulai hari dengan ketenangan spiritual.",
        holidayException: false,
        ruleDayCond: "none",
        ruleDayAction: "none"
      },
      {
        id: "tpl_alkitab",
        name: "Membaca Alkitab & Jurnal",
        startTime: "06:00",
        endTime: "06:30",
        category: "Spiritual",
        priority: "Sedang",
        activeDays: [1, 2, 3, 4, 5, 6, 0],
        subtasks: ["Baca Perjanjian Lama", "Baca Perjanjian Baru", "Tulis Refleksi Pendek"],
        notes: "Disiplin membangun iman.",
        holidayException: false,
        ruleDayCond: "none",
        ruleDayAction: "none"
      },
      {
        id: "tpl_olahraga",
        name: "Olahraga Sore",
        startTime: "17:30",
        endTime: "18:30",
        category: "Kesehatan",
        priority: "Sedang",
        activeDays: [1, 3, 5], // Mon, Wed, Fri
        subtasks: ["Stretching", "Jogging 3KM / Gym", "Cooling Down"],
        notes: "Menjaga stamina tubuh.",
        holidayException: true,
        ruleDayCond: "none",
        ruleDayAction: "none"
      },
      {
        id: "tpl_kerja",
        name: "Kerja Utama",
        startTime: "08:00",
        endTime: "17:00",
        category: "Karir",
        priority: "Tinggi",
        activeDays: [1, 2, 3, 4, 5], // Mon-Fri
        subtasks: ["Daily Standup", "Selesaikan Task Sprint", "Balas Email & Slack"],
        notes: "Fokus kerja produktif.",
        holidayException: true,
        ruleDayCond: "holiday",
        ruleDayAction: "rename-family" // Rename to Family Time on Holidays
      },
      {
        id: "tpl_belajar",
        name: "Belajar Bahasa Pemrograman Go",
        startTime: "19:30",
        endTime: "21:30",
        category: "Edukasi",
        priority: "Sedang",
        activeDays: [2, 4], // Tue, Thu
        subtasks: ["Tonton 1 Video Tutorial", "Ngoding Praktek Go-routine", "Push to GitHub"],
        notes: "Meningkatkan skill technical.",
        holidayException: false,
        ruleDayCond: "0", // Exclude on Sunday
        ruleDayAction: "hide"
      },
      {
        id: "tpl_tidur",
        name: "Istirahat / Tidur",
        startTime: "22:30",
        endTime: "23:00",
        category: "Rutin",
        priority: "Rendah",
        activeDays: [1, 2, 3, 4, 5, 6, 0],
        subtasks: ["Rapikan Tempat Tidur", "Meditasi / Berdoa Malam", "Matikan Gadget"],
        notes: "Mempersiapkan tubuh untuk esok.",
        holidayException: false,
        ruleDayCond: "none",
        ruleDayAction: "none"
      }
    ];
    saveTemplatesToStorage();
  }
  
  if (localHistory) {
    State.history = JSON.parse(localHistory);
  }
}

function saveTemplatesToStorage() {
  localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
  triggerAutoCloudBackup();
}

function saveHistoryToStorage() {
  localStorage.setItem('yosday_history', JSON.stringify(State.history));
  triggerAutoCloudBackup();
}

// --- Dynamic Date Helpers ---

function setupCurrentDateDisplay() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date-display').textContent = State.currentDate.toLocaleDateString('id-ID', options);
}

function startRealtimeClock() {
  const clockElement = document.getElementById('realtime-clock-display');
  if (!clockElement) return;
  
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}

function getISODateString(date) {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 10);
  return localISOTime;
}

// --- Google Holidays Utility ---

function isNationalHoliday(dateStr) {
  const parts = dateStr.split('-');
  const mmdd = `${parts[1]}-${parts[2]}`;
  const found = State.holidays.find(h => h.date === mmdd);
  return found ? found.name : null;
}

// --- Seed Data Engine (30 Days Simulation) ---

function seedHistoricalData() {
  const daysToSeed = 30;
  const startDay = new Date(State.currentDate);
  startDay.setDate(startDay.getDate() - daysToSeed);
  
  for (let i = 0; i < daysToSeed; i++) {
    const curDate = new Date(startDay);
    curDate.setDate(startDay.getDate() + i);
    const dateStr = getISODateString(curDate);
    const dayOfWeek = curDate.getDay(); // 0-6
    const holidayName = isNationalHoliday(dateStr);
    
    const seededTasks = [];
    
    State.templates.forEach(tpl => {
      if (!tpl.activeDays.includes(dayOfWeek)) return;
      if (holidayName && tpl.holidayException) {
        if (tpl.ruleDayCond === 'holiday' && tpl.ruleDayAction === 'hide') {
          return;
        }
      }
      
      let taskName = tpl.name;
      let hideTask = false;
      
      if (tpl.ruleDayCond === 'holiday' && holidayName) {
        if (tpl.ruleDayAction === 'rename-family') {
          taskName = "Family Time (Hari Libur)";
        } else if (tpl.ruleDayAction === 'rename-rest') {
          taskName = "Self Care / Istirahat";
        } else if (tpl.ruleDayAction === 'hide') {
          hideTask = true;
        }
      } else if (tpl.ruleDayCond === String(dayOfWeek)) {
        if (tpl.ruleDayAction === 'hide') {
          hideTask = true;
        } else if (tpl.ruleDayAction === 'rename-family') {
          taskName = "Family Time";
        } else if (tpl.ruleDayAction === 'rename-rest') {
          taskName = "Self Care / Istirahat";
        }
      }
      
      if (hideTask) return;
      
      let probability = 0.75;
      if (tpl.id === 'tpl_bangun') probability = 0.94;
      if (tpl.id === 'tpl_alkitab') probability = 0.96;
      if (tpl.id === 'tpl_kerja') probability = 0.90;
      if (tpl.id === 'tpl_belajar') probability = 0.65;
      if (tpl.id === 'tpl_olahraga') probability = 0.41;
      if (tpl.id === 'tpl_tidur') probability = 0.85;
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        probability -= 0.15;
      }
      
      const isCompleted = Math.random() < probability;
      
      const seededSubtasks = tpl.subtasks.map(stName => {
        let stCompleted = isCompleted;
        if (!isCompleted && Math.random() < 0.4) {
          stCompleted = true;
        }
        return { name: stName, completed: stCompleted };
      });
      
      seededTasks.push({
        id: `seeded_${tpl.id}_${dateStr}`,
        name: taskName,
        startTime: tpl.startTime,
        endTime: tpl.endTime,
        category: tpl.category,
        priority: tpl.priority,
        completed: isCompleted,
        subtasks: seededSubtasks,
        notes: tpl.notes,
        isFromTemplate: true,
        templateId: tpl.id
      });
    });
    
    const compRate = calculateCompletionRateForTasks(seededTasks);
    let verseCategory = 'harapan';
    if (compRate < 0.6) {
      verseCategory = Math.random() < 0.5 ? 'ketekunan' : 'disiplin';
    } else if (compRate >= 0.8) {
      verseCategory = Math.random() < 0.5 ? 'syukur' : 'konsistensi';
    }
    const verseList = State.smartVerses[verseCategory];
    const pickedVerse = verseList[Math.floor(Math.random() * verseList.length)];
    
    State.history[dateStr] = {
      date: dateStr,
      tasks: seededTasks,
      notes: i % 4 === 0 ? "Hari berjalan cukup baik. Sedikit lelah di sore hari namun rutinitas spiritual tetap lancar." : "",
      verse: pickedVerse,
      hootExpression: calculateMascotExpressionForRate(compRate)
    };
  }
  
  localStorage.setItem('yosday_seeded', 'true');
  saveHistoryToStorage();
}

function calculateCompletionRateForTasks(tasks) {
  if (tasks.length === 0) return 1.0;
  const done = tasks.filter(t => t.completed).length;
  return done / tasks.length;
}

// --- Active Day Task Checker ---

function checkAndGenerateTodayTasks() {
  const todayStr = getISODateString(State.currentDate);
  
  if (!State.history[todayStr]) {
    const todayTasks = [];
    const dayOfWeek = State.currentDate.getDay();
    const holidayName = isNationalHoliday(todayStr);
    
    State.templates.forEach(tpl => {
      if (!tpl.activeDays.includes(dayOfWeek)) return;
      if (holidayName && tpl.holidayException) {
        if (tpl.ruleDayCond === 'holiday' && tpl.ruleDayAction === 'hide') {
          return;
        }
      }
      
      let taskName = tpl.name;
      let hideTask = false;
      
      if (tpl.ruleDayCond === 'holiday' && holidayName) {
        if (tpl.ruleDayAction === 'rename-family') {
          taskName = "Family Time (Hari Libur)";
        } else if (tpl.ruleDayAction === 'rename-rest') {
          taskName = "Self Care / Istirahat";
        } else if (tpl.ruleDayAction === 'hide') {
          hideTask = true;
        }
      } else if (tpl.ruleDayCond === String(dayOfWeek)) {
        if (tpl.ruleDayAction === 'hide') {
          hideTask = true;
        } else if (tpl.ruleDayAction === 'rename-family') {
          taskName = "Family Time";
        } else if (tpl.ruleDayAction === 'rename-rest') {
          taskName = "Self Care / Istirahat";
        }
      }
      
      if (hideTask) return;
      
      const instantiatedSubtasks = tpl.subtasks.map(st => ({ name: st, completed: false }));
      
      todayTasks.push({
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: taskName,
        startTime: tpl.startTime,
        endTime: tpl.endTime,
        category: tpl.category,
        priority: tpl.priority,
        completed: false,
        subtasks: instantiatedSubtasks,
        notes: tpl.notes,
        isFromTemplate: true,
        templateId: tpl.id
      });
    });
    
    const verseList = State.smartVerses['harapan'];
    const pickedVerse = verseList[Math.floor(Math.random() * verseList.length)];
    
    State.history[todayStr] = {
      date: todayStr,
      tasks: todayTasks,
      notes: "",
      verse: pickedVerse,
      hootExpression: "Ramah"
    };
    
    saveHistoryToStorage();
  }
}

// --- Smart Mascot Renderer (SVG Engine) ---

function calculateMascotExpressionForRate(rate) {
  if (rate >= 0.95) return "Sangat Bahagia";
  if (rate >= 0.80) return "Senang";
  if (rate >= 0.60) return "Netral";
  if (rate >= 0.40) return "Kecewa";
  if (rate >= 0.20) return "Sedih";
  return "Marah";
}

function calculateWeeklyProgressRate() {
  const monday = new Date(State.currentDate);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff);
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  for (let i = 0; i < 7; i++) {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + i);
    const dateStr = getISODateString(cur);
    
    if (cur > State.currentDate) continue;
    
    const dayRecord = State.history[dateStr];
    if (dayRecord && dayRecord.tasks.length > 0) {
      totalTasks += dayRecord.tasks.length;
      completedTasks += dayRecord.tasks.filter(t => t.completed).length;
    }
  }
  
  return totalTasks === 0 ? 0.75 : completedTasks / totalTasks;
}

function renderMascot(targetContainerId, progressRate, expressionOverload = null) {
  const container = document.getElementById(targetContainerId);
  if (!container) return;
  
  let expression = expressionOverload || calculateMascotExpressionForRate(progressRate);
  
  const currentStreak = calculateCurrentStreak();
  if (currentStreak >= 30 && !expressionOverload) {
    expression = "Legendary";
  }
  
  let primaryColor = "#3b82f6"; // Blue (Netral)
  let eyePathLeft = `circle cx="38" cy="48" r="14" fill="white"`;
  let eyePathRight = `circle cx="62" cy="48" r="14" fill="white"`;
  let eyePupils = `
    <circle cx="38" cy="48" r="7" fill="#0f172a" />
    <circle cx="62" cy="48" r="7" fill="#0f172a" />
    <circle cx="41" cy="45" r="2.5" fill="white" />
    <circle cx="65" cy="45" r="2.5" fill="white" />
  `;
  let beakPath = `path d="M 46 56 L 54 56 L 50 62 Z" fill="#f59e0b"`;
  let eyebrowPath = "";
  let extraSVG = "";
  let hootClass = "hoot-owl-animate";
  
  if (expression === "Sangat Bahagia") {
    primaryColor = "#22c55e"; // Green
    eyePathLeft = `path d="M 26 48 Q 38 36 50 48" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"`;
    eyePathRight = `path d="M 50 48 Q 62 36 74 48" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"`;
    eyePupils = "";
    beakPath = `path d="M 46 54 Q 50 66 54 54 Z" fill="#f59e0b"`;
  } else if (expression === "Senang") {
    primaryColor = "#14b8a6"; // Teal
    eyePathLeft = `circle cx="38" cy="48" r="14" fill="white"`;
    eyePathRight = `circle cx="62" cy="48" r="14" fill="white"`;
    eyePupils = `
      <circle cx="38" cy="48" r="7" fill="#0f172a" />
      <circle cx="62" cy="48" r="7" fill="#0f172a" />
      <circle cx="41" cy="44" r="3" fill="white" />
      <circle cx="65" cy="44" r="3" fill="white" />
      <path d="M 28 38 Q 38 34 48 38" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 52 38 Q 62 34 72 38" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" />
    `;
    beakPath = `path d="M 46 54 Q 50 62 54 54 Z" fill="#f59e0b"`;
  } else if (expression === "Netral" || expression === "Ramah") {
    primaryColor = "#3b82f6"; // Blue
  } else if (expression === "Kecewa") {
    primaryColor = "#eab308"; // Yellow
    eyebrowPath = `
      <path d="M 24 35 Q 38 42 48 38" fill="none" stroke="#eab308" stroke-width="3" stroke-linecap="round" />
      <path d="M 52 38 Q 62 42 76 35" fill="none" stroke="#eab308" stroke-width="3" stroke-linecap="round" />
    `;
    beakPath = `path d="M 46 58 L 54 58 L 50 54 Z" fill="#f59e0b"`;
  } else if (expression === "Sedih") {
    primaryColor = "#f97316"; // Orange
    eyePathLeft = `circle cx="38" cy="48" r="14" fill="white"`;
    eyePathRight = `circle cx="62" cy="48" r="14" fill="white"`;
    eyePupils = `
      <circle cx="38" cy="51" r="5" fill="#0f172a" />
      <circle cx="62" cy="51" r="5" fill="#0f172a" />
      <path d="M 24 45 L 52 45 Z" fill="#0f172a" />
      <path d="M 24 48 L 52 48" stroke="#f97316" stroke-width="3" />
      <path d="M 48 48 L 76 48" stroke="#f97316" stroke-width="3" />
    `;
    extraSVG = `
      <path d="M 68 56 Q 71 66 67 66 Q 63 66 66 56 Z" fill="#3b82f6" opacity="0.85" />
    `;
    beakPath = `path d="M 47 58 L 53 58 L 50 53 Z" fill="#f59e0b"`;
  } else if (expression === "Marah") {
    primaryColor = "#ef4444"; // Red
    eyebrowPath = `
      <path d="M 24 34 L 46 44" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />
      <path d="M 76 34 L 54 44" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" />
    `;
    eyePupils = `
      <circle cx="38" cy="48" r="7" fill="#0f172a" />
      <circle cx="62" cy="48" r="7" fill="#0f172a" />
      <circle cx="36" cy="48" r="2.5" fill="white" />
      <circle cx="64" cy="48" r="2.5" fill="white" />
    `;
    beakPath = `path d="M 46 54 L 54 54 L 50 64 Z" fill="#f59e0b"`;
  } else if (expression === "Legendary") {
    primaryColor = "#d97706"; // Golden Yellow
    hootClass = "hoot-owl-animate glow-gold-animation";
    eyePathLeft = `circle cx="38" cy="48" r="14" fill="#fef08a"`;
    eyePathRight = `circle cx="62" cy="48" r="14" fill="#fef08a"`;
    eyePupils = `
      <circle cx="38" cy="48" r="6" fill="#ca8a04" />
      <circle cx="62" cy="48" r="6" fill="#ca8a04" />
      <circle cx="38" cy="48" r="3" fill="#fef08a" />
      <circle cx="62" cy="48" r="3" fill="#fef08a" />
    `;
    beakPath = `path d="M 46 54 Q 50 66 54 54 Z" fill="#fbbf24"`;
    
    extraSVG = `
      <g class="legendary-flame flame-1" fill="#f59e0b">
        <path d="M 12 70 Q 5 50 18 35 Q 26 50 20 70 Z" />
      </g>
      <g class="legendary-flame flame-2" fill="#ef4444">
        <path d="M 50 92 Q 35 75 50 60 Q 65 75 50 92 Z" />
      </g>
      <g class="legendary-flame flame-3" fill="#f59e0b">
        <path d="M 88 70 Q 95 50 82 35 Q 74 50 80 70 Z" />
      </g>
    `;
  }
  
  const svgContent = `
    <svg viewBox="0 0 100 100" class="${hootClass}" style="width: 100%; height: 100%;">
      <defs>
        <filter id="owl-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.3" />
        </filter>
      </defs>
      
      ${extraSVG}
      
      <g filter="url(#owl-shadow)">
        <path d="M 22 34 L 14 16 L 36 28 Z" fill="${primaryColor}" class="hoot-svg-face" />
        <path d="M 78 34 L 86 16 L 64 28 Z" fill="${primaryColor}" class="hoot-svg-face" />
        
        <rect x="20" y="24" width="60" height="52" rx="22" ry="22" fill="${primaryColor}" class="hoot-svg-face" />
        
        <rect x="26" y="32" width="48" height="38" rx="16" ry="16" fill="#1e293b" />
        
        <g>
          <g>${eyePathLeft}</g>
          <g>${eyePathRight}</g>
        </g>
        
        <g>
          ${eyePupils}
        </g>
        
        <g>
          ${eyebrowPath}
        </g>
        
        <g>
          ${beakPath}
        </g>
        
        <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.35" />
        <ellipse cx="72" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.35" />
      </g>
    </svg>
  `;
  
  container.innerHTML = svgContent;
  
  const labelElement = document.getElementById('hoot-expression-label');
  if (labelElement && expression) {
    labelElement.textContent = expression;
    labelElement.className = "hoot-status-badge";
    if (expression === "Sangat Bahagia") labelElement.classList.add("bg-success", "text-dark");
    else if (expression === "Senang") labelElement.classList.add("bg-blue");
    else if (expression === "Netral") labelElement.classList.add("bg-blue");
    else if (expression === "Kecewa") labelElement.classList.add("bg-warning", "text-dark");
    else if (expression === "Sedih") labelElement.classList.add("bg-danger");
    else if (expression === "Marah") labelElement.classList.add("bg-danger");
    else if (expression === "Legendary") {
      labelElement.classList.add("bg-warning", "text-dark");
      labelElement.textContent = "🔥 LEGENDARY 🔥";
    }
  }
}

// --- Smart Verse Logic ---

function renderDailyVerse() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const progressRate = calculateWeeklyProgressRate();
  let category = 'harapan';
  
  if (progressRate < 0.6) {
    category = Math.random() < 0.5 ? 'ketekunan' : 'disiplin';
  } else if (progressRate >= 0.8) {
    category = Math.random() < 0.5 ? 'syukur' : 'konsistensi';
  }
  
  const list = State.smartVerses[category];
  
  let dayHash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    dayHash += todayStr.charCodeAt(i);
  }
  const verseIndex = dayHash % list.length;
  const pickedVerse = list[verseIndex];
  
  todayRecord.verse = pickedVerse;
  
  document.getElementById('verse-context-tag').textContent = `Smart Verse — ${category.toUpperCase()}`;
  document.getElementById('bible-verse-text').textContent = `"${pickedVerse.text}"`;
  document.getElementById('bible-verse-ref').textContent = pickedVerse.ref;
}

// --- Weekly Streak Renderer (Section 1) ---

function renderWeeklyStreak() {
  const weeklyContainer = document.getElementById('weekly-days-list');
  if (!weeklyContainer) return;
  
  const monday = new Date(State.currentDate);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff);
  
  weeklyContainer.innerHTML = "";
  
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  
  for (let i = 0; i < 7; i++) {
    const curDate = new Date(monday);
    curDate.setDate(monday.getDate() + i);
    const dateStr = getISODateString(curDate);
    const isToday = dateStr === getISODateString(State.currentDate);
    
    const dayRecord = State.history[dateStr];
    let icon = "○";
    let classModifier = "day-status-less";
    
    if (dayRecord && dayRecord.tasks.length > 0) {
      const compRate = calculateCompletionRateForTasks(dayRecord.tasks);
      if (compRate >= 1.0) {
        icon = "🔥";
        classModifier = "day-status-full";
      } else if (compRate >= 0.90) {
        icon = "⭐";
        classModifier = "day-status-star";
      } else if (compRate >= 0.70) {
        icon = "✔";
        classModifier = "day-status-check";
      }
    } else if (curDate > State.currentDate) {
      icon = "○";
      classModifier = "day-status-future";
    }
    
    const boxHTML = `
      <div class="streak-day-box ${isToday ? 'active' : ''}" onclick="openDayDetailModal('${dateStr}')">
        <span class="streak-day-name">${dayLabels[i]}</span>
        <span class="streak-icon" title="Completion Status: ${icon}">${icon}</span>
      </div>
    `;
    weeklyContainer.insertAdjacentHTML('beforeend', boxHTML);
  }
  
  const currentStreak = calculateCurrentStreak();
  document.getElementById('streak-counter-bubble').textContent = `🔥 ${currentStreak} Hari`;
}

function calculateCurrentStreak() {
  const todayStr = getISODateString(State.currentDate);
  let streak = 0;
  const sortedDates = Object.keys(State.history).sort().reverse();
  const pastAndToday = sortedDates.filter(d => d <= todayStr);
  
  for (let i = 0; i < pastAndToday.length; i++) {
    const dStr = pastAndToday[i];
    const record = State.history[dStr];
    if (record && record.tasks.length > 0) {
      const compRate = calculateCompletionRateForTasks(record.tasks);
      
      if (compRate >= 0.70) {
        streak++;
      } else {
        if (dStr === todayStr && compRate < 0.70) {
          continue;
        }
        break;
      }
    }
  }
  
  return streak;
}

function calculateLongestStreak() {
  let longest = 0;
  let current = 0;
  const sortedDates = Object.keys(State.history).sort();
  
  sortedDates.forEach(dStr => {
    const record = State.history[dStr];
    if (record && record.tasks.length > 0) {
      const compRate = calculateCompletionRateForTasks(record.tasks);
      if (compRate >= 0.70) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 0;
      }
    }
  });
  
  return Math.max(longest, calculateCurrentStreak());
}

// --- SECTION 3: Today's Progress Generator ---

function renderTodayProgressSummary() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const total = todayRecord.tasks.length;
  const completed = todayRecord.tasks.filter(t => t.completed).length;
  const rate = total === 0 ? 0 : completed / total;
  const percentage = Math.round(rate * 100);
  
  const score = calculateLifeScoreForDay(todayRecord);
  
  document.getElementById('progress-tasks-ratio').textContent = `${completed} / ${total}`;
  document.getElementById('progress-life-score').textContent = score;
  document.getElementById('progress-percentage-val').textContent = `${percentage}%`;
  
  const prodHours = calculateProductiveHoursForDay(todayRecord);
  document.getElementById('progress-active-hours').textContent = `${prodHours.toFixed(1)} Jam`;
  
  document.getElementById('progress-linear-bar').style.width = `${percentage}%`;
  
  const radialBar = document.getElementById('progress-radial-bar');
  const dashOffset = 251.2 - (251.2 * rate);
  radialBar.style.strokeDashoffset = dashOffset;
  
  if (rate >= 0.95) radialBar.style.stroke = "var(--success-green)";
  else if (rate >= 0.80) radialBar.style.stroke = "var(--accent-teal)";
  else if (rate >= 0.60) radialBar.style.stroke = "var(--accent-blue)";
  else if (rate >= 0.40) radialBar.style.stroke = "var(--warning-gold)";
  else radialBar.style.stroke = "var(--danger-red)";
}

function calculateProductiveHoursForDay(dayRecord) {
  let totalHours = 0;
  dayRecord.tasks.forEach(t => {
    if (t.completed) {
      const partsStart = t.startTime.split(':');
      const partsEnd = t.endTime.split(':');
      const hs = parseInt(partsStart[0]) + (parseInt(partsStart[1]) / 60);
      const he = parseInt(partsEnd[0]) + (parseInt(partsEnd[1]) / 60);
      const duration = he - hs;
      totalHours += duration > 0 ? duration : (24 + duration);
    }
  });
  return totalHours;
}

function calculateLifeScoreForDay(dayRecord) {
  if (dayRecord.tasks.length === 0) return 100;
  
  const completedTasks = dayRecord.tasks.filter(t => t.completed);
  const completionRate = completedTasks.length / dayRecord.tasks.length;
  
  const prodHours = calculateProductiveHoursForDay(dayRecord);
  const hourScore = Math.min((prodHours / 10) * 20, 20);
  
  let priorityScore = 0;
  const highPriorityTasks = dayRecord.tasks.filter(t => t.priority === 'Tinggi');
  if (highPriorityTasks.length === 0) {
    priorityScore = 20;
  } else {
    const highCompleted = highPriorityTasks.filter(t => t.completed).length;
    priorityScore = (highCompleted / highPriorityTasks.length) * 20;
  }
  
  const baseScore = (completionRate * 60) + hourScore + priorityScore;
  return Math.round(baseScore);
}

// --- SECTION 4: Daily Task List & Smart Sorting ---

function renderDailyTasks() {
  const container = document.getElementById('daily-tasks-list');
  if (!container) return;
  
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  container.innerHTML = "";
  
  if (todayRecord.tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-tasks-view">
        <div class="empty-tasks-icon">🌿</div>
        <h3>Tidak Ada Tugas Terjadwal</h3>
        <p>Gunakan tombol terapung di kanan bawah untuk menambahkan tugas baru secara manual hari ini.</p>
      </div>
    `;
    return;
  }
  
  const sortedTasks = [...todayRecord.tasks];
  
  const getFloatTime = (timeStr) => {
    const p = timeStr.split(':');
    return parseInt(p[0]) + (parseInt(p[1]) / 60);
  };
  
  const now = new Date();
  const nowFloat = now.getHours() + (now.getMinutes() / 60);
  
  const getTaskCategoryIndex = (task) => {
    if (task.completed) return 3; // Completed category (very bottom)
    
    const start = getFloatTime(task.startTime);
    const end = getFloatTime(task.endTime);
    
    if (nowFloat >= start && nowFloat <= end) {
      return 0; // Active now
    } else if (start > nowFloat) {
      return 1; // Next up
    } else {
      return 2; // Uncompleted past task
    }
  };
  
  const priorityWeight = { 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };
  
  sortedTasks.sort((a, b) => {
    const catA = getTaskCategoryIndex(a);
    const catB = getTaskCategoryIndex(b);
    
    if (catA !== catB) {
      return catA - catB;
    }
    
    const prioA = priorityWeight[a.priority] || 0;
    const prioB = priorityWeight[b.priority] || 0;
    if (prioB !== prioA) {
      return prioB - prioA;
    }
    
    return getFloatTime(a.startTime) - getFloatTime(b.startTime);
  });
  
  sortedTasks.forEach(task => {
    const isCompleted = task.completed;
    const isTodayActive = getTaskCategoryIndex(task) === 0;
    
    let subtasksHTML = "";
    if (task.subtasks && task.subtasks.length > 0) {
      const isSubtaskOpen = State.openedSubtaskTasks && State.openedSubtaskTasks.has(task.id);
      
      subtasksHTML += `
        <button class="task-subtasks-toggle ${isSubtaskOpen ? 'open' : ''}" onclick="toggleSubtasksView('${task.id}')" id="toggle-btn-${task.id}">
          <span class="toggle-icon">${isSubtaskOpen ? '▼' : '▶'}</span>
          <span>Checklist Subtask (${task.subtasks.filter(s => s.completed).length}/${task.subtasks.length})</span>
        </button>
        <div class="task-subtasks-wrapper" id="subtasks-wrap-${task.id}" style="display: ${isSubtaskOpen ? 'flex' : 'none'};">
      `;
      
      task.subtasks.forEach((st, idx) => {
        // Fixed: Checkbox is separated inside subtask-checkbox-label to prevent text overlap and double checkbox display
        subtasksHTML += `
          <div class="task-subtask-item">
            <label class="subtask-checkbox-label">
              <div class="task-checkbox-wrapper">
                <input type="checkbox" class="task-checkbox-input" ${st.completed ? 'checked' : ''} onchange="toggleSubtaskStatus('${task.id}', ${idx})">
                <span class="task-custom-checkbox"></span>
              </div>
              <span class="subtask-name">${st.name}</span>
            </label>
          </div>
        `;
      });
      subtasksHTML += `</div>`;
    }
    
    const taskHTML = `
      <div class="task-item ${isCompleted ? 'completed' : ''} ${isTodayActive ? 'active-now' : ''}" id="task-card-${task.id}">
        <div class="task-main-row">
          
          <label class="task-checkbox-wrapper">
            <input type="checkbox" class="task-checkbox-input" ${isCompleted ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')">
            <span class="task-custom-checkbox"></span>
          </label>
          
          <div class="task-body">
            <span class="task-name">${task.name}</span>
            <div class="task-meta">
              <span class="task-time">⏰ ${task.startTime} - ${task.endTime}</span>
              <span class="task-priority-tag ${task.priority.toLowerCase()}">
                ${task.priority === 'Tinggi' ? '🔴 Tinggi' : task.priority === 'Sedang' ? '🟡 Sedang' : '🔵 Rendah'}
              </span>
              <span class="task-category-badge">${task.category}</span>
              ${isTodayActive ? '<span class="task-status-now">Aktif Sekarang</span>' : ''}
            </div>
          </div>
          
          <div class="task-actions">
            <button class="task-action-btn" title="Edit Tugas" onclick="openEditTaskModal('${task.id}')">✏️</button>
            <button class="task-action-btn btn-delete" title="Hapus Tugas" onclick="deleteTask('${task.id}')">🗑️</button>
          </div>
          
        </div>
        
        ${subtasksHTML}
        
      </div>
    `;
    container.insertAdjacentHTML('beforeend', taskHTML);
  });
}

function toggleTaskStatus(taskId) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  // Fixed: Removed incorrect todayRecord.find call (TypeError crash)
  const task = todayRecord.tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    
    if (task.subtasks) {
      task.subtasks.forEach(st => {
        st.completed = task.completed;
      });
    }
    
    saveHistoryToStorage();
    recalculateDailyOutputs();
  }
}

function toggleSubtaskStatus(taskId, subtaskIdx) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === taskId);
  if (task && task.subtasks && task.subtasks[subtaskIdx]) {
    task.subtasks[subtaskIdx].completed = !task.subtasks[subtaskIdx].completed;
    
    const allChecked = task.subtasks.every(s => s.completed);
    task.completed = allChecked;
    
    saveHistoryToStorage();
    recalculateDailyOutputs();
  }
}

// Fixed: keeps track of toggles in State.openedSubtaskTasks to persist on state update renders
function toggleSubtasksView(taskId) {
  const wrapper = document.getElementById(`subtasks-wrap-${taskId}`);
  const btn = document.getElementById(`toggle-btn-${taskId}`);
  if (wrapper) {
    if (wrapper.style.display === "none") {
      wrapper.style.display = "flex";
      btn.classList.add('open');
      btn.querySelector('.toggle-icon').textContent = "▼";
      State.openedSubtaskTasks.add(taskId);
    } else {
      wrapper.style.display = "none";
      btn.classList.remove('open');
      btn.querySelector('.toggle-icon').textContent = "▶";
      State.openedSubtaskTasks.delete(taskId);
    }
  }
}

function deleteTask(taskId) {
  if (!confirm("Apakah Anda yakin ingin menghapus tugas ini khusus hari ini?")) return;
  
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (todayRecord) {
    todayRecord.tasks = todayRecord.tasks.filter(t => t.id !== taskId);
    saveHistoryToStorage();
    recalculateDailyOutputs();
  }
}

function recalculateDailyOutputs() {
  const progressRate = calculateWeeklyProgressRate();
  renderMascot('sidebar-hoot-mascot-target', progressRate);
  renderWeeklyStreak();
  renderTodayProgressSummary();
  renderDailyTasks();
  
  if (document.getElementById('focus-mode-view').classList.contains('active')) {
    updateFocusModeDetails();
  }
}

// --- SECTION 5: Calendar Information Widget ---

function renderCalendarInformation() {
  const holidayContainer = document.getElementById('calendar-holidays');
  const eventContainer = document.getElementById('calendar-events');
  const reminderContainer = document.getElementById('calendar-reminders');
  
  const todayStr = getISODateString(State.currentDate);
  
  // Update Sync status indicator dynamically
  const syncIndicator = document.getElementById('calendar-sync-indicator');
  const isLoggedIn = localStorage.getItem('yosday_google_profile') !== null;
  if (syncIndicator) {
    if (isLoggedIn && State.googleCalendarEvents !== 'error') {
      syncIndicator.className = 'gcal-connected';
      syncIndicator.textContent = 'Google Sync ✔';
    } else {
      syncIndicator.className = 'gcal-disconnected';
      syncIndicator.textContent = 'Google Sync ✕';
    }
  }

  holidayContainer.innerHTML = "";
  const holidayFound = isNationalHoliday(todayStr);
  if (holidayFound) {
    holidayContainer.innerHTML = `
      <div class="calendar-info-item holiday">
        <span class="cal-item-emoji">🔴</span>
        <span class="cal-item-text">${holidayFound}</span>
        <span class="cal-item-time">Hari Ini</span>
      </div>
    `;
  } else {
    holidayContainer.innerHTML = `<span class="text-xs text-muted">Tidak ada hari libur nasional hari ini.</span>`;
  }
  
  eventContainer.innerHTML = "";
  if (State.googleCalendarEvents === 'error') {
    eventContainer.innerHTML = `
      <div class="calendar-info-item event error" style="border-left-color: var(--danger-red); background: rgba(239, 68, 68, 0.08); padding: 8px 12px; border-radius: 8px; border-left: 3px solid var(--danger-red);">
        <span class="cal-item-emoji">⚠️</span>
        <span class="cal-item-text" style="color: var(--danger-red); font-size: 11px; line-height: 1.4;">
          Gagal memuat Kalender. Pastikan <strong>Google Calendar API</strong> diaktifkan di Google Cloud Console Anda.
        </span>
      </div>
    `;
  } else {
    // If not logged in, eventsToRender is empty array (hide mockups)
    const eventsToRender = State.googleCalendarEvents || [];
    if (eventsToRender.length > 0) {
      eventsToRender.forEach(e => {
        eventContainer.insertAdjacentHTML('beforeend', `
          <div class="calendar-info-item event">
            <span class="cal-item-emoji">📅</span>
            <span class="cal-item-text">${e.title}</span>
            <span class="cal-item-time">${e.time}</span>
          </div>
        `);
      });
    } else {
      eventContainer.innerHTML = `<span class="text-xs text-muted">Tidak ada jadwal acara kalender hari ini.</span>`;
    }
  }
  
  reminderContainer.innerHTML = "";
  // Show reminders only if logged in (hide mockups when not logged in)
  if (isLoggedIn) {
    const activeReminders = State.reminders.filter(r => r.date >= todayStr);
    if (activeReminders.length > 0) {
      activeReminders.forEach(r => {
        const isOverdue = r.date === todayStr;
        reminderContainer.insertAdjacentHTML('beforeend', `
          <div class="calendar-info-item reminder">
            <span class="cal-item-emoji">💡</span>
            <span class="cal-item-text" style="${r.done ? 'text-decoration: line-through;' : ''}">${r.title}</span>
            <span class="cal-item-time">${isOverdue ? 'Jatuh Tempo Hari Ini' : r.date}</span>
          </div>
        `);
      });
    } else {
      reminderContainer.innerHTML = `<span class="text-xs text-muted">Tidak ada pengingat aktif.</span>`;
    }
  } else {
    reminderContainer.innerHTML = `<span class="text-xs text-muted">Tidak ada pengingat aktif.</span>`;
  }
}

// ==========================================================================
// TAB 2: CUSTOM ENGINE (TEMPLATE MANAGER)
// ==========================================================================

function renderTemplatesCatalog() {
  const container = document.getElementById('templates-catalog-list');
  if (!container) return;
  
  container.innerHTML = "";
  
  if (State.templates.length === 0) {
    container.innerHTML = `
      <div class="empty-tasks-view">
        <div class="empty-tasks-icon">⚙️</div>
        <h3>Belum Ada Template Tugas</h3>
        <p>Gunakan form di sebelah kiri untuk merancang template pekerjaan berulang pertama Anda.</p>
      </div>
    `;
    return;
  }
  
  const dayNames = ["M", "S", "S", "R", "K", "J", "S"];
  
  State.templates.forEach(tpl => {
    let daysHTML = "";
    for (let i = 0; i < 7; i++) {
      const dayNum = i === 6 ? 0 : i + 1;
      const isActive = tpl.activeDays.includes(dayNum);
      daysHTML += `<span class="day-badge-dot ${isActive ? 'active' : ''}">${dayNames[dayNum]}</span>`;
    }
    
    let rulesHTML = "";
    if (tpl.holidayException) {
      rulesHTML += `
        <div class="template-rule-indicator">
          <span>🛡️ Libur Nasional Diabaikan</span>
        </div>
      `;
    }
    if (tpl.ruleDayCond !== 'none') {
      const triggerDay = tpl.ruleDayCond === 'holiday' ? 'Libur Nasional' : tpl.ruleDayCond === '0' ? 'Minggu' : 'Sabtu';
      const actionText = tpl.ruleDayAction === 'hide' ? 'Jangan Tampilkan' : tpl.ruleDayAction === 'rename-family' ? 'Family Time' : 'Self Care';
      rulesHTML += `
        <div class="template-rule-indicator">
          <span>⚙️ Jika ${triggerDay} ➔ ${actionText}</span>
        </div>
      `;
    }
    
    const cardHTML = `
      <div class="template-card">
        <div class="template-card-header">
          <div>
            <span class="template-card-title">${tpl.name}</span>
            <div class="task-meta">
              <span>⏰ ${tpl.startTime} - ${tpl.endTime}</span>
              <span class="task-priority-tag ${tpl.priority.toLowerCase()}">${tpl.priority === 'Tinggi' ? '🔴 Tinggi' : tpl.priority === 'Sedang' ? '🟡 Sedang' : '🔵 Rendah'}</span>
              <span class="task-category-badge">${tpl.category}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div class="template-days-strip">
            ${daysHTML}
          </div>
          ${rulesHTML}
        </div>
        
        <div class="template-footer-actions">
          <span class="text-xs text-muted">${tpl.subtasks ? tpl.subtasks.length : 0} Checklist subtask</span>
          <div class="task-actions">
            <button class="task-action-btn" title="Edit Template" onclick="loadTemplateToForm('${tpl.id}')">✏️</button>
            <button class="task-action-btn btn-delete" title="Hapus Template" onclick="deleteTemplate('${tpl.id}')">🗑️</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function loadTemplateToForm(templateId) {
  const tpl = State.templates.find(t => t.id === templateId);
  if (!tpl) return;
  
  document.getElementById('template-editor-title').textContent = "Edit Template Tugas";
  document.getElementById('template-edit-id').value = tpl.id;
  document.getElementById('template-name').value = tpl.name;
  document.getElementById('template-start-time').value = tpl.startTime;
  document.getElementById('template-end-time').value = tpl.endTime;
  document.getElementById('template-category').value = tpl.category;
  document.getElementById('template-priority').value = tpl.priority;
  document.getElementById('template-notes').value = tpl.notes || "";
  
  const checkBoxes = document.querySelectorAll('input[name="active-days"]');
  checkBoxes.forEach(cb => {
    cb.checked = tpl.activeDays.includes(parseInt(cb.value));
  });
  
  document.getElementById('rule-holiday-exception').checked = tpl.holidayException;
  document.getElementById('rule-day-cond').value = tpl.ruleDayCond;
  document.getElementById('rule-day-action').value = tpl.ruleDayAction;
  
  const subtasksList = document.getElementById('form-subtasks-list');
  subtasksList.innerHTML = "";
  if (tpl.subtasks) {
    tpl.subtasks.forEach(st => addSubtaskRowToBuilder('form-subtasks-list', st));
  }
  
  document.querySelector('.template-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteTemplate(templateId) {
  if (!confirm("Menghapus template tidak menghapus histori tugas lama, namun tidak akan memicu pembuatan tugas ini di masa mendatang. Lanjutkan?")) return;
  State.templates = State.templates.filter(t => t.id !== templateId);
  saveTemplatesToStorage();
  renderTemplatesCatalog();
}

function addSubtaskRowToBuilder(containerId, value = "") {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const id = `st_row_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const rowHTML = `
    <div class="form-subtask-row" id="${id}">
      <input type="text" value="${value}" placeholder="Tulis subtask..." class="form-control" style="flex-grow: 1;">
      <button type="button" class="btn btn-danger btn-sm" onclick="document.getElementById('${id}').remove()">✕</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', rowHTML);
}

// ==========================================================================
// TAB 3: REVIEW TAB (ANALYTICS)
// ==========================================================================

function renderReviewTab() {
  calculateAndRenderSummaryCards();
  renderProductivityChart('7'); // Default 7 days
  renderMonthlyCalendarGrid();
  renderAILifeReviewText();
}

function calculateAndRenderSummaryCards() {
  const sortedDates = Object.keys(State.history).sort();
  if (sortedDates.length === 0) return;
  
  let totalTasks = 0;
  let completedTasks = 0;
  let totalProductiveHours = 0;
  
  sortedDates.forEach(dStr => {
    const record = State.history[dStr];
    if (record && record.tasks) {
      totalTasks += record.tasks.length;
      completedTasks += record.tasks.filter(t => t.completed).length;
      totalProductiveHours += calculateProductiveHoursForDay(record);
    }
  });
  
  const rate = totalTasks === 0 ? 0 : completedTasks / totalTasks;
  const missedTasks = totalTasks - completedTasks;
  
  document.getElementById('review-stat-completion').textContent = `${(rate * 100).toFixed(1)}%`;
  document.getElementById('review-stat-current-streak').textContent = `${calculateCurrentStreak()} Hari`;
  document.getElementById('review-stat-longest-streak').textContent = `${calculateLongestStreak()} Hari`;
  document.getElementById('review-stat-total-tasks').textContent = `${totalTasks} Tugas`;
  document.getElementById('review-stat-missed-tasks').textContent = `${missedTasks} Tugas`;
  document.getElementById('review-stat-productive-hours').textContent = `${Math.round(totalProductiveHours)} Jam`;
}

// Fixed: SVG layout now maps inside a viewBox "0 0 500 220" for total mobile responsiveness
function renderProductivityChart(timeframe) {
  const canvas = document.getElementById('productivity-chart-canvas');
  if (!canvas) return;
  
  const daysLimit = parseInt(timeframe);
  const sortedDates = Object.keys(State.history).sort();
  const targetDates = sortedDates.slice(-daysLimit);
  
  if (targetDates.length === 0) {
    canvas.innerHTML = `<span class="text-xs text-muted text-center" style="display:block; margin-top:100px;">Data history tidak cukup untuk membuat grafik.</span>`;
    return;
  }
  
  // Static scale definitions for SVG viewBox responsiveness
  const chartWidth = 500;
  const chartHeight = 220;
  
  const stepX = chartWidth / (targetDates.length - 1 || 1);
  
  let completionPoints = [];
  let hoursPoints = [];
  let scorePoints = [];
  
  targetDates.forEach((dStr, idx) => {
    const record = State.history[dStr];
    const compRate = calculateCompletionRateForTasks(record.tasks);
    const prodHours = calculateProductiveHoursForDay(record);
    const lifeScore = calculateLifeScoreForDay(record);
    
    const x = idx * stepX;
    
    const yCompletion = chartHeight - (compRate * chartHeight);
    const yHours = chartHeight - (Math.min(prodHours / 12, 1) * chartHeight);
    const yScore = chartHeight - ((lifeScore / 100) * chartHeight);
    
    completionPoints.push(`${x},${yCompletion}`);
    hoursPoints.push(`${x},${yHours}`);
    scorePoints.push(`${x},${yScore}`);
  });
  
  let gridLines = "";
  targetDates.forEach((dStr, idx) => {
    if (idx % Math.ceil(targetDates.length / 7) === 0) {
      const x = idx * stepX;
      const dateLabel = dStr.substring(8, 10) + "/" + dStr.substring(5, 7);
      gridLines += `
        <line x1="${x}" y1="0" x2="${x}" y2="${chartHeight}" stroke="rgba(255,255,255,0.03)" />
        <text x="${x}" y="${chartHeight + 15}" fill="var(--text-muted)" font-size="10" text-anchor="middle">${dateLabel}</text>
      `;
    }
  });
  
  let hoverPointsHTML = "";
  targetDates.forEach((dStr, idx) => {
    const record = State.history[dStr];
    const compRate = calculateCompletionRateForTasks(record.tasks);
    const prodHours = calculateProductiveHoursForDay(record);
    const x = idx * stepX;
    const yCompletion = chartHeight - (compRate * chartHeight);
    
    hoverPointsHTML += `
      <circle cx="${x}" cy="${yCompletion}" r="4" class="chart-point-completion" 
              onclick="openDayDetailModal('${dStr}')">
        <title>Tanggal: ${dStr}\nCompletion: ${Math.round(compRate*100)}%\nJam Produktif: ${prodHours.toFixed(1)} jam</title>
      </circle>
    `;
  });
  
  canvas.innerHTML = `
    <svg viewBox="0 0 500 245" width="100%" height="100%" style="overflow: visible;">
      <g>
        ${gridLines}
      </g>
      <path d="M 0,${chartHeight} L ${completionPoints.join(' L ')} L ${chartWidth},${chartHeight} Z" fill="url(#blue-grad)" class="chart-area-fill" />
      
      <polyline points="${completionPoints.join(' ')}" class="chart-line-completion" />
      <polyline points="${hoursPoints.join(' ')}" class="chart-line-hours" />
      <polyline points="${scorePoints.join(' ')}" class="chart-line-score" />
      
      <g>
        ${hoverPointsHTML}
      </g>
      
      <defs>
        <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="var(--accent-blue)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

// --- Review Tab Calendar Engine ---

let currentCalMonth = 4;
let currentCalYear = 2026;

function renderMonthlyCalendarGrid() {
  const daysContainer = document.getElementById('monthly-calendar-days');
  const monthYearLabel = document.getElementById('cal-month-year-label');
  if (!daysContainer) return;
  
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  monthYearLabel.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  
  daysContainer.innerHTML = "";
  
  const firstDay = new Date(currentCalYear, currentCalMonth, 1);
  let startOffset = firstDay.getDay();
  startOffset = startOffset === 0 ? 6 : startOffset - 1;
  
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  
  for (let i = 0; i < startOffset; i++) {
    daysContainer.insertAdjacentHTML('beforeend', `<div class="calendar-grid-day empty"></div>`);
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const curDate = new Date(currentCalYear, currentCalMonth, d);
    const dateStr = getISODateString(curDate);
    const isToday = dateStr === getISODateString(State.currentDate);
    
    const dayRecord = State.history[dateStr];
    let classStatus = "";
    
    if (dayRecord && dayRecord.tasks.length > 0) {
      const compRate = calculateCompletionRateForTasks(dayRecord.tasks);
      if (compRate >= 1.0) classStatus = "day-status-full";
      else if (compRate >= 0.90) classStatus = "day-status-star";
      else if (compRate >= 0.70) classStatus = "day-status-check";
      else classStatus = "day-status-less";
    }
    
    const dayHTML = `
      <div class="calendar-grid-day ${classStatus} ${isToday ? 'day-today' : ''}" 
           onclick="openDayDetailModal('${dateStr}')">
        <span>${d}</span>
      </div>
    `;
    daysContainer.insertAdjacentHTML('beforeend', dayHTML);
  }
}

// --- Deep Daily Record Modal ---

function openDayDetailModal(dateStr) {
  const record = State.history[dateStr];
  if (!record) return;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateStr).toLocaleDateString('id-ID', options);
  
  document.getElementById('day-detail-title').textContent = `Histori Harian: ${formattedDate}`;
  
  const total = record.tasks.length;
  const completed = record.tasks.filter(t => t.completed).length;
  const rate = total === 0 ? 1.0 : completed / total;
  
  document.getElementById('day-detail-completion').textContent = `${Math.round(rate * 100)}%`;
  document.getElementById('day-detail-productive').textContent = `${calculateProductiveHoursForDay(record).toFixed(1)} Jam`;
  document.getElementById('day-detail-count').textContent = `${completed} / ${total}`;
  
  renderMascot('day-detail-mascot-svg', rate, record.hootExpression);
  document.getElementById('day-detail-expression').textContent = record.hootExpression || calculateMascotExpressionForRate(rate);
  
  const tasksContainer = document.getElementById('day-detail-tasks-list');
  tasksContainer.innerHTML = "";
  
  if (record.tasks.length === 0) {
    tasksContainer.innerHTML = `<span class="text-xs text-muted text-center">Tidak ada tugas pada hari itu.</span>`;
  } else {
    record.tasks.forEach(t => {
      tasksContainer.insertAdjacentHTML('beforeend', `
        <div class="detail-task-history-item ${t.completed ? 'done' : 'missed'}">
          <div>
            <span class="detail-task-h-title">${t.name}</span>
            <div class="detail-task-h-meta">
              <span>⏰ ${t.startTime} - ${t.endTime}</span> | <span class="task-category-badge">${t.category}</span>
            </div>
          </div>
          <span class="detail-task-h-status ${t.completed ? 'done' : 'missed'}">${t.completed ? 'SELESAI ✔' : 'TERLEWAT ✕'}</span>
        </div>
      `);
    });
  }
  
  if (record.verse) {
    document.getElementById('day-detail-verse').textContent = `"${record.verse.text}"`;
    document.getElementById('day-detail-verse-ref').textContent = record.verse.ref;
  }
  
  const notesInput = document.getElementById('day-detail-notes-input');
  notesInput.value = record.notes || "";
  notesInput.setAttribute('data-target-date', dateStr);
  
  document.getElementById('day-detail-modal').classList.add('active');
}

function saveDailyReflectionNotes() {
  const notesInput = document.getElementById('day-detail-notes-input');
  const dateStr = notesInput.getAttribute('data-target-date');
  const text = notesInput.value.trim();
  
  if (dateStr && State.history[dateStr]) {
    State.history[dateStr].notes = text;
    saveHistoryToStorage();
    alert("Jurnal refleksi berhasil disimpan!");
    document.getElementById('day-detail-modal').classList.remove('active');
  }
}

// --- SECTION 5: AI Behavioral Evaluator ---

function renderAILifeReviewText() {
  const textBlock = document.getElementById('ai-life-review-text');
  const insightsList = document.getElementById('review-insights-list');
  if (!textBlock) return;
  
  const sortedDates = Object.keys(State.history).sort();
  if (sortedDates.length < 5) {
    textBlock.textContent = "Data tidak cukup. Kerjakan minimal 5 hari tugas untuk memicu AI Life Review.";
    return;
  }
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  let morningTasks = 0;
  let morningCompleted = 0;
  
  let nightTasks = 0;
  let nightCompleted = 0;
  
  const categoryStats = {};
  const weekdayStats = {0: {tot:0, done:0}, 1: {tot:0, done:0}, 2: {tot:0, done:0}, 3: {tot:0, done:0}, 4: {tot:0, done:0}, 5: {tot:0, done:0}, 6: {tot:0, done:0}};
  
  sortedDates.forEach(dStr => {
    const record = State.history[dStr];
    const d = new Date(dStr);
    const dayNum = d.getDay();
    
    record.tasks.forEach(t => {
      totalTasks++;
      if (t.completed) completedTasks++;
      
      const startHour = parseInt(t.startTime.split(':')[0]);
      
      if (startHour < 12) {
        morningTasks++;
        if (t.completed) morningCompleted++;
      } else if (startHour >= 18) {
        nightTasks++;
        if (t.completed) nightCompleted++;
      }
      
      if (!categoryStats[t.category]) {
        categoryStats[t.category] = { total: 0, done: 0 };
      }
      categoryStats[t.category].total++;
      if (t.completed) categoryStats[t.category].done++;
      
      weekdayStats[dayNum].tot++;
      if (t.completed) weekdayStats[dayNum].done++;
    });
  });
  
  const globalRate = completedTasks / totalTasks;
  const morningRate = morningTasks === 0 ? 0 : morningCompleted / morningTasks;
  const nightRate = nightTasks === 0 ? 0 : nightCompleted / nightTasks;
  
  let bestCategory = "";
  let bestRate = -1;
  let worstCategory = "";
  let worstRate = 999;
  
  Object.keys(categoryStats).forEach(cat => {
    const stat = categoryStats[cat];
    const rate = stat.done / stat.total;
    if (rate > bestRate) {
      bestRate = rate;
      bestCategory = cat;
    }
    if (rate < worstRate) {
      worstRate = rate;
      worstCategory = cat;
    }
  });
  
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let bestDayNum = 0;
  let bestDayRate = -1;
  Object.keys(weekdayStats).forEach(dayKey => {
    const stat = weekdayStats[dayKey];
    const r = stat.tot === 0 ? 0 : stat.done / stat.tot;
    if (r > bestDayRate) {
      bestDayRate = r;
      bestDayNum = parseInt(dayKey);
    }
  });
  
  const levelBadge = document.getElementById('ai-review-level-badge');
  if (levelBadge) {
    levelBadge.innerHTML = `Evaluasi Kehidupan: `;
    if (globalRate >= 0.85) {
      levelBadge.insertAdjacentHTML('beforeend', `<span class="badge text-dark bg-success text-bold">DISIPLIN TINGGI</span>`);
    } else if (globalRate >= 0.65) {
      levelBadge.insertAdjacentHTML('beforeend', `<span class="badge text-dark bg-blue text-bold">KONSISTENSI MENENGAH</span>`);
    } else {
      levelBadge.insertAdjacentHTML('beforeend', `<span class="badge text-dark bg-danger text-bold">KONDISI INKONSISTEN</span>`);
    }
  }
  
  const paragraph = `Selama 30 hari terakhir, Anda menyelesaikan ${Math.round(globalRate * 100)}% dari tugas yang Anda jadwalkan sendiri. Analisis waktu menunjukkan aktivitas pagi hari (sebelum pukul 12:00) memiliki tingkat keberhasilan luar biasa yaitu ${Math.round(morningRate * 100)}%, sementara tugas malam hari (setelah pukul 18:00) merosot tajam ke angka ${Math.round(nightRate * 100)}%. Pola data objektif ini mendiagnosa bahwa Anda memiliki motivasi tinggi di awal hari namun cenderung menumpuk target penting di malam hari saat level energi mental sudah terkuras habis. Hambatan terbesar Anda bukan kurangnya alokasi waktu, melainkan kesalahan distribusi prioritas kerja malam. Kategori <strong>${bestCategory}</strong> adalah area terbaik Anda (${Math.round(bestRate*100)}% selesai), berbanding terbalik dengan <strong>${worstCategory}</strong> yang memiliki tingkat kegagalan tertinggi (${Math.round(100 - (worstRate*100))}% terlewat).`;
  
  textBlock.innerHTML = paragraph;
  
  insightsList.innerHTML = `
    <div class="insight-item-box positive">
      <div class="insight-val-text">Jam Produktif Utama</div>
      <div class="insight-desc-text">Performa puncak terjadi pukul 06.00 - 11.00. Selesaikan tugas prioritas tinggi di waktu ini.</div>
    </div>
    <div class="insight-item-box positive">
      <div class="insight-val-text">Hari Terbaik: ${dayNames[bestDayNum]}</div>
      <div class="insight-desc-text">Rata-rata kesuksesan tugas mencapai ${Math.round(bestDayRate * 100)}% pada hari ${dayNames[bestDayNum]}.</div>
    </div>
    <div class="insight-item-box negative">
      <div class="insight-val-text">Evaluasi Kategori: ${worstCategory}</div>
      <div class="insight-desc-text">Tingkat kegagalan ${worstCategory} sebesar ${Math.round(100 - (worstRate*100))}%. Rekomendasi: Kurangi subtask di kategori ini.</div>
    </div>
    <div class="insight-item-box negative">
      <div class="insight-val-text">Penurunan Malam Hari</div>
      <div class="insight-desc-text">Tingkat keberhasilan tugas di atas jam 20.00 hanya sebesar 31%. Tundalah keesokan harinya.</div>
    </div>
  `;
}

// ==========================================================================
// ADDITIONAL UTILITY: FOCUS MODE (🎯)
// ==========================================================================

function enterFocusMode() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const getFloatTime = (timeStr) => {
    const p = timeStr.split(':');
    return parseInt(p[0]) + (parseInt(p[1]) / 60);
  };
  
  const now = new Date();
  const nowFloat = now.getHours() + (now.getMinutes() / 60);
  
  let activeTask = todayRecord.tasks.find(t => {
    const start = getFloatTime(t.startTime);
    const end = getFloatTime(t.endTime);
    return !t.completed && nowFloat >= start && nowFloat <= end;
  });
  
  if (!activeTask) {
    const futureTasks = todayRecord.tasks.filter(t => !t.completed).sort((a,b) => getFloatTime(a.startTime) - getFloatTime(b.startTime));
    if (futureTasks.length > 0) {
      activeTask = futureTasks[0];
    }
  }
  
  if (!activeTask) {
    activeTask = todayRecord.tasks.find(t => !t.completed);
  }
  
  if (!activeTask) {
    alert("Semua tugas hari ini sudah selesai! Tidak ada tugas untuk mode fokus.");
    return;
  }
  
  State.focusActiveTaskId = activeTask.id;
  
  document.getElementById('focus-mode-view').classList.add('active');
  updateFocusModeDetails();
  
  startFocusTimer(activeTask.endTime);
}

function exitFocusMode() {
  document.getElementById('focus-mode-view').classList.remove('active');
  clearInterval(State.focusTimerInterval);
  State.focusActiveTaskId = null;
  
  recalculateDailyOutputs();
}

function updateFocusModeDetails() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === State.focusActiveTaskId);
  if (!task) {
    exitFocusMode();
    return;
  }
  
  document.getElementById('focus-task-title').textContent = task.name;
  document.getElementById('focus-task-time-range').textContent = `⏰ Jadwal: ${task.startTime} - ${task.endTime}`;
  document.getElementById('focus-task-priority').textContent = `${task.priority === 'Tinggi' ? '🔴 Prioritas Tinggi' : task.priority === 'Sedang' ? '🟡 Prioritas Sedang' : '🔵 Prioritas Rendah'}`;
  
  const rate = calculateWeeklyProgressRate();
  renderMascot('focus-hoot-svg', rate);
  
  const notesContainer = document.getElementById('focus-task-notes-container');
  if (task.notes) {
    notesContainer.style.display = "block";
    document.getElementById('focus-task-notes').textContent = task.notes;
  } else {
    notesContainer.style.display = "none";
  }
  
  const subtasksWrap = document.getElementById('focus-subtask-checklist');
  subtasksWrap.innerHTML = "";
  if (task.subtasks && task.subtasks.length > 0) {
    task.subtasks.forEach((st, idx) => {
      subtasksWrap.insertAdjacentHTML('beforeend', `
        <div class="focus-check-item ${st.completed ? 'checked' : ''}" onclick="toggleSubvalFocusStatus(${idx})">
          <label class="task-checkbox-wrapper">
            <input type="checkbox" class="subtask-checkbox-input" ${st.completed ? 'checked' : ''} style="display:none;">
            <span class="task-custom-checkbox"></span>
          </label>
          <span class="subtask-name" style="font-size:15px; font-weight:600;">${st.name}</span>
        </div>
      `);
    });
  } else {
    subtasksWrap.innerHTML = `<span class="text-xs text-muted">Tidak ada subtask checklist untuk tugas ini.</span>`;
  }
  
  const nextTask = todayRecord.tasks
    .filter(t => !t.completed && t.id !== task.id)
    .sort((a,b) => {
      const getFloatTime = (timeStr) => {
        const p = timeStr.split(':');
        return parseInt(p[0]) + (parseInt(p[1]) / 60);
      };
      return getFloatTime(a.startTime) - getFloatTime(b.startTime);
    })[0];
    
  if (nextTask) {
    document.getElementById('focus-next-task-name').textContent = `${nextTask.name} (${nextTask.startTime} - ${nextTask.endTime})`;
  } else {
    document.getElementById('focus-next-task-name').textContent = "Tidak ada tugas berikutnya.";
  }
}

function toggleSubvalFocusStatus(subtaskIdx) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === State.focusActiveTaskId);
  if (task && task.subtasks && task.subtasks[subtaskIdx]) {
    task.subtasks[subtaskIdx].completed = !task.subtasks[subtaskIdx].completed;
    
    const allChecked = task.subtasks.every(s => s.completed);
    task.completed = allChecked;
    
    saveHistoryToStorage();
    updateFocusModeDetails();
    
    if (allChecked) {
      setTimeout(() => {
        alert("Hebat! Seluruh subtask telah diselesaikan. Tugas utama otomatis selesai.");
        exitFocusMode();
      }, 500);
    }
  }
}

function startFocusTimer(endTimeStr) {
  clearInterval(State.focusTimerInterval);
  
  const getMsFromTimeString = (timeStr) => {
    const p = timeStr.split(':');
    const target = new Date();
    target.setHours(parseInt(p[0]), parseInt(p[1]), 0, 0);
    return target.getTime();
  };
  
  const targetMs = getMsFromTimeString(endTimeStr);
  
  const runTimer = () => {
    const nowMs = Date.now();
    let diffMs = targetMs - nowMs;
    
    if (diffMs <= 0) {
      clearInterval(State.focusTimerInterval);
      document.getElementById('focus-clock-display').textContent = "00:00:00";
      document.getElementById('focus-countdown-ring').style.strokeDashoffset = "282.7";
      document.getElementById('focus-timer-state').textContent = "TUGAS SELESAI";
      return;
    }
    
    const hours = Math.floor(diffMs / 3600000);
    diffMs %= 3600000;
    const minutes = Math.floor(diffMs / 60000);
    diffMs %= 60000;
    const seconds = Math.floor(diffMs / 1000);
    
    const format = (num) => String(num).padStart(2, '0');
    document.getElementById('focus-clock-display').textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    
    const todayStr = getISODateString(State.currentDate);
    const todayRecord = State.history[todayStr];
    const task = todayRecord.tasks.find(t => t.id === State.focusActiveTaskId);
    
    if (task) {
      const startMs = getMsFromTimeString(task.startTime);
      const totalDurationMs = targetMs - startMs;
      const elapsedMs = Date.now() - startMs;
      const ratio = Math.max(0, Math.min(elapsedMs / totalDurationMs, 1));
      
      document.getElementById('focus-countdown-ring').style.strokeDashoffset = 282.7 * ratio;
    }
  };
  
  runTimer();
  State.focusTimerInterval = setInterval(runTimer, 1000);
}

function completeActiveFocusTask() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === State.focusActiveTaskId);
  if (task) {
    task.completed = true;
    if (task.subtasks) {
      task.subtasks.forEach(s => s.completed = true);
    }
    saveHistoryToStorage();
    exitFocusMode();
  }
}

// ==========================================================================
// ADDITIONAL UTILITY: WEEKLY REVIEW (SPOTIFY WRAPPED STYLE SLIDESHOW)
// ==========================================================================

function openYearWrappedModal() {
  State.wrappedActiveSlide = 0;
  
  const sortedDates = Object.keys(State.history).sort();
  let totalTasks = 0;
  let completedTasks = 0;
  let totalHours = 0;
  let goldDays = 0;
  
  const categoryCount = {};
  
  sortedDates.forEach(dStr => {
    const record = State.history[dStr];
    totalHours += calculateProductiveHoursForDay(record);
    
    const dayTotal = record.tasks.length;
    const dayDone = record.tasks.filter(t => t.completed).length;
    totalTasks += dayTotal;
    completedTasks += dayDone;
    
    const dayRate = dayTotal === 0 ? 0 : dayDone / dayTotal;
    if (dayRate >= 0.90) goldDays++;
    
    record.tasks.forEach(t => {
      if (!categoryCount[t.name]) {
        categoryCount[t.name] = { total: 0, done: 0 };
      }
      categoryCount[t.name].total++;
      if (t.completed) categoryCount[t.name].done++;
    });
  });
  
  let bestHabitName = "Membaca Alkitab";
  let bestHabitRate = 0.96;
  let worstHabitName = "Olahraga";
  let worstHabitRate = 0.41;
  
  Object.keys(categoryCount).forEach(tName => {
    const stat = categoryCount[tName];
    if (stat.total >= 4) {
      const rate = stat.done / stat.total;
      if (rate > bestHabitRate) {
        bestHabitRate = rate;
        bestHabitName = tName;
      }
      if (rate < worstHabitRate) {
        worstHabitRate = rate;
        worstHabitName = tName;
      }
    }
  });
  
  document.getElementById('wrapped-val-longest-streak').textContent = calculateLongestStreak();
  document.getElementById('wrapped-val-current-streak').textContent = calculateCurrentStreak();
  document.getElementById('wrapped-val-gold-days').textContent = goldDays;
  document.getElementById('wrapped-val-total-hours').textContent = Math.round(totalHours);
  
  let totalScoresSum = 0;
  sortedDates.forEach(dStr => {
    totalScoresSum += calculateLifeScoreForDay(State.history[dStr]);
  });
  const avgScore = sortedDates.length === 0 ? 0 : Math.round(totalScoresSum / sortedDates.length);
  document.getElementById('wrapped-val-avg-life-score').textContent = avgScore;
  
  document.getElementById('wrapped-val-best-habit').textContent = bestHabitName;
  document.getElementById('wrapped-val-best-habit-rate').textContent = `${Math.round(bestHabitRate * 100)}%`;
  document.getElementById('wrapped-val-worst-habit').textContent = worstHabitName;
  document.getElementById('wrapped-val-worst-habit-rate').textContent = `${Math.round(worstHabitRate * 100)}%`;
  
  // Render Intro Slide Mascot and Badge Slide Mascot
  renderMascot('wrapped-intro-mascot-target', calculateWeeklyProgressRate());
  renderMascot('wrapped-badge-animation-container', 1.0, 'Legendary');
  
  document.getElementById('wrapped-modal').classList.add('active');
  showWrappedSlide(0);
}

function showWrappedSlide(slideIdx) {
  State.wrappedActiveSlide = slideIdx;
  const slides = document.querySelectorAll('.wrapped-slide');
  const dots = document.querySelectorAll('.progress-indicator-dot');
  
  slides.forEach((slide, idx) => {
    if (idx === slideIdx) {
      slide.classList.add('slide-active');
    } else {
      slide.classList.remove('slide-active');
    }
  });
  
  dots.forEach((dot, idx) => {
    dot.className = "progress-indicator-dot";
    if (idx < slideIdx) {
      dot.classList.add('filled');
    } else if (idx === slideIdx) {
      dot.classList.add('active');
    }
  });
  
  document.getElementById('wrapped-prev-slide-btn').style.visibility = slideIdx === 0 ? 'hidden' : 'visible';
  document.getElementById('wrapped-next-slide-btn').style.visibility = slideIdx === slides.length - 1 ? 'hidden' : 'visible';
}

function nextWrappedSlide() {
  const slides = document.querySelectorAll('.wrapped-slide');
  if (State.wrappedActiveSlide < slides.length - 1) {
    showWrappedSlide(State.wrappedActiveSlide + 1);
  }
}

function prevWrappedSlide() {
  if (State.wrappedActiveSlide > 0) {
    showWrappedSlide(State.wrappedActiveSlide - 1);
  }
}

// --- AI Agent Command Parser Engine ---
function processAIAgentCommand(promptText) {
  const result = {
    success: false,
    message: "",
    type: ""
  };
  
  const text = promptText.trim().toLowerCase();
  if (!text) {
    result.message = "Perintah kosong. Silakan tulis sesuatu yang ingin ditambahkan.";
    return result;
  }
  
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) {
    result.message = "Gagal memuat catatan hari ini.";
    return result;
  }
  
  // Extract quoted texts
  const quoteRegex = /["'“‘]([^"'”“’]+)["'”’]/g;
  let matches = [];
  let m;
  while ((m = quoteRegex.exec(promptText)) !== null) {
    matches.push(m[1].trim());
  }
  
  let subtaskName = "";
  if (matches.length > 0) {
    subtaskName = matches[0];
  } else {
    const keywordTriggers = ["menambahkan", "tambahkan", "tambah", "fokus", "subtask", "untuk"];
    let words = text.split(/\s+/);
    let triggerIdx = -1;
    for (let trigger of keywordTriggers) {
      triggerIdx = words.indexOf(trigger);
      if (triggerIdx !== -1) break;
    }
    
    if (triggerIdx !== -1 && triggerIdx < words.length - 1) {
      subtaskName = words.slice(triggerIdx + 1).join(" ");
    }
  }
  
  if (subtaskName) {
    subtaskName = subtaskName.replace(/ke tugas.*/g, "").replace(/di tugas.*/g, "").trim();
    subtaskName = subtaskName.charAt(0).toUpperCase() + subtaskName.slice(1);
  }
  
  let referredTask = null;
  const keywordsMap = {
    "kerja": ["kerja", "pekerjaan", "karir", "kantor", "standup", "sprint", "operasional", "development", "proyek", "laporan", "keuangan"],
    "alkitab": ["alkitab", "saat teduh", "ibadah", "doa", "spiritual", "renungan", "baca alkitab"],
    "olahraga": ["olahraga", "lari", "jogging", "gym", "sehat", "stretching", "stamina", "workout"],
    "belajar": ["belajar", "tutorial", "go", "pemrograman", "coding", "technical", "tonton video"],
    "tidur": ["tidur", "istirahat", "meditasi", "rutin", "malam", "rileks"]
  };
  
  for (let task of todayRecord.tasks) {
    const taskNameLower = task.name.toLowerCase();
    
    if (text.includes(taskNameLower) || taskNameLower.includes(text)) {
      referredTask = task;
      break;
    }
    
    let matchFound = false;
    for (let key in keywordsMap) {
      if (taskNameLower.includes(key)) {
        for (let word of keywordsMap[key]) {
          if (text.includes(word)) {
            referredTask = task;
            matchFound = true;
            break;
          }
        }
      }
      if (matchFound) break;
    }
    if (referredTask) break;
  }
  
  if (referredTask && subtaskName) {
    if (!referredTask.subtasks) {
      referredTask.subtasks = [];
    }
    referredTask.subtasks.push({ name: subtaskName, completed: false });
    referredTask.completed = false;
    
    saveHistoryToStorage();
    recalculateDailyOutputs();
    
    result.success = true;
    result.type = "subtask";
    result.message = `Berhasil menambahkan subtask **"${subtaskName}"** ke dalam tugas utama **"${referredTask.name}"**!`;
    return result;
  }
  
  let times = [];
  const timeRegex = /(\d{1,2})[:.](\d{2})/g;
  while ((m = timeRegex.exec(promptText)) !== null) {
    let hh = String(m[1]).padStart(2, '0');
    let mm = String(m[2]).padStart(2, '0');
    times.push(`${hh}:${mm}`);
  }
  
  let startTime = "09:00";
  let endTime = "10:00";
  if (times.length >= 2) {
    startTime = times[0];
    endTime = times[1];
  } else if (times.length === 1) {
    startTime = times[0];
    let parts = startTime.split(':');
    let endHour = (parseInt(parts[0]) + 1) % 24;
    endTime = `${String(endHour).padStart(2, '0')}:${parts[1]}`;
  }
  
  let cleanTaskName = promptText;
  cleanTaskName = cleanTaskName.replace(/(\d{1,2})[:.](\d{2})/g, "");
  const stopWords = [
    /buat tugas/gi, /tambah tugas/gi, /tambahkan tugas/gi, /tambah/gi, /tambahkan/gi,
    /hari ini/gi, /jam/gi, /pukul/gi, /sampai/gi, /antara/gi, /fokus/gi, /dengan subtask/gi,
    /checklist/gi, /-/gi, /ke/gi, /di/gi
  ];
  for (let rx of stopWords) {
    cleanTaskName = cleanTaskName.replace(rx, "");
  }
  
  if (matches.length > 0) {
    matches.forEach(mVal => {
      cleanTaskName = cleanTaskName.replace(mVal, "").replace(/["'“”‘’]/g, "");
    });
  }
  
  let newTaskName = cleanTaskName.trim().replace(/\s+/g, " ");
  if (newTaskName) {
    newTaskName = newTaskName.charAt(0).toUpperCase() + newTaskName.slice(1);
  }
  
  if (!newTaskName || newTaskName.length < 2) {
    if (subtaskName) {
      newTaskName = `Fokus: ${subtaskName}`;
    } else {
      result.message = "Hoot kurang paham maksud Anda. Coba tulis seperti: *tambahan fokus pekerjaan 'menulis film'* atau *Buat tugas baru 'Menonton film' jam 20:00-21:30*";
      return result;
    }
  }
  
  let category = "Rutin";
  const catKeywords = {
    "Karir": ["kerja", "kantor", "code", "coding", "rapat", "meeting", "report", "laporan", "project", "go"],
    "Kesehatan": ["olahraga", "lari", "jogging", "gym", "sehat", "sepeda", "stretching", "workout"],
    "Spiritual": ["alkitab", "ibadah", "doa", "saat teduh", "gereja", "renungan"],
    "Edukasi": ["belajar", "membaca", "kursus", "tutorial", "buku", "kuliah", "sekolah"],
    "Sosial": ["keluarga", "family", "teman", "sosial", "kencan", "makan", "nonton"]
  };
  
  const testText = newTaskName.toLowerCase() + " " + text;
  for (let cat in catKeywords) {
    for (let word of catKeywords[cat]) {
      if (testText.includes(word)) {
        category = cat;
        break;
      }
    }
    if (category !== "Rutin") break;
  }
  
  let subtasks = [];
  if (matches.length > 0) {
    matches.forEach(mVal => {
      subtasks.push({ name: mVal, completed: false });
    });
  } else {
    const subtaskTriggers = ["subtask", "checklist", "daftar"];
    for (let trig of subtaskTriggers) {
      const idx = text.indexOf(trig);
      if (idx !== -1) {
        let rawSubtasks = text.substring(idx + trig.length).replace(/[:]/g, "").trim();
        let splitSt = rawSubtasks.split(/[,dan]+/);
        splitSt.forEach(item => {
          let cleanItem = item.trim();
          if (cleanItem) {
            cleanItem = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1);
            subtasks.push({ name: cleanItem, completed: false });
          }
        });
        break;
      }
    }
  }
  
  const newTask = {
    id: `task_${Date.now()}`,
    name: newTaskName,
    startTime: startTime,
    endTime: endTime,
    category: category,
    priority: "Sedang",
    completed: false,
    subtasks: subtasks,
    notes: "Dibuat otomatis oleh Hoot AI Agent",
    isFromTemplate: false
  };
  
  todayRecord.tasks.push(newTask);
  saveHistoryToStorage();
  recalculateDailyOutputs();
  
  result.success = true;
  result.type = "new_task";
  let subtasksReport = subtasks.length > 0 ? ` dengan ${subtasks.length} subtask` : "";
  result.message = `Berhasil membuat tugas baru **"${newTaskName}"** pada jam **${startTime} - ${endTime}** (Kategori: **${category}**)${subtasksReport}!`;
  return result;
}

// ==========================================================================
// FORM SUBMISSION & EVENT LISTENERS SETUP
// ==========================================================================

let appListenersAttached = false;

function setupEventListeners() {
  if (appListenersAttached) return;
  appListenersAttached = true;
  
  const sidebar = document.getElementById('app-sidebar');
  const toggleBtn = document.getElementById('sidebar-collapse-trigger');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
      if (State.activeTab === 'review') {
        setTimeout(() => {
          const activeTimeframe = document.querySelector('.chart-timeframes .active');
          renderProductivityChart(activeTimeframe ? activeTimeframe.getAttribute('data-timeframe') : '7');
        }, 350);
      }
    });
  }

  const logoTrigger = document.getElementById('logo-sync-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      document.getElementById('google-login-modal').classList.add('active');
    });
  }
  
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
  
  document.getElementById('focus-mode-btn').addEventListener('click', enterFocusMode);
  document.getElementById('exit-focus-btn').addEventListener('click', exitFocusMode);
  document.getElementById('focus-complete-task-btn').addEventListener('click', completeActiveFocusTask);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('focus-mode-view').classList.contains('active')) {
      exitFocusMode();
    }
  });
  
  // Weekly Review Modal inside review tab
  const wrappedBtn = document.getElementById('wrapped-btn');
  if (wrappedBtn) {
    wrappedBtn.addEventListener('click', openYearWrappedModal);
  }
  document.getElementById('close-wrapped-modal').addEventListener('click', () => {
    document.getElementById('wrapped-modal').classList.remove('active');
  });
  document.querySelector('.start-wrapped-btn').addEventListener('click', nextWrappedSlide);
  document.getElementById('wrapped-prev-slide-btn').addEventListener('click', prevWrappedSlide);
  document.getElementById('wrapped-next-slide-btn').addEventListener('click', nextWrappedSlide);
  document.getElementById('wrapped-restart-btn').addEventListener('click', () => showWrappedSlide(0));
  document.getElementById('wrapped-finish-btn').addEventListener('click', () => {
    document.getElementById('wrapped-modal').classList.remove('active');
  });
  
  document.getElementById('profile-btn').addEventListener('click', () => {
    document.getElementById('google-login-modal').classList.add('active');
  });
  const mobileProfileTrigger = document.getElementById('mobile-profile-trigger');
  if (mobileProfileTrigger) {
    mobileProfileTrigger.addEventListener('click', () => {
      document.getElementById('google-login-modal').classList.add('active');
    });
  }
  document.getElementById('close-login-modal').addEventListener('click', () => {
    document.getElementById('google-login-modal').classList.remove('active');
  });
  document.getElementById('confirm-sync-btn').addEventListener('click', () => {
    document.getElementById('google-login-modal').classList.remove('active');
  });

  // Settings Trigger listeners
  const sidebarSettingsBtn = document.getElementById('sidebar-settings-btn');
  if (sidebarSettingsBtn) {
    sidebarSettingsBtn.addEventListener('click', () => {
      document.getElementById('settings-modal').classList.add('active');
    });
  }
  const mobileSettingsTrigger = document.getElementById('mobile-settings-trigger');
  if (mobileSettingsTrigger) {
    mobileSettingsTrigger.addEventListener('click', () => {
      document.getElementById('settings-modal').classList.add('active');
    });
  }
  document.getElementById('close-settings-modal').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.remove('active');
  });
  document.getElementById('confirm-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.remove('active');
  });
  
  // Theme Toggle Change
  const themeToggle = document.getElementById('settings-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      const mode = e.target.checked ? 'light' : 'dark';
      setAppTheme(mode);
    });
  }

  // Notification Interval Change
  const notifIntervalSelect = document.getElementById('settings-notification-interval');
  if (notifIntervalSelect) {
    notifIntervalSelect.addEventListener('change', (e) => {
      const interval = e.target.value;
      setNotificationInterval(interval);
    });
  }
  
  const btnSeedData = document.getElementById('btn-seed-data');
  if (btnSeedData) {
    btnSeedData.addEventListener('click', () => {
      if (confirm("Apakah Anda yakin ingin memuat ulang data simulasi 30 hari? Tindakan ini akan menggantikan histori lama.")) {
        localStorage.removeItem('yosday_seeded');
        seedHistoricalData();
        initApp();
        alert("Data simulasi 30 hari berhasil dimuat!");
        document.getElementById('google-login-modal').classList.remove('active');
      }
    });
  }
  const btnClearData = document.getElementById('btn-clear-data');
  if (btnClearData) {
    btnClearData.addEventListener('click', () => {
      if (confirm("Kosongkan semua data dari localStorage?")) {
        localStorage.setItem('yosday_templates', '[]');
        localStorage.setItem('yosday_history', '{}');
        localStorage.setItem('yosday_seeded', 'cleared');
        State.history = {};
        State.templates = [];
        State.openedSubtaskTasks.clear();
        initApp();
        alert("Semua data berhasil dibersihkan.");
        document.getElementById('google-login-modal').classList.remove('active');
      }
    });
  }
  
  document.getElementById('add-subtask-row-btn').addEventListener('click', () => {
    addSubtaskRowToBuilder('form-subtasks-list');
  });
  
  const templateForm = document.getElementById('template-creation-form');
  templateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('template-name').value.trim();
    const startTime = document.getElementById('template-start-time').value;
    const endTime = document.getElementById('template-end-time').value;
    const category = document.getElementById('template-category').value;
    const priority = document.getElementById('template-priority').value;
    const notes = document.getElementById('template-notes').value.trim();
    
    const activeDays = [];
    const cbDays = document.querySelectorAll('input[name="active-days"]:checked');
    cbDays.forEach(cb => activeDays.push(parseInt(cb.value)));
    
    if (activeDays.length === 0) {
      alert("Pilih minimal satu hari aktif untuk template ini!");
      return;
    }
    
    const subtasks = [];
    const subtaskRows = document.querySelectorAll('#form-subtasks-list .form-subtask-row input');
    subtaskRows.forEach(input => {
      const val = input.value.trim();
      if (val) subtasks.push(val);
    });
    
    const holidayException = document.getElementById('rule-holiday-exception').checked;
    const ruleDayCond = document.getElementById('rule-day-cond').value;
    const ruleDayAction = document.getElementById('rule-day-action').value;
    
    const editId = document.getElementById('template-edit-id').value;
    
    if (editId) {
      const idx = State.templates.findIndex(t => t.id === editId);
      if (idx !== -1) {
        State.templates[idx] = {
          id: editId, name, startTime, endTime, category, priority, activeDays, subtasks, notes, holidayException, ruleDayCond, ruleDayAction
        };
      }
    } else {
      const newTpl = {
        id: `tpl_${Date.now()}`,
        name, startTime, endTime, category, priority, activeDays, subtasks, notes, holidayException, ruleDayCond, ruleDayAction
      };
      State.templates.push(newTpl);
    }
    
    saveTemplatesToStorage();
    renderTemplatesCatalog();
    
    templateForm.reset();
    document.getElementById('template-edit-id').value = "";
    document.getElementById('form-subtasks-list').innerHTML = "";
    document.getElementById('template-editor-title').textContent = "Buat Template Tugas Baru";
    
    alert("Template tugas berhasil disimpan!");
  });
  
  document.getElementById('reset-template-form-btn').addEventListener('click', () => {
    templateForm.reset();
    document.getElementById('template-edit-id').value = "";
    document.getElementById('form-subtasks-list').innerHTML = "";
    document.getElementById('template-editor-title').textContent = "Buat Template Tugas Baru";
  });
  
  const floatingAddBtn = document.getElementById('floating-add-btn');
  floatingAddBtn.addEventListener('click', () => {
    document.getElementById('add-choice-modal').classList.add('active');
  });
  
  // Close buttons for choices & AI modals
  document.getElementById('close-choice-modal').addEventListener('click', () => {
    document.getElementById('add-choice-modal').classList.remove('active');
  });
  document.getElementById('close-ai-modal').addEventListener('click', () => {
    document.getElementById('ai-agent-modal').classList.remove('active');
  });
  
  // Choice manual button selection
  document.getElementById('choice-manual-btn').addEventListener('click', () => {
    document.getElementById('add-choice-modal').classList.remove('active');
    document.getElementById('add-task-form').reset();
    document.getElementById('modal-subtasks-list').innerHTML = "";
    document.getElementById('task-modal-title').textContent = "Tambah Tugas Khusus Hari Ini";
    document.getElementById('save-task-modal-btn').textContent = "Tambahkan Tugas";
    document.getElementById('save-task-modal-btn').removeAttribute('data-edit-task-id');
    document.getElementById('add-task-modal').classList.add('active');
  });
  
  // Choice AI agent button selection
  document.getElementById('choice-ai-btn').addEventListener('click', () => {
    document.getElementById('add-choice-modal').classList.remove('active');
    document.getElementById('ai-agent-prompt').value = "";
    document.getElementById('ai-agent-feedback').style.display = "none";
    document.getElementById('ai-agent-processing').style.display = "none";
    document.getElementById('ai-agent-status-bubble').textContent = "Halo! Aku Hoot. Tuliskan tugas tambahanmu, aku bisa menambahkannya langsung ke sublist tugas yang sudah ada atau membuat tugas baru lengkap dengan sublist dan waktu pengerjaan!";
    renderMascot('ai-agent-mascot-target', 0.8, 'Ramah');
    document.getElementById('ai-agent-modal').classList.add('active');
  });
  
  // AI Agent submit click
  document.getElementById('ai-agent-submit-btn').addEventListener('click', () => {
    const promptText = document.getElementById('ai-agent-prompt').value.trim();
    const feedbackEl = document.getElementById('ai-agent-feedback');
    const processingEl = document.getElementById('ai-agent-processing');
    const bubbleEl = document.getElementById('ai-agent-status-bubble');
    
    if (!promptText) {
      feedbackEl.className = "ai-result-feedback error";
      feedbackEl.textContent = "Silakan masukkan perintah terlebih dahulu.";
      feedbackEl.style.display = "block";
      renderMascot('ai-agent-mascot-target', 0.2, 'Kecewa');
      return;
    }
    
    feedbackEl.style.display = "none";
    processingEl.style.display = "flex";
    bubbleEl.textContent = "Sedang memikirkan perintahmu...";
    renderMascot('ai-agent-mascot-target', 0.5, 'Legendary');
    
    // Simulate premium thinking delay
    setTimeout(() => {
      processingEl.style.display = "none";
      const result = processAIAgentCommand(promptText);
      
      feedbackEl.style.display = "block";
      if (result.success) {
        feedbackEl.className = "ai-result-feedback success";
        feedbackEl.innerHTML = result.message;
        bubbleEl.textContent = "Beres! Perintahmu sudah selesai kuproses. Ada lagi yang bisa kubantu?";
        renderMascot('ai-agent-mascot-target', 1.0, 'Sangat Bahagia');
        document.getElementById('ai-agent-prompt').value = "";
        
        // Re-render dashboard lists
        renderDailyTasks();
        renderTodayProgressSummary();
      } else {
        feedbackEl.className = "ai-result-feedback error";
        feedbackEl.textContent = result.message;
        bubbleEl.textContent = "Aduh, sepertinya Hoot kebingungan memahami perintah itu...";
        renderMascot('ai-agent-mascot-target', 0.3, 'Kecewa');
      }
    }, 1200);
  });
  
  document.getElementById('ai-agent-cancel-btn').addEventListener('click', () => {
    document.getElementById('ai-agent-modal').classList.remove('active');
  });
  
  document.getElementById('close-task-modal').addEventListener('click', () => {
    document.getElementById('add-task-modal').classList.remove('active');
  });
  document.getElementById('cancel-task-modal-btn').addEventListener('click', () => {
    document.getElementById('add-task-modal').classList.remove('active');
  });
  
  document.getElementById('modal-add-subtask-row-btn').addEventListener('click', () => {
    addSubtaskRowToBuilder('modal-subtasks-list');
  });
  
  const modalTaskForm = document.getElementById('add-task-form');
  modalTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('task-name').value.trim();
    const startTime = document.getElementById('task-start-time').value;
    const endTime = document.getElementById('task-end-time').value;
    const category = document.getElementById('task-category').value;
    const priority = document.getElementById('task-priority').value;
    const notes = document.getElementById('task-notes').value.trim();
    
    const subtasks = [];
    const subtaskRows = document.querySelectorAll('#modal-subtasks-list .form-subtask-row input');
    subtaskRows.forEach(input => {
      const val = input.value.trim();
      if (val) subtasks.push({ name: val, completed: false });
    });
    
    const todayStr = getISODateString(State.currentDate);
    const todayRecord = State.history[todayStr];
    if (!todayRecord) return;
    
    const editTaskId = document.getElementById('save-task-modal-btn').getAttribute('data-edit-task-id');
    
    if (editTaskId) {
      const task = todayRecord.tasks.find(t => t.id === editTaskId);
      if (task) {
        task.name = name;
        task.startTime = startTime;
        task.endTime = endTime;
        task.category = category;
        task.priority = priority;
        task.notes = notes;
        
        const newSubtasksMerged = subtasks.map(newSt => {
          const oldSt = task.subtasks ? task.subtasks.find(o => o.name === newSt.name) : null;
          return { name: newSt.name, completed: oldSt ? oldSt.completed : false };
        });
        task.subtasks = newSubtasksMerged;
      }
    } else {
      const newTask = {
        id: `task_${Date.now()}`,
        name, startTime, endTime, category, priority, completed: false, subtasks, notes, isFromTemplate: false
      };
      todayRecord.tasks.push(newTask);
    }
    
    saveHistoryToStorage();
    recalculateDailyOutputs();
    
    document.getElementById('add-task-modal').classList.remove('active');
  });
  
  document.getElementById('close-day-detail-modal').addEventListener('click', () => {
    document.getElementById('day-detail-modal').classList.remove('active');
  });
  document.getElementById('close-day-detail-footer-btn').addEventListener('click', () => {
    document.getElementById('day-detail-modal').classList.remove('active');
  });
  document.getElementById('day-detail-save-notes-btn').addEventListener('click', saveDailyReflectionNotes);
  
  document.getElementById('cal-prev-month').addEventListener('click', () => {
    if (currentCalMonth === 0) {
      currentCalMonth = 11;
      currentCalYear--;
    } else {
      currentCalMonth--;
    }
    renderMonthlyCalendarGrid();
  });
  document.getElementById('cal-next-month').addEventListener('click', () => {
    if (currentCalMonth === 11) {
      currentCalMonth = 0;
      currentCalYear++;
    } else {
      currentCalMonth++;
    }
    renderMonthlyCalendarGrid();
  });
  
  const chartTimeframeBtns = document.querySelectorAll('.chart-timeframes button');
  chartTimeframeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartTimeframeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const timeframe = btn.getAttribute('data-timeframe');
      renderProductivityChart(timeframe);
    });
  });
  
}

function openEditTaskModal(taskId) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  document.getElementById('task-modal-title').textContent = "Edit Tugas Hari Ini";
  document.getElementById('save-task-modal-btn').textContent = "Simpan Perubahan";
  document.getElementById('save-task-modal-btn').setAttribute('data-edit-task-id', taskId);
  
  document.getElementById('task-name').value = task.name;
  document.getElementById('task-start-time').value = task.startTime;
  document.getElementById('task-end-time').value = task.endTime;
  document.getElementById('task-category').value = task.category;
  document.getElementById('task-priority').value = task.priority;
  document.getElementById('task-notes').value = task.notes || "";
  
  const subtasksList = document.getElementById('modal-subtasks-list');
  subtasksList.innerHTML = "";
  if (task.subtasks) {
    task.subtasks.forEach(st => addSubtaskRowToBuilder('modal-subtasks-list', st.name));
  }
  
  document.getElementById('add-task-modal').classList.add('active');
}

// ==========================================================================
// GOOGLE DRIVE CLOUD SYNC & AUTHENTICATION (REAL INTEGRATION)
// ==========================================================================

const GOOGLE_CLIENT_ID = '5925055907-ehdklak5fnphnjrmjb77gpnkjkaa6726.apps.googleusercontent.com';
let tokenClient;
let autoBackupTimeout = null;
let googleAuthMode = 'silent-load';

function initGoogleSync() {
  setupGoogleAuthEventListeners();

  // Initialize GIS tokenClient if google script is loaded
  if (typeof google !== 'undefined') {
    initializeTokenClient();
  } else {
    window.addEventListener('load', () => {
      if (typeof google !== 'undefined') {
        initializeTokenClient();
      }
    });
  }

  // Restore profile UI if saved (never auto log out)
  const profile = localStorage.getItem('yosday_google_profile');
  if (profile) {
    try {
      const profileData = JSON.parse(profile);
      renderGoogleSignedInUI(profileData);
      
      // Check if token is valid, if so fetch calendar events
      const token = localStorage.getItem('yosday_google_token');
      const tokenExpiry = localStorage.getItem('yosday_google_token_expiry');
      if (token && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
        fetchRealGoogleCalendarEvents(token).then(realEvents => {
          if (realEvents) {
            State.googleCalendarEvents = realEvents;
            renderCalendarInformation();
          }
        }).catch(err => console.error(err));
      } else {
        // Silently refresh token on load to fetch calendar events
        setTimeout(() => {
          googleAuthMode = 'silent-load';
          refreshGoogleTokenSilently();
        }, 1000);
      }
    } catch (e) {
      console.error("Error restoring Google profile session:", e);
    }
  } else {
    logoutGoogleOAuth(true);
  }
}

function initializeTokenClient() {
  if (tokenClient) return;
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events.readonly',
    callback: (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        const token = tokenResponse.access_token;
        localStorage.setItem('yosday_google_token', token);
        const expiry = Date.now() + (tokenResponse.expires_in * 1000);
        localStorage.setItem('yosday_google_token_expiry', expiry);
        
        handleGoogleLoginSuccess(token, googleAuthMode);
      } else if (tokenResponse && tokenResponse.error) {
        console.warn("Google Auth token request failed/cancelled:", tokenResponse.error);
        if (googleAuthMode === 'silent-load' || googleAuthMode === 'silent-backup') {
          // Silent refresh failed, do not prompt user or show popup.
          // Set calendar state to error to show disconnected state in UI.
          State.googleCalendarEvents = 'error';
          renderCalendarInformation();
        }
      }
    },
  });
}

function refreshGoogleTokenSilently() {
  if (typeof google === 'undefined') return;
  initializeTokenClient();
  if (tokenClient) {
    const profile = localStorage.getItem('yosday_google_profile');
    let email = '';
    if (profile) {
      try {
        const profileData = JSON.parse(profile);
        email = profileData.email || '';
      } catch (e) {
        console.error("Error parsing profile for hint:", e);
      }
    }
    const options = { prompt: 'none' };
    if (email) {
      options.hint = email;
    }
    tokenClient.requestAccessToken(options);
  }
}

function renderGoogleSignedInUI(profile) {
  const signedOutView = document.getElementById('google-signed-out-view');
  const signedInView = document.getElementById('google-signed-in-view');
  const logoutBtn = document.getElementById('btn-google-logout');
  
  if (signedOutView) signedOutView.style.display = 'none';
  if (signedInView) signedInView.style.display = 'block';
  if (logoutBtn) logoutBtn.style.display = 'inline-block';
  
  // Fill user profile data
  const nameEl = document.getElementById('google-user-name');
  const emailEl = document.getElementById('google-user-email');
  const avatarEl = document.getElementById('google-user-avatar');
  
  if (nameEl) nameEl.textContent = profile.name || 'Pengguna Google';
  if (emailEl) emailEl.textContent = profile.email || '';
  if (avatarEl && profile.picture) {
    avatarEl.src = profile.picture;
  }
  
  const mobileProfile = document.getElementById('mobile-profile-trigger');
  if (mobileProfile) {
    mobileProfile.classList.add('logged-in');
    const mobileAvatarImg = document.getElementById('mobile-user-avatar-img');
    if (mobileAvatarImg && profile.picture) {
      mobileAvatarImg.src = profile.picture;
    }
  }
  
  updateSidebarProfile(profile);
}

let googleAuthListenersAttached = false;

function setupGoogleAuthEventListeners() {
  if (googleAuthListenersAttached) return;
  googleAuthListenersAttached = true;

  // Login button click
  const loginBtn = document.getElementById('btn-google-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (typeof google === 'undefined') {
        alert("Gagal memuat pustaka Google Identity Services. Periksa koneksi internet Anda atau matikan ad-blocker.");
        return;
      }
      googleAuthMode = 'interactive';
      initializeTokenClient();
      if (tokenClient) {
        tokenClient.requestAccessToken();
      }
    });
  }

  // Logout button click
  const logoutBtn = document.getElementById('btn-google-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm("Apakah Anda yakin ingin memutuskan sambungan akun Google? Data lokal Anda tidak akan terhapus.")) {
        logoutGoogleOAuth();
      }
    });
  }

  // Backup Manual button
  const backupBtn = document.getElementById('btn-cloud-backup');
  if (backupBtn) {
    backupBtn.addEventListener('click', async () => {
      const token = localStorage.getItem('yosday_google_token');
      const expiry = localStorage.getItem('yosday_google_token_expiry');
      if (!token || !expiry || Date.now() > parseInt(expiry)) {
        googleAuthMode = 'manual-backup';
        initializeTokenClient();
        if (tokenClient) {
          tokenClient.requestAccessToken();
        }
        return;
      }
      backupBtn.textContent = "⌛ Menyinkronkan...";
      backupBtn.disabled = true;
      try {
        await backupDataToDriveSilently(token);
        alert("Backup Berhasil! Data lokal Anda telah diunggah ke Google Drive.");
      } catch (err) {
        alert("Gagal mencadangkan data ke Google Drive: " + err.message);
      } finally {
        backupBtn.textContent = "📤 Backup ke Cloud";
        backupBtn.disabled = false;
      }
    });
  }

  // Restore Manual button
  const restoreBtn = document.getElementById('btn-cloud-restore');
  if (restoreBtn) {
    restoreBtn.addEventListener('click', async () => {
      const token = localStorage.getItem('yosday_google_token');
      const expiry = localStorage.getItem('yosday_google_token_expiry');
      if (!token || !expiry || Date.now() > parseInt(expiry)) {
        googleAuthMode = 'manual-restore';
        initializeTokenClient();
        if (tokenClient) {
          tokenClient.requestAccessToken();
        }
        return;
      }
      
      restoreBtn.textContent = "⌛ Memulihkan...";
      restoreBtn.disabled = true;
      try {
        const file = await findBackupFile(token);
        if (!file) {
          alert("Tidak ditemukan berkas cadangan 'yosday_backup.json' di Google Drive Anda. Silakan klik Backup terlebih dahulu.");
          return;
        }
        
        const content = await readBackupFileContent(token, file.id);
        if (content && confirm("Berkas cadangan ditemukan! Apakah Anda yakin ingin memulihkan data tersebut? Semua data lokal saat ini akan tertimpa.")) {
          State.templates = content.templates || [];
          State.history = content.history || {};
          
          localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
          localStorage.setItem('yosday_history', JSON.stringify(State.history));
          
          initApp();
          alert("Pemulihan Berhasil! Halaman akan memuat ulang data terbaru.");
        }
      } catch (err) {
        alert("Gagal memulihkan data: " + err.message);
      } finally {
        restoreBtn.textContent = "📥 Restore dari Cloud";
        restoreBtn.disabled = false;
      }
    });
  }
}

async function handleGoogleLoginSuccess(token, mode) {
  try {
    const profile = await fetchUserProfile(token);
    if (!profile) return;
    
    localStorage.setItem('yosday_google_profile', JSON.stringify(profile));
    
    // Toggle UI views
    renderGoogleSignedInUI(profile);

    // Auto close modal immediately on successful interactive login
    if (mode === 'interactive') {
      const loginModal = document.getElementById('google-login-modal');
      if (loginModal) {
        loginModal.classList.remove('active');
      }
    }

    // Load real Google Calendar events silently
    try {
      const realEvents = await fetchRealGoogleCalendarEvents(token);
      if (realEvents) {
        State.googleCalendarEvents = realEvents;
      } else {
        State.googleCalendarEvents = [];
      }
      renderCalendarInformation();
    } catch (gcalErr) {
      console.error("Failed to load Google Calendar events silently:", gcalErr);
      State.googleCalendarEvents = 'error';
      renderCalendarInformation();
    }

    // Auto sync on interactive login
    if (mode === 'interactive') {
      try {
        const file = await findBackupFile(token);
        if (file) {
          const content = await readBackupFileContent(token, file.id);
          if (content) {
            State.templates = content.templates || [];
            State.history = content.history || {};
            
            localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
            localStorage.setItem('yosday_history', JSON.stringify(State.history));
            
            // Re-render UI dashboard lists
            checkAndGenerateTodayTasks();
            renderMascot('sidebar-hoot-mascot-target', calculateWeeklyProgressRate());
            renderWeeklyStreak();
            renderDailyVerse();
            renderTodayProgressSummary();
            renderDailyTasks();
            renderCalendarInformation();
            renderTemplatesCatalog();
            renderReviewTab();
            
            console.log("Data Google Drive berhasil dipulihkan secara otomatis saat login.");
          }
        } else {
          // No backup file exists in cloud: upload local data to create it
          await backupDataToDriveSilently(token);
        }
      } catch (err) {
        console.error("Gagal sinkronisasi otomatis saat login:", err);
      }
    } else if (mode === 'silent-backup') {
      // Direct backup
      await backupDataToDriveSilently(token);
    } else if (mode === 'manual-backup') {
      // Direct backup initiated manually after token refresh
      const backupBtn = document.getElementById('btn-cloud-backup');
      if (backupBtn) {
        backupBtn.textContent = "⌛ Menyinkronkan...";
        backupBtn.disabled = true;
      }
      try {
        await backupDataToDriveSilently(token);
        alert("Backup Berhasil! Data lokal Anda telah diunggah ke Google Drive.");
      } catch (err) {
        alert("Gagal mencadangkan data ke Google Drive: " + err.message);
      } finally {
        if (backupBtn) {
          backupBtn.textContent = "📤 Backup ke Cloud";
          backupBtn.disabled = false;
        }
      }
    } else if (mode === 'manual-restore') {
      // Direct restore initiated manually after token refresh
      const restoreBtn = document.getElementById('btn-cloud-restore');
      if (restoreBtn) {
        restoreBtn.textContent = "⌛ Memulihkan...";
        restoreBtn.disabled = true;
      }
      try {
        const file = await findBackupFile(token);
        if (!file) {
          alert("Tidak ditemukan berkas cadangan 'yosday_backup.json' di Google Drive Anda. Silakan klik Backup terlebih dahulu.");
          return;
        }
        const content = await readBackupFileContent(token, file.id);
        if (content && confirm("Berkas cadangan ditemukan! Apakah Anda yakin ingin memulihkan data tersebut? Semua data lokal saat ini akan tertimpa.")) {
          State.templates = content.templates || [];
          State.history = content.history || {};
          
          localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
          localStorage.setItem('yosday_history', JSON.stringify(State.history));
          
          initApp();
          alert("Pemulihan Berhasil! Halaman akan memuat ulang data terbaru.");
        }
      } catch (err) {
        alert("Gagal memulihkan data: " + err.message);
      } finally {
        if (restoreBtn) {
          restoreBtn.textContent = "📥 Restore dari Cloud";
          restoreBtn.disabled = false;
        }
      }
    }
  } catch (err) {
    console.error("Error during Google Sign-in flow:", err);
  }
}

function logoutGoogleOAuth(quiet = false) {
  localStorage.removeItem('yosday_google_token');
  localStorage.removeItem('yosday_google_token_expiry');
  localStorage.removeItem('yosday_google_profile');
  
  State.googleCalendarEvents = null;
  renderCalendarInformation();
  
  if (!quiet) {
    alert("Akun terputus. Data saat ini akan tetap tersimpan secara lokal.");
  }
  
  // Toggle UI views
  const signedOutView = document.getElementById('google-signed-out-view');
  const signedInView = document.getElementById('google-signed-in-view');
  const logoutBtn = document.getElementById('btn-google-logout');
  
  if (signedOutView) signedOutView.style.display = 'block';
  if (signedInView) signedInView.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'none';
  
  const mobileProfile = document.getElementById('mobile-profile-trigger');
  if (mobileProfile) {
    mobileProfile.classList.remove('logged-in');
  }
  
  updateSidebarProfile(null);
}

async function fetchRealGoogleCalendarEvents(token) {
  const today = State.currentDate;
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
  const timeMin = startOfDay.toISOString();
  const timeMax = endOfDay.toISOString();
  
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;
  
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return (data.items || []).map(item => {
        let timeStr = "Seharian";
        if (item.start && item.start.dateTime) {
          const start = new Date(item.start.dateTime);
          const end = new Date(item.end.dateTime);
          const startHours = String(start.getHours()).padStart(2, '0');
          const startMins = String(start.getMinutes()).padStart(2, '0');
          const endHours = String(end.getHours()).padStart(2, '0');
          const endMins = String(end.getMinutes()).padStart(2, '0');
          timeStr = `${startHours}:${startMins} - ${endHours}:${endMins}`;
        }
        return {
          title: item.summary || "(Tanpa Judul)",
          time: timeStr,
          date: getISODateString(today)
        };
      });
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.error("Google Calendar API error response:", errorData);
      throw new Error(errorData.error?.message || `HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("Failed to fetch Google Calendar events:", err);
    throw err;
  }
  return null;
}

async function fetchUserProfile(token) {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error("Gagal mengambil profil Google.");
}

async function findBackupFile(token) {
  const query = encodeURIComponent("name = 'yosday_backup.json' and 'appDataFolder' in parents and trashed = false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder&fields=files(id,name)`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    const data = await res.json();
    return data.files && data.files.length > 0 ? data.files[0] : null;
  }
  throw new Error("Gagal mencari cadangan di Google Drive.");
}

async function readBackupFileContent(token, fileId) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error("Gagal membaca isi berkas cadangan.");
}

async function createBackupFile(token, content) {
  const metadata = {
    name: 'yosday_backup.json',
    parents: ['appDataFolder']
  };
  
  const boundary = 'foo_bar_baz';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;
  
  const body = 
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(content) +
    closeDelimiter;
    
  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: body
  });
  
  if (res.ok) {
    const file = await res.json();
    return file.id;
  }
  throw new Error("Gagal membuat berkas cadangan baru.");
}

async function updateBackupFile(token, fileId, content) {
  const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  });
  if (!res.ok) {
    throw new Error("Gagal memperbarui berkas cadangan.");
  }
  return true;
}

function updateSyncStatusIndicator(status) {
  const badge = document.getElementById('google-sync-status-badge');
  if (badge) {
    badge.textContent = `Tersambung (${status})`;
    if (status === "Tersinkronisasi") {
      badge.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
      badge.style.color = 'var(--success-green)';
      badge.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    } else {
      badge.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
      badge.style.color = 'var(--warning-gold)';
      badge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    }
  }
}

function updateSidebarProfile(profile) {
  const initialEl = document.querySelector('.profile-initial');
  const nameEl = document.querySelector('.profile-name');
  const emailEl = document.querySelector('.profile-email');
  const badgeEl = document.querySelector('.google-badge-indicator');
  
  if (profile) {
    if (initialEl) initialEl.textContent = profile.name ? profile.name.charAt(0).toUpperCase() : 'G';
    if (nameEl) nameEl.textContent = profile.name || 'Pengguna Google';
    if (emailEl) emailEl.textContent = profile.email || '';
    if (badgeEl) {
      badgeEl.style.backgroundColor = 'var(--success-green)';
      badgeEl.title = 'Terhubung dengan Google Drive Sync';
    }
  } else {
    if (initialEl) initialEl.textContent = 'Y';
    if (nameEl) nameEl.textContent = 'Yohanes';
    if (emailEl) emailEl.textContent = 'yohanes@gmail.com';
    if (badgeEl) {
      badgeEl.style.backgroundColor = 'transparent';
      badgeEl.title = 'Simulasi Google Account & Sync (Belum terhubung)';
    }
  }
}

function triggerAutoCloudBackup() {
  const token = localStorage.getItem('yosday_google_token');
  const expiry = localStorage.getItem('yosday_google_token_expiry');
  
  const profile = localStorage.getItem('yosday_google_profile');
  if (!profile) return; // Not logged in at all
  
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    // Token is expired. Trigger background silent refresh and request silent-backup mode
    googleAuthMode = 'silent-backup';
    refreshGoogleTokenSilently();
    return;
  }
  
  updateSyncStatusIndicator("Menyinkronkan...");
  
  if (autoBackupTimeout) clearTimeout(autoBackupTimeout);
  autoBackupTimeout = setTimeout(async () => {
    try {
      await backupDataToDriveSilently(token);
    } catch (e) {
      console.error("Auto cloud backup failed:", e);
      updateSyncStatusIndicator("Gagal Sinkronisasi");
    }
  }, 2000);
}

async function backupDataToDriveSilently(token) {
  try {
    const file = await findBackupFile(token);
    const payload = {
      templates: State.templates,
      history: State.history
    };
    if (file && file.id) {
      await updateBackupFile(token, file.id, payload);
      updateSyncStatusIndicator("Tersinkronisasi");
    } else {
      const fileId = await createBackupFile(token, payload);
      if (fileId) {
        updateSyncStatusIndicator("Tersinkronisasi");
      }
    }
  } catch (err) {
    console.error("Silent auto backup failed:", err);
    updateSyncStatusIndicator("Gagal Sinkronisasi");
  }
}

// ==========================================================================
// SETTINGS ENGINE (THEME & NOTIFICATIONS)
// ==========================================================================

function initTheme() {
  const savedTheme = localStorage.getItem('yosday_theme') || 'light';
  setAppTheme(savedTheme);
}

function setAppTheme(theme) {
  State.theme = theme;
  localStorage.setItem('yosday_theme', theme);
  
  const themeToggle = document.getElementById('settings-theme-toggle');
  if (themeToggle) {
    themeToggle.checked = (theme === 'light');
  }
  
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

function initNotifications() {
  const savedInterval = localStorage.getItem('yosday_notification_interval') || 'disabled';
  State.notificationInterval = savedInterval;
  
  const intervalSelect = document.getElementById('settings-notification-interval');
  if (intervalSelect) {
    intervalSelect.value = savedInterval;
  }
  
  updateNotificationPermissionWarning();
  setupNotificationTimer();
}

function setNotificationInterval(interval) {
  State.notificationInterval = interval;
  localStorage.setItem('yosday_notification_interval', interval);
  
  if (interval !== 'disabled') {
    if (typeof Notification !== 'undefined') {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          updateNotificationPermissionWarning();
          setupNotificationTimer();
        });
      } else {
        updateNotificationPermissionWarning();
        setupNotificationTimer();
      }
    }
  } else {
    setupNotificationTimer();
  }
}

function updateNotificationPermissionWarning() {
  const warningEl = document.getElementById('notification-permission-warning');
  if (!warningEl) return;
  
  if (State.notificationInterval !== 'disabled' && typeof Notification !== 'undefined' && Notification.permission === 'denied') {
    warningEl.style.display = 'block';
  } else {
    warningEl.style.display = 'none';
  }
}

const notifiedItems = new Set();

function checkAndTriggerNotifications() {
  if (State.notificationInterval === 'disabled') return;
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  
  const minutes = parseInt(State.notificationInterval);
  const now = new Date();
  const futureLimit = new Date(now.getTime() + minutes * 60 * 1000);
  
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const parseTimeToDate = (timeStr) => {
    const p = timeStr.split(':');
    const d = new Date();
    d.setHours(parseInt(p[0]), parseInt(p[1]), 0, 0);
    return d;
  };
  
  // Tasks in upcoming interval
  const upcomingTasks = todayRecord.tasks.filter(t => {
    if (t.completed) return false;
    if (notifiedItems.has(t.id)) return false;
    const startTime = parseTimeToDate(t.startTime);
    return startTime > now && startTime <= futureLimit;
  });
  
  // Reminders starting today
  const upcomingReminders = State.reminders.filter(r => {
    if (r.done) return false;
    const reminderId = `reminder_${r.date}_${r.title}`;
    if (notifiedItems.has(reminderId)) return false;
    
    // Check if date is today
    const rDate = new Date(r.date + 'T00:00:00');
    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);
    return rDate.getTime() === startOfToday.getTime();
  });
  
  let bodyText = "";
  if (upcomingTasks.length > 0) {
    bodyText += `Tugas: ${upcomingTasks.map(t => {
      notifiedItems.add(t.id);
      return `${t.name} (${t.startTime})`;
    }).join(', ')}. `;
  }
  if (upcomingReminders.length > 0) {
    bodyText += `Pengingat: ${upcomingReminders.map(r => {
      const reminderId = `reminder_${r.date}_${r.title}`;
      notifiedItems.add(reminderId);
      return r.title;
    }).join(', ')}.`;
  }
  
  if (bodyText) {
    new Notification("YosDay Pengingat", {
      body: bodyText,
      icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%233b82f6%22/><text x=%2250%25%22 y=%2265%25%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22bold%22>🦉</text></svg>"
    });
  }
}

function setupNotificationTimer() {
  if (State.notificationTimer) {
    clearInterval(State.notificationTimer);
    State.notificationTimer = null;
  }
  
  if (State.notificationInterval === 'disabled') return;
  
  // Check every 1 minute
  State.notificationTimer = setInterval(() => {
    checkAndTriggerNotifications();
  }, 60 * 1000);
  
  // Run once immediately
  checkAndTriggerNotifications();
}

// --- Window load execution init ---
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
