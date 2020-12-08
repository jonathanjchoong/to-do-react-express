const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    tasklist: {
        type: Array
    }
});

module.exports = mongoose.model('task', taskSchema);