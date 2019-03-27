// FILE : robot.service.js
// TITLE : RobotService - Express Service for Robots
// DESCRIPTION : Services exported to asynchronously interface to the robot model
// AUTHOR : Ben Nowak

// Models utilized by the service
const Robot = require('../models/robot.model.js');

//  Async function to get paginated robot list
// ToDo: Update application frontend to utilize Mongoose pagination
// exports.getRobots = async function (query, page, limit) {
//     // Options for mongoose paginate
//     let options = {
//         page,
//         limit
//     };
//     try {
//         return await Robot.paginate(query, options);
//     } catch (e) {
//         // Failed promise return error
//         throw Error(`Problem with returned database records pagination, [ERROR RobotService.getStories]: ${e.message}`)
//     }
// };

//  Async function to get all robots
exports.getAllRobots = async function () {
    try {
        // Return the list of all robots
        return await Robot.find();
    } catch (e) {
        throw Error(`Problem with returned database records, [ERROR RobotService.getStories]: ${e.message}`)
    }
};

//  Async function to create and post a new robot
exports.createRobot = async function (robot) {
    // Create Mongoose model Object by using the new keyword
    let newRobot = new Robot({
        id: robot.id,
        name: robot.name,
        type: robot.type
    });
    try {
        return await newRobot.save()
    } catch (e) {
        throw Error(`Error while Creating Robot, [ERROR RobotService.createRobot]: ${e.message}`)
    }
};

//  Async function to get robot by _id
exports.getRobotById = async function (id) {
    try {
        // Return query results that match the robot "human readable" id
        return await Robot.find({"id":id});
    } catch (e) {
        throw Error(`Problem getting robot by id, [ERROR RobotService.getRobotById]: ${e.message}`)
    }
};

// ToDo: Implement RobotService.updateRobotByID
// exports.updateRobotByID = async function (story) {
// }

// ToDo: Implement RobotService.deleteRobotByID
// exports.deleteRobotByID = async function (id) {
// }
