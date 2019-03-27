// FILE : task.controller.js
// TITLE : TaskController - Express Controller for TaskServices
// DESCRIPTION : Controller for managing service utilization and business logic pertaining to tasks
// AUTHOR : Ben Nowak

// Services utilized by the controller
const TaskService = require('../services/task.service.js');

exports.getTasks = async function (req, res, next) {
    try {
        let tasks = await TaskService.getTasks({})
        return res
            .status(200)
            .json({
                status: 200,
                data: tasks,
                message: "Success: Tasks received"
            });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: `ERROR thrown by TaskController.getTasks() : ${e.message}`
        });

    }
};

exports.createTasks = async function (req, res, next) {
    const task = {
        robot_id: req.body.robot_id,
        taskType_id: req.body.taskType_id,
        credit_value: req.body.credit_value,
        status: req.body.status
    }
    try {
        let createdTask = await TaskService.createTask(task)
        return res.status(201).json({
            status: 201,
            data: createdTask,
            message: "Success: New task created"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: `ERROR thrown by TaskController.createTasks() : ${e.message}`
        })
    }
}

exports.addToTaskQueue = async function (task) {
    console.log(task);
}

// ToDo: Implement TaskController.getTaskByID
// exports.getTaskByID = async function (req, res, next) {
// };

// ToDo: Implement TaskController.updateTaskByID
// exports.updateTaskByID = async function (req, res, next) {
// };

// ToDo: Implement TaskController.removeTaskByID
// exports.removeTaskByID = async function (req, res, next) {
// };
