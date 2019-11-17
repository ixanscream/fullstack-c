const mongoose = require('mongoose');
const {Schema} = mongoose;
// Security Scan Result Schema
const resultSchema = new Schema({
	id:  { type: Schema.ObjectId, auto: true }, 
	status: String,
    repositoryName: String,
    findings:  [],
    queuedAt:  Number,
    scanningAt: Number,
    finishedAt: Number
});

const Result = module.exports = mongoose.model('Result', resultSchema);

// get Security Scan Results
module.exports.getResults = (callback, limit) => {
	Result.find(callback).limit(limit);
}

// get a Security Scan Result By Id
module.exports.getResultById = (id, callback) => {
	Result.findOne({ 'id': id }, callback);
}

// add a Security Scan Result
module.exports.addResult = (result, callback) => {
	Result.create(result, callback);
}
