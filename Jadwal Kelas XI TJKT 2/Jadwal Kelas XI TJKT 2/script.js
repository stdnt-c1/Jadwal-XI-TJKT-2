// API Functions
async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.status !== 204 ? response.json() : null;
}

// Database status notification
function showDatabaseStatus(type) {
  // Remove any existing notifications first
  const existingNotification = document.querySelector('.db-status-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const statusTypes = {
    'development': { text: 'Connected to: Local SQLite Database', color: 'bg-gray-500' },
    'test': { text: 'Connected to: Local Supabase Instance', color: 'bg-blue-500' },
    'production': { text: 'Connected to: Production Supabase Database', color: 'bg-green-500' }
  };

  const status = statusTypes[type] || { text: 'Database Status: Unknown', color: 'bg-red-500' };
  
  const notification = document.createElement('div');
  notification.className = `db-status-notification fixed top-4 right-4 ${status.color} text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center transition-opacity duration-300`;
  notification.innerHTML = `
    <i class="fas fa-database mr-2"></i>
    <span>${status.text}</span>
  `;
  
  document.body.appendChild(notification);
  notification.style.opacity = '1';
  
  // Keep the notification visible
  setTimeout(() => {
    notification.style.opacity = '0.8';
  }, 5000);
}

// Function to update row numbers dynamically
function updateRowNumbers() {
  const rows = document.querySelectorAll('#assignments-table-body tr');
  rows.forEach((row, index) => {
    const numberCell = row.querySelector('.row-number');
    if (numberCell) {
      numberCell.textContent = index + 1;
    }
  });
}

// Check database status immediately when script loads
async function checkDatabaseStatus() {
  try {
    const response = await fetch('/api/db-status');
    if (!response.ok) throw new Error('Failed to get database status');
    const { environment } = await response.json();
    showDatabaseStatus(environment);
  } catch (error) {
    console.error('Database status check failed:', error);
    showDatabaseStatus('unknown');
  }
}

// Modify loadAssignments to handle row numbering
async function loadAssignments() {
  try {
    // Check database status
    await checkDatabaseStatus();

    const assignments = await fetchApi('assignments');
    const tableBody = document.getElementById('assignments-table-body');
    tableBody.innerHTML = '';
    
    assignments.forEach((assignment) => {
      const row = document.createElement('tr');
      row.dataset.id = assignment.id;  // Store ID in dataset
      row.innerHTML = `
        <td class="py-3 px-4 row-number"></td>
        <td class="py-3 px-4">${assignment.subject}</td>
          <td class="py-3 px-4">${assignment.details}</td>
          <td class="py-3 px-4">${formatDate(assignment.assigned_date)}</td>
          <td class="py-3 px-4">${formatDate(assignment.due_date)}</td>
          <td class="py-3 px-4">
            <span class="px-2 py-1 rounded-full text-xs ${getStatusClass(assignment.status)}">
              ${assignment.status}
            </span>
          </td>
          <td class="py-3 px-4">
            <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="editAssignment(${assignment.id})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-600 hover:text-red-800" onclick="deleteAssignment(${assignment.id})">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
      tableBody.appendChild(row);
    });

    updateRowNumbers();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

document.getElementById('assignment-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    subject: document.getElementById('assignment-subject').value,
    details: document.getElementById('assignment-details').value,
    assigned_date: document.getElementById('assignment-assigned-date').value,
    due_date: document.getElementById('assignment-due-date').value,
    status: 'pending'
  };
  
  try {
    await fetchApi('assignments', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    showNotification('Assignment added successfully', 'success');
    closeAssignmentModal();
    loadAssignments();
  } catch (error) {
    showNotification(error.message, 'error');
  }
});

// Modify deleteAssignment to update row numbers after deletion
async function deleteAssignment(id) {
  if (!confirm('Are you sure you want to delete this assignment?')) return;
  
  try {
    await fetchApi(`assignments/${id}`, { method: 'DELETE' });
    showNotification('Assignment deleted successfully', 'success');
    loadAssignments();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

async function editAssignment(id) {
  try {
    const assignments = await fetchApi('assignments');
    const assignment = assignments.find(a => a.id === id);
    
    if (!assignment) {
      showNotification('Assignment not found', 'error');
      return;
    }
    
    // Populate form with assignment data
    document.getElementById('assignment-subject').value = assignment.subject;
    document.getElementById('assignment-details').value = assignment.details;
    document.getElementById('assignment-assigned-date').value = assignment.assigned_date;
    document.getElementById('assignment-due-date').value = assignment.due_date;
    
    // Show modal
    const modal = document.getElementById('assignment-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Update form submit handler for editing
    const form = document.getElementById('assignment-form');
    const originalSubmitHandler = form.onsubmit;
    
    form.onsubmit = async function(e) {
      e.preventDefault();
      
      const updatedData = {
        subject: document.getElementById('assignment-subject').value,
        details: document.getElementById('assignment-details').value,
        assigned_date: document.getElementById('assignment-assigned-date').value,
        due_date: document.getElementById('assignment-due-date').value
      };
      
      try {
        await fetchApi(`assignments/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        });
        
        showNotification('Assignment updated successfully', 'success');
        closeAssignmentModal();
        loadAssignments();
        
        // Restore original submit handler
        form.onsubmit = originalSubmitHandler;
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  // First check database status
  await checkDatabaseStatus();
  // Then load assignments
  await loadAssignments();
  
  // Periodically check database status
  setInterval(checkDatabaseStatus, 30000); // Check every 30 seconds
});
