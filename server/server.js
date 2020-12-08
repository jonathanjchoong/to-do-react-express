require('dotenv').config() //load env variables from .env

//LIBRARIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
var testAPIRouter = require("./routes/testAPI"); //added for test 

//CONNECTING DB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection; 

//events to run when database is connected
db.on('error', (error) => console.error(error)); //report error if db cannot open
db.once('open', () => console.log('Connected to Database')); //once opened then tell console it is connected

//SETUP PACKAGES
app.use(express.json());
app.use(cors());

//SETUP ROUTES
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter); //use the taskRouter route whenever we query /tasks (ie. localhost:3000/tasks ... )

app.use("/testAPI", testAPIRouter); //added for test

app.listen(9000, () => console.log('Server Started')); //listen on port 3000 which is run whenever the server is started