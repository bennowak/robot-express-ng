let express = require('express');

let router = express.Router();

// Getting the TaskType Controller that we just created

let TaskTypeController = require('../../controllers/taskType.controller.js');


// Map each API to the Controller FUnctions

router.get('/', TaskTypeController.getTaskTypes);
router.post('/', TaskTypeController.createTaskType);
//

router.get('/:id', TaskTypeController.getTaskTypeById);
//router.get('/:id/restricted', TaskTypeController.getTaskTypeRestrictionsById);

// router.put('/:id', TaskTypeController.updateTaskType);
// router.delete('/:id', TaskTypeController.removeTaskType);

// Export the Router

module.exports = router;
