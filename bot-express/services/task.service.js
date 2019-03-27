// FILE : task.service.js
// TITLE : TaskService - Express Service for Tasks
// DESCRIPTION : Services exported to asynchronously interface to the task model
// AUTHOR : Ben Nowak


// Models utilized by the service
const Task = require('../models/task.model.js');

//  Async function to get all tasks
exports.getTasks = async function (query, page, limit) {
    // Options for mongoose paginate
    // let options = {
    //     page,
    //     limit
    // };
    try {
        // Return the list of stories returned by the mongoose promise
        // return await Task.paginate(query, options);
        // ToDo: Update TaskService to use separate functions for getting paginated or all tasks
        return await Task.find();
    } catch (e) {
        throw Error(`Problem with returned database records pagination, [ERROR TaskService.getTasks]: ${e.message}`)
    }
};


//  Async function to create and post a new task
exports.createTask = async function (task) {
    // Create Mongoose model Object by using the new keyword
    let newTask = new Task({
        robot_id: task.robot_id,
        taskType_id: task.taskType_id,
        credit_value: task.credit_value,
        status: task.status
    });
    try {
        return await newTask.save()
    } catch (e) {
        throw Error(`Error while Creating Task, [ERROR TaskService.createTask]: ${e.message}`)
    }
};

//  Async function to get tasks associated with robot.id
exports.getTasksByRobotID = async function (robot_id) {
    try {
        // Return query results that match the story id
        console.log(Task.find({'robot_id': robot_id}));
        return await Task.find({'robot_id': robot_id});
    } catch (e) {
        // Failed promise return error
        throw Error(`Problem getting tasks by robot._id, [ERROR TaskService.getTasksByRobotID]: ${e.message}`)
    }
};

//  Async function to get tasks associated with robot.id
exports.getTaskScoreByRobotID = async function (robot_id) {
    try {
        // Return query results that match the story id
        let tasks = await Task.find({'robot_id': robot_id});
        let score_total = 0;
        tasks.forEach(
            (x) => score_total += x.credit_value
        );
        return score_total;
    } catch (e) {
        // Failed promise return error
        throw Error(`Problem getting total score by robot._id, [ERROR TaskService.getTaskScoreByRobotID]: ${e.message}`)
    }
};

// ToDo: Implement TaskService.getTaskByID(id)
// exports.getTaskByID = async function (id) {
// };
//

// ToDo: Implement TaskService.updateTaskByID()
// exports.updateTask = async function (id) {
// };

// ToDo: Implement TaskService.deleteTaskByID()
// exports.deleteTask = async function (id) {
// };
