import React, {useState, useEffect} from 'react';
import TaskItem from './TaskItem';
import TodoButton from './TodoButton';
import '../App.css';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]); //set default state to empty array of tasks

    const addTask = task => {
        const newTasks = [task, ...tasks]; //add new task to array of old tasks
        setTasks(newTasks); //set the state to the new array
        
        updateTasks(newTasks);

    }    

    const removeTasks = id => {
        const tasksRemoved = [...tasks].filter( function(task){
            return task.id !== id; //filter out task with the id passed in
        }); //tasksRemoved is updated array with the removed tasks 
        setTasks(tasksRemoved); //update the current tasks with the filtered array
        updateTasks(tasksRemoved);
    }

    const completeTasks = comptask => { 
        const compArr = [...tasks];
        compArr.find(function(task){
            return task.id === comptask;
        }).complete = true;
        setTasks(compArr);
        updateTasks(compArr);
    }
    
    // returns array of items which are marked incomplete
    const itemIncomplete = () => {
        const taskIncomplete = [...tasks].filter(function(task) {
            return task.complete !== true;
        });
        return taskIncomplete;
    }

    //returns array of items which are marked complete
    const itemComplete = () => {
        const taskComplete = [...tasks].filter(function(task) {
            return task.complete === true;
        });
        return taskComplete;
    }

    const updateTasks = async newTasks => {
        const resget = await axios.get('http://localhost:9000/tasks'); //get task array in db
        
        if(resget.data.length !== 0){
            //if updating array then PATCH
            await axios.patch('http://localhost:9000/tasks/' + resget.data[0]._id, {"tasklist": newTasks});
        }
        else{
            //if no tasks currently in db then POST
            await axios.post('http://localhost:9000/tasks', {"tasklist": newTasks});
        }
    }

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:9000/tasks');
        if(res.data.length !== 0 && res.status === 200){
            setTasks(res.data[0].tasklist); //if there are tasks in database then update
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    // const [data, setData] = useState({})
    // useEffect(() => {
    //   axios.get('/testAPI').then(res => {
    //     setData(res.data);
    //   });
    // },[]);

    return (
        <div>
            {/* task bar */}
            <TodoButton onSubmit={addTask}/>
            
            {/* (incomplete) task list */}
            <div className="to-do">
                <h2>Things To Do</h2>
                {/* <h3>{data.msg}</h3> */}
                <div className="activityList">
                    <TaskItem tasks={itemIncomplete()} removeTasks={removeTasks} completeTasks={completeTasks}/>     
                </div>
            </div>  
            
            {/* completed tasks */}
            <div className="completed">
                <h2>Completed</h2>
                <TaskItem tasks={itemComplete()} removeTasks={removeTasks} completeTasks={completeTasks}/>
            </div>
            
        </div>
    )
}

export default TaskList

