const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express();

router.get("/", async (req, res) => {
  return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(taskData);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res.status(500).send("One or more fields are not editable!");
      }
    }

    await taskToUpdate.save();
    return res.status(201).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskToDelete = await TaskModel.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).send("Task not found!");
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskToDelete);

    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
