const express = require("express");
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/create-task",
  [
    check("taskNo")
      .isString()
      .notEmpty()
      .matches(/^L\d{5}$/)
      .withMessage(
        'Task number must start with "L" followed by 5 numeric characters'
      ),
    check("estimateHours").isString().notEmpty(),
    check("estimateNotes").isString().notEmpty(),
  ],
  taskController.createTask
);

router.get("/tasks", taskController.getAllTasks);

router.put(
  "/tasks/:taskNo/complete",
  [
    check("actualHours")
      .isString()
      .notEmpty()
      .withMessage("Invalid actual hours"),
    check("actualNotes")
      .isString()
      .notEmpty()
      .withMessage("Actual notes cannot be empty"),
  ],
  taskController.completeTask
);

module.exports = router;
