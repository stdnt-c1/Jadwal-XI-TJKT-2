# Jadwal Kelas XI TJKT 2

A modern, responsive web application for managing and viewing the class schedule and assignments for SMKN 7 Samarinda, XI TJKT 2.

## Features

### 1. Class Schedule
- **Current Class & Next Class:**
  - Displays the current and next class, including subject, teacher, time range, and time left.
  - Progress bar for the current class.
- **Weekly Schedule:**
  - View the full weekly schedule with day navigation.
  - Responsive and visually clear layout.
- **Uniform Schedule:**
  - Shows the uniform schedule for each day.

### 2. Assignments Section
- **CRUD Functionality:**
  - Add, edit, and delete assignments with subject, details, assigned date, and due date.
  - Assignments are persisted using IndexedDB (works offline).
- **Status Tracking:**
  - Assignments automatically update status to "Selesai" when past due.
- **Responsive Table:**
  - Assignments are displayed in a responsive, styled table.
- **Modal Form:**
  - Add/edit assignments via a modal form with validation.
- **Custom Notifications:**
  - User feedback for all actions (add, edit, delete, errors).

### 3. Theme Support
- **Light & Dark Mode:**
  - Toggle between light and dark themes using the button in the header.
  - Theme preference is saved and persists across sessions.
  - All sections, including assignments and modals, update instantly and smoothly.
- **Dynamic Input Colors:**
  - Assignment form fields automatically adjust text and background color for visibility in both themes.

### 4. Responsive & Accessible Design
- **Mobile Friendly:**
  - Layout adapts for all screen sizes.
  - Header, title, and theme toggle button are always accessible and well-spaced.
- **Accessible:**
  - Proper color contrast and focus states.

### 5. Animations & Transitions
- **Smooth Transitions:**
  - Theme changes and section transitions are animated for a modern feel.
- **Notification Animations:**
  - Custom notifications slide in and out.

## How to Use
1. **Open `index.html` in your browser.**
2. **Toggle theme** using the button in the top right.
3. **View current and next class** at the top.
4. **Navigate the weekly schedule** using the day buttons.
5. **Manage assignments** in the "Tugas" section:
   - Add new assignments with the yellow button.
   - Edit or delete assignments using the action buttons in the table.

## Technical Details
- **Frontend:** HTML, Tailwind CSS, Font Awesome, custom CSS for light/dark mode.
- **Persistence:** IndexedDB for assignments (offline support).
- **No backend required.**

## Customization
- Update schedule data and uniform schedule directly in `script.js`.
- Adjust styles in `lightmode.css` and `darkmode.css` as needed.

## License
MIT