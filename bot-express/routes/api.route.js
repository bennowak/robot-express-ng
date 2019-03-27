const express = require('express');

const router = express.Router();
const apidocs = require('./api/apidocs.route');
const robots = require('./api/robots.route');
const tasks = require('./api/tasks.route');
const robotTypes = require('./api/robotTypes.route');
const taskTypes = require('./api/taskTypes.route');

router.use('/docs', apidocs);
router.use('/robots', robots);
router.use('/tasks', tasks);
router.use('/robot/types', robotTypes);
router.use('/task/types', taskTypes);

module.exports = router;
