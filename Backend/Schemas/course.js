const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {type: String, unique: true},
    draft: Boolean,
    body: String
});

module.exports = mongoose.model('Course', courseSchema);