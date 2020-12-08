import React, {useState} from 'react';

function TodoButton(props) {
  const [todoInput, setTodoInput] = useState("");
  
  const handleChange = ({target}) => {
    setTodoInput(target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    props.onSubmit({
      id: "ID" + Date.now(),
      text: todoInput,
      complete: false
    });
    
    setTodoInput("");
  }


  return (
    <form className='todo-form' name="todo" onSubmit={handleSubmit}>
      <input type='text' id='taskbar' name='activity' placeholder='Add a task here!' value={todoInput} onChange={handleChange}/> 
      <button className='addButton'>add task</button>
    </form>
  );
}

export default TodoButton;