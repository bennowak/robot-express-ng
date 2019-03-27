let express = require('express');

let router = express.Router();

// Getting the Task Controller that we just created

let RobotTypeController = require( '../../controllers/robotType.controller');


// Map each API to the Controller FUnctions

router.get('/', RobotTypeController.getRobotTypes);
//
// router.get('/:id', StoryController.getStoryById)
//
// router.post('/', StoryController.createStory)
//
// router.put('/:id', StoryController.updateStory)
//
// router.delete('/:id', StoryController.removeStory)


// Export the Router

module.exports = router;
