// FILE : robot.controller.js
// TITLE : RobotController - Express Controller for Robots
// DESCRIPTION : Controller for managing service utilization and business logic pertaining to robots
// AUTHOR : Ben Nowak

// Services and Data Models used
const RobotService = require('../services/robot.service.js');
const TaskService = require('../services/task.service');
const Robot = require('../models/robot.model');
const TaskType = require('../models/taskType.model');

exports.getRobots = async function (req, res, next) {

    // set paging defaults if not present in request
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 20;

    try {
        // ToDo : Update Angular front-end to take advantage of paging
        // let robots = await RobotService.getRobots(req, page, limit);
        let robots = await RobotService.getAllRobots()
        return res
            .status(200)
            .json({
                status: 200,
                data: robots,
                message: `Success: data recieved from RobotController.getRobots() : ${robots}`
            });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.createRobot = async function (req, res, next) {
    try {

        // Increment the "human readable" robot id number using the await for mongoose asynchronous count
        const robot_count = await Robot.countDocuments({}, function(err, count){
            return count;
        }) + 1;

        let robot = {
            id: robot_count,
            name: req.body.name,
            type: req.body.type
        }

        // Get tasks for creating a random set of initial tasks for the new robot
        const task_list = await TaskType.find();
        let createdTasks = [];

        // ToDo: Rework the running of tasks with eta to utilize socket messaging queue
        // list of tasks that get sent back for timed running on the front-end
        let returnTasks = [];

        for( let i = 0; i < 5; i++){
            let rnum = Math.ceil(Math.random() * task_list.length) - 1;
            let cTask = task_list[rnum].toJSON()
            let cVal = 0;
            // If robot.type is found in the task then set the point value, otherwise leave at zero
            if( cTask.restrict.includes(robot.type) ){
                cVal = cTask.points;
            }
            // Task fields to be returned for "frontend" eta rendering
            let task_return = {
                task_name: task_list[rnum].toJSON().description,
                task_time: task_list[rnum].toJSON().eta,
                task_points: cVal
            }
            returnTasks.push(task_return);

            // Task fields for storing to database for scoring and leaderboard calculations
            let task = {
                robot_id: robot_count,
                taskType_id: task_list[rnum].toJSON()._id,
                credit_value: cVal
            }
            createdTasks.push(task);
            await TaskService.createTask(task);
        }

        // Calling the Service function
        //with the new object from the Request Body
        let createdRobot = await RobotService.createRobot(robot)
        return res.status(201).json({
            status: 201,
            // data: createdRobot,
            data: [createdRobot, returnTasks],
            message: `Succesfully Created Robot : ${createdRobot}`
        })
    } catch (e) {

        //Return an Error Response Message
        //with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "Robot Creation was Unsuccessful, I am sorry :( "
        })
    }
};

exports.getRobotById = async function (req, res, next) {
    let id = Number(req.params.id); // Convert param type to Number
    try {
        let robot = await RobotService.getRobotById(id);
        let robot_tasks = await TaskService.getTasksByRobotID(id);
        let robot_score = await TaskService.getTaskScoreByRobotID(id);
        console.log(robot);
        console.log(robot_tasks);
        console.log(robot_score);
        return res.status(200)
            .json({
                status: 200,
                data: robot,
                message: `Successfully Retrieved robot id : ${id}`
            })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: `[RobotController ERROR]: Problem retrieving Robot with id : ${id}; MESSAGE: ${e.message}`
        })
    }
};


// ToDo: Make the leaderboard functionality more concise.
let getRobotList = function(){
    // Construct a list of all robots
    return new Promise(
        function(resolve, reject) {
            const robots = RobotService.getAllRobots();
            resolve(robots);
            reject('PROMISE REJECTED: RobotController.getRobotList()');
        }
    )
}
// to do continued
let getEvalList = function(robotList){
    // Construct a list of robots that includes total task score
    return new Promise(
        async function(resolve, reject){
            let eval_list = []
            for(const r of robotList){
                eval_list.push(
                    {
                        "_id": r._id,
                        "id": r.id,
                        "name": r.name,
                        "type": r.type,
                        "rscore": await TaskService.getTaskScoreByRobotID(r.id)})
            }
            resolve(eval_list);
            reject('PROMISE REJECTED: RobotController.getEvalList()');
        }
    )
}
// to do continued
let getLeaders = function(evalList){
    // Sort the list of robots by rscore value
    return new Promise(
        async function (resolve, reject) {
            await evalList.sort((a,b) => Number(a.rscore) < Number(b.rscore) ? 1 : -1);
            resolve(evalList);
            reject('PROMISE REJECTED: RobotController.getLeaders()');
        }
    )
}

// ToDo: Fix the spaghetti promise code that RobotController.getLeadRobots uses
exports.getLeadRobots = async function (req, res, next) {
    try {
        await getRobotList().then(function(data){
            return getEvalList(data).then(function(data){
                return getLeaders(data).then(function (data) {
                    // send response
                    return res
                        .status(200)
                        .json({
                            status: 200,
                            data: data,
                            message: `Succesfully Recieved Robot Leaderboard : ${data}`
                        });
                });
            })
        })
    } catch (e) {
        //Return an Error Response Message
        //with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

// ToDo: Implement RobotController.updateRobot
// exports.updateRobot = async function (req, res, next) {
//     // Id is necessary for the update
//     if (!req.params.id) {
//         return res.status(400).json({
//             status: 400.,
//             message: "Id must be present"
//         })
//     }
//     let id = req.params.id;
//     let robot = {
//         id: req.body.id,
//         name: req.body.name ? req.body.name : null,
//         type: req.body.type ? req.body.type : null
//     }
//     try {
//         let updatedRobot = await RobotService.updateRobot(robot);
//         return res.status(200).json({
//             status: 200,
//             data: updatedRobot,
//             message: "Successfully Updated Robot"
//         })
//     } catch (e) {
//         return res.status(400).json({
//             status: 400.,
//             message: e.message
//         })
//     }
// }

// ToDo: Implement RobotController.removeRobot
// exports.removeRobot = async function (req, res, next) {
//     var id = req.params.id;
//     try {
//         var deleted = await RobotService.deleteRobot(id);
//         return res.status(204).json({
//             status: 204,
//             message: "Successfully Deleted Robot"
//         })
//     } catch (e) {
//         return res.status(400).json({
//             status: 400,
//             message: e.message
//         })
//     }
// }
