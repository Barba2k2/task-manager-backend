const { model } = require("mongoose");
const TaskModel = require("../models/task.model");
const { nofFoundError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const tasks = await TaskModel.find({});
      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(500).send(error.message);
      console.error(error);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;

      const task = await TaskModel.findById(taskId);

      if (!task) return nofFoundError(this.res);

      return this.res.status(200).send(task);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(this.req.body);

      await newTask.save();
      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const taskToUpdate = await TaskModel.findById(taskId);

      if (!taskToUpdate) return nofFoundError(this.res);

      const allowedUpdates = ["isCompleted"];
      const requestedUpdates = Object.keys(taskData);

      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return notAllowedFieldsToUpdateError(this.res);
        }
      }

      await taskToUpdate.save();
      return this.res.status(201).send(taskToUpdate);
    } catch (error) {
      this.res.status(500).send(error.message);
      console.error(error);
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;

      const taskToDelete = await TaskModel.findById(taskId);

      if (!taskToDelete) return nofFoundError(this.res);

      const deletedTask = await TaskModel.findByIdAndDelete(taskToDelete);

      this.res.status(200).send(deletedTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;
