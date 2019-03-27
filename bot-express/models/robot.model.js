const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const RobotSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String
}, {collection: 'robots'});

// ToDo: Improve on Robot record pagination usage
RobotSchema.plugin(mongoosePaginate)
const Robot = mongoose.model('Robot', RobotSchema)

module.exports = Robot;
