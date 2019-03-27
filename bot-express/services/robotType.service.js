// FILE : robot.service.js
// TITLE : RobotTypeService - Express Service for RobotTypes
// DESCRIPTION : Services exported to asynchronously interface to the robotTypes model
// AUTHOR : Ben Nowak

// Models utilized by the service
const RobotType = require( '../models/robotType.model.js');

//  Async function to get all stories
exports.getRobotTypes = async function (query, page, limit) {
    // Options for mongoose paginate
    let options = {
        page,
        limit
    };
    try {
        // Return the list of stories returned by the mongoose promise
        return await RobotType.paginate(query, options);
    } catch (e) {
        // Failed promise return error
        throw Error(`Problem with returned database records pagination, [ERROR RobotService.getStories]: ${e.message}`)
    }
};
