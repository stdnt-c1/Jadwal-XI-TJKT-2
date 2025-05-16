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

## Deployment Guide

### Prerequisites
1. A GitHub account
2. A Vercel account
3. A MongoDB Atlas account

### Setting Up MongoDB Atlas
1. Create a new cluster in MongoDB Atlas
2. Create a database user with read/write permissions
3. Get your MongoDB connection string
4. Replace the password placeholder with your actual database user password
5. Whitelist all IP addresses (0.0.0.0/0) for development

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Configure GitHub Repository Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secret:
     - Name: `MONGODB_URI`
     - Value: Your MongoDB Atlas connection string

3. **Connect to Vercel:**
   - Log in to Vercel and import your GitHub repository
   - Go to Project Settings > Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Use the same MongoDB connection string

4. **Update API_BASE_URL:**
   - After deployment, get your Vercel deployment URL
   - Update `API_BASE_URL` in `script.js` with your Vercel URL
   - Commit and push the changes:
     ```bash
     git add Jadwal\ Kelas\ XI\ TJKT\ 2/script.js
     git commit -m "Update API_BASE_URL"
     git push
     ```

5. **Verify Deployment:**
   - Check Vercel deployment logs
   - Test the application
   - Verify MongoDB connection
   - Test assignment CRUD operations

### Security Notes
- Never commit sensitive information like database credentials
- Always use environment variables for secrets
- Keep your GitHub repository secrets secure
- Regularly rotate database passwords
- Monitor your MongoDB Atlas access logs

### Local Development
1. Create a local `.env` file (it will be ignored by git):
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### Updating Secrets
1. **GitHub:**
   - Go to repository Settings > Secrets and variables > Actions
   - Update the existing secrets as needed

2. **Vercel:**
   - Go to Project Settings > Environment Variables
   - Edit or add new environment variables as needed

### Troubleshooting
- Check Vercel deployment logs for errors
- Verify MongoDB connection string is correct
- Ensure all required environment variables are set
- Check CORS configuration if API requests fail

## License
MIT