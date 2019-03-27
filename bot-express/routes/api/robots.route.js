// FILE : robots.route.js
// TITLE : Router - Express router for robots
// DESCRIPTION : Router for configuring API endpoints related to robots
// AUTHOR : Ben Nowak

const express = require('express');

const router = express.Router();

// Controllers used by routes below
const RobotController = require('../../controllers/robot.controller.js');

// Map usable API endpoints to the Controller FUnctions
router.get('/', RobotController.getRobots);
router.get('/detail/:id', RobotController.getRobotById);
router.post('/', RobotController.createRobot);
router.get('/leaders/:n', RobotController.getLeadRobots);

module.exports = router;
