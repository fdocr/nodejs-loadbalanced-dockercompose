var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var visitSchema = new Schema({
    hits: Number,
    ip: { type: String, index: true },
    createdAt: Date,
    updatedAt: Date
});

visitSchema.static('findByIp', function(visitorIp, callback) {
    return this.find({ ip: visitorIp }, callback);
});

visitSchema.static('incrementHits', function(visitorIp, callback) {
    return this.findOneAndUpdate({ ip: visitorIp }, { $inc : { hits: 1 }, updatedAt: new Date() }, callback);
});

//Trigger before save
visitSchema.pre('save', function(next) {
    this.updatedAt = new Date();

    if (!this.createdAt)
        this.createdAt = this.updatedAt;

    next();
});

//Create & export the model
var Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
