import React from 'react'

//used to create a task element
function ListItem({value, ...props}){
    return (
        <li {...props}>{value}</li> 
    )
}

//map tasks from task array into list items, and display them as unordered list
function TaskItem(props) {
    const listItems = props.tasks.map((task, index) => (
        <div key={index}>
            <ListItem key={task.id} id={task.id} value={task.text} complete={task.complete}/>
            <button id="removebutton" onClick={() => props.removeTasks(task.id)}>remove</button>
            
            {/* if the task is complete, hide the complete button */}
            {task.complete===false? <button id="completebutton" onClick={() => props.completeTasks(task.id)}>complete</button> : null }
            
        </div>   
        )
    );
    return (
        <ul>
            {listItems}
        </ul>
    )
}



export default TaskItem;
