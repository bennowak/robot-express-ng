// FILE : taskType.controller.js
// TITLE : TaskTypeController - Express Controller for TaskTypes
// DESCRIPTION : Controller for managing service utilization and business logic pertaining to taskTypes
// AUTHOR : Ben Nowak

// Services and Data Models used
const TaskTypeService = require('../services/taskType.service');

exports.getTaskTypes = async function (req, res, next) {
    //Check for query params
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;

    try {

        let taskTypes = await TaskTypeService.getTaskTypes({}, page, limit)

        return res
            .status(200)
            .json({
                status: 200,
                data: taskTypes,
                message: "Succesfully Recieved TaskTypes"
            });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.createTaskType = async function (req, res, next) {

    var taskType = {
        description: req.body.description,
        eta: req.body.eta,
        points: req.body.points,
        restrict: req.body.restrict
    }

    try {
        var createdTaskType = await TaskTypeService.createTaskType(taskType)
        return res.status(201).json({
            status: 201,
            data: createdTaskType,
            message: "Succesfully Created TaskType"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: "TaskType Creation was Unsuccessful, I am sorry :( "
        })
    }
}

exports.getTaskTypeById = async function (req, res, next) {
    var id = req.params.id;
    try {
        var taskType = await TaskTypeService.getTaskTypeById(id);
        console.log(taskType.data);
        return res.status(200)
            .json({
                status: 200,
                data: taskType,
                message: `Successfully Retrieved TaskType _id : ${id}`
            })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: `[StoryController ERROR]: Problem retrieving TaskType with _id : ${id}; MESSAGE: ${e.message}`
        })
    }
};