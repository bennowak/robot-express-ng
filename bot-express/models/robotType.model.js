const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const RobotTypeSchema = new mongoose.Schema({
    name: String,
    description: String
}, { collection : 'robottypes' });

RobotTypeSchema.plugin(mongoosePaginate)
const RobotType = mongoose.model('RobotType', RobotTypeSchema)

module.exports = RobotType;
