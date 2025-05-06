// Theme management
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Load saved theme preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');
  updateThemeIcon(savedTheme === 'dark');
}

// Update theme icon
function updateThemeIcon(isDark) {
  themeIcon.classList.remove('fa-sun', 'fa-moon');
  themeIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
}

// Toggle theme
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

// Add theme toggle event listener
themeToggleBtn.addEventListener('click', toggleTheme);

// Schedule data (WITA timezone)
const scheduleData = {
  monday: [
    { subject: "TJKN", teacher: "Ardian Lionardi", start: "07:55", end: "09:55" },
    { subject: "ISTIRAHAT 1", teacher: "", start: "09:55", end: "10:25" },
    { subject: "TJKN", teacher: "Ardian Lionardi", start: "10:25", end: "11:05" },
    { subject: "Pend. Agama islam dan bp", teacher: "Fahri Ansar Potabuga", start: "11:05", end: "12:25" },
    { subject: "ISTIRAHAT II DAN SHOLAT DZUHUR", teacher: "", start: "12:25", end: "13:25" },
    { subject: "Pend. Agama islam dan bp", teacher: "Fahri Ansar Potabuga", start: "13:25", end: "14:05" },
    { subject: "P2J", teacher: "M. Azar Al Fitrah", start: "14:05", end: "16:10" }
  ],
  tuesday: [
    { subject: "MATA PELAJARAN PILIHAN", teacher: "", start: "07:15", end: "09:55" },
    { subject: "ISTIRAHAT 1", teacher: "", start: "09:55", end: "10:25" },
    { subject: "Bahasa Dayak Kenyah", teacher: "Septiana Lenjau", start: "10:25", end: "11:45" },
    { subject: "Keamanan Jaringan", teacher: "M.Nurfajri", start: "11:45", end: "12:25" },
    { subject: "ISTIRAHAT II DAN SHOLAT DZUHUR", teacher: "", start: "12:25", end: "13:25" },
    { subject: "Keamanan Jaringan", teacher: "M.Nurfajri", start: "13:25", end: "15:30" }
  ],
  wednesday: [
    { subject: "Pemasangan KonfigurasiJar", teacher: "M. Azar Al Fitrah", start: "07:15", end: "09:55" },
    { subject: "ISTIRAHAT 1", teacher: "", start: "09:55", end: "10:25" },
    { subject: "Administrasi Sistem Jaringan", teacher: "Robiansyah", start: "10:25", end: "12:25" },
    { subject: "ISTIRAHAT II DAN SHOLAT DZUHUR", teacher: "", start: "12:25", end: "13:25" },
    { subject: "Bahasa Indonesia", teacher: "Sheyla Adeline", start: "13:35", end: "15:30" }
  ],
  thursday: [
    { subject: "Bahasa Inggris", teacher: "Vicky Priyadi", start: "07:15", end: "08:35" },
    { subject: "Matematika", teacher: "Penty Farida", start: "08:35", end: "09:55" },
    { subject: "ISTIRAHAT 1", teacher: "", start: "09:55", end: "10:25" },
    { subject: "Matematika", teacher: "Penty Farida", start: "10:25", end: "11:05" },
    { subject: "Projek Kreatif & Kewirausahaan", teacher: "Zulkifli", start: "11:05", end: "12:25" },
    { subject: "ISTIRAHAT II DAN SHOLAT DZUHUR", teacher: "", start: "12:25", end: "13:25" },
    { subject: "Projek Kreatif & Kewirausahaan", teacher: "Zulkifli", start: "13:35", end: "15:30" }
  ],
  friday: [
    { subject: "Bahasa Inggris", teacher: "Vicky Priyadi", start: "07:15", end: "08:35" },
    { subject: "PJOK", teacher: "Mia Normasari", start: "08:35", end: "09:55" },
    { subject: "ISTIRAHAT 1", teacher: "", start: "09:55", end: "10:25" },
    { subject: "Pendidikan Pancasila", teacher: "Juanda", start: "10:25", end: "11:45" },
    { subject: "WAKTU IBADAH (Sholat Jumat/Ibadah Keagamaan)", teacher: "", start: "11:45", end: "13:25" },
    { subject: "Sejarah", teacher: "Yekti Bambang Priono", start: "13:25", end: "14:50" }
  ]
};

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

// DOM elements
const currentTimeEl = document.getElementById('current-time');
const currentDateEl = document.getElementById('current-date');
const currentSubjectEl = document.getElementById('current-subject');
const currentTimeRangeEl = document.getElementById('current-time-range');
const currentTeacherEl = document.getElementById('current-teacher');
const timeLeftEl = document.getElementById('time-left');
const progressFillEl = document.getElementById('progress-fill');
const nextSubjectEl = document.getElementById('next-subject');
const nextTimeRangeEl = document.getElementById('next-time-range');
const nextTeacherEl = document.getElementById('next-teacher');
const nextInEl = document.getElementById('next-in');
const scheduleContentEl = document.getElementById('schedule-content');
const dayButtons = document.querySelectorAll('.day-btn');

// Update current time
function updateCurrentTime() {
  const now = new Date();
  
  // Format waktu (WITA UTC+8)
  const options = { 
    timeZone: 'Asia/Makassar',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const timeString = now.toLocaleTimeString('id-ID', options);
  currentTimeEl.textContent = timeString;
  
  // Format tanggal
  const dateOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    timeZone: 'Asia/Makassar'
  };
  currentDateEl.textContent = now.toLocaleDateString('id-ID', dateOptions);
  
  return now;
}

// Konversi string waktu ke objek Date (WITA timezone)
function timeStringToDate(timeString) {
  const now = new Date();
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(now);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  // Sesuaikan dengan timezone WITA (UTC+8)
  const timezoneOffset = 8 * 60;
  const localOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + localOffset + timezoneOffset);
  return date;
}

// Temukan kelas saat ini dan kelas berikutnya
function findCurrentAndNextClasses(now) {
  let dayIndex = now.getDay() - 1;
  if (dayIndex < 0 || dayIndex > 4) {
    return { current: null, next: null };
  }
  
  const dayKey = dayKeys[dayIndex];
  const todaySchedule = scheduleData[dayKey];
  
  let currentClass = null;
  let nextClass = null;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  for (let i = 0; i < todaySchedule.length; i++) {
    const classItem = todaySchedule[i];
    const startTime = timeStringToDate(classItem.start);
    const endTime = timeStringToDate(classItem.end);
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      currentClass = { ...classItem, startTime, endTime };
      if (i < todaySchedule.length - 1) {
        const nextClassItem = todaySchedule[i + 1];
        nextClass = { 
          ...nextClassItem, 
          startTime: timeStringToDate(nextClassItem.start),
          endTime: timeStringToDate(nextClassItem.end)
        };
      }
      break;
    } else if (currentMinutes < startMinutes && !nextClass) {
      nextClass = { ...classItem, startTime, endTime };
    }
  }
  
  return { current: currentClass, next: nextClass };
}

// Update informasi kelas saat ini dan berikutnya
function updateClassInfo() {
  const now = updateCurrentTime();
  const { current, next } = findCurrentAndNextClasses(now);
  
  if (current) {
    currentSubjectEl.textContent = current.subject;
    currentTimeRangeEl.textContent = `${current.start} - ${current.end}`;
    currentTeacherEl.textContent = current.teacher || "-";
    
    const timeLeftMs = current.endTime - now;
    const timeLeftMinutes = Math.max(0, Math.floor(timeLeftMs / (1000 * 60)));
    
    if (timeLeftMinutes > 0) {
      if (timeLeftMinutes > 60) {
        const hours = Math.floor(timeLeftMinutes / 60);
        const minutes = timeLeftMinutes % 60;
        timeLeftEl.textContent = `${hours} jam ${minutes} menit`;
      } else {
        timeLeftEl.textContent = `${timeLeftMinutes} menit`;
      }
      const totalDurationMs = current.endTime - current.startTime;
      const elapsedMs = now - current.startTime;
      const progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalDurationMs) * 100));
      progressFillEl.style.width = `${progressPercent}%`;
    } else {
      timeLeftEl.textContent = "Selesai";
      progressFillEl.style.width = "100%";
    }
  } else {
    currentSubjectEl.textContent = "Tidak ada kelas saat ini";
    currentTimeRangeEl.textContent = "-";
    currentTeacherEl.textContent = "-";
    timeLeftEl.textContent = "-";
    progressFillEl.style.width = "0%";
  }
  
  if (next) {
    nextSubjectEl.textContent = next.subject;
    nextTimeRangeEl.textContent = `${next.start} - ${next.end}`;
    nextTeacherEl.textContent = next.teacher || "-";
    
    const timeUntilNextMs = next.startTime - now;
    const timeUntilNextMinutes = Math.max(0, Math.floor(timeUntilNextMs / (1000 * 60)));
    
    if (timeUntilNextMinutes > 0) {
      if (timeUntilNextMinutes > 60) {
        const hours = Math.floor(timeUntilNextMinutes / 60);
        const minutes = timeUntilNextMinutes % 60;
        nextInEl.textContent = `${hours} jam ${minutes} menit`;
      } else {
        nextInEl.textContent = `${timeUntilNextMinutes} menit`;
      }
    } else {
      nextInEl.textContent = "Segera dimulai";
    }
  } else {
    nextSubjectEl.textContent = "Tidak ada kelas berikutnya";
    nextTimeRangeEl.textContent = "-";
    nextTeacherEl.textContent = "-";
    nextInEl.textContent = "-";
  }
}

// Load jadwal untuk hari tertentu
function loadSchedule(dayIndex) {
  const dayKey = dayKeys[dayIndex];
  const daySchedule = scheduleData[dayKey];
  
  let html = `
    <h4 class="text-xl font-bold text-gray-800 mb-4">${days[dayIndex]}</h4>
    <div class="space-y-4">
  `;
  
  daySchedule.forEach((classItem) => {
    const isBreak = classItem.subject.toLowerCase().includes('istirahat');
    const isCurrent = isCurrentClass(dayIndex, classItem.start, classItem.end);
    html += `
      <div class="schedule-day p-4 rounded-lg border ${isCurrent ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'} ${isBreak ? 'bg-gray-50' : ''}">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="mb-2 md:mb-0">
            <h5 class="font-semibold ${isBreak ? 'text-gray-600' : 'text-gray-800'}">${classItem.subject}</h5>
            ${classItem.teacher ? `<p class="text-sm text-gray-600 mt-1">${classItem.teacher}</p>` : ''}
          </div>
          <div class="flex items-center">
            <span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${isBreak ? 'bg-gray-200 text-gray-700' : 'bg-indigo-100 text-indigo-800'}">
              ${classItem.start} - ${classItem.end}
            </span>
            ${isCurrent ? '<span class="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Sedang Berlangsung</span>' : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  scheduleContentEl.innerHTML = html;
}

// Fungsi untuk mengecek apakah kelas sedang berlangsung
function isCurrentClass(dayIndex, startTime, endTime) {
  const now = new Date();
  const currentDayIndex = now.getDay() - 1;
  if (currentDayIndex !== dayIndex) return false;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  return nowMinutes >= startMinutes && nowMinutes < endMinutes;
}

// Inisialisasi tombol hari
function initDayButtons() {
  dayButtons.forEach(button => {
    button.addEventListener('click', () => {
      dayButtons.forEach(btn => {
        btn.classList.remove('bg-indigo-100', 'text-indigo-700', 'active-day');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
      button.classList.add('bg-indigo-100', 'text-indigo-700', 'active-day');
      button.classList.remove('bg-gray-100', 'text-gray-700');
      const dayIndex = parseInt(button.dataset.day);
      loadSchedule(dayIndex);
    });
  });
  const now = new Date();
  let currentDayIndex = now.getDay() - 1;
  if (currentDayIndex < 0 || currentDayIndex > 4) currentDayIndex = 0;
  dayButtons[currentDayIndex].click();
}

// Inisialisasi aplikasi
function init() {
  loadTheme();
  updateClassInfo();
  setInterval(updateClassInfo, 1000);
  initDayButtons();
}

document.addEventListener('DOMContentLoaded', init);
