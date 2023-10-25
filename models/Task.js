const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  estimateHours: { type: String, required: true },
  estimateNotes: { type: String },
});

const taskSchema = new mongoose.Schema({
  taskNo: { type: String, required: true, unique: true },
  notes: [noteSchema],
  actualHours: { type: String },
  actualNotes: { type: String },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
