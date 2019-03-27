const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


const TaskTypeSchema = new mongoose.Schema({
    description: String,
    eta: Number,
    points: Number,
    restrict: [String]  // Restricted to specific bots; if empty array, then no restrictions
}, {collection: 'tasktypes'});

TaskTypeSchema.plugin(mongoosePaginate)
const TaskType = mongoose.model('TaskType', TaskTypeSchema)

module.exports = TaskType;
