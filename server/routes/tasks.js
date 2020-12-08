const express = require('express');
const task = require('../models/task');
const router = express.Router();
const Task = require('../models/task');

//ROUTES
//getting all tasks
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err){
        res.status(500).json({message: err.message}); //500 means error on server
    }
});

//getting one task (USED FOR DEBUGGING)
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

//creating one task
router.post('/', async (req, res) => {
    const task = new Task({
       tasklist: req.body.tasklist
    }); //set fields
    try {
        const newTask = await task.save(); //save to database
        res.status(201).json(newTask); //201 means successfully created object
    } catch(err) {
        res.status(400).json({message: err.message}); //400 means something wrong with user input
    }
});

//updating one task
router.patch('/:id', getTask, async (req, res) => { //patch updates only what the user is passing (not all information all at once)
    if(req.body.tasklist!= null) {
        res.task.tasklist = req.body.tasklist;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }

});

//deleting one task (USED FOR DEBUGGING)
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: "deleted task"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//middleware method for get/patch/delete
async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if(task == null) {
            return res.status(404).json({message: 'Cannot find task'});//404 means we cannot find the object
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.task = task;
    next(); // move on to the next piece of middleware or request itself
}

module.exports = router;

