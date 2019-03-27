// FILE : tasks.route.js
// TITLE : Router - Express router for tasks
// DESCRIPTION : Router for configuring API endpoints related to tasks
// AUTHOR : Ben Nowak

const express = require('express');

const router = express.Router();

// Controllers used by routes below
let TaskController = require('../../controllers/task.controller.js');

// Map each usable API endpoint to the Controller Functions
router.get('/', TaskController.getTasks);
router.post('/new', TaskController.addToTaskQueue);

// Export the Router
module.exports = router;
