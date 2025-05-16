const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  details: { type: String, required: true },
  assignedDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'Belum Selesai' }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
