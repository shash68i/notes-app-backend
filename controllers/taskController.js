const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { taskNo, estimateHours, estimateNotes } = req.body;

  try {
    // Find the task by taskNo
    let task = await Task.findOne({ taskNo });

    if (task) {
      // Task already exists, add new estimateNotes and estimateHours to the notes array
      task.notes.push({ estimateHours, estimateNotes });
    } else {
      // Task does not exist, create a new task with notes
      task = new Task({
        taskNo,
        notes: [{ estimateHours, estimateNotes }],
      });
    }

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.completeTask = async (req, res) => {
  const { actualHours, actualNotes } = req.body;
  const { taskNo } = req.params;

  try {
    let task = await Task.findOne({ taskNo });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.completed) {
      return res.status(400).json({ error: "Task already completed" });
    }

    task.actualHours = actualHours;
    task.actualNotes = actualNotes;
    task.completed = true;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
