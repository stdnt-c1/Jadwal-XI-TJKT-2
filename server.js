const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Assignment = require('./models/assignment');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'Jadwal Kelas XI TJKT 2' directory
app.use(express.static('Jadwal Kelas XI TJKT 2'));

// Routes

// Get all assignments
app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new assignment
app.post('/assignments', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an assignment
app.put('/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an assignment
app.delete('/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fallback route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/Jadwal Kelas XI TJKT 2/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
