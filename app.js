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
  projects: [],
  projectCategories: [],
  collapsedCategories: [],
  projectCategoryOrder: [],
  activeMode: 'daily',
  holidays: [
    // Public Holidays (Libur Nasional)
    { date: "01-01", name: "Tahun Baru Masehi", type: "holiday" },
    { date: "05-01", name: "Hari Buruh Internasional", type: "holiday" },
    { date: "06-01", name: "Hari Lahir Pancasila", type: "holiday" },
    { date: "08-17", name: "Hari Kemerdekaan RI", type: "holiday" },
    { date: "12-25", name: "Hari Raya Natal", type: "holiday" },
    
    // National Commemorations (Hari Peringatan)
    { date: "03-11", name: "Hari Supersemar", type: "commemoration" },
    { date: "03-30", name: "Hari Film Nasional", type: "commemoration" },
    { date: "04-06", name: "Hari Nelayan Nasional", type: "commemoration" },
    { date: "04-21", name: "Hari Kartini", type: "commemoration" },
    { date: "05-02", name: "Hari Pendidikan Nasional", type: "commemoration" },
    { date: "05-20", name: "Hari Kebangkitan Nasional", type: "commemoration" },
    { date: "06-29", name: "Hari Keluarga Nasional", type: "commemoration" },
    { date: "07-23", name: "Hari Anak Nasional", type: "commemoration" },
    { date: "09-09", name: "Hari Olahraga Nasional", type: "commemoration" },
    { date: "09-27", name: "Hari Bakti Postel", type: "commemoration" },
    { date: "10-01", name: "Hari Kesaktian Pancasila", type: "commemoration" },
    { date: "10-02", name: "Hari Batik Nasional", type: "commemoration" },
    { date: "10-22", name: "Hari Santri Nasional", type: "commemoration" },
    { date: "10-24", name: "Hari Dokter Nasional", type: "commemoration" },
    { date: "10-28", name: "Hari Sumpah Pemuda", type: "commemoration" },
    { date: "11-10", name: "Hari Pahlawan", type: "commemoration" },
    { date: "11-12", name: "Hari Kesehatan Nasional", type: "commemoration" },
    { date: "11-25", name: "Hari Guru Nasional", type: "commemoration" },
    { date: "12-09", name: "Hari Anti Korupsi Sedunia", type: "commemoration" },
    { date: "12-22", name: "Hari Ibu Nasional", type: "commemoration" }
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
  smartQuotes: typeof SMART_QUOTES !== 'undefined' ? SMART_QUOTES : [],
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

// --- Monkeypatch native window.alert to use our custom showAlert ---
window.alert = function(msg) {
  showAlert("Notifikasi", msg);
};

// --- Custom Notification & Alert System ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '🔔';
  if (type === 'success') icon = '✔';
  else if (type === 'error') icon = '✕';
  else if (type === 'warning') icon = '⚠️';
  
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  
  // Remove toast after animation ends
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showAlert(title, message, callback = null) {
  const modal = document.getElementById('custom-confirm-modal');
  if (!modal) return;
  
  document.getElementById('custom-confirm-title').textContent = title;
  document.getElementById('custom-confirm-message').textContent = message;
  
  const actionsContainer = document.getElementById('custom-confirm-actions');
  actionsContainer.innerHTML = '';
  
  const okBtn = document.createElement('button');
  okBtn.className = 'btn btn-primary';
  okBtn.style.padding = '8px 24px';
  okBtn.textContent = 'OK';
  okBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (callback) callback();
  });
  
  actionsContainer.appendChild(okBtn);
  modal.classList.add('active');
}

function showConfirm(title, message, onConfirm, onCancel = null) {
  const modal = document.getElementById('custom-confirm-modal');
  if (!modal) return;
  
  document.getElementById('custom-confirm-title').textContent = title;
  document.getElementById('custom-confirm-message').textContent = message;
  
  const actionsContainer = document.getElementById('custom-confirm-actions');
  actionsContainer.innerHTML = '';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.style.padding = '8px 20px';
  cancelBtn.textContent = 'Batal';
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (onCancel) onCancel();
  });
  
  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'btn btn-primary';
  confirmBtn.style.padding = '8px 20px';
  confirmBtn.textContent = 'Ya, Lanjutkan';
  confirmBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (onConfirm) onConfirm();
  });
  
  actionsContainer.appendChild(cancelBtn);
  actionsContainer.appendChild(confirmBtn);
  
  modal.classList.add('active');
}

function showPrompt(title, message, defaultValue, onConfirm, onCancel = null) {
  const modal = document.getElementById('custom-prompt-modal');
  if (!modal) return;
  
  document.getElementById('custom-prompt-title').textContent = title;
  document.getElementById('custom-prompt-message').textContent = message;
  
  const inputEl = document.getElementById('custom-prompt-input');
  inputEl.value = defaultValue || '';
  
  const cancelBtn = document.getElementById('custom-prompt-cancel');
  const okBtn = document.getElementById('custom-prompt-ok');
  
  const newCancelBtn = cancelBtn.cloneNode(true);
  const newOkBtn = okBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
  okBtn.parentNode.replaceChild(newOkBtn, okBtn);
  
  newCancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (onCancel) onCancel();
  });
  
  newOkBtn.addEventListener('click', () => {
    const value = inputEl.value.trim();
    modal.classList.remove('active');
    if (onConfirm) onConfirm(value);
  });
  
  inputEl.onkeydown = (e) => {
    if (e.key === 'Enter') {
      newOkBtn.click();
    } else if (e.key === 'Escape') {
      newCancelBtn.click();
    }
  };
  
  modal.classList.add('active');
  setTimeout(() => inputEl.focus(), 100);
}

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
  renderDailyJournal();
  renderDailyFinance();
  renderCalendarInformation();
  setupSwipeToDelete();
  renderTemplatesCatalog();
  renderReviewTab();
  
  setupEventListeners();
  initGoogleSync();
  initTheme();
  initNotifications();
  initSmartVerseType();
  startCloudSyncPolling();
  
  // Apply active tracker mode (daily or project) and restore tab
  applyActiveMode();
}

function switchTab(tabName) {
  State.activeTab = tabName;
  localStorage.setItem('yosday_active_tab', tabName);
  if (['home', 'custom', 'review'].includes(tabName)) {
    localStorage.setItem('yosday_active_tab_daily', tabName);
  } else if (['concept', 'ongoing', 'done'].includes(tabName)) {
    localStorage.setItem('yosday_active_tab_project', tabName);
  }

  // Update nav-item active state — search all nav items regardless of parent visibility
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const targetNavItem = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (targetNavItem) targetNavItem.classList.add('active');

  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  const panel = document.getElementById(`tab-${tabName}`);
  if (panel) panel.classList.add('active');

  // Update floating FAB visibility
  const floatingAddBtn = document.getElementById('floating-add-btn');
  if (floatingAddBtn) {
    floatingAddBtn.style.display = ['home', 'custom', 'concept', 'ongoing', 'done'].includes(tabName) ? 'flex' : 'none';
  }

  // Update tab title
  const titles = {
    'home': 'Home Dashboard',
    'custom': 'Template Center',
    'review': 'Review & Analytics',
    'concept': 'Ide / Konsep Projek',
    'ongoing': 'Projek Sedang Berjalan',
    'done': 'Projek Selesai'
  };
  const tabTitleEl = document.getElementById('active-tab-title');
  if (tabTitleEl) {
    tabTitleEl.style.display = 'block';
    tabTitleEl.textContent = titles[tabName] || 'Home Dashboard';
  }

  if (tabName === 'review') renderReviewTab();
  if (['concept', 'ongoing', 'done'].includes(tabName)) renderProjects();
}

function loadDataFromStorage() {
  const localTemplates = localStorage.getItem('yosday_templates');
  const localHistory = localStorage.getItem('yosday_history');
  State.hiddenCalendarItems = JSON.parse(localStorage.getItem('yosday_hidden_calendar_items')) || [];
  State.projects = JSON.parse(localStorage.getItem('yosday_projects')) || [];
  State.projectCategories = JSON.parse(localStorage.getItem('yosday_project_categories')) || [];
  State.collapsedCategories = JSON.parse(localStorage.getItem('yosday_collapsed_categories')) || [];
  State.projectCategoryOrder = JSON.parse(localStorage.getItem('yosday_category_order')) || [];
  State.activeMode = localStorage.getItem('yosday_active_mode') || 'daily';
  
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

function saveProjectsToStorage() {
  localStorage.setItem('yosday_projects', JSON.stringify(State.projects));
  localStorage.setItem('yosday_project_categories', JSON.stringify(State.projectCategories));
  localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories || []));
  localStorage.setItem('yosday_category_order', JSON.stringify(State.projectCategoryOrder || []));
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
    clockElement.textContent = `${hours}:${minutes}`;
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}

function getISODateString(date) {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 10);
  return localISOTime;
}

function isNationalHoliday(dateStr) {
  const parts = dateStr.split('-');
  const mmdd = `${parts[1]}-${parts[2]}`;
  const found = State.holidays.find(h => 
    (h.date === dateStr || h.date === mmdd) && h.type === 'holiday'
  );
  return found ? found.name : null;
}

function getTodayHolidaysAndLeaves(dateStr) {
  const parts = dateStr.split('-');
  const mmdd = `${parts[1]}-${parts[2]}`;
  return State.holidays.filter(h => 
    (h.date === dateStr || h.date === mmdd)
  );
}

// --- Curated Preset Tasks & AI Scheduling Logic ---

const PresetTasksData = {
  spiritual_pagi: {
    name: "Meditasi Pagi / Doa",
    durationHours: 0.5,
    category: "Spiritual",
    priority: "Tinggi",
    notes: "Memulai hari dengan meditasi, ketenangan pikiran, atau doa harian.",
    subtasks: ["Latihan Pernapasan Tenang", "Merenung & Visualisasi Target", "Membaca Inspirasi Pagi / Doa"],
    preferredStart: 5,
    preferredEnd: 8
  },
  doa_malam: {
    name: "Refleksi Malam / Doa",
    durationHours: 0.5,
    category: "Spiritual",
    priority: "Rendah",
    notes: "Mengakhiri hari dengan refleksi duka/suka dan bersyukur.",
    subtasks: ["Menulis Evaluasi Harian Singkat", "Berdoa / Meditasi Syukur", "Membaca Bacaan Ringan"],
    preferredStart: 21,
    preferredEnd: 23
  },
  olahraga_pagi: {
    name: "Olahraga Pagi",
    durationHours: 1.0,
    category: "Kesehatan",
    priority: "Sedang",
    notes: "Menjaga kebugaran jasmani.",
    subtasks: ["Pemanasan 5 menit", "Jogging / Cardio 45 menit", "Peregangan 10 menit"],
    preferredStart: 6,
    preferredEnd: 9
  },
  peregangan: {
    name: "Minum Air & Peregangan",
    durationHours: 0.25,
    category: "Kesehatan",
    priority: "Rendah",
    notes: "Mengembalikan hidrasi dan merelaksasikan otot punggung.",
    subtasks: ["Minum 500ml Air Hangat", "Latihan Peregangan Punggung & Leher"],
    preferredStart: 12,
    preferredEnd: 15
  },
  deep_work: {
    name: "Deep Work Session",
    durationHours: 3.0,
    category: "Karir",
    priority: "Tinggi",
    notes: "Kerja produktif tanpa gangguan notifikasi.",
    subtasks: ["Matikan Notifikasi HP", "Fokus Selesaikan Task Utama", "Balas Email/Pesan di Akhir Sesi"],
    preferredStart: 9,
    preferredEnd: 15
  },
  review_kerja: {
    name: "Review & Rencana Kerja",
    durationHours: 0.5,
    category: "Karir",
    priority: "Sedang",
    notes: "Mengevaluasi pekerjaan hari ini dan merencanakan esok.",
    subtasks: ["Update Task Board (Jira/Trello)", "Tulis 3 Fokus Utama untuk Besok", "Rapikan Workspace"],
    preferredStart: 16,
    preferredEnd: 18
  },
  membaca_buku: {
    name: "Membaca Buku",
    durationHours: 1.0,
    category: "Edukasi",
    priority: "Sedang",
    notes: "Meningkatkan wawasan dengan membaca buku.",
    subtasks: ["Membaca 10 Halaman", "Mencatat Hal Penting / Bookmark"],
    preferredStart: 19,
    preferredEnd: 21
  },
  belajar_skill: {
    name: "Belajar Skill Baru",
    durationHours: 1.0,
    category: "Edukasi",
    priority: "Tinggi",
    notes: "Investasi waktu untuk upgrade kemampuan diri.",
    subtasks: ["Tonton 1 Video Pembelajaran", "Praktek Mandiri / Ngoding", "Tulis Review Pendek"],
    preferredStart: 19,
    preferredEnd: 22
  },
  merapikan_kamar: {
    name: "Merapikan Kamar & Rumah",
    durationHours: 0.5,
    category: "Rutin",
    priority: "Rendah",
    notes: "Lingkungan bersih membuat pikiran jernih.",
    subtasks: ["Merapikan Tempat Tidur", "Menyapu Kamar", "Membuang Sampah"],
    preferredStart: 7,
    preferredEnd: 9
  },
  jurnal_harian: {
    name: "Jurnal & Refleksi Harian",
    durationHours: 0.5,
    category: "Rutin",
    priority: "Sedang",
    notes: "Menulis jurnal harian untuk kesehatan mental.",
    subtasks: ["Tulis 3 Hal yang Disyukuri", "Evaluasi Aktivitas & Perasaan Hari Ini", "Rencanakan Pola Tidur"],
    preferredStart: 21,
    preferredEnd: 23
  }
};

function schedulePresetsAI(selectedPresetKeys) {
  const presetsToSchedule = selectedPresetKeys.map(key => {
    return Object.assign({ key: key }, PresetTasksData[key]);
  });

  const existingIntervals = State.templates.map(tpl => {
    return {
      start: parseTimeToHours(tpl.startTime),
      end: parseTimeToHours(tpl.endTime)
    };
  });

  const scheduledPresets = [];

  function parseTimeToHours(timeStr) {
    const parts = timeStr.split(':');
    return parseInt(parts[0]) + (parseInt(parts[1]) / 60);
  }

  function formatHoursToTime(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  function checkOverlap(start, end, intervals) {
    for (const int of intervals) {
      if (start < int.end && end > int.start) {
        return true;
      }
    }
    return false;
  }

  presetsToSchedule.forEach(preset => {
    let duration = preset.durationHours;
    let scheduledStart = null;
    let scheduledEnd = null;

    // 1. Search in preferred window (at 30-minute intervals)
    for (let h = preset.preferredStart; h <= preset.preferredEnd - duration; h += 0.5) {
      const trialStart = h;
      const trialEnd = h + duration;
      const allIntervals = existingIntervals.concat(scheduledPresets);
      if (!checkOverlap(trialStart, trialEnd, allIntervals)) {
        scheduledStart = trialStart;
        scheduledEnd = trialEnd;
        break;
      }
    }

    // 2. If not found in preferred window, search the entire day (05:00 - 23:00)
    if (scheduledStart === null) {
      for (let h = 5.0; h <= 23.0 - duration; h += 0.5) {
        const trialStart = h;
        const trialEnd = h + duration;
        const allIntervals = existingIntervals.concat(scheduledPresets);
        if (!checkOverlap(trialStart, trialEnd, allIntervals)) {
          scheduledStart = trialStart;
          scheduledEnd = trialEnd;
          break;
        }
      }
    }

    // 3. Fallback
    if (scheduledStart === null) {
      scheduledStart = 8.0;
      scheduledEnd = 8.0 + duration;
    }

    scheduledPresets.push({
      start: scheduledStart,
      end: scheduledEnd,
      preset: preset
    });
  });

  scheduledPresets.forEach(sp => {
    const p = sp.preset;
    const startTimeStr = formatHoursToTime(sp.start);
    const endTimeStr = formatHoursToTime(sp.end);

    const newTpl = {
      id: `tpl_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: p.name,
      startTime: startTimeStr,
      endTime: endTimeStr,
      category: p.category,
      priority: p.priority,
      activeDays: [1, 2, 3, 4, 5, 6, 0], // everyday by default
      subtasks: p.subtasks,
      notes: p.notes,
      holidayException: p.category === 'Karir' || p.category === 'Kesehatan',
      ruleDayCond: "none",
      ruleDayAction: "none"
    };

    State.templates.push(newTpl);
  });

  saveTemplatesToStorage();
  syncTodayTasksWithTemplates();
  renderTemplatesCatalog();
}

function syncTodayTasksWithTemplates() {
  const todayStr = getISODateString(State.currentDate);
  const dayOfWeek = State.currentDate.getDay();
  const holidayName = isNationalHoliday(todayStr);

  if (!State.history[todayStr]) {
    checkAndGenerateTodayTasks();
    return;
  }

  const record = State.history[todayStr];
  let tasks = record.tasks || [];

  const activeTemplatesToday = State.templates.filter(tpl => {
    if (!tpl.activeDays.includes(dayOfWeek)) return false;
    if (holidayName && tpl.holidayException) {
      if (tpl.ruleDayCond === 'holiday' && tpl.ruleDayAction === 'hide') {
        return false;
      }
    }
    return true;
  });

  const activeTemplatesMap = new Map();
  activeTemplatesToday.forEach(tpl => {
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

    if (!hideTask) {
      activeTemplatesMap.set(tpl.id, {
        name: taskName,
        startTime: tpl.startTime,
        endTime: tpl.endTime,
        category: tpl.category,
        priority: tpl.priority,
        subtasks: tpl.subtasks,
        notes: tpl.notes,
        template: tpl
      });
    }
  });

  const updatedTasks = [];
  const processedTemplateIds = new Set();

  tasks.forEach(task => {
    if (task.isFromTemplate) {
      const tplId = task.templateId;
      if (activeTemplatesMap.has(tplId)) {
        const tplData = activeTemplatesMap.get(tplId);
        
        task.name = tplData.name;
        task.startTime = tplData.startTime;
        task.endTime = tplData.endTime;
        task.category = tplData.category;
        task.priority = tplData.priority;
        task.notes = tplData.notes;
        
        const currentSubtasksMap = new Map();
        task.subtasks.forEach(st => {
          currentSubtasksMap.set(st.name, st.completed);
        });

        task.subtasks = tplData.subtasks.map(stName => {
          return {
            name: stName,
            completed: currentSubtasksMap.has(stName) ? currentSubtasksMap.get(stName) : false
          };
        });

        updatedTasks.push(task);
        processedTemplateIds.add(tplId);
      }
    } else {
      updatedTasks.push(task);
    }
  });

  activeTemplatesToday.forEach(tpl => {
    if (activeTemplatesMap.has(tpl.id) && !processedTemplateIds.has(tpl.id)) {
      const tplData = activeTemplatesMap.get(tpl.id);
      const instantiatedSubtasks = tplData.subtasks.map(st => ({ name: st, completed: false }));
      
      updatedTasks.push({
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: tplData.name,
        startTime: tplData.startTime,
        endTime: tplData.endTime,
        category: tplData.category,
        priority: tplData.priority,
        completed: false,
        subtasks: instantiatedSubtasks,
        notes: tplData.notes,
        isFromTemplate: true,
        templateId: tpl.id
      });
    }
  });

  record.tasks = updatedTasks;
  saveHistoryToStorage();

  renderDailyTasks();
  renderTodayProgressSummary();
  renderWeeklyStreak();
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
    const verseType = localStorage.getItem('yosday_smart_verse_type') || 'quotes';
    let pickedVerse = null;
    if (verseType === 'bible') {
      let verseCategory = 'harapan';
      if (compRate < 0.6) {
        verseCategory = Math.random() < 0.5 ? 'ketekunan' : 'disiplin';
      } else if (compRate >= 0.8) {
        verseCategory = Math.random() < 0.5 ? 'syukur' : 'konsistensi';
      }
      const verseList = State.smartVerses[verseCategory];
      pickedVerse = verseList[Math.floor(Math.random() * verseList.length)];
    } else {
      const quoteList = State.smartQuotes || [];
      if (quoteList.length > 0) {
        pickedVerse = quoteList[Math.floor(Math.random() * quoteList.length)];
      }
    }
    
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
    
    const verseType = localStorage.getItem('yosday_smart_verse_type') || 'quotes';
    let pickedVerse = null;
    if (verseType === 'bible') {
      const verseList = State.smartVerses['harapan'];
      pickedVerse = verseList[Math.floor(Math.random() * verseList.length)];
    } else {
      const quoteList = State.smartQuotes || [];
      if (quoteList.length > 0) {
        pickedVerse = quoteList[Math.floor(Math.random() * quoteList.length)];
      }
    }
    
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
  const sunday = new Date(State.currentDate);
  const day = sunday.getDay();
  const diff = sunday.getDate() - day;
  sunday.setDate(diff);
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  for (let i = 0; i < 7; i++) {
    const cur = new Date(sunday);
    cur.setDate(sunday.getDate() + i);
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
  
  let colorStart = "#3b82f6";
  let colorEnd = "#1d4ed8";
  
  if (expression === "Sangat Bahagia") {
    colorStart = "#22c55e";
    colorEnd = "#15803d";
  } else if (expression === "Senang") {
    colorStart = "#14b8a6";
    colorEnd = "#0f766e";
  } else if (expression === "Netral" || expression === "Ramah") {
    colorStart = "#3b82f6";
    colorEnd = "#1d4ed8";
  } else if (expression === "Kecewa") {
    colorStart = "#f59e0b";
    colorEnd = "#b45309";
  } else if (expression === "Sedih" || expression === "Marah") {
    colorStart = "#ef4444";
    colorEnd = "#b91c1c";
  } else if (expression === "Legendary") {
    colorStart = "#a855f7";
    colorEnd = "#fbbf24";
  }
  
  let hootClass = "hoot-owl-animate";
  if (expression === "Legendary") {
    hootClass = "hoot-owl-animate glow-gold-animation";
  }
  
  const svgContent = `
    <svg viewBox="0 0 100 100" class="${hootClass}" style="width: 100%; height: 100%;">
      <defs>
        <filter id="ai-glow-${targetContainerId}" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="ai-grad-${targetContainerId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colorStart}" />
          <stop offset="100%" stop-color="${colorEnd}" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="rgba(15, 23, 42, 0.75)" stroke="url(#ai-grad-${targetContainerId})" stroke-width="4" filter="url(#ai-glow-${targetContainerId})" />
      <text x="50%" y="63%" font-size="34" font-family="'Outfit', sans-serif" font-weight="900" fill="url(#ai-grad-${targetContainerId})" text-anchor="middle" filter="url(#ai-glow-${targetContainerId})" style="letter-spacing: -0.5px;">AI</text>
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
  
  const verseType = localStorage.getItem('yosday_smart_verse_type') || 'quotes';
  let pickedVerse = null;
  let categoryLabel = 'Kutipan Tokoh';
  
  if (verseType === 'bible') {
    const progressRate = calculateWeeklyProgressRate();
    let category = 'harapan';
    if (progressRate < 0.6) {
      category = Math.random() < 0.5 ? 'ketekunan' : 'disiplin';
    } else if (progressRate >= 0.8) {
      category = Math.random() < 0.5 ? 'syukur' : 'konsistensi';
    }
    const list = State.smartVerses[category];
    if (list && list.length > 0) {
      let dayHash = 0;
      for (let i = 0; i < todayStr.length; i++) {
        dayHash += todayStr.charCodeAt(i);
      }
      const verseIndex = dayHash % list.length;
      pickedVerse = list[verseIndex];
      categoryLabel = `Smart Verse — ${category.toUpperCase()}`;
    }
  } else {
    const list = State.smartQuotes || [];
    if (list && list.length > 0) {
      let dayHash = 0;
      for (let i = 0; i < todayStr.length; i++) {
        dayHash += todayStr.charCodeAt(i);
      }
      const quoteIndex = dayHash % list.length;
      pickedVerse = list[quoteIndex];
      categoryLabel = `Kutipan Tokoh`;
    }
  }
  
  if (pickedVerse) {
    todayRecord.verse = pickedVerse;
    const contextEl = document.getElementById('verse-context-tag');
    const textEl = document.getElementById('bible-verse-text');
    const refEl = document.getElementById('bible-verse-ref');
    if (contextEl) contextEl.textContent = categoryLabel;
    if (textEl) textEl.textContent = `"${pickedVerse.text}"`;
    if (refEl) refEl.textContent = pickedVerse.ref;
  }
}

// --- Weekly Streak Renderer (Section 1) ---

function renderWeeklyStreak() {
  const weeklyContainer = document.getElementById('weekly-days-list');
  if (!weeklyContainer) return;
  
  const sunday = new Date(State.currentDate);
  const day = sunday.getDay();
  const diff = sunday.getDate() - day;
  sunday.setDate(diff);
  
  weeklyContainer.innerHTML = "";
  
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  
  for (let i = 0; i < 7; i++) {
    const curDate = new Date(sunday);
    curDate.setDate(sunday.getDate() + i);
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
    if (!timeStr) return 0;
    const p = timeStr.split(':');
    if (p.length < 2) return 0;
    const h = parseInt(p[0]);
    const m = parseInt(p[1]);
    if (isNaN(h) || isNaN(m)) return 0;
    return h + (m / 60);
  };
  
  const now = new Date();
  const nowFloat = now.getHours() + (now.getMinutes() / 60);
  
  const getTaskCategoryIndex = (task) => {
    if (task.completed) return 4; // Completed category (very bottom)
    if (!task.startTime) {
      if (task.priority === 'Tinggi') return -1; // Untimed high priority always at the top
      return 3; // Untimed medium/low priority at the bottom of active tasks
    }
    
    const start = getFloatTime(task.startTime);
    const end = task.endTime ? getFloatTime(task.endTime) : (start + 0.5); // Default +30 min duration
    
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
    
    const timeA = a.startTime ? getFloatTime(a.startTime) : 999;
    const timeB = b.startTime ? getFloatTime(b.startTime) : 999;
    return timeA - timeB;
  });
  
  sortedTasks.forEach(task => {
    const isCompleted = task.completed;
    const taskCatIdx = getTaskCategoryIndex(task);
    const isTodayActive = taskCatIdx === 0;
    const isTaskMissed = !isCompleted && taskCatIdx === 2;
    
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
    
    const isReminder = !task.startTime || !task.endTime;
    const reminderDot = isReminder ? `<span class="reminder-dot" title="Tugas Reminder"></span>` : "";
    
    let timeHTML = "";
    if (task.startTime && task.endTime) {
      timeHTML = `<span class="task-time">⏰ ${task.startTime} - ${task.endTime}</span>`;
    } else if (task.startTime) {
      timeHTML = `<span class="task-time">⏰ ${task.startTime}</span>`;
    } else {
      timeHTML = `<span class="task-time">🔔 Reminder</span>`;
    }

    const taskHTML = `
      <div class="task-item ${isCompleted ? 'completed' : ''} ${isTodayActive ? 'active-now' : ''}" id="task-card-${task.id}">
        <div class="task-main-row">
          
          <label class="task-checkbox-wrapper">
            <input type="checkbox" class="task-checkbox-input" ${isCompleted ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')">
            <span class="task-custom-checkbox"></span>
          </label>
          
          <div class="task-body">
            <span class="task-name">${reminderDot}${task.name}</span>
            <div class="task-meta">
              ${timeHTML}
              <span class="task-priority-tag ${task.priority.toLowerCase()}">
                ${task.priority === 'Tinggi' ? '🔴 Tinggi' : task.priority === 'Sedang' ? '🟡 Sedang' : '🔵 Rendah'}
              </span>
              <span class="task-category-badge">${task.category}</span>
              ${isTodayActive ? '<span class="task-status-now">Aktif Sekarang</span>' : ''}
              ${isTaskMissed ? '<span class="task-status-missed">Terlewat</span>' : ''}
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
  showConfirm("Hapus Tugas", "Apakah Anda yakin ingin menghapus tugas ini khusus hari ini?", () => {
    const todayStr = getISODateString(State.currentDate);
    const todayRecord = State.history[todayStr];
    if (todayRecord) {
      todayRecord.tasks = todayRecord.tasks.filter(t => t.id !== taskId);
      saveHistoryToStorage();
      recalculateDailyOutputs();
      showToast("Tugas berhasil dihapus!", "success");
      triggerAutoCloudBackup();
    }
  });
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
  const container = document.getElementById('calendar-all-items');
  if (!container) return;
  
  const todayStr = getISODateString(State.currentDate);
  const isLoggedIn = localStorage.getItem('yosday_google_profile') !== null;
  const hiddenItems = State.hiddenCalendarItems || [];
  
  // Update Sync status indicator dynamically
  const syncIndicator = document.getElementById('calendar-sync-indicator');
  if (syncIndicator) {
    if (isLoggedIn && State.googleCalendarEvents !== 'error') {
      syncIndicator.className = 'gcal-connected';
      syncIndicator.textContent = 'Google Sync ✔';
    } else {
      syncIndicator.className = 'gcal-disconnected';
      syncIndicator.textContent = 'Google Sync ✕';
    }
  }

  container.innerHTML = "";
  
  const htmlItems = [];

  // 1. Holiday & Leaves (National Holiday, Joint Leaves & Commemorations)
  const todayHolidaysAndLeaves = getTodayHolidaysAndLeaves(todayStr);
  if (todayHolidaysAndLeaves.length > 0) {
    todayHolidaysAndLeaves.forEach(h => {
      const itemId = `holiday_${h.name}`;
      if (hiddenItems.includes(itemId)) return;

      let emoji = '🔴';
      let textStyle = '';
      let itemStyle = 'border-left-color: var(--danger-red, #ef4444); background: rgba(239, 68, 68, 0.08);';
      let displayName = h.name;

      if (h.type === 'joint_leave') {
        emoji = '🟡';
        itemStyle = 'border-left-color: var(--warning-gold, #f59e0b); background: rgba(245, 158, 11, 0.08);';
        textStyle = 'color: var(--text-primary); font-style: italic;';
        displayName = `Cuti Bersama: ${h.name}`;
      } else if (h.type === 'commemoration') {
        emoji = '🔵';
        itemStyle = 'border-left-color: var(--accent-blue, #3b82f6); background: rgba(59, 130, 246, 0.08);';
        displayName = `Hari Peringatan: ${h.name}`;
      } else {
        displayName = `Hari Libur: ${h.name}`;
      }

      htmlItems.push(`
        <div class="calendar-item-wrapper" data-id="${itemId}">
          <div class="calendar-info-item holiday" style="${itemStyle}">
            <span class="cal-item-emoji">${emoji}</span>
            <span class="cal-item-text" style="${textStyle}">
              ${displayName}
            </span>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
              <span class="cal-item-time">Hari Ini</span>
              <button class="calendar-delete-btn" onclick="deleteCalendarItem('${itemId}')" title="Hapus">×</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  // 2. Google Calendar Events & Error handling
  if (isLoggedIn) {
    if (State.googleCalendarEvents === 'error') {
      htmlItems.push(`
        <div class="calendar-info-item event error" style="border-left-color: var(--danger-red); background: rgba(239, 68, 68, 0.08); padding: 8px 12px; border-radius: 8px; border-left: 3px solid var(--danger-red); width: 100%;">
          <span class="cal-item-emoji">⚠️</span>
          <span class="cal-item-text" style="color: var(--danger-red); font-size: 11px; line-height: 1.4;">
            Gagal memuat Kalender. Pastikan <strong>Google Calendar API</strong> diaktifkan di Google Cloud Console Anda.
          </span>
        </div>
      `);
    } else {
      const eventsToRender = State.googleCalendarEvents || [];
      eventsToRender.forEach(e => {
        const itemId = `event_${e.id || e.title}`;
        if (hiddenItems.includes(itemId)) return;

        htmlItems.push(`
          <div class="calendar-item-wrapper" data-id="${itemId}">
            <div class="calendar-info-item event">
              <span class="cal-item-emoji">📅</span>
              <span class="cal-item-text">${e.title}</span>
              <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                <span class="cal-item-time">${e.time}</span>
                <button class="calendar-delete-btn" onclick="deleteCalendarItem('${itemId}')" title="Hapus">×</button>
              </div>
            </div>
          </div>
        `);
      });
    }

    // 3. Reminders
    const activeReminders = State.reminders.filter(r => r.date >= todayStr);
    activeReminders.forEach(r => {
      const isOverdue = r.date === todayStr;
      const itemId = `reminder_${r.id || r.title}`;
      if (hiddenItems.includes(itemId)) return;

      htmlItems.push(`
        <div class="calendar-item-wrapper" data-id="${itemId}">
          <div class="calendar-info-item reminder">
            <span class="cal-item-emoji">💡</span>
            <span class="cal-item-text" style="${r.done ? 'text-decoration: line-through;' : ''}">${r.title}</span>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
              <span class="cal-item-time">${isOverdue ? 'Jatuh Tempo Hari Ini' : r.date}</span>
              <button class="calendar-delete-btn" onclick="deleteCalendarItem('${itemId}')" title="Hapus">×</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  // Render combined items
  if (htmlItems.length > 0) {
    htmlItems.forEach(item => {
      container.insertAdjacentHTML('beforeend', item);
    });
  } else {
    container.innerHTML = `<span class="text-xs text-muted">Tidak ada jadwal acara atau pengingat hari ini.</span>`;
  }
}

function deleteCalendarItem(itemId) {
  const wrapper = document.querySelector(`.calendar-item-wrapper[data-id="${itemId}"]`);
  if (wrapper) {
    wrapper.style.maxHeight = wrapper.offsetHeight + 'px';
    wrapper.offsetHeight; // Force reflow
    wrapper.classList.add('deleting');
    
    if (!State.hiddenCalendarItems) {
      State.hiddenCalendarItems = [];
    }
    if (!State.hiddenCalendarItems.includes(itemId)) {
      State.hiddenCalendarItems.push(itemId);
      localStorage.setItem('yosday_hidden_calendar_items', JSON.stringify(State.hiddenCalendarItems));
    }
    
    setTimeout(() => {
      wrapper.remove();
      const container = document.getElementById('calendar-all-items');
      if (container && container.children.length === 0) {
        container.innerHTML = `<span class="text-xs text-muted">Tidak ada jadwal acara atau pengingat hari ini.</span>`;
      }
    }, 300);
    
    // Trigger auto cloud sync to push settings changes
    triggerAutoCloudBackup();
  }
}

function setupSwipeToDelete() {
  // Swiping is disabled, X button is used instead
}

window.deleteCalendarItem = deleteCalendarItem;

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
        <p>Gunakan form di sebelah kiri atau tombol Preset Esensial di kanan atas untuk merancang template pekerjaan berulang pertama Anda.</p>
      </div>
      <div class="templates-footer-actions-container" style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px; width: 100%;">
        <button id="btn-add-templates-placeholder" class="btn btn-secondary-outline" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 10px;">
          <span>➕</span> Tambahkan Daftar Template
        </button>
      </div>
    `;
    
    const addPlBtn = document.getElementById('btn-add-templates-placeholder');
    if (addPlBtn) {
      addPlBtn.addEventListener('click', () => {
        document.getElementById('preset-templates-modal').classList.add('active');
      });
    }
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

  // Append Save button container at the bottom
  const footerHTML = `
    <div class="templates-footer-actions-container" style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px; width: 100%; display: flex; justify-content: center;">
      <button id="btn-save-templates-list" class="btn btn-primary" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 10px;">
        <span>💾</span> Simpan Daftar Template
      </button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', footerHTML);

  const saveBtn = document.getElementById('btn-save-templates-list');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveTemplatesToStorage();
      syncTodayTasksWithTemplates();
      showToast("Daftar template berhasil disimpan dan tugas hari ini diperbarui!", "success");
    });
  }
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
  
  const advContent = document.getElementById('advanced-rules-content');
  const advArrow = document.getElementById('advanced-rules-arrow');
  if (advContent && advArrow) {
    if (!tpl.holidayException || tpl.ruleDayCond !== 'none') {
      advContent.style.display = 'block';
      advArrow.textContent = '▼';
    } else {
      advContent.style.display = 'none';
      advArrow.textContent = '▶';
    }
  }
  
  const subtasksList = document.getElementById('form-subtasks-list');
  subtasksList.innerHTML = "";
  if (tpl.subtasks) {
    tpl.subtasks.forEach(st => addSubtaskRowToBuilder('form-subtasks-list', st));
  }
  
  document.querySelector('.template-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteTemplate(templateId) {
  showConfirm(
    "Hapus Template",
    "Menghapus template tidak menghapus histori tugas lama, namun tidak akan memicu pembuatan tugas ini di masa mendatang. Lanjutkan?",
    () => {
      State.templates = State.templates.filter(t => t.id !== templateId);
      saveTemplatesToStorage();
      syncTodayTasksWithTemplates();
      renderTemplatesCatalog();
      showToast("Template berhasil dihapus!", "success");
      triggerAutoCloudBackup();
    }
  );
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



// --- Review Tab Calendar Engine ---

let currentCalMonth = State.currentDate.getMonth();
let currentCalYear = State.currentDate.getFullYear();

function renderMonthlyCalendarGrid() {
  const daysContainer = document.getElementById('monthly-calendar-days');
  const monthYearLabel = document.getElementById('cal-month-year-label');
  if (!daysContainer) return;
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  monthYearLabel.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  
  daysContainer.innerHTML = "";
  
  const firstDay = new Date(currentCalYear, currentCalMonth, 1);
  const startOffset = firstDay.getDay();
  
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
  
  // Render monthly finance summary synced with currently viewed month
  renderMonthlyFinanceSummary(currentCalMonth, currentCalYear);
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
  
  // Render daily finance inside Day Detail Modal
  const financeContainer = document.getElementById('day-detail-finance-list');
  if (financeContainer) {
    financeContainer.innerHTML = "";
    const financeList = record.finance || [];
    if (financeList.length === 0) {
      financeContainer.innerHTML = `<span class="text-xs text-muted text-center" style="display:block; margin-top: 10px; font-style: italic;">Tidak ada catatan keuangan pada hari itu.</span>`;
    } else {
      // Calculate totals
      let totalIncome = 0;
      let totalExpense = 0;
      financeList.forEach(item => {
        if (item.type === 'pemasukan') {
          totalIncome += Number(item.amount) || 0;
        } else {
          totalExpense += Number(item.amount) || 0;
        }
      });

      // Render summary row at the top
      financeContainer.insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px; margin-bottom: 8px; width: 100%; box-sizing: border-box;">
          <div style="flex: 1; padding: 8px 12px; background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px; text-align: center; min-width: 0;">
            <div style="color: var(--text-muted); font-size: 9px; text-transform: uppercase; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Total Pemasukan</div>
            <div class="finance-amount income" style="font-size: 12px; font-weight: 800; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">+ ${formatRupiah(totalIncome)}</div>
          </div>
          <div style="flex: 1; padding: 8px 12px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; text-align: center; min-width: 0;">
            <div style="color: var(--text-muted); font-size: 9px; text-transform: uppercase; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Total Pengeluaran</div>
            <div class="finance-amount expense" style="font-size: 12px; font-weight: 800; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">- ${formatRupiah(totalExpense)}</div>
          </div>
        </div>
      `);

      // Sort with newest transactions displayed first
      const sortedFinance = [...financeList].sort((a, b) => {
        const tA = parseInt(a.id.split('-')[1]) || 0;
        const tB = parseInt(b.id.split('-')[1]) || 0;
        if (tA !== tB) return tB - tA;
        return (b.time || '').localeCompare(a.time || '');
      });

      sortedFinance.forEach(item => {
        const isIncome = item.type === 'pemasukan';
        const typeSign = isIncome ? '+' : '-';
        const amountClass = isIncome ? 'finance-amount income' : 'finance-amount expense';
        const timeStr = item.time ? ` (${item.time})` : '';
        const descStr = item.description ? ` - ${item.description}` : '';
        
        financeContainer.insertAdjacentHTML('beforeend', `
          <div class="detail-task-history-item" style="border: 1px solid var(--border-color); background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: 10px;">
            <div>
              <span class="detail-task-h-title" style="font-weight: 700;">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
              <div class="detail-task-h-meta" style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                <span>${descStr ? descStr.substring(3) : 'Tanpa keterangan'}</span>${timeStr ? ` | <span>${timeStr.substring(2, timeStr.length - 1)}</span>` : ''}
              </div>
            </div>
            <span class="${amountClass}" style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 13px;">${typeSign} ${formatRupiah(item.amount)}</span>
          </div>
        `);
      });
    }
  }
  
  if (record.verse) {
    document.getElementById('day-detail-verse').textContent = `"${record.verse.text}"`;
    document.getElementById('day-detail-verse-ref').textContent = record.verse.ref;
  }
  
  const notesInput = document.getElementById('day-detail-notes-input');
  if (notesInput) {
    notesInput.value = record.notes || "";
    notesInput.setAttribute('data-target-date', dateStr);
  }
  
  // Render daily journal terformat
  const journalContentEl = document.getElementById('day-detail-journal-content');
  if (journalContentEl) {
    journalContentEl.innerHTML = record.journal || '<span style="font-style: italic; color: var(--text-muted);">Belum ada tulisan jurnal untuk hari ini.</span>';
  }
  
  const editJournalBtn = document.getElementById('day-detail-edit-journal-btn');
  if (editJournalBtn) {
    editJournalBtn.onclick = () => {
      openJournalEditor(dateStr);
    };
  }
  
  document.getElementById('day-detail-modal').classList.add('active');
}

function saveDailyReflectionNotes() {
  const notesInput = document.getElementById('day-detail-notes-input');
  if (!notesInput) return;
  const dateStr = notesInput.getAttribute('data-target-date');
  const text = notesInput.value.trim();
  
  if (dateStr && State.history[dateStr]) {
    State.history[dateStr].notes = text;
    saveHistoryToStorage();
    showToast("Jurnal refleksi berhasil disimpan!", "success");
    document.getElementById('day-detail-modal').classList.remove('active');
    triggerAutoCloudBackup();
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
    if (!timeStr) return 0;
    const p = timeStr.split(':');
    if (p.length < 2) return 0;
    const h = parseInt(p[0]);
    const m = parseInt(p[1]);
    if (isNaN(h) || isNaN(m)) return 0;
    return h + (m / 60);
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
    showToast("Semua tugas hari ini sudah selesai! Tidak ada tugas untuk mode fokus.", "info");
    return;
  }
  
  State.focusActiveTaskId = activeTask.id;
  
  document.getElementById('focus-mode-view').classList.add('active');
  document.body.classList.add('focus-mode-active');
  updateFocusModeDetails();
  
  startFocusTimer(activeTask.endTime);
}

function exitFocusMode() {
  document.getElementById('focus-mode-view').classList.remove('active');
  document.body.classList.remove('focus-mode-active');
  clearInterval(State.focusTimerInterval);
  State.focusActiveTaskId = null;
  
  // Pause focus music on exit
  const audioPlayer = document.getElementById('focus-audio-player');
  if (audioPlayer && !audioPlayer.paused) {
    audioPlayer.pause();
    const musicText = document.getElementById('focus-music-text');
    const musicToggle = document.getElementById('focus-music-toggle');
    if (musicText) musicText.textContent = "Musik: Off";
    if (musicToggle) {
      musicToggle.classList.remove('btn-success');
      musicToggle.classList.add('btn-secondary');
    }
  }
  
  recalculateDailyOutputs();
}

function updateFocusModeDetails() {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const getFloatTime = (timeStr) => {
    if (!timeStr) return 0;
    const p = timeStr.split(':');
    if (p.length < 2) return 0;
    const h = parseInt(p[0]);
    const m = parseInt(p[1]);
    if (isNaN(h) || isNaN(m)) return 0;
    return h + (m / 60);
  };
  const now = new Date();
  const nowFloat = now.getHours() + (now.getMinutes() / 60);
  
  // Find all uncompleted tasks active now
  let activeTasks = todayRecord.tasks.filter(t => {
    const start = getFloatTime(t.startTime);
    const end = getFloatTime(t.endTime);
    return !t.completed && nowFloat >= start && nowFloat <= end;
  });
  
  if (activeTasks.length === 0) {
    const futureTasks = todayRecord.tasks.filter(t => !t.completed).sort((a,b) => getFloatTime(a.startTime) - getFloatTime(b.startTime));
    if (futureTasks.length > 0) {
      activeTasks = [futureTasks[0]];
    }
  }
  if (activeTasks.length === 0) {
    const firstUncompleted = todayRecord.tasks.find(t => !t.completed);
    if (firstUncompleted) activeTasks = [firstUncompleted];
  }
  
  if (activeTasks.length === 0) {
    exitFocusMode();
    return;
  }
  
  // Set the primary task (the first one) for the countdown ring
  State.focusActiveTaskId = activeTasks[0].id;
  
  const stateEl = document.getElementById('focus-timer-state');
  if (stateEl) stateEl.innerHTML = "TUGAS<br>SEKARANG";
  
  // Render active tasks container dynamically
  const container = document.getElementById('focus-active-tasks-container');
  if (container) {
    container.innerHTML = "";
    activeTasks.forEach(task => {
      let subtasksHTML = "";
      if (task.subtasks && task.subtasks.length > 0) {
        subtasksHTML += `
          <div class="focus-subtasks-section" style="margin-top: 10px; margin-bottom: 8px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Checklist Subtask:</div>
            <div class="focus-subtasks-list" style="display: flex; flex-direction: column; gap: 6px;">
        `;
        task.subtasks.forEach((st, idx) => {
          subtasksHTML += `
            <div class="focus-check-item ${st.completed ? 'checked' : ''}" onclick="toggleFocusSubtaskStatus('${task.id}', ${idx})" style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; padding: 4px 0;">
              <label class="task-checkbox-wrapper" style="pointer-events: none; margin: 0;">
                <input type="checkbox" class="subtask-checkbox-input" ${st.completed ? 'checked' : ''} style="display:none;">
                <span class="task-custom-checkbox"></span>
              </label>
              <span class="subtask-name" style="color: ${st.completed ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration: ${st.completed ? 'line-through' : 'none'}; font-weight: 500;">${st.name}</span>
            </div>
          `;
        });
        subtasksHTML += `</div></div>`;
      }
      
      let notesHTML = "";
      if (task.notes) {
        notesHTML += `
          <div style="margin-top: 8px; font-size: 11px; color: var(--text-secondary); border-left: 2px solid var(--border-color); padding-left: 8px; font-style: italic;">
            <strong>Catatan:</strong> ${task.notes}
          </div>
        `;
      }
      
      const priorityLabel = task.priority === 'Tinggi' ? '🔴 Tinggi' : task.priority === 'Sedang' ? '🟡 Sedang' : '🔵 Rendah';
      
      container.insertAdjacentHTML('beforeend', `
        <div class="card focus-task-card glow-blue" style="padding: 12px 14px; border-radius: 12px; margin-bottom: 8px; border: 1px solid var(--border-color); background: var(--surface-dark);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; flex-wrap: wrap; gap: 4px;">
            <span class="focus-priority-indicator" style="font-size: 10px; font-weight: 700; color: ${task.priority === 'Tinggi' ? 'var(--danger-red)' : task.priority === 'Sedang' ? 'var(--warning-gold)' : 'var(--accent-blue)'};">${priorityLabel}</span>
            <span style="font-size: 11px; color: var(--text-muted);">⏰ ${task.startTime} - ${task.endTime}</span>
          </div>
          <h3 class="focus-task-name" style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; line-height: 1.3;">${task.name}</h3>
          
          ${subtasksHTML}
          ${notesHTML}
          
          <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
            <button class="btn btn-success btn-sm" onclick="confirmCompleteFocusTask('${task.id}')" style="padding: 4px 8px; font-size: 10px; font-weight: 700; border-radius: 6px; cursor: pointer;">
              Selesai
            </button>
          </div>
        </div>
      `);
    });
  }
  
  // Render next task info
  const nextTask = todayRecord.tasks
    .filter(t => !t.completed && !activeTasks.some(at => at.id === t.id))
    .sort((a,b) => getFloatTime(a.startTime) - getFloatTime(b.startTime))[0];
    
  const nextTaskEl = document.getElementById('focus-next-task-name');
  if (nextTaskEl) {
    if (nextTask) {
      nextTaskEl.textContent = `${nextTask.name} (${nextTask.startTime} - ${nextTask.endTime})`;
    } else {
      nextTaskEl.textContent = "Tidak ada tugas berikutnya.";
    }
  }
  
  startFocusTimer(activeTasks[0].endTime);
}

function toggleFocusSubtaskStatus(taskId, subtaskIdx) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === taskId);
  if (task && task.subtasks && task.subtasks[subtaskIdx]) {
    task.subtasks[subtaskIdx].completed = !task.subtasks[subtaskIdx].completed;
    saveHistoryToStorage();
    recalculateDailyOutputs();
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
      document.getElementById('focus-timer-state').innerHTML = "TUGAS<br>SELESAI";
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

function confirmCompleteFocusTask(taskId) {
  showConfirm(
    "Selesaikan Tugas",
    "Apakah Anda yakin ingin menyelesaikan tugas ini?",
    () => {
      completeFocusTask(taskId);
    }
  );
}

function completeFocusTask(taskId) {
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  if (!todayRecord) return;
  
  const task = todayRecord.tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    if (task.subtasks) {
      task.subtasks.forEach(s => s.completed = true);
    }
    saveHistoryToStorage();
    showToast("Tugas berhasil diselesaikan!", "success");
    recalculateDailyOutputs();
  }
}

// Bind dynamically to window to avoid scope issues in PWA/modules
window.confirmCompleteFocusTask = confirmCompleteFocusTask;
window.toggleFocusSubtaskStatus = toggleFocusSubtaskStatus;


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
  
  // 1. PROJECT REFERENCE INTEGRATION
  let referredProject = null;
  const projectKeywords = ["projek", "project"];
  const hasProjectKeyword = projectKeywords.some(w => text.includes(w));
  
  if (hasProjectKeyword) {
    if (matches.length > 0) {
      const matchName = matches[0].toLowerCase();
      referredProject = State.projects.find(p => p.name.toLowerCase() === matchName || p.name.toLowerCase().includes(matchName));
    }
    if (!referredProject) {
      let bestMatch = null;
      for (let p of State.projects) {
        if (text.includes(p.name.toLowerCase())) {
          if (!bestMatch || p.name.length > bestMatch.name.length) {
            bestMatch = p;
          }
        }
      }
      referredProject = bestMatch;
    }
  }

  if (referredProject) {
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
    
    // Copy subprojects to daily subtasks
    const subtasks = (referredProject.subprojects || []).map(sub => ({
      name: sub.name,
      completed: sub.completed
    }));
    
    const newTask = {
      id: `task_${Date.now()}`,
      name: `Projek: ${referredProject.name}`,
      startTime: startTime,
      endTime: endTime,
      category: "Karir",
      priority: "Sedang",
      completed: false,
      subtasks: subtasks,
      notes: `Dibuat otomatis oleh AI dari Project Tracker: ${referredProject.name}`,
      isFromTemplate: false
    };
    
    todayRecord.tasks.push(newTask);
    saveHistoryToStorage();
    recalculateDailyOutputs();
    
    result.success = true;
    result.type = "new_task";
    let subReport = subtasks.length > 0 ? ` dengan ${subtasks.length} subtask checklist` : "";
    result.message = `Berhasil menyalin projek **"${referredProject.name}"** ke tugas harian Anda pada jam **${startTime} - ${endTime}** (Kategori: **Karir**)${subReport}!`;
    return result;
  }

  // 2. REGULAR TASK / SUBTASK PARSING
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
  const isSubtaskIntent = text.includes("subtask") || text.includes("checklist") || text.includes("fokus ke") || text.includes("fokus:") || text.includes("tambah fokus") || text.includes("tambahkan fokus");
  
  if (isSubtaskIntent) {
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
  
  let newTaskName = "";
  let subtasks = [];
  
  if (matches.length > 0) {
    newTaskName = matches[0];
    for (let i = 1; i < matches.length; i++) {
      subtasks.push({ name: matches[i], completed: false });
    }
  } else {
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
    newTaskName = cleanTaskName.trim().replace(/\s+/g, " ");
  }
  
  if (newTaskName) {
    newTaskName = newTaskName.charAt(0).toUpperCase() + newTaskName.slice(1);
  }
  
  if (!newTaskName || newTaskName.length < 2) {
    if (subtaskName) {
      newTaskName = `Fokus: ${subtaskName}`;
    } else {
      result.message = "Format perintah kurang dipahami. Coba tulis seperti: *tambahan fokus pekerjaan 'menulis film'* atau *Buat tugas baru 'Menonton film' jam 20:00-21:30*";
      return result;
    }
  }
  
  let category = "Rutin";
  const catKeywords = {
    "Karir": ["kerja", "kantor", "code", "coding", "rapat", "meeting", "report", "laporan", "project", "go", "projek"],
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
  
  if (subtasks.length === 0 && matches.length === 0) {
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
    notes: "Dibuat otomatis oleh AI Agent",
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
  const completeBtn = document.getElementById('focus-complete-task-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', completeActiveFocusTask);
  }

  // Focus Mode Music Toggle
  const musicToggle = document.getElementById('focus-music-toggle');
  const audioPlayer = document.getElementById('focus-audio-player');
  const musicText = document.getElementById('focus-music-text');
  
  if (musicToggle && audioPlayer && musicText) {
    musicToggle.addEventListener('click', () => {
      if (audioPlayer.paused) {
        // Try playing directly first
        audioPlayer.play().then(() => {
          musicText.textContent = "Musik: On";
          musicToggle.classList.add('btn-success');
          musicToggle.classList.remove('btn-secondary');
        }).catch(err => {
          console.warn("Direct play failed, trying to load and play:", err);
          audioPlayer.load();
          audioPlayer.play().then(() => {
            musicText.textContent = "Musik: On";
            musicToggle.classList.add('btn-success');
            musicToggle.classList.remove('btn-secondary');
          }).catch(err2 => {
            console.error("Audio playback failed after load:", err2);
            showToast("Gagal memutar musik. Pastikan berkas 'focus-music.mp3' ada di folder website Anda.", "error");
          });
        });
      } else {
        audioPlayer.pause();
        musicText.textContent = "Musik: Off";
        musicToggle.classList.remove('btn-success');
        musicToggle.classList.add('btn-secondary');
      }
    });
  }
  
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

  // Preset templates modal triggers
  const openPresetBtn = document.getElementById('open-preset-templates-btn');
  if (openPresetBtn) {
    openPresetBtn.addEventListener('click', () => {
      document.getElementById('preset-templates-modal').classList.add('active');
    });
  }
  
  const closePresetBtn = document.getElementById('close-preset-templates-btn');
  if (closePresetBtn) {
    closePresetBtn.addEventListener('click', () => {
      document.getElementById('preset-templates-modal').classList.remove('active');
    });
  }
  
  const cancelPresetBtn = document.getElementById('cancel-preset-templates-btn');
  if (cancelPresetBtn) {
    cancelPresetBtn.addEventListener('click', () => {
      document.getElementById('preset-templates-modal').classList.remove('active');
    });
  }
  
  const confirmAddPresetBtn = document.getElementById('confirm-add-presets-btn');
  if (confirmAddPresetBtn) {
    confirmAddPresetBtn.addEventListener('click', () => {
      const selectedCheckboxes = document.querySelectorAll('input[name="preset-task-select"]:checked');
      if (selectedCheckboxes.length === 0) {
        showToast("Pilih minimal satu preset tugas esensial!", "warning");
        return;
      }

      const selectedKeys = Array.from(selectedCheckboxes).map(cb => cb.value);
      const statusEl = document.getElementById('preset-scheduling-status');
      if (statusEl) {
        statusEl.style.display = 'inline';
      }

      setTimeout(() => {
        schedulePresetsAI(selectedKeys);
        if (statusEl) {
          statusEl.style.display = 'none';
        }
        document.getElementById('preset-templates-modal').classList.remove('active');
        selectedCheckboxes.forEach(cb => cb.checked = false);
        showToast("AI berhasil menyusun jadwal dan menambahkan preset tugas!", "success");
      }, 800);
    });
  }

  // Advanced Rules collapsible toggle
  const advToggle = document.getElementById('advanced-rules-toggle');
  const advContent = document.getElementById('advanced-rules-content');
  const advArrow = document.getElementById('advanced-rules-arrow');
  if (advToggle && advContent && advArrow) {
    advToggle.addEventListener('click', () => {
      const isHidden = advContent.style.display === 'none';
      if (isHidden) {
        advContent.style.display = 'block';
        advArrow.textContent = '▼';
      } else {
        advContent.style.display = 'none';
        advArrow.textContent = '▶';
      }
    });
  }

  // Preset row selection visual class toggle (for robust fallback support)
  const presetCheckboxes = document.querySelectorAll('input[name="preset-task-select"]');
  presetCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const row = e.target.closest('.preset-item-row');
      if (row) {
        if (e.target.checked) {
          row.classList.add('selected');
        } else {
          row.classList.remove('selected');
        }
      }
    });
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

  // Smart Verse Selection Change
  const smartVerseSelect = document.getElementById('settings-smart-verse-type');
  if (smartVerseSelect) {
    smartVerseSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      localStorage.setItem('yosday_smart_verse_type', val);
      renderDailyVerse();
      triggerAutoCloudBackup(); // Sync to cloud!
    });
  }
  
  const btnSeedData = document.getElementById('btn-seed-data');
  if (btnSeedData) {
    btnSeedData.addEventListener('click', () => {
      showConfirm(
        "Muat Data Simulasi",
        "Apakah Anda yakin ingin memuat ulang data simulasi 30 hari? Tindakan ini akan menggantikan histori lama.",
        () => {
          localStorage.removeItem('yosday_seeded');
          seedHistoricalData();
          initApp();
          showToast("Data simulasi 30 hari berhasil dimuat!", "success");
          document.getElementById('google-login-modal').classList.remove('active');
          triggerAutoCloudBackup();
        }
      );
    });
  }
  const btnClearData = document.getElementById('btn-clear-data');
  if (btnClearData) {
    btnClearData.addEventListener('click', () => {
      showConfirm(
        "Kosongkan Semua Data",
        "Apakah Anda yakin ingin mengosongkan semua data dari localStorage? Tindakan ini tidak dapat dibatalkan.",
        () => {
          localStorage.setItem('yosday_templates', '[]');
          localStorage.setItem('yosday_history', '{}');
          localStorage.setItem('yosday_seeded', 'cleared');
          State.history = {};
          State.templates = [];
          State.openedSubtaskTasks.clear();
          initApp();
          showToast("Semua data berhasil dibersihkan.", "warning");
          document.getElementById('google-login-modal').classList.remove('active');
          triggerAutoCloudBackup();
        }
      );
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
      showToast("Pilih minimal satu hari aktif untuk template ini!", "warning");
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
    syncTodayTasksWithTemplates();
    renderTemplatesCatalog();
    
    templateForm.reset();
    document.getElementById('template-edit-id').value = "";
    document.getElementById('form-subtasks-list').innerHTML = "";
    document.getElementById('template-editor-title').textContent = "Buat Template Tugas Baru";
    
    showToast("Template tugas berhasil disimpan!", "success");
  });
  
  document.getElementById('reset-template-form-btn').addEventListener('click', () => {
    templateForm.reset();
    document.getElementById('template-edit-id').value = "";
    document.getElementById('form-subtasks-list').innerHTML = "";
    document.getElementById('template-editor-title').textContent = "Buat Template Tugas Baru";
  });
  
  const floatingAddBtn = document.getElementById('floating-add-btn');
  floatingAddBtn.addEventListener('click', () => {
    if (State.activeMode === 'project') {
      openAddProjectModal();
    } else {
      document.getElementById('add-choice-modal').classList.add('active');
    }
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
    document.getElementById('ai-agent-status-bubble').textContent = "Halo! Saya asisten AI. Tuliskan perintah tugas Anda, saya dapat menambahkannya secara otomatis.";
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
        bubbleEl.textContent = "Aduh, sepertinya saya kebingungan memahami perintah itu...";
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
  const saveNotesBtn = document.getElementById('day-detail-save-notes-btn');
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', saveDailyReflectionNotes);
  }
  
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
  
  setupJournalAndExportEventListeners();

  // Mode Selector Trigger & Dropdown Click
  const modeTrigger = document.getElementById('mode-selector-trigger');
  const modeDropdown = document.getElementById('mode-selector-dropdown');
  if (modeTrigger && modeDropdown) {
    modeTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = modeDropdown.style.display === 'block';
      modeDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Close mode dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!modeTrigger.contains(e.target) && !modeDropdown.contains(e.target)) {
        modeDropdown.style.display = 'none';
      }
    });

    // Mode options click
    const modeOptions = modeDropdown.querySelectorAll('.mode-option');
    modeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const mode = opt.getAttribute('data-mode');
        State.activeMode = mode;
        localStorage.setItem('yosday_active_mode', mode);
        modeDropdown.style.display = 'none';
        applyActiveMode();
      });
    });
  }

  // Project Modal listeners
  const closeProjModal = document.getElementById('close-project-modal');
  if (closeProjModal) {
    closeProjModal.addEventListener('click', () => {
      document.getElementById('project-modal').classList.remove('active');
    });
  }

  const cancelProjModal = document.getElementById('cancel-project-modal');
  if (cancelProjModal) {
    cancelProjModal.addEventListener('click', () => {
      document.getElementById('project-modal').classList.remove('active');
    });
  }

    const saveProjModal = document.getElementById('save-project-modal');
  if (saveProjModal) {
    saveProjModal.addEventListener('click', saveProject);
  }

  const addProjSubtaskBtn = document.getElementById('btn-project-add-subproject');
  if (addProjSubtaskBtn) {
    addProjSubtaskBtn.addEventListener('click', () => {
      addProjectSubtaskRow();
    });
  }

  // Project category edit button
  const btnCatEdit = document.getElementById('btn-project-category-edit');
  if (btnCatEdit) {
    btnCatEdit.addEventListener('click', () => {
      const select = document.getElementById('project-input-category-select');
      const currentCat = select.value;
      if (!currentCat) {
        showToast('Pilih kategori yang ingin diedit terlebih dahulu.', 'warning');
        return;
      }
      showPrompt(
        "Edit Kategori",
        `Ganti nama kategori "${currentCat}" menjadi:`,
        currentCat,
        (newName) => {
          if (!newName || newName === currentCat) return;
          if (State.projectCategories.includes(newName)) {
            showToast('Nama kategori tersebut sudah ada!', 'error');
            return;
          }
          // Rename category in list
          const idx = State.projectCategories.indexOf(currentCat);
          if (idx !== -1) State.projectCategories[idx] = newName;
          // Rename all projects using that category
          State.projects.forEach(p => {
            if (p.category === currentCat) p.category = newName;
          });
          saveProjectsToStorage();
          // Refresh dropdown in modal
          const newSelect = document.getElementById('project-input-category-select');
          newSelect.innerHTML = '<option value="">-- Pilih Kategori --</option>';
          State.projectCategories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            newSelect.appendChild(opt);
          });
          newSelect.value = newName;
          renderProjects();
          showToast(`Kategori berhasil diubah menjadi "${newName}"`, 'success');
        }
      );
    });
  }

  // Project category delete button
  const btnCatDel = document.getElementById('btn-project-category-delete');
  if (btnCatDel) {
    btnCatDel.addEventListener('click', () => {
      const select = document.getElementById('project-input-category-select');
      const currentCat = select.value;
      if (!currentCat) {
        showToast('Pilih kategori yang ingin dihapus terlebih dahulu.', 'warning');
        return;
      }
      showConfirm(
        'Hapus Kategori',
        `Hapus kategori "${currentCat}"? Semua projek dalam kategori ini akan dipindahkan ke "Tanpa Kategori".`,
        () => {
          // Move projects to Tanpa Kategori
          State.projects.forEach(p => {
            if (p.category === currentCat) p.category = 'Tanpa Kategori';
          });
          // Remove from categories list
          State.projectCategories = State.projectCategories.filter(c => c !== currentCat);
          saveProjectsToStorage();
          // Refresh dropdown
          const refreshSelect = document.getElementById('project-input-category-select');
          refreshSelect.innerHTML = '<option value="">-- Pilih Kategori --</option>';
          State.projectCategories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            refreshSelect.appendChild(opt);
          });
          refreshSelect.value = '';
          renderProjects();
          showToast(`Kategori "${currentCat}" dihapus.`, 'success');
        }
      );
    });
  }

  // Project Detail Modal listeners
  const closeProjDetailModal = document.getElementById('close-project-detail-modal');
  if (closeProjDetailModal) {
    closeProjDetailModal.addEventListener('click', () => {
      document.getElementById('project-detail-modal').classList.remove('active');
    });
  }

  // --- Daily & Monthly Finance Listeners ---
  document.getElementById('btn-add-finance-header')?.addEventListener('click', () => {
    openFinanceChoiceModal();
  });
  document.getElementById('choice-finance-btn')?.addEventListener('click', () => {
    openFinanceChoiceModal();
  });
  document.getElementById('close-finance-choice-modal')?.addEventListener('click', () => {
    document.getElementById('finance-choice-modal').classList.remove('active');
  });
  document.getElementById('finance-choice-income-btn')?.addEventListener('click', () => {
    openAddFinanceModal('pemasukan');
  });
  document.getElementById('finance-choice-expense-btn')?.addEventListener('click', () => {
    openAddFinanceModal('pengeluaran');
  });
  document.getElementById('close-finance-form-modal')?.addEventListener('click', () => {
    document.getElementById('finance-form-modal').classList.remove('active');
  });
  document.getElementById('cancel-finance-form-btn')?.addEventListener('click', () => {
    document.getElementById('finance-form-modal').classList.remove('active');
  });
  
  const financeForm = document.getElementById('finance-form');
  if (financeForm) {
    // Add real-time thousand separator formatter as user types
    const amountInput = document.getElementById('finance-amount');
    if (amountInput) {
      amountInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
          e.target.value = Number(value).toLocaleString('id-ID');
        } else {
          e.target.value = '';
        }
      });
    }

    financeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const editId = document.getElementById('finance-edit-id').value;
      const type = document.getElementById('finance-type').value;
      // Parse amount by stripping non-digit characters
      const amount = Number(document.getElementById('finance-amount').value.replace(/\D/g, ''));
      const category = document.getElementById('finance-category').value;
      const description = document.getElementById('finance-description').value.trim();
      
      const dateStr = getISODateString(State.currentDate);
      
      if (!State.history[dateStr]) {
        State.history[dateStr] = {
          date: dateStr,
          tasks: [],
          notes: "",
          journal: "",
          finance: []
        };
      }
      if (!State.history[dateStr].finance) {
        State.history[dateStr].finance = [];
      }
      
      if (editId) {
        const transaction = State.history[dateStr].finance.find(t => t.id === editId);
        if (transaction) {
          transaction.type = type;
          transaction.amount = amount;
          transaction.category = category;
          transaction.description = description;
          if (!transaction.time) {
            const now = new Date();
            transaction.time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
          }
        }
        showToast("Transaksi berhasil diperbarui!", "success");
      } else {
        const now = new Date();
        const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        const newTransaction = {
          id: 'fin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          type,
          amount,
          category,
          description,
          time: timeStr
        };
        State.history[dateStr].finance.push(newTransaction);
        showToast("Transaksi berhasil ditambahkan!", "success");
      }
      
      saveHistoryToStorage();
      renderDailyFinance();
      renderMonthlyFinanceSummary(currentCalMonth, currentCalYear);
      
      document.getElementById('finance-form-modal').classList.remove('active');
    });
  }

  document.getElementById('btn-monthly-finance-details')?.addEventListener('click', () => {
    openMonthlyFinanceChartModal();
  });
  document.getElementById('close-finance-chart-modal')?.addEventListener('click', () => {
    document.getElementById('monthly-finance-chart-modal').classList.remove('active');
  });
  document.getElementById('close-finance-chart-footer-btn')?.addEventListener('click', () => {
    document.getElementById('monthly-finance-chart-modal').classList.remove('active');
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
        syncGoogleCalendarAndHolidays(token).catch(err => console.error(err));
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
        showAlert("Koneksi Google Gagal", "Gagal memuat pustaka Google Identity Services. Periksa koneksi internet Anda atau matikan ad-blocker.");
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
      showConfirm(
        "Putus Sambungan Google",
        "Apakah Anda yakin ingin memutuskan sambungan akun Google? Data lokal Anda tidak akan terhapus.",
        () => {
          logoutGoogleOAuth();
        }
      );
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
        showToast("Backup Berhasil! Data lokal Anda telah diunggah ke Google Drive.", "success");
      } catch (err) {
        showToast("Gagal mencadangkan data ke Google Drive: " + err.message, "error");
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
      
      try {
        const file = await findBackupFile(token);
        if (!file) {
          showToast("Tidak ditemukan berkas cadangan 'yosday_backup.json' di Google Drive.", "warning");
          return;
        }
        
        const content = await readBackupFileContent(token, file.id);
        if (content) {
          showConfirm(
            "Pemulihan Data",
            "Berkas cadangan ditemukan! Apakah Anda yakin ingin memulihkan data tersebut? Semua data lokal saat ini akan tertimpa.",
            () => {
              restoreBtn.textContent = "⌛ Memulihkan...";
              restoreBtn.disabled = true;
              
              State.templates = content.templates || [];
              State.history = content.history || {};
              State.projects = content.projects || [];
              State.projectCategories = content.projectCategories || [];
              State.collapsedCategories = content.collapsedCategories || [];
              State.projectCategoryOrder = content.projectCategoryOrder || [];
              
              localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
              localStorage.setItem('yosday_history', JSON.stringify(State.history));
              localStorage.setItem('yosday_projects', JSON.stringify(State.projects));
              localStorage.setItem('yosday_project_categories', JSON.stringify(State.projectCategories));
              localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories));
              localStorage.setItem('yosday_category_order', JSON.stringify(State.projectCategoryOrder));
              
              initApp();
              showToast("Pemulihan Berhasil! Halaman dimuat ulang dengan data terbaru.", "success");
              
              restoreBtn.textContent = "📥 Restore dari Cloud";
              restoreBtn.disabled = false;
            }
          );
        }
      } catch (err) {
        showToast("Gagal memulihkan data: " + err.message, "error");
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

    // Load real Google Calendar events & Holidays
    await syncGoogleCalendarAndHolidays(token);

    // Auto sync on interactive login
    if (mode === 'interactive') {
      try {
        const file = await findBackupFile(token);
        if (file) {
          const content = await readBackupFileContent(token, file.id);
          if (content) {
            State.templates = content.templates || [];
            State.history = content.history || {};
            State.projects = content.projects || [];
            State.projectCategories = content.projectCategories || [];
            State.collapsedCategories = content.collapsedCategories || [];
            State.projectCategoryOrder = content.projectCategoryOrder || [];
            
            localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
            localStorage.setItem('yosday_history', JSON.stringify(State.history));
            localStorage.setItem('yosday_projects', JSON.stringify(State.projects));
            localStorage.setItem('yosday_project_categories', JSON.stringify(State.projectCategories));
            localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories));
            localStorage.setItem('yosday_category_order', JSON.stringify(State.projectCategoryOrder));
            
            // Re-render UI dashboard lists
            checkAndGenerateTodayTasks();
            renderMascot('sidebar-hoot-mascot-target', calculateWeeklyProgressRate());
            renderWeeklyStreak();
            renderDailyVerse();
            renderTodayProgressSummary();
            renderDailyTasks();
            renderDailyFinance();
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
        showToast("Backup Berhasil! Data lokal Anda telah diunggah ke Google Drive.", "success");
      } catch (err) {
        showToast("Gagal mencadangkan data ke Google Drive: " + err.message, "error");
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
          showToast("Tidak ditemukan berkas cadangan 'yosday_backup.json' di Google Drive Anda. Silakan klik Backup terlebih dahulu.", "warning");
          if (restoreBtn) {
            restoreBtn.textContent = "📥 Restore dari Cloud";
            restoreBtn.disabled = false;
          }
          return;
        }
        const content = await readBackupFileContent(token, file.id);
        if (content) {
          showConfirm(
            "Pemulihan Data",
            "Berkas cadangan ditemukan! Apakah Anda yakin ingin memulihkan data tersebut? Semua data lokal saat ini akan tertimpa.",
            () => {
              State.templates = content.templates || [];
              State.history = content.history || {};
              State.projects = content.projects || [];
              State.projectCategories = content.projectCategories || [];
              State.collapsedCategories = content.collapsedCategories || [];
              State.projectCategoryOrder = content.projectCategoryOrder || [];
              
              localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
              localStorage.setItem('yosday_history', JSON.stringify(State.history));
              localStorage.setItem('yosday_projects', JSON.stringify(State.projects));
              localStorage.setItem('yosday_project_categories', JSON.stringify(State.projectCategories));
              localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories));
              localStorage.setItem('yosday_category_order', JSON.stringify(State.projectCategoryOrder));
              
              initApp();
              showAlert("Pemulihan Berhasil", "Data berhasil dipulihkan dari Google Drive. Halaman telah dimuat ulang dengan data terbaru.");
              if (restoreBtn) {
                restoreBtn.textContent = "📥 Restore dari Cloud";
                restoreBtn.disabled = false;
              }
            },
            () => {
              if (restoreBtn) {
                restoreBtn.textContent = "📥 Restore dari Cloud";
                restoreBtn.disabled = false;
              }
            }
          );
        }
      } catch (err) {
        showToast("Gagal memulihkan data: " + err.message, "error");
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
    showToast("Akun terputus. Data saat ini akan tetap tersimpan secara lokal.", "info");
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

async function fetchGoogleHolidays(token, timeMin, timeMax) {
  const holidayCalendarId = 'id.indonesian#holiday@group.v.calendar.google.com';
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(holidayCalendarId)}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      const publicHolidayKeywords = [
        "tahun baru", "new year", 
        "imlek", "chinese", 
        "isra", "mi'raj", "miraj", "ascension of the prophet",
        "nyepi", "seclusion", "hindu new year",
        "wafat isa almasih", "jumat agung", "good friday",
        "kenaikan", "ascension",
        "waisak", "vesak",
        "lahir pancasila", "pancasila day",
        "idul fitri", "eid al-fitr", "lebaran",
        "idul adha", "eid al-adha",
        "tahun baru hijriah", "islamic new year",
        "kemerdekaan", "independence day",
        "maulid", "prophet's birthday", "birthday of the prophet",
        "natal", "christmas"
      ];
      return (data.items || []).map(item => {
        const title = item.summary || "";
        const lowerTitle = title.toLowerCase();
        const isJointLeave = lowerTitle.includes("cuti bersama") || 
                             lowerTitle.includes("joint leave");
        let type = "holiday";
        if (isJointLeave) {
          type = "joint_leave";
        } else {
          const matchesPublicHoliday = publicHolidayKeywords.some(keyword => lowerTitle.includes(keyword));
          if (!matchesPublicHoliday) {
            type = "commemoration";
          }
        }
        return {
          name: title,
          date: item.start.date || item.start.dateTime.slice(0, 10),
          type: type
        };
      });
    }
  } catch (e) {
    console.warn("Failed to fetch holidays from Google Calendar:", e);
  }
  return null;
}

async function syncGoogleCalendarAndHolidays(token) {
  try {
    const realEvents = await fetchRealGoogleCalendarEvents(token);
    if (realEvents) {
      State.googleCalendarEvents = realEvents;
    } else {
      State.googleCalendarEvents = [];
    }
    
    // Fetch Google Holidays
    const today = State.currentDate;
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    const timeMin = startOfDay.toISOString();
    const timeMax = endOfDay.toISOString();
    
    const gcalHolidays = await fetchGoogleHolidays(token, timeMin, timeMax);
    let holidaysUpdated = false;
    if (gcalHolidays && gcalHolidays.length > 0) {
      gcalHolidays.forEach(h => {
        const parts = h.date.split('-');
        if (parts.length === 3) {
          const mmdd = `${parts[1]}-${parts[2]}`;
          if (!State.holidays.some(sh => sh.date === h.date || sh.date === mmdd)) {
            State.holidays.push({ date: h.date, name: h.name, type: h.type });
            holidaysUpdated = true;
          }
        }
      });
    }
    
    if (holidaysUpdated) {
      const todayStr = getISODateString(State.currentDate);
      if (State.history[todayStr]) {
        const record = State.history[todayStr];
        const hasCompletedTasks = record.tasks.some(t => t.completed);
        if (!hasCompletedTasks) {
          delete State.history[todayStr];
        }
      }
      checkAndGenerateTodayTasks();
      renderDailyTasks();
      renderTodayProgressSummary();
      renderWeeklyStreak();
    }
    
    renderCalendarInformation();
  } catch (err) {
    console.error("Failed to sync GCal events/holidays:", err);
    State.googleCalendarEvents = 'error';
    renderCalendarInformation();
  }
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
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder&fields=files(id,name,modifiedTime)`;
  const res = await fetch(url, {
    cache: 'no-store',
    headers: { 
      Authorization: `Bearer ${token}`
    }
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
    cache: 'no-store',
    headers: { 
      Authorization: `Bearer ${token}`
    }
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
      history: State.history,
      projects: State.projects || [],
      projectCategories: State.projectCategories || [],
      collapsedCategories: State.collapsedCategories || [],
      projectCategoryOrder: State.projectCategoryOrder || [],
      settings: {
        notificationInterval: localStorage.getItem('yosday_notification_interval') || 'disabled',
        smartVerseType: localStorage.getItem('yosday_smart_verse_type') || 'quotes',
        hiddenCalendarItems: JSON.parse(localStorage.getItem('yosday_hidden_calendar_items')) || []
      }
    };
    if (file && file.id) {
      await updateBackupFile(token, file.id, payload);
    } else {
      await createBackupFile(token, payload);
    }
    // Fetch updated file metadata to save the cloud modifiedTime locally
    const fileInfo = await findBackupFile(token);
    if (fileInfo && fileInfo.modifiedTime) {
      localStorage.setItem('yosday_last_cloud_sync_time', fileInfo.modifiedTime);
    }
    updateSyncStatusIndicator("Tersinkronisasi");
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
  
  // Sync changed settings to Google Drive
  triggerAutoCloudBackup();
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

// ==========================================================================
// REAL-TIME CLOUD SYNC POLLING & VISIBILITY OPTIMIZATION
// ==========================================================================
let syncPollingInterval = null;
let isCloudPollingActive = false;

function startCloudSyncPolling() {
  if (syncPollingInterval) clearInterval(syncPollingInterval);
  
  const pollSync = async () => {
    // Only check when the page is active/visible to save device battery
    if (document.hidden) return;
    if (isCloudPollingActive) {
      console.log("Cloud sync polling is already in progress, skipping...");
      return;
    }
    
    isCloudPollingActive = true;
    
    const token = localStorage.getItem('yosday_google_token');
    const expiry = localStorage.getItem('yosday_google_token_expiry');
    const profile = localStorage.getItem('yosday_google_profile');
    
    if (!profile || !token || !expiry || Date.now() > parseInt(expiry)) {
      isCloudPollingActive = false;
      return; // Disconnected or expired
    }
    
    try {
      const file = await findBackupFile(token);
      if (!file) {
        isCloudPollingActive = false;
        return;
      }
      
      const remoteTime = file.modifiedTime || '';
      const localTime = localStorage.getItem('yosday_last_cloud_sync_time') || '';
      
      if (remoteTime && remoteTime !== localTime) {
        console.log(`Cloud backup is newer (${remoteTime} vs ${localTime}). Pulling updates...`);
        const content = await readBackupFileContent(token, file.id);
        if (content) {
          State.templates = content.templates || [];
          State.history = content.history || {};
          State.projects = content.projects || [];
          State.projectCategories = content.projectCategories || [];
          State.collapsedCategories = content.collapsedCategories || [];
          State.projectCategoryOrder = content.projectCategoryOrder || [];
          
          localStorage.setItem('yosday_templates', JSON.stringify(State.templates));
          localStorage.setItem('yosday_history', JSON.stringify(State.history));
          localStorage.setItem('yosday_projects', JSON.stringify(State.projects));
          localStorage.setItem('yosday_project_categories', JSON.stringify(State.projectCategories));
          localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories));
          localStorage.setItem('yosday_category_order', JSON.stringify(State.projectCategoryOrder));
          localStorage.setItem('yosday_last_cloud_sync_time', remoteTime);
          
          // Restore settings if present
          if (content.settings) {
            const settings = content.settings;
            if (settings.notificationInterval) {
              State.notificationInterval = settings.notificationInterval;
              localStorage.setItem('yosday_notification_interval', settings.notificationInterval);
              const intervalSelect = document.getElementById('settings-notification-interval');
              if (intervalSelect) intervalSelect.value = settings.notificationInterval;
              setupNotificationTimer();
            }
            if (settings.smartVerseType) {
              localStorage.setItem('yosday_smart_verse_type', settings.smartVerseType);
              const smartVerseSelect = document.getElementById('settings-smart-verse-type');
              if (smartVerseSelect) smartVerseSelect.value = settings.smartVerseType;
              renderDailyVerse();
            }
            if (settings.hiddenCalendarItems) {
              State.hiddenCalendarItems = settings.hiddenCalendarItems;
              localStorage.setItem('yosday_hidden_calendar_items', JSON.stringify(settings.hiddenCalendarItems));
            }
          }
          
          // Refresh UI
          checkAndGenerateTodayTasks();
          renderMascot('sidebar-hoot-mascot-target', calculateWeeklyProgressRate());
          renderWeeklyStreak();
          renderDailyVerse();
          renderTodayProgressSummary();
          renderDailyTasks();
          renderDailyJournal();
          renderDailyFinance();
          renderCalendarInformation();
          renderTemplatesCatalog();
          renderReviewTab();
          if (State.activeMode === 'project') {
            renderProjects();
          }
          
          showToast("Data disinkronkan otomatis dari Cloud!", "success");
        }
      }
    } catch (e) {
      console.warn("Background cloud sync polling failed:", e);
    } finally {
      isCloudPollingActive = false;
    }
  };
  
  // Check every 15 seconds for network safety and rate limits
  syncPollingInterval = setInterval(pollSync, 15000);
  
  // Monitor tab focus / active screen states
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log("Tab focused. Triggering immediate cloud sync check...");
      pollSync();
    }
  });
}

// ==========================================================================
// DAILY JOURNALING MODULE (RICH-TEXT EDITOR & PREVIEW)
// ==========================================================================
let journalEditorOriginalContent = "";
let journalEditorActiveDate = null;

function stripHtmlTags(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function renderDailyJournal() {
  const container = document.getElementById('journal-preview-box');
  if (!container) return;
  
  const todayStr = getISODateString(State.currentDate);
  const todayRecord = State.history[todayStr];
  const journalContent = (todayRecord && todayRecord.journal) ? todayRecord.journal.trim() : "";
  
  if (journalContent) {
    const plainText = stripHtmlTags(journalContent);
    container.innerHTML = `
      <div class="journal-preview-text" id="home-journal-preview">${plainText}</div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary-outline btn-sm" id="btn-home-write-journal">Edit</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <p class="text-xs text-muted" style="font-style: italic; margin-bottom: 12px; font-size: 11px;">Ceritakan harimu.</p>
      <button class="btn btn-secondary-outline btn-sm" id="btn-home-write-journal">Tulis</button>
    `;
  }
  
  const btn = document.getElementById('btn-home-write-journal');
  if (btn) {
    btn.addEventListener('click', () => {
      openJournalEditor(todayStr);
    });
  }
}

function openJournalEditor(dateStr) {
  journalEditorActiveDate = dateStr;
  const modal = document.getElementById('journal-editor-modal');
  const title = document.getElementById('journal-editor-title');
  const dateSub = document.getElementById('journal-editor-date');
  const editor = document.getElementById('journal-rich-editor');
  if (!modal || !editor) return;
  
  const dateObj = new Date(dateStr + 'T00:00:00');
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('id-ID', options);
  
  if (title) title.textContent = "Jurnal harian";
  if (dateSub) dateSub.textContent = formattedDate;
  
  const record = State.history[dateStr];
  const content = (record && record.journal) ? record.journal : "";
  editor.innerHTML = content;
  journalEditorOriginalContent = content;
  
  modal.classList.add('active');
  editor.focus();
}

function saveJournal() {
  const editor = document.getElementById('journal-rich-editor');
  const dateStr = journalEditorActiveDate;
  if (!dateStr || !editor) return;
  
  const content = editor.innerHTML.trim();
  
  if (!State.history[dateStr]) {
    State.history[dateStr] = {
      date: dateStr,
      tasks: [],
      notes: "",
      journal: ""
    };
  }
  
  State.history[dateStr].journal = content;
  saveHistoryToStorage();
  
  renderDailyJournal();
  
  // Sync in-view calendar details modal
  const dayDetailModal = document.getElementById('day-detail-modal');
  if (dayDetailModal && dayDetailModal.classList.contains('active')) {
    const detailContentEl = document.getElementById('day-detail-journal-content');
    if (detailContentEl) {
      detailContentEl.innerHTML = content || '<span style="font-style: italic; color: var(--text-muted);">Belum ada tulisan jurnal untuk hari ini.</span>';
    }
  }
  
  document.getElementById('journal-editor-modal').classList.remove('active');
  showToast("Jurnal harian berhasil disimpan!", "success");
  
  triggerAutoCloudBackup();
}

function closeJournalEditor() {
  const editor = document.getElementById('journal-rich-editor');
  if (!editor) return;
  
  const currentContent = editor.innerHTML;
  if (currentContent !== journalEditorOriginalContent) {
    showConfirm(
      "Simpan Perubahan?",
      "Anda memiliki tulisan yang belum disimpan. Simpan perubahan sebelum keluar?",
      () => {
        saveJournal();
      },
      () => {
        document.getElementById('journal-editor-modal').classList.remove('active');
      }
    );
  } else {
    document.getElementById('journal-editor-modal').classList.remove('active');
  }
}

// ==========================================================================
// EXPORT & REPORT GENERATION UTILITY
// ==========================================================================
function openExportModal() {
  const modal = document.getElementById('export-data-modal');
  const preview = document.getElementById('export-preview-box');
  if (!modal || !preview) return;
  
  const reportText = generateFormattedReportText();
  preview.textContent = reportText;
  
  modal.classList.add('active');
}

function generateFormattedReportText() {
  const monthNamesId = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  let report = "YOSDAY — PERSONAL LIFE REPORT\n";
  report += `Laporan Bulan: ${monthNamesId[currentCalMonth]} ${currentCalYear}\n`;
  report += "Generated: " + new Date().toLocaleString('id-ID') + "\n";
  report += "==================================================\n\n";
  
  const prefix = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-`;
  const sortedDates = Object.keys(State.history).sort().filter(d => d.startsWith(prefix));
  
  if (sortedDates.length === 0) {
    report += "Belum ada histori data tercatat untuk bulan ini.\n";
    return report;
  }
  
  sortedDates.forEach(dateStr => {
    const record = State.history[dateStr];
    const dateObj = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('id-ID', options);
    
    report += `### HARI: ${formattedDate} (${dateStr})\n`;
    
    const total = record.tasks ? record.tasks.length : 0;
    const completed = record.tasks ? record.tasks.filter(t => t.completed).length : 0;
    const completionRate = total === 0 ? 100 : Math.round((completed / total) * 100);
    
    report += `Tingkat Penyelesaian: ${completionRate}% (${completed}/${total} Tugas Selesai)\n`;
    report += `Status AI: ${record.hootExpression || 'Normal'}\n`;
    
    report += "TUGAS:\n";
    if (total === 0) {
      report += "  - Tidak ada tugas.\n";
    } else {
      record.tasks.forEach(t => {
        const check = t.completed ? "[X]" : "[ ]";
        report += `  ${check} ${t.startTime} - ${t.endTime} : ${t.name} (${t.priority})\n`;
        if (t.subtasks && t.subtasks.length > 0) {
          t.subtasks.forEach(st => {
            const stCheck = st.completed ? "[X]" : "[ ]";
            report += `      ${stCheck} Subtask: ${st.name}\n`;
          });
        }
      });
    }
    
    report += "KEUANGAN:\n";
    const financeList = record.finance || [];
    if (financeList.length === 0) {
      report += "  - Tidak ada transaksi keuangan.\n";
    } else {
      financeList.forEach(f => {
        const typeStr = f.type === 'pemasukan' ? "[📈 PEMASUKAN]" : "[💸 PENGELUARAN]";
        const timeStr = f.time ? ` @ ${f.time}` : '';
        const descStr = f.description ? ` (${f.description})` : '';
        report += `  ${typeStr} ${f.category}${timeStr}: ${formatRupiah(f.amount)}${descStr}\n`;
      });
    }
    
    if (record.notes) {
      report += `REFLEKSI & CATATAN: ${record.notes}\n`;
    }
    
    if (record.journal) {
      const cleanJournal = record.journal.replace(/<\/?[^>]+(>|$)/g, "\n").replace(/\n+/g, "\n").trim();
      report += `JURNAL HARIAN:\n${cleanJournal}\n`;
    }
    
    report += "--------------------------------------------------\n\n";
  });
  
  report += "Akhir Laporan.\n";
  report += window.location.origin + window.location.pathname + "\n";
  return report;
}

function printReportPDF() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showAlert("Akses Terblokir", "Gagal membuka jendela cetak. Pastikan pop-up browser tidak diblokir.");
    return;
  }
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>YOSDAY — Personal Life Report</title>
      <style>
        body {
          font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
          color: #111827;
          padding: 40px;
          line-height: 1.6;
          background-color: #ffffff;
        }
        .print-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #111827;
          padding-bottom: 12px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .doc-title {
          font-size: 14px;
          color: #4b5563;
          font-weight: 600;
        }
        .day-section {
          margin-bottom: 40px;
          page-break-inside: avoid;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 24px;
        }
        .day-header {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #111827;
        }
        .meta-info {
          font-size: 13px;
          color: #4b5563;
          margin-bottom: 15px;
        }
        .tasks-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .tasks-table th, .tasks-table td {
          border: 1px solid #e5e7eb;
          padding: 8px 12px;
          text-align: left;
          font-size: 13px;
        }
        .tasks-table th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        .journal-box {
          background: #f9fafb;
          border-left: 3px solid #3b82f6;
          padding: 12px 16px;
          font-size: 13px;
          margin-top: 15px;
          border-radius: 4px;
        }
        .journal-title {
          font-weight: 600;
          margin-bottom: 6px;
        }
        .print-footer {
          margin-top: 60px;
          border-top: 1px solid #111827;
          padding-top: 16px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="print-header">
        <span class="logo">YOSDAY</span>
        <span class="doc-title">PERSONAL LIFE REPORT</span>
      </div>
  `;
  
  const sortedDates = Object.keys(State.history).sort();
  if (sortedDates.length === 0) {
    html += `<p>Belum ada histori data tercatat.</p>`;
  } else {
    sortedDates.forEach(dateStr => {
      const record = State.history[dateStr];
      const dateObj = new Date(dateStr + 'T00:00:00');
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('id-ID', options);
      
      const total = record.tasks ? record.tasks.length : 0;
      const completed = record.tasks ? record.tasks.filter(t => t.completed).length : 0;
      const completionRate = total === 0 ? 100 : Math.round((completed / total) * 100);
      
      html += `
        <div class="day-section">
          <div class="day-header">${formattedDate} (${dateStr})</div>
          <div class="meta-info">
            <strong>Tingkat Penyelesaian:</strong> ${completionRate}% (${completed}/${total} Selesai) | 
            <strong>Status AI:</strong> ${record.hootExpression || 'Normal'}
          </div>
      `;
      
      if (total > 0) {
        html += `
          <table class="tasks-table">
            <thead>
              <tr>
                <th style="width: 80px;">Status</th>
                <th style="width: 120px;">Waktu</th>
                <th>Nama Tugas</th>
                <th style="width: 100px;">Kategori</th>
                <th style="width: 80px;">Prioritas</th>
              </tr>
            </thead>
            <tbody>
        `;
        record.tasks.forEach(t => {
          const statusText = t.completed ? "Selesai" : "Terlewat";
          html += `
            <tr>
              <td><strong>${statusText}</strong></td>
              <td>${t.startTime} - ${t.endTime}</td>
              <td>
                ${t.name}
                ${t.subtasks && t.subtasks.length > 0 ? `<br><small style="color: #6b7280;">Subtasks: ${t.subtasks.map(st => `${st.name} (${st.completed ? '✓' : '✕'})`).join(', ')}</small>` : ''}
              </td>
              <td>${t.category}</td>
              <td>${t.priority}</td>
            </tr>
          `;
        });
        html += `
            </tbody>
          </table>
        `;
      } else {
        html += `<p style="font-size: 13px; font-style: italic; color: #6b7280;">Tidak ada tugas terjadwal.</p>`;
      }
      
      if (record.journal) {
        html += `
          <div class="journal-box">
            <div class="journal-title">📝 Jurnal Harian:</div>
            <div>${record.journal}</div>
          </div>
        `;
      } else if (record.notes) {
        html += `
          <div class="journal-box">
            <div class="journal-title">📝 Catatan Refleksi:</div>
            <div>${record.notes}</div>
          </div>
        `;
      }
      
      html += `</div>`;
    });
  }
  
  const webUrl = window.location.origin + window.location.pathname;
  html += `
      <div class="print-footer">
        Laporan dibuat otomatis oleh <a href="${webUrl}" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;">YOSDAY</a>
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
}

function downloadReportJSON() {
  const prefix = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-`;
  const filteredHistory = {};
  Object.keys(State.history).forEach(dateStr => {
    if (dateStr.startsWith(prefix)) {
      filteredHistory[dateStr] = State.history[dateStr];
    }
  });

  const data = {
    month: `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}`,
    templates: State.templates,
    history: filteredHistory
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `yosday_export_${currentCalYear}_${String(currentCalMonth + 1).padStart(2, '0')}.json`;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("File data JSON berhasil diunduh!", "success");
}

function copyReportToClipboard() {
  const reportText = generateFormattedReportText();
  navigator.clipboard.writeText(reportText).then(() => {
    showToast("Laporan berhasil disalin ke clipboard!", "success");
  }).catch(err => {
    showToast("Gagal menyalin laporan: " + err, "error");
  });
}

function setupJournalAndExportEventListeners() {
  // Rich Text Editor Commands
  document.querySelectorAll('.journal-toolbar .toolbar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const command = btn.getAttribute('data-command');
      const value = btn.getAttribute('data-value') || null;
      document.execCommand(command, false, value);
      document.getElementById('journal-rich-editor').focus();
    });
  });
  
  // Editor Save/Cancel buttons
  const saveBtn = document.getElementById('save-journal-btn');
  if (saveBtn) saveBtn.addEventListener('click', saveJournal);
  
  const cancelBtn = document.getElementById('cancel-journal-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', closeJournalEditor);
  
  const closeEditorBtn = document.getElementById('close-journal-editor-btn');
  if (closeEditorBtn) closeEditorBtn.addEventListener('click', closeJournalEditor);
  
  // Export actions
  const exportDataBtn = document.getElementById('btn-export-data');
  if (exportDataBtn) exportDataBtn.addEventListener('click', openExportModal);
  
  const closeExportBtn = document.getElementById('close-export-modal');
  if (closeExportBtn) closeExportBtn.addEventListener('click', () => {
    document.getElementById('export-data-modal').classList.remove('active');
  });
  
  const closeExportFooterBtn = document.getElementById('close-export-footer-btn');
  if (closeExportFooterBtn) closeExportFooterBtn.addEventListener('click', () => {
    document.getElementById('export-data-modal').classList.remove('active');
  });
  
  const copyBtn = document.getElementById('btn-export-copy');
  if (copyBtn) copyBtn.addEventListener('click', copyReportToClipboard);
  
  const printBtn = document.getElementById('btn-export-print');
  if (printBtn) printBtn.addEventListener('click', printReportPDF);
  
  const downloadBtn = document.getElementById('btn-export-json');
  if (downloadBtn) downloadBtn.addEventListener('click', downloadReportJSON);
}
function initSmartVerseType() {
  const savedType = localStorage.getItem('yosday_smart_verse_type') || 'quotes';
  const select = document.getElementById('settings-smart-verse-type');
  if (select) {
    select.value = savedType;
  }
}

// ==========================================================================
// PROJECT TRACKER ENGINE
// ==========================================================================

function applyActiveMode() {
  const dailyNav = document.getElementById('nav-list-daily');
  const projectNav = document.getElementById('nav-list-project');

  // Highlight the active mode option in dropdown
  document.querySelectorAll('#mode-selector-dropdown .mode-option').forEach(opt => {
    if (opt.getAttribute('data-mode') === State.activeMode) {
      opt.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
      opt.style.color = 'var(--accent-blue)';
    } else {
      opt.style.backgroundColor = 'transparent';
      opt.style.color = 'var(--text-primary)';
    }
  });

  // Update mode badge
  const modeBadge = document.getElementById('active-mode-badge');
  if (modeBadge) {
    const isDaily = State.activeMode === 'daily';
    modeBadge.textContent = isDaily ? 'DAILY' : 'PROJECT';
    modeBadge.style.color = isDaily ? 'var(--accent-blue)' : 'var(--warning-gold)';
    modeBadge.style.background = isDaily ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)';
  }

  // Toggle content-header
  const contentHeader = document.querySelector('.content-header');

  if (State.activeMode === 'daily') {
    // Show daily nav, hide project nav
    if (dailyNav) dailyNav.style.display = '';
    if (projectNav) projectNav.style.display = 'none';

    // Hide project stats
    const statsContainer = document.getElementById('project-tracker-stats-container');
    if (statsContainer) statsContainer.style.display = 'none';

    // Show content-header
    if (contentHeader) {
      contentHeader.style.display = '';
      contentHeader.classList.remove('project-mode-hidden');
    }

    // Hide all project tab panels, make sure all panels are reset
    ['concept', 'ongoing', 'done'].forEach(t => {
      const p = document.getElementById(`tab-${t}`);
      if (p) p.classList.remove('active');
    });

    // Switch to saved daily tab
    const savedDailyTab = localStorage.getItem('yosday_active_tab_daily') || 'home';
    switchTab(savedDailyTab);

  } else {
    // Show project nav, hide daily nav
    if (dailyNav) dailyNav.style.display = 'none';
    if (projectNav) projectNav.style.display = '';

    // Show project stats and render
    renderProjectStatsTimeline();

    // Hide content-header
    if (contentHeader) {
      contentHeader.style.display = 'none';
      contentHeader.classList.add('project-mode-hidden');
    }

    // Hide all daily tab panels
    ['home', 'custom', 'review'].forEach(t => {
      const p = document.getElementById(`tab-${t}`);
      if (p) p.classList.remove('active');
    });

    // Switch to saved project tab
    const savedProjectTab = localStorage.getItem('yosday_active_tab_project') || 'concept';
    switchTab(savedProjectTab);
  }
}

// ---- Category Collapse Toggle ----
function toggleCategoryCollapse(catKey) {
  if (!State.collapsedCategories) State.collapsedCategories = [];
  const idx = State.collapsedCategories.indexOf(catKey);
  if (idx === -1) {
    State.collapsedCategories.push(catKey);
  } else {
    State.collapsedCategories.splice(idx, 1);
  }
  localStorage.setItem('yosday_collapsed_categories', JSON.stringify(State.collapsedCategories));
  renderProjects();
}

// ---- Project Modal ----
function openAddProjectModal(defaultStatus = 'concept') {
  document.getElementById('project-modal-title').textContent = "Tambah Projek";
  document.getElementById('project-input-name').value = "";
  document.getElementById('project-input-desc').value = "";
  document.getElementById('project-input-link').value = "";
  document.getElementById('project-input-category-new').value = "";
  document.getElementById('project-input-urgency').value = "Sedang";
  document.getElementById('project-input-subprojects-container').innerHTML = "";
  
  const saveBtn = document.getElementById('save-project-modal');
  saveBtn.removeAttribute('data-edit-id');
  saveBtn.setAttribute('data-default-status', defaultStatus);
  
  const select = document.getElementById('project-input-category-select');
  select.innerHTML = '<option value="">-- Pilih Kategori --</option>';
  State.projectCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  
  document.getElementById('project-modal').classList.add('active');
}

function openEditProjectModal(projectId) {
  const project = State.projects.find(p => p.id === projectId);
  if (!project) return;

  document.getElementById('project-modal-title').textContent = "Edit Projek";
  document.getElementById('project-input-name').value = project.name;
  document.getElementById('project-input-desc').value = project.desc || "";
  document.getElementById('project-input-link').value = project.link || "";
  document.getElementById('project-input-category-new').value = "";
  document.getElementById('project-input-urgency').value = project.urgency;
  
  const select = document.getElementById('project-input-category-select');
  select.innerHTML = '<option value="">-- Pilih Kategori --</option>';
  State.projectCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  select.value = project.category || "";

  const container = document.getElementById('project-input-subprojects-container');
  container.innerHTML = "";
  if (project.subprojects) {
    project.subprojects.forEach(sub => {
      addProjectSubtaskRow(sub.name);
    });
  }

  const saveBtn = document.getElementById('save-project-modal');
  saveBtn.setAttribute('data-edit-id', projectId);
  
  document.getElementById('project-modal').classList.add('active');
}

function addProjectSubtaskRow(value = '') {
  const container = document.getElementById('project-input-subprojects-container');
  const div = document.createElement('div');
  div.className = 'project-modal-subtask-row';
  div.style.display = 'flex';
  div.style.gap = '6px';
  div.style.alignItems = 'center';
  div.style.marginTop = '6px';
  div.innerHTML = `
    <input type="text" class="project-modal-subtask-input form-control" value="${value}" placeholder="Nama sub-projek..." style="flex-grow: 1; padding: 6px; font-size: 12px; border: 1px solid var(--border-color); background: var(--surface-dark); color: var(--text-primary); border-radius: 4px;">
    <button type="button" class="btn btn-secondary-outline btn-sm remove-subtask-row-btn" style="padding: 4px 8px; color: var(--danger-red); border-color: var(--danger-red); font-size: 12px;">×</button>
  `;
  container.appendChild(div);
  div.querySelector('.remove-subtask-row-btn').addEventListener('click', () => {
    div.remove();
  });
}

function saveProject() {
  const name = document.getElementById('project-input-name').value.trim();
  const desc = document.getElementById('project-input-desc').value.trim();
  const link = document.getElementById('project-input-link').value.trim();
  const urgency = document.getElementById('project-input-urgency').value;
  
  const selectCat = document.getElementById('project-input-category-select').value;
  const newCat = document.getElementById('project-input-category-new').value.trim();
  const categoryName = newCat || selectCat || 'Tanpa Kategori';

  if (!name) {
    showToast("Nama projek wajib diisi!", "error");
    return;
  }

  const container = document.getElementById('project-input-subprojects-container');
  const saveBtn = document.getElementById('save-project-modal');
  const editId = saveBtn.getAttribute('data-edit-id');
  const existingProject = editId ? State.projects.find(p => p.id === editId) : null;

  const subprojects = Array.from(container.querySelectorAll('.project-modal-subtask-input'))
    .map(input => {
      const subName = input.value.trim();
      if (!subName) return null;
      const existingSub = existingProject && existingProject.subprojects ? existingProject.subprojects.find(s => s.name === subName) : null;
      return {
        name: subName,
        completed: existingSub ? existingSub.completed : false
      };
    }).filter(Boolean);

  if (categoryName && categoryName !== 'Tanpa Kategori' && !State.projectCategories.includes(categoryName)) {
    State.projectCategories.push(categoryName);
  }

  if (editId) {
    const projIdx = State.projects.findIndex(p => p.id === editId);
    if (projIdx !== -1) {
      State.projects[projIdx].name = name;
      State.projects[projIdx].desc = desc;
      State.projects[projIdx].link = link;
      State.projects[projIdx].category = categoryName;
      State.projects[projIdx].urgency = urgency;
      State.projects[projIdx].subprojects = subprojects;
    }
    showToast("Projek berhasil diperbarui!", "success");
  } else {
    const defaultStatus = saveBtn.getAttribute('data-default-status') || 'concept';
    const nowStr = getISODateString(State.currentDate);
    const newProj = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name,
      desc: desc,
      link: link,
      category: categoryName,
      urgency: urgency,
      status: defaultStatus,
      subprojects: subprojects,
      dateConcept: nowStr,
      dateOngoing: defaultStatus === 'ongoing' ? nowStr : null,
      dateDone: defaultStatus === 'done' ? nowStr : null,
      sortOrder: State.projects.length
    };
    State.projects.push(newProj);
    showToast("Projek baru berhasil ditambahkan!", "success");
  }

  saveProjectsToStorage();
  document.getElementById('project-modal').classList.remove('active');
  renderProjects();
}

// ---- Status Move with Confirmation ----
function moveProjectStatus(projectId, newStatus) {
  const project = State.projects.find(p => p.id === projectId);
  if (!project) return;

  const statusLabels = { concept: 'Concept', ongoing: 'On Going', done: 'Done' };
  const from = statusLabels[project.status] || project.status;
  const to = statusLabels[newStatus] || newStatus;

  showConfirm(
    'Pindahkan Projek',
    `Pindahkan "${project.name}" dari ${from} ke ${to}?`,
    () => {
      project.status = newStatus;
      const nowStr = getISODateString(State.currentDate);
      if (newStatus === 'ongoing') {
        if (!project.dateOngoing) project.dateOngoing = nowStr;
        project.dateDone = null;
      } else if (newStatus === 'done') {
        if (!project.dateOngoing) project.dateOngoing = nowStr;
        if (!project.dateDone) project.dateDone = nowStr;
      } else if (newStatus === 'concept') {
        project.dateOngoing = null;
        project.dateDone = null;
      }
      saveProjectsToStorage();
      renderProjects();
      // Refresh detail modal if open
      const detailModal = document.getElementById('project-detail-modal');
      if (detailModal && detailModal.classList.contains('active')) {
        openProjectDetailModal(projectId);
      } else {
        showToast(`Projek dipindahkan ke ${to}!`, "success");
      }
    }
  );
}

function deleteProject(projectId) {
  const project = State.projects.find(p => p.id === projectId);
  if (!project) return;
  showConfirm("Hapus Projek", `Apakah Anda yakin ingin menghapus projek "${project.name}"?`, () => {
    State.projects = State.projects.filter(p => p.id !== projectId);
    saveProjectsToStorage();
    // Close detail modal if open for this project
    const detailModal = document.getElementById('project-detail-modal');
    if (detailModal && detailModal.classList.contains('active')) {
      detailModal.classList.remove('active');
    }
    renderProjects();
    showToast("Projek berhasil dihapus!", "success");
  });
}

function toggleProjectSubtask(projectId, index) {
  const project = State.projects.find(p => p.id === projectId);
  if (project && project.subprojects && project.subprojects[index] !== undefined) {
    project.subprojects[index].completed = !project.subprojects[index].completed;
    saveProjectsToStorage();
    // Refresh detail modal subtask list without full re-render
    const subListEl = document.getElementById('project-detail-subprojects');
    if (subListEl) {
      renderDetailSubprojects(project, subListEl);
    }
  }
}

function renderDetailSubprojects(project, container) {
  container.innerHTML = '';
  if (!project.subprojects || project.subprojects.length === 0) {
    container.innerHTML = '<span style="font-size:12px;color:var(--text-muted);font-style:italic;">Tidak ada sub-projek.</span>';
    return;
  }
  project.subprojects.forEach((sub, idx) => {
    const item = document.createElement('label');
    item.className = 'project-detail-subtask-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = sub.completed;
    cb.addEventListener('change', () => toggleProjectSubtask(project.id, idx));
    const name = document.createElement('span');
    name.className = `project-detail-subtask-name${sub.completed ? ' done' : ''}`;
    name.textContent = sub.name;
    item.appendChild(cb);
    item.appendChild(name);
    container.appendChild(item);
  });
}

// ---- Project Detail Modal ----
function openProjectDetailModal(projectId) {
  const project = State.projects.find(p => p.id === projectId);
  if (!project) return;

  // Populate header
  document.getElementById('project-detail-category').textContent = project.category || 'Tanpa Kategori';
  document.getElementById('project-detail-name').textContent = project.name;

  const urgencyBadge = document.getElementById('project-detail-urgency');
  urgencyBadge.textContent = project.urgency;
  urgencyBadge.className = `project-urgency-badge urgency-${(project.urgency || 'sedang').toLowerCase()}`;

  // Description
  const descEl = document.getElementById('project-detail-desc');
  descEl.textContent = project.desc || '(Tidak ada deskripsi)';

  // Project Link
  const linkContainer = document.getElementById('project-detail-link-container');
  const linkEl = document.getElementById('project-detail-link');
  const linkTextEl = document.getElementById('project-detail-link-text');
  if (project.link) {
    linkContainer.style.display = 'flex';
    linkEl.href = project.link;
    linkTextEl.textContent = project.link;
  } else {
    linkContainer.style.display = 'none';
    linkEl.href = '#';
    linkTextEl.textContent = '';
  }

  // Subprojects
  const subListEl = document.getElementById('project-detail-subprojects');
  renderDetailSubprojects(project, subListEl);

  // Dates
  document.getElementById('project-detail-date-concept').textContent = formatDate(project.dateConcept) || '-';
  document.getElementById('project-detail-date-ongoing').textContent = formatDate(project.dateOngoing) || '-';
  document.getElementById('project-detail-date-done').textContent = formatDate(project.dateDone) || '-';

  // Status action buttons
  const actionsEl = document.getElementById('project-detail-status-actions');
  actionsEl.innerHTML = '';

  if (project.status === 'concept') {
    const startBtn = document.createElement('button');
    startBtn.className = 'project-detail-status-btn start-btn';
    startBtn.innerHTML = 'Mulai ❯';
    startBtn.addEventListener('click', () => moveProjectStatus(project.id, 'ongoing'));
    actionsEl.appendChild(startBtn);
  } else if (project.status === 'ongoing') {
    const backBtn = document.createElement('button');
    backBtn.className = 'project-detail-status-btn';
    backBtn.innerHTML = '❮ Konsep';
    backBtn.addEventListener('click', () => moveProjectStatus(project.id, 'concept'));
    actionsEl.appendChild(backBtn);

    const doneBtn = document.createElement('button');
    doneBtn.className = 'project-detail-status-btn done-btn';
    doneBtn.innerHTML = 'Selesai ❯';
    doneBtn.addEventListener('click', () => moveProjectStatus(project.id, 'done'));
    actionsEl.appendChild(doneBtn);
  } else if (project.status === 'done') {
    const backConceptBtn = document.createElement('button');
    backConceptBtn.className = 'project-detail-status-btn';
    backConceptBtn.innerHTML = '❮ Konsep';
    backConceptBtn.addEventListener('click', () => moveProjectStatus(project.id, 'concept'));
    actionsEl.appendChild(backConceptBtn);

    const backOngoingBtn = document.createElement('button');
    backOngoingBtn.className = 'project-detail-status-btn';
    backOngoingBtn.innerHTML = '❮ Mulai';
    backOngoingBtn.addEventListener('click', () => moveProjectStatus(project.id, 'ongoing'));
    actionsEl.appendChild(backOngoingBtn);
  }

  // Edit and Delete button bindings
  const editBtn = document.getElementById('project-detail-btn-edit');
  if (editBtn) {
    const newEdit = editBtn.cloneNode(true);
    editBtn.parentNode.replaceChild(newEdit, editBtn);
    newEdit.addEventListener('click', () => {
      document.getElementById('project-detail-modal').classList.remove('active');
      openEditProjectModal(project.id);
    });
  }

  const delBtn = document.getElementById('project-detail-btn-delete');
  if (delBtn) {
    const newDel = delBtn.cloneNode(true);
    delBtn.parentNode.replaceChild(newDel, delBtn);
    newDel.addEventListener('click', () => deleteProject(project.id));
  }

  document.getElementById('project-detail-modal').classList.add('active');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// ---- Urgency sort weight ----
function urgencyWeight(urgency) {
  if (!urgency) return 1;
  const u = urgency.toLowerCase();
  if (u === 'tinggi') return 3;
  if (u === 'sedang') return 2;
  return 1;
}

function renderProjectStatsTimeline() {
  const container = document.getElementById('project-tracker-stats-container');
  if (!container) return;

  if (State.activeMode !== 'project') {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';

  const total = State.projects.length;
  const conceptCount = State.projects.filter(p => p.status === 'concept').length;
  const ongoingCount = State.projects.filter(p => p.status === 'ongoing').length;
  const doneCount = State.projects.filter(p => p.status === 'done').length;

  if (total === 0) {
    container.innerHTML = `
      <div class="project-timeline-container" style="text-align: center; font-size: 11px; color: var(--text-muted); padding: 12px;">
        Belum ada projek untuk dianalisis. Tambahkan projek baru untuk melihat progres timeline.
      </div>
    `;
    return;
  }

  const conceptPercent = Math.round((conceptCount / total) * 100);
  const ongoingPercent = Math.round((ongoingCount / total) * 100);
  const donePercent = 100 - conceptPercent - ongoingPercent;

  container.innerHTML = `
    <div class="project-timeline-container">
      <div class="project-timeline-labels">
        <span style="font-size: 10px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Progres Projek Keseluruhan</span>
        <span style="font-size: 10px; font-weight: 700; color: var(--text-secondary);"><span style="color: var(--accent-blue); font-weight: 800;">${total}</span> Total Projek</span>
      </div>
      <div class="project-timeline-bar-wrapper">
        <div class="project-timeline-segment concept" style="width: ${conceptPercent}%;" title="Konsep: ${conceptCount} (${conceptPercent}%)"></div>
        <div class="project-timeline-segment ongoing" style="width: ${ongoingPercent}%;" title="Sedang Berjalan: ${ongoingCount} (${ongoingPercent}%)"></div>
        <div class="project-timeline-segment done" style="width: ${donePercent}%;" title="Selesai: ${doneCount} (${donePercent}%)"></div>
      </div>
      <div class="project-timeline-labels" style="margin-top: 2px;">
        <div class="project-timeline-label-item">
          <span class="project-timeline-dot concept"></span>
          <span>Konsep:</span>
          <span class="project-timeline-label-val">${conceptCount}</span>
          <span style="color: var(--text-muted); font-size: 9px; font-weight: 500;">(${conceptPercent}%)</span>
        </div>
        <div class="project-timeline-label-item">
          <span class="project-timeline-dot ongoing"></span>
          <span>Berjalan:</span>
          <span class="project-timeline-label-val">${ongoingCount}</span>
          <span style="color: var(--text-muted); font-size: 9px; font-weight: 500;">(${ongoingPercent}%)</span>
        </div>
        <div class="project-timeline-label-item">
          <span class="project-timeline-dot done"></span>
          <span>Selesai:</span>
          <span class="project-timeline-label-val">${doneCount}</span>
          <span style="color: var(--text-muted); font-size: 9px; font-weight: 500;">(${donePercent}%)</span>
        </div>
      </div>
    </div>
  `;
}

// ---- renderProjects (compact, collapsible, draggable) ----
function renderProjects() {
  renderProjectStatsTimeline();

  const activeStatus = State.activeTab;
  if (!['concept', 'ongoing', 'done'].includes(activeStatus)) return;

  const container = document.getElementById(`project-list-${activeStatus}`);
  if (!container) return;

  const tabTitles = {
    'concept': '💡 Concept / Ide Projek',
    'ongoing': '⚙️ Projek Sedang Berjalan',
    'done': '✔ Projek Selesai',
  };
  const titleHtml = `<h2 class="tab-internal-title" style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 4px; margin-bottom: 12px; font-family: 'Outfit', sans-serif; text-align: left;">${tabTitles[activeStatus]}</h2>`;

  container.innerHTML = titleHtml;

  const tabProjects = State.projects.filter(p => p.status === activeStatus);

  if (tabProjects.length === 0) {
    container.innerHTML += `
      <div class="empty-tasks-view" style="text-align:center; padding: 20px;">
        <div class="empty-tasks-icon">📋</div>
        <h3>Belum Ada Projek</h3>
        <p>Klik tombol + di bawah untuk menambahkan projek baru.</p>
      </div>
    `;
    return;
  }

  // Group by category
  const categoriesMap = {};
  tabProjects.forEach(p => {
    const cat = p.category || 'Tanpa Kategori';
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(p);
  });

  // Determine category display order: use projectCategoryOrder first, then alphabetical for new ones
  const allCats = Object.keys(categoriesMap);
  const orderedCats = [
    ...(State.projectCategoryOrder || []).filter(c => allCats.includes(c)),
    ...allCats.filter(c => !(State.projectCategoryOrder || []).includes(c)).sort((a, b) => a.localeCompare(b))
  ];

  orderedCats.forEach((catName, catIdx) => {
    const projs = categoriesMap[catName];
    
    // Sort by urgency desc, then sortOrder, then dateConcept
    projs.sort((a, b) => {
      const wDiff = urgencyWeight(b.urgency) - urgencyWeight(a.urgency);
      if (wDiff !== 0) return wDiff;
      const soA = typeof a.sortOrder === 'number' ? a.sortOrder : 9999;
      const soB = typeof b.sortOrder === 'number' ? b.sortOrder : 9999;
      if (soA !== soB) return soA - soB;
      return new Date(a.dateConcept || 0) - new Date(b.dateConcept || 0);
    });

    const catKey = `${activeStatus}::${catName}`;
    const isCollapsed = (State.collapsedCategories || []).includes(catKey);

    const catSection = document.createElement('div');
    catSection.className = 'project-category-section';
    catSection.setAttribute('data-cat-name', catName);
    catSection.setAttribute('data-cat-idx', catIdx);
    catSection.setAttribute('draggable', 'true');

    // Category header
    const catHeader = document.createElement('div');
    catHeader.className = `project-category-header ${activeStatus}`;
    catHeader.innerHTML = `
      <span class="category-collapse-arrow${isCollapsed ? ' collapsed' : ''}">▼</span>
      <span style="flex-grow:1;">${catName}</span>
      <span class="project-category-count">${projs.length}</span>
      <button class="btn btn-primary btn-sm project-add-in-cat" data-status="${activeStatus}" title="Tambah projek di kategori ini" style="padding:2px 8px;font-size:10px;margin-left:6px;border-radius:4px;" onclick="openAddProjectModal('${activeStatus}')">+</button>
    `;
    catHeader.addEventListener('click', (e) => {
      if (e.target.closest('.project-add-in-cat')) return;
      toggleCategoryCollapse(catKey);
    });

    // Category drag events
    catSection.addEventListener('dragstart', (e) => {
      e.stopPropagation();
      e.dataTransfer.setData('text/cat-drag', catName);
      e.dataTransfer.setData('text/cat-status', activeStatus);
      catSection.classList.add('cat-dragging');
      setTimeout(() => catSection.style.opacity = '0.4', 0);
    });
    catSection.addEventListener('dragend', () => {
      catSection.classList.remove('cat-dragging');
      catSection.style.opacity = '';
      document.querySelectorAll('.project-category-section').forEach(s => s.classList.remove('cat-drag-over'));
    });
    catSection.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types.includes('text/cat-drag')) {
        e.preventDefault();
        catSection.classList.add('cat-drag-over');
      }
    });
    catSection.addEventListener('dragleave', () => {
      catSection.classList.remove('cat-drag-over');
    });
    catSection.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      catSection.classList.remove('cat-drag-over');
      const draggedCat = e.dataTransfer.getData('text/cat-drag');
      const dragStatus = e.dataTransfer.getData('text/cat-status');
      if (!draggedCat || dragStatus !== activeStatus || draggedCat === catName) return;
      // Reorder projectCategoryOrder
      if (!State.projectCategoryOrder || State.projectCategoryOrder.length === 0) {
        State.projectCategoryOrder = orderedCats.slice();
      }
      const allOrder = State.projectCategoryOrder;
      const fromIdx = allOrder.indexOf(draggedCat);
      const toIdx = allOrder.indexOf(catName);
      if (fromIdx !== -1 && toIdx !== -1) {
        allOrder.splice(fromIdx, 1);
        allOrder.splice(toIdx, 0, draggedCat);
      } else if (fromIdx === -1) {
        // Insert before target
        const insertAt = toIdx !== -1 ? toIdx : allOrder.length;
        allOrder.splice(insertAt, 0, draggedCat);
      }
      State.projectCategoryOrder = allOrder;
      saveProjectsToStorage();
      renderProjects();
    });

    catSection.appendChild(catHeader);

    // Project grid (collapsible)
    const grid = document.createElement('div');
    grid.className = `project-grid${isCollapsed ? ' collapsed' : ''}`;
    grid.setAttribute('data-cat-name', catName);

    // Grid drop zone for cross-category moves
    grid.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types.includes('text/proj-drag')) {
        e.preventDefault();
        catSection.classList.add('dragging-over');
      }
    });
    grid.addEventListener('dragleave', () => {
      catSection.classList.remove('dragging-over');
    });
    grid.addEventListener('drop', (e) => {
      e.preventDefault();
      catSection.classList.remove('dragging-over');
      const projId = e.dataTransfer.getData('text/proj-drag');
      if (!projId) return;
      const proj = State.projects.find(p => p.id === projId);
      if (!proj) return;
      // Move to this category
      if (proj.category !== catName) {
        proj.category = catName;
        if (!State.projectCategories.includes(catName)) State.projectCategories.push(catName);
        // Set sortOrder to end of this category
        const maxOrder = projs.reduce((m, p) => Math.max(m, p.sortOrder || 0), 0);
        proj.sortOrder = maxOrder + 1;
        saveProjectsToStorage();
        renderProjects();
      }
    });

    projs.forEach((project, projIdx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('draggable', 'true');
      card.setAttribute('data-proj-id', project.id);

      // Card content: header row only (name + urgency badge)
      const headerDiv = document.createElement('div');
      headerDiv.className = 'project-card-header';
      const linkIcon = project.link ? ' <span title="Memiliki link/tautan" style="font-size: 10px; opacity: 0.6; cursor: pointer; flex-shrink: 0; margin-left: 4px;">🔗</span>' : '';
      headerDiv.innerHTML = `
        <h3 class="project-card-title">${project.name}${linkIcon}</h3>
        <span class="project-urgency-badge urgency-${(project.urgency || 'sedang').toLowerCase()}">${project.urgency}</span>
      `;
      card.appendChild(headerDiv);

      // Click opens detail modal
      card.addEventListener('click', () => openProjectDetailModal(project.id));

      // Card drag events
      card.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/proj-drag', project.id);
        e.dataTransfer.setData('text/proj-cat', catName);
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        document.querySelectorAll('.project-card.drag-over').forEach(c => c.classList.remove('drag-over'));
      });
      card.addEventListener('dragover', (e) => {
        if (e.dataTransfer.types.includes('text/proj-drag')) {
          e.preventDefault();
          e.stopPropagation();
          card.classList.add('drag-over');
        }
      });
      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.remove('drag-over');
        const projId = e.dataTransfer.getData('text/proj-drag');
        if (!projId || projId === project.id) return;
        const draggedProj = State.projects.find(p => p.id === projId);
        if (!draggedProj) return;
        // Move to same category (reorder by swapping sortOrder)
        draggedProj.category = catName;
        // Assign sortOrder based on drop position
        const targetOrder = typeof project.sortOrder === 'number' ? project.sortOrder : projIdx;
        const draggedOrder = typeof draggedProj.sortOrder === 'number' ? draggedProj.sortOrder : 9999;
        draggedProj.sortOrder = targetOrder - 0.5;
        // Normalize sortOrders for this category
        const catProjs = State.projects.filter(p => p.category === catName && p.status === activeStatus);
        catProjs.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        catProjs.forEach((p, i) => p.sortOrder = i);
        if (!State.projectCategories.includes(catName)) State.projectCategories.push(catName);
        saveProjectsToStorage();
        renderProjects();
      });

      grid.appendChild(card);
    });

    catSection.appendChild(grid);
    container.appendChild(catSection);
  });

}

// --- Daily & Monthly Finance Core Functions ---

function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

function renderDailyFinance() {
  const dateStr = getISODateString(State.currentDate);
  const record = State.history[dateStr];
  const financeList = (record && record.finance) ? record.finance : [];

  const listContainer = document.getElementById('daily-finance-list');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  let totalIncome = 0;
  let totalExpense = 0;

  if (financeList.length === 0) {
    listContainer.innerHTML = `<p class="text-xs text-muted" style="font-style: italic; margin-bottom: 12px; font-size: 11px;">Belum ada transaksi keuangan hari ini.</p>`;
  } else {
    // Sort with newest transactions displayed first
    const sortedFinance = [...financeList].sort((a, b) => {
      const tA = parseInt(a.id.split('-')[1]) || 0;
      const tB = parseInt(b.id.split('-')[1]) || 0;
      if (tA !== tB) return tB - tA;
      return (b.time || '').localeCompare(a.time || '');
    });

    sortedFinance.forEach(item => {
      const isIncome = item.type === 'pemasukan';
      const typeSign = isIncome ? '+' : '-';
      const amountClass = isIncome ? 'finance-amount income' : 'finance-amount expense';
      const timeHTML = item.time ? `<div style="font-size: 10px; color: var(--text-muted); text-align: right; margin-top: 2px;">${item.time}</div>` : '';
      
      const itemRow = document.createElement('div');
      itemRow.className = 'finance-item-row';
      itemRow.innerHTML = `
        <div class="finance-item-left">
          <div class="finance-item-title">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
          <div class="finance-item-desc">${item.description || ''}</div>
        </div>
        <div class="finance-item-right">
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <div class="${amountClass}">${typeSign} ${formatRupiah(item.amount)}</div>
            ${timeHTML}
          </div>
          <div class="finance-actions">
            <button class="finance-action-btn edit-btn" onclick="openEditFinanceModal('${item.id}')" title="Ubah">✏️</button>
            <button class="finance-action-btn delete-btn" onclick="confirmDeleteFinance('${item.id}')" title="Hapus">🗑️</button>
          </div>
        </div>
      `;
      listContainer.appendChild(itemRow);
    });

    // Calculate totals using all items
    financeList.forEach(item => {
      const isIncome = item.type === 'pemasukan';
      if (isIncome) {
        totalIncome += Number(item.amount);
      } else {
        totalExpense += Number(item.amount);
      }
    });
  }

  const dailyTotalIncomeEl = document.getElementById('daily-total-income');
  const dailyTotalExpenseEl = document.getElementById('daily-total-expense');
  if (dailyTotalIncomeEl) dailyTotalIncomeEl.textContent = formatRupiah(totalIncome);
  if (dailyTotalExpenseEl) dailyTotalExpenseEl.textContent = formatRupiah(totalExpense);
}

function renderMonthlyFinanceSummary(month, year) {
  const monthNamesId = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const monthLabel = document.getElementById('monthly-finance-month-label');
  if (monthLabel) {
    monthLabel.textContent = `${monthNamesId[month]} ${year}`;
  }

  let totalIncome = 0;
  let totalExpense = 0;
  
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyExpenses = Array(daysInMonth).fill(0);
  const categoryTotals = {};
  
  Object.keys(State.history).forEach(dateStr => {
    if (dateStr.startsWith(prefix)) {
      const dayNum = parseInt(dateStr.substring(8, 10));
      const record = State.history[dateStr];
      const financeList = record.finance || [];
      financeList.forEach(item => {
        if (item.type === 'pemasukan') {
          totalIncome += Number(item.amount);
        } else {
          const amt = Number(item.amount);
          totalExpense += amt;
          if (dayNum >= 1 && dayNum <= daysInMonth) {
            dailyExpenses[dayNum - 1] += amt;
          }
          
          const cat = (item.category || 'lainnya').toLowerCase().trim();
          categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
        }
      });
    }
  });

  const monthlyTotalIncomeEl = document.getElementById('monthly-total-income');
  const monthlyTotalExpenseEl = document.getElementById('monthly-total-expense');
  if (monthlyTotalIncomeEl) monthlyTotalIncomeEl.textContent = formatRupiah(totalIncome);
  if (monthlyTotalExpenseEl) monthlyTotalExpenseEl.textContent = formatRupiah(totalExpense);

  // Render Daily Expense Bar Chart inside card
  let highestDailyTotal = 0;
  let highestDailyDay = null;
  dailyExpenses.forEach((amt, idx) => {
    if (amt > highestDailyTotal) {
      highestDailyTotal = amt;
      highestDailyDay = idx + 1;
    }
  });

  const chartCanvas = document.getElementById('finance-daily-chart-canvas');
  if (chartCanvas) {
    if (highestDailyTotal === 0) {
      chartCanvas.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 11px; color: var(--text-muted); font-style: italic;">Belum ada pengeluaran bulan ini.</div>`;
      const yAxisEl = document.getElementById('finance-chart-y-axis');
      if (yAxisEl) {
        yAxisEl.innerHTML = '<span></span><span></span><span></span>';
      }
    } else {
      let barsHTML = "";
      const maxCanvasWidth = 240;
      const step = maxCanvasWidth / daysInMonth;
      const barWidth = Math.max(Math.floor(step - 2), 2);
      
      for (let i = 0; i < daysInMonth; i++) {
        const amt = dailyExpenses[i];
        const h = (amt / highestDailyTotal) * 110;
        const x = 10 + i * step;
        const y = 130 - h;
        
        barsHTML += `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="1" 
                fill="url(#expense-bar-grad)" style="cursor: pointer; transition: fill 0.2s;"
                onclick="showFinanceChartDayDetail(${i + 1}, ${amt})">
            <title>Tanggal ${i + 1}: ${formatRupiah(amt)}</title>
          </rect>
        `;
      }
      
      let xAxisHTML = "";
      for (let i = 0; i < daysInMonth; i++) {
        if ((i + 1) === 1 || (i + 1) % 5 === 0 || (i + 1) === daysInMonth) {
          const x = 10 + i * step + barWidth / 2;
          xAxisHTML += `<text x="${x}" y="145" fill="var(--text-muted)" font-size="8" text-anchor="middle">${i + 1}</text>`;
        }
      }
      
      chartCanvas.innerHTML = `
        <svg viewBox="0 0 260 150" width="100%" height="100%" style="overflow: visible;">
          <defs>
            <linearGradient id="expense-bar-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ef4444" />
              <stop offset="100%" stop-color="#f97316" stop-opacity="0.3" />
            </linearGradient>
          </defs>
          <g>
            <line x1="10" y1="130" x2="250" y2="130" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            ${barsHTML}
            ${xAxisHTML}
          </g>
        </svg>
      `;
      
      const yAxisEl = document.getElementById('finance-chart-y-axis');
      if (yAxisEl) {
        yAxisEl.innerHTML = `
          <span>${formatRupiah(highestDailyTotal)}</span>
          <span>${formatRupiah(Math.round(highestDailyTotal / 2))}</span>
          <span>Rp 0</span>
        `;
      }
    }
  }

  // Populate Insights Box
  const insightDayEl = document.getElementById('insight-largest-day');
  const insightCatEl = document.getElementById('insight-largest-category');
  
  if (insightDayEl) {
    if (highestDailyTotal > 0) {
      insightDayEl.textContent = `Tanggal ${highestDailyDay} (${formatRupiah(highestDailyTotal)})`;
    } else {
      insightDayEl.textContent = 'Belum ada pengeluaran';
    }
  }
  
  if (insightCatEl) {
    let largestCatName = '-';
    let largestCatAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > largestCatAmount) {
        largestCatAmount = amt;
        largestCatName = cat;
      }
    });
    
    if (largestCatAmount > 0) {
      insightCatEl.textContent = `${largestCatName.charAt(0).toUpperCase() + largestCatName.slice(1)} (${formatRupiah(largestCatAmount)})`;
    } else {
      insightCatEl.textContent = 'Belum ada pengeluaran';
    }
  }
}

// Function to handle chart day clicks
window.showFinanceChartDayDetail = function(day, amount) {
  const label = document.getElementById('finance-chart-info-label');
  if (label) {
    const monthNamesId = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    label.innerHTML = `Tanggal ${day} ${monthNamesId[currentCalMonth]}: <strong style="color:var(--danger-red);">${formatRupiah(amount)}</strong>`;
  }
};

function openMonthlyFinanceChartModal() {
  const month = currentCalMonth;
  const year = currentCalYear;
  
  const monthNamesId = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const titleEl = document.getElementById('monthly-finance-chart-title');
  if (titleEl) {
    titleEl.textContent = `Analisis Anggaran: ${monthNamesId[month]} ${year}`;
  }
  
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  
  const incomeBreakdown = {};
  const expenseBreakdown = {};
  
  const predefinedIncome = ['gaji', 'lainnya'];
  const predefinedExpense = ['makan', 'minum', 'snack', 'belanja', 'bensin', 'kuota', 'lainnya'];
  
  predefinedIncome.forEach(cat => incomeBreakdown[cat] = 0);
  predefinedExpense.forEach(cat => expenseBreakdown[cat] = 0);
  
  let totalIncome = 0;
  let totalExpense = 0;
  
  Object.keys(State.history).forEach(dateStr => {
    if (dateStr.startsWith(prefix)) {
      const record = State.history[dateStr];
      const financeList = record.finance || [];
      financeList.forEach(item => {
        const cat = (item.category || 'lainnya').toLowerCase().trim();
        const amt = Number(item.amount) || 0;
        if (item.type === 'pemasukan') {
          incomeBreakdown[cat] = (incomeBreakdown[cat] || 0) + amt;
          totalIncome += amt;
        } else {
          expenseBreakdown[cat] = (expenseBreakdown[cat] || 0) + amt;
          totalExpense += amt;
        }
      });
    }
  });
  
  const incomeListEl = document.getElementById('monthly-income-chart-list');
  if (incomeListEl) {
    incomeListEl.innerHTML = '';
    if (totalIncome === 0) {
      incomeListEl.innerHTML = '<p class="text-xs text-muted" style="font-style: italic; font-size: 11px;">Belum ada data pemasukan.</p>';
    } else {
      const sortedIncome = Object.entries(incomeBreakdown)
        .filter(([_, amt]) => amt > 0)
        .sort((a, b) => b[1] - a[1]);
        
      if (sortedIncome.length === 0) {
        incomeListEl.innerHTML = '<p class="text-xs text-muted" style="font-style: italic; font-size: 11px;">Belum ada data pemasukan.</p>';
      } else {
        sortedIncome.forEach(([cat, amt]) => {
          const percent = (amt / totalIncome) * 100;
          const itemEl = document.createElement('div');
          itemEl.className = 'finance-chart-item';
          itemEl.innerHTML = `
            <div class="finance-chart-info" style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span class="finance-chart-label" style="text-transform: capitalize; font-weight: 500;">${cat}</span>
              <span class="finance-chart-value" style="color: var(--text-secondary);">${formatRupiah(amt)} (${percent.toFixed(1)}%)</span>
            </div>
            <div class="finance-chart-bar-bg" style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden; width: 100%;">
              <div class="finance-chart-bar-fill income" style="background: var(--success-green); height: 100%; width: ${percent}%; border-radius: 4px; box-shadow: 0 0 8px var(--success-green);"></div>
            </div>
          `;
          incomeListEl.appendChild(itemEl);
        });
      }
    }
  }
  
  const expenseListEl = document.getElementById('monthly-expense-chart-list');
  if (expenseListEl) {
    expenseListEl.innerHTML = '';
    if (totalExpense === 0) {
      expenseListEl.innerHTML = '<p class="text-xs text-muted" style="font-style: italic; font-size: 11px;">Belum ada data pengeluaran.</p>';
    } else {
      const sortedExpense = Object.entries(expenseBreakdown)
        .filter(([_, amt]) => amt > 0)
        .sort((a, b) => b[1] - a[1]);
        
      if (sortedExpense.length === 0) {
        expenseListEl.innerHTML = '<p class="text-xs text-muted" style="font-style: italic; font-size: 11px;">Belum ada data pengeluaran.</p>';
      } else {
        sortedExpense.forEach(([cat, amt]) => {
          const percent = (amt / totalExpense) * 100;
          const itemEl = document.createElement('div');
          itemEl.className = 'finance-chart-item';
          itemEl.innerHTML = `
            <div class="finance-chart-info" style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span class="finance-chart-label" style="text-transform: capitalize; font-weight: 500;">${cat}</span>
              <span class="finance-chart-value" style="color: var(--text-secondary);">${formatRupiah(amt)} (${percent.toFixed(1)}%)</span>
            </div>
            <div class="finance-chart-bar-bg" style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden; width: 100%;">
              <div class="finance-chart-bar-fill expense" style="background: var(--danger-red); height: 100%; width: ${percent}%; border-radius: 4px; box-shadow: 0 0 8px var(--danger-red);"></div>
            </div>
          `;
          expenseListEl.appendChild(itemEl);
        });
      }
    }
  }
  
  const chartModal = document.getElementById('monthly-finance-chart-modal');
  if (chartModal) {
    chartModal.classList.add('active');
  }
}

function openFinanceChoiceModal() {
  document.getElementById('add-choice-modal').classList.remove('active');
  document.getElementById('finance-choice-modal').classList.add('active');
}

// Ensure the helper is exported to window for SVG inline calls
window.showFinanceChartDayDetail = showFinanceChartDayDetail;

function openAddFinanceModal(type) {
  document.getElementById('finance-choice-modal').classList.remove('active');
  
  document.getElementById('finance-edit-id').value = '';
  document.getElementById('finance-type').value = type;
  document.getElementById('finance-amount').value = '';
  document.getElementById('finance-description').value = '';
  
  const formTitleEl = document.getElementById('finance-form-title');
  if (formTitleEl) {
    formTitleEl.textContent = type === 'pemasukan' ? 'Tambah Pemasukan' : 'Tambah Pengeluaran';
  }
  
  populateFinanceCategories(type);
  
  document.getElementById('finance-form-modal').classList.add('active');
}

function populateFinanceCategories(type, selectedValue = '') {
  const selectEl = document.getElementById('finance-category');
  if (!selectEl) return;
  selectEl.innerHTML = '';
  
  const categories = type === 'pemasukan' 
    ? ['gaji', 'lainnya']
    : ['makan', 'minum', 'snack', 'belanja', 'bensin', 'kuota', 'lainnya'];
    
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    if (cat === selectedValue.toLowerCase()) {
      opt.selected = true;
    }
    selectEl.appendChild(opt);
  });
}

function openEditFinanceModal(itemId) {
  const dateStr = getISODateString(State.currentDate);
  const record = State.history[dateStr];
  if (!record || !record.finance) return;
  
  const item = record.finance.find(t => t.id === itemId);
  if (!item) return;
  
  document.getElementById('finance-edit-id').value = item.id;
  document.getElementById('finance-type').value = item.type;
  // Format with thousand separators on edit load
  document.getElementById('finance-amount').value = Number(item.amount).toLocaleString('id-ID');
  document.getElementById('finance-description').value = item.description || '';
  
  const formTitleEl = document.getElementById('finance-form-title');
  if (formTitleEl) {
    formTitleEl.textContent = item.type === 'pemasukan' ? 'Ubah Pemasukan' : 'Ubah Pengeluaran';
  }
  
  populateFinanceCategories(item.type, item.category);
  
  document.getElementById('finance-form-modal').classList.add('active');
}

function confirmDeleteFinance(itemId) {
  showConfirm(
    "Hapus Transaksi",
    "Apakah Anda yakin ingin menghapus transaksi keuangan ini?",
    () => {
      const dateStr = getISODateString(State.currentDate);
      const record = State.history[dateStr];
      if (record && record.finance) {
        record.finance = record.finance.filter(t => t.id !== itemId);
        saveHistoryToStorage();
        renderDailyFinance();
        renderMonthlyFinanceSummary(currentCalMonth, currentCalYear);
        showToast("Transaksi berhasil dihapus");
      }
    }
  );
}

// Bind to window for global access
window.openAddProjectModal = openAddProjectModal;
window.openEditProjectModal = openEditProjectModal;
window.moveProjectStatus = moveProjectStatus;
window.deleteProject = deleteProject;
window.toggleProjectSubtask = toggleProjectSubtask;
window.saveProject = saveProject;
window.addProjectSubtaskRow = addProjectSubtaskRow;
window.applyActiveMode = applyActiveMode;
window.renderProjects = renderProjects;
window.openProjectDetailModal = openProjectDetailModal;
window.toggleCategoryCollapse = toggleCategoryCollapse;
window.showPrompt = showPrompt;
window.renderProjectStatsTimeline = renderProjectStatsTimeline;
window.openEditFinanceModal = openEditFinanceModal;
window.confirmDeleteFinance = confirmDeleteFinance;
window.renderDailyFinance = renderDailyFinance;
window.renderMonthlyFinanceSummary = renderMonthlyFinanceSummary;
window.openMonthlyFinanceChartModal = openMonthlyFinanceChartModal;
window.openFinanceChoiceModal = openFinanceChoiceModal;
window.openAddFinanceModal = openAddFinanceModal;

// --- Window load execution init ---
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
