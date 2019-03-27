const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


const TaskSchema = new mongoose.Schema({
    robot_id: Number,
    taskType_id: String,
    credit_value: Number,
    status: String
}, {collection: 'tasks'});

TaskSchema.plugin(mongoosePaginate)
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;
