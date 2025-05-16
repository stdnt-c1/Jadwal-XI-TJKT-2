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
  loadAssignments(); // Reload assignments to update their appearance
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

// Assignments Database Setup
let db;
const DB_NAME = 'AssignmentsDB';
const STORE_NAME = 'assignments';

const initDB = () => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
        console.error('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        
        store.createIndex('subject', 'subject', { unique: false });
        store.createIndex('dueDate', 'dueDate', { unique: false });
        store.createIndex('status', 'status', { unique: false });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadAssignments();
    };
};

// Assignment CRUD Operations
const addAssignment = (assignment) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Set default values
        assignment.createdAt = assignment.createdAt || new Date().toISOString();
        assignment.status = 'active';
        if (!assignment.dueDate) {
            const defaultDue = new Date();
            defaultDue.setDate(defaultDue.getDate() + 30);
            assignment.dueDate = defaultDue.toISOString().split('T')[0];
        }

        const request = store.add(assignment);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const getAssignments = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const updateAssignment = (id, updates) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.get(id);
        request.onsuccess = () => {
            const assignment = { ...request.result, ...updates };
            store.put(assignment);
            resolve();
        };
        request.onerror = () => reject(request.error);
    });
};

const deleteAssignment = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// UI Functions
const loadAssignments = async () => {
    try {
        const assignments = await getAssignments();
        const tbody = document.getElementById('assignments-table-body');
        tbody.innerHTML = '';
        const isDarkMode = document.body.classList.contains('dark');

        assignments.sort((a, b) => {
            if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        }).forEach(assignment => {
            const now = new Date();
            const dueDate = new Date(assignment.dueDate);
            const isPast = dueDate < now;
            
            if (isPast && assignment.status === 'active') {
                updateAssignment(assignment.id, { status: 'past' });
                assignment.status = 'past';
            }
            
            const row = document.createElement('tr');
            // Base classes that apply to both themes
            let rowClass = 'border-b transition-colors duration-200 ';
            
            // Add theme-specific classes
            if (isDarkMode) {
                rowClass += assignment.status === 'past' 
                    ? 'border-gray-700 bg-gray-700/50 text-gray-400'
                    : 'border-gray-700 text-gray-200';
            } else {
                rowClass += assignment.status === 'past'
                    ? 'border-gray-200 bg-gray-100 text-gray-500'
                    : 'border-gray-200 text-gray-700';
            }
            
            row.className = rowClass;
            
            const statusClass = assignment.status === 'active'
                ? (isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800')
                : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800');
                
            const buttonClasses = {
                edit: isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800',
                delete: isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'
            };

            row.innerHTML = `
                <td class="py-3 px-4">${assignment.id}</td>
                <td class="py-3 px-4">${assignment.subject}</td>
                <td class="py-3 px-4">${assignment.details}</td>
                <td class="py-3 px-4">${formatDate(assignment.createdAt)}</td>
                <td class="py-3 px-4">${formatDate(assignment.dueDate)}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs ${statusClass}">
                        ${assignment.status === 'active' ? 'Aktif' : 'Selesai'}
                    </span>
                </td>
                <td class="py-3 px-4">
                    <button onclick="editAssignment(${assignment.id})" class="${buttonClasses.edit} mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="confirmDelete(${assignment.id})" class="${buttonClasses.delete}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading assignments:', error);
    }
};

// Custom Notification System
const showNotification = (message, type = 'info') => {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    notification.className = `${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg mb-2 flex items-center opacity-0 transform translate-x-[-100%] transition-all duration-300`;
    
    const icon = document.createElement('i');
    icon.className = `fas fa-${type === 'success' ? 'check-circle' : 
                        type === 'error' ? 'exclamation-circle' : 
                        type === 'warning' ? 'exclamation-triangle' : 
                        'info-circle'} mr-2`;
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    container.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('opacity-0', 'translate-x-[-100%]');
    }, 50);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-[-100%]');
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);

    return notification;
};

// Modal handling
const modal = document.getElementById('assignment-modal');
const form = document.getElementById('assignment-form');
const addButton = document.getElementById('add-assignment');
const cancelButton = document.getElementById('cancel-assignment');

addButton.addEventListener('click', () => {
    form.reset();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
});

cancelButton.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const assignment = {
        subject: document.getElementById('assignment-subject').value,
        details: document.getElementById('assignment-details').value,
        createdAt: document.getElementById('assignment-assigned-date').value || new Date().toISOString().split('T')[0],
        dueDate: document.getElementById('assignment-due-date').value
    };

    try {
        await addAssignment(assignment);
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        loadAssignments();
        showNotification('Tugas berhasil ditambahkan', 'success');
    } catch (error) {
        showNotification('Gagal menambahkan tugas', 'error');
        console.error('Error adding assignment:', error);
    }
});

const confirmDelete = (id) => {
    // Remove any existing confirmation buttons and warning notifications
    const existingNotifications = document.querySelectorAll('.notification.warning');
    existingNotifications.forEach(notification => notification.remove());

    const notification = showNotification('Tekan hapus sekali lagi untuk menghapus tugas', 'warning');
    notification.classList.add('warning'); // Add warning class for proper cleanup

    // Store a flag in the button to prevent multiple clicks
    let isDeleting = false;
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'ml-2 px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors';
    confirmButton.textContent = 'Hapus';
    confirmButton.onclick = async () => {
        if (isDeleting) return; // Prevent multiple clicks
        isDeleting = true;
        
        try {
            await deleteAssignment(id);
            notification.remove();
            await loadAssignments();
            showNotification('Tugas berhasil dihapus', 'success');
        } catch (error) {
            showNotification('Gagal menghapus tugas', 'error');
            console.error('Error deleting assignment:', error);
            isDeleting = false; // Reset flag if deletion fails
        }
    };
    notification.appendChild(confirmButton);
};

const editAssignment = async (id) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
        const assignment = request.result;
        document.getElementById('assignment-subject').value = assignment.subject;
        document.getElementById('assignment-details').value = assignment.details;
        document.getElementById('assignment-assigned-date').value = assignment.createdAt.split('T')[0];
        document.getElementById('assignment-due-date').value = assignment.dueDate;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        form.onsubmit = async (e) => {
            e.preventDefault();
            const updates = {
                subject: document.getElementById('assignment-subject').value,
                details: document.getElementById('assignment-details').value,
                createdAt: document.getElementById('assignment-assigned-date').value,
                dueDate: document.getElementById('assignment-due-date').value
            };
            
            try {
                await updateAssignment(id, updates);
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                loadAssignments();
                form.onsubmit = null; // Reset form handler
            } catch (error) {
                console.error('Error updating assignment:', error);
            }
        };
    };
};

// Helper function to format dates
const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Inisialisasi aplikasi
function init() {
  loadTheme();
  updateClassInfo();
  setInterval(updateClassInfo, 1000);
  initDayButtons();
  initDB();
}

document.addEventListener('DOMContentLoaded', init);
