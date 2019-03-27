

// Required modules
const mongoose = require('mongoose');
const mdb = require('./mongo');

// Data models for mongoose.js
const Robot = require('../models/robot.model');
const RobotType = require('../models/robotType.model');
const TaskType = require('../models/taskType.model');


// Pre-made JSON starter data files
const json_tasktypes = require('./tasktypes');
const json_robottypes = require('./robottypes');
const json_robots = require('./robots');

// ToDo: Get initialization of database working
//  Test mongoose connection
mongoose.connect(
    process.env.MONGODB_URI || mdb,
    { useNewUrlParser: true }
)
.then(() => {
    console.log( `Successfully Connected to the Mongodb Database ` );
    console.log('Initializing rvbotomat MongoDB datastore.');
    initializeData();
})
.finally( () => {
    mongoose.connection.close();
});

const initializeData =  function() {
    try{
        TaskType.collection.insertMany(json_tasktypes);
        RobotType.collection.insertMany(json_robottypes);
        Robot.collection.insertMany(json_robots);
    }
    catch (e) {
        console.log(`${e.message}`)
    }
    finally {
        console.log('completed initialization')
    }
}
