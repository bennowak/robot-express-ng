// FILE : robotType.controller.js
// TITLE : RobotTypeController - Express Controller for RobotTypes
// DESCRIPTION : Controller for managing service utilization and business logic pertaining to robotTypes
// AUTHOR : Ben Nowak

// Services and Data Models used
const RobotTypeService = require('../services/robotType.service.js');

exports.getRobotTypes = async function (req, res, next) {
    // Check for query parameters
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;

    try {

        // let robotTypes = await RobotService.getRobotTypes({}, page, limit)
        let robotTypes = await RobotTypeService.getRobotTypes( {}, page, limit)

        return res
            .status(200)
            .json({
                status: 200,
                data: robotTypes,
                message: `Succesfully Recieved RobotTypes: ${robotTypes}`
            });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
};