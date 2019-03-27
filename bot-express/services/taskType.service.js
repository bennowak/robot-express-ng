// FILE : taskType.service.js
// TITLE : TaskTypeService - Express Service for TaskTypes
// DESCRIPTION : Services exported to asynchronously interface to the taskType model
// AUTHOR : Ben Nowak

// Models utilized by the service
const TaskType = require('../models/taskType.model.js');

//  Async function to get all stories
exports.getTaskTypes = async function (query, page, limit) {
    // Options for mongoose paginate
    let options = {
        page,
        limit
    };
    try {
        // Return the list of stories returned by the mongoose promise
        return await TaskType.paginate(query, options);
    } catch (e) {
        // Failed promise return error
        throw Error(`Problem with returned database records pagination, [ERROR TaskTypeService.getStories]: ${e.message}`)
    }
};

//  Async function to create and post a new taskType
exports.createTaskType = async function (taskType) {
    // Creating a new Mongoose Object by using the new keyword
    var newTaskType = new TaskType({
        description: taskType.description,
        eta: taskType.eta,
        points: taskType.points,
        restrict: taskType.restrict
    });
    try {
        //  Promise to save Mongoose story object to database.
        return await newTaskType.save()
    } catch (e) {
        // Failed promise return error
        throw Error(`Error while Creating TaskType, [ERROR TaskTypeService.createTaskType]: ${e.message}`)
    }
};

//  Async function to get story by _id
exports.getTaskTypeById = async function (id) {
    try {
        // Return query results that match the story id
        return await TaskType.findById(id);
    } catch (e) {
        // Failed promise return error
        throw Error(`Problem getting taskType by id, [ERROR TaskTypeService.getStoryById]: ${e.message}`)
    }
};