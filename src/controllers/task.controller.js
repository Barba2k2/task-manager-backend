const { model } = require("mongoose");
const TaskModel = require("../models/task.model");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getTasks() {
    try {
      const tasks = await TaskModel.find({});
      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(500).send(error.message);
      console.error(error);
    }
  }

  async getTasksById() {
    try {
      const taskId = this.req.params.id;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return this.res.status(404).send("Task not found!");
      }

      return this.res.status(200).send(task);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async createNewTask(){}
}

module.exports = TaskController;
