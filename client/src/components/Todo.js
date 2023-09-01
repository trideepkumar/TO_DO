import React, { useEffect, useState } from "react";
import "./Todo.css";
import AddTasks from "./AddTasks";
import ListTasks from "./ListTasks";
import { useSelector } from "react-redux";
import Appbar from "./Appbar/Appbar";

const Todo = () => {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const task = authState.tasks;
  console.log("tasks", task);

  const [tasks, setTasks] = useState([]);

  //for showing the tasks in the title
  useEffect(() => {
    document.title = `TOTAL TASK:${tasks.length}`;
  });

  //for adding tasks
  const AddTask = (title) => {
    const newTask = [...tasks, { title }];
    setTasks(newTask);
  };

  //for deleting tasks
  const removeTask = (index) => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  return (
    <>
    <Appbar/>
      <div className="todo-container">
        <div className="header">TODO APP</div>
        <div className="add-task">
          <AddTasks AddTask={AddTask} />
        </div>
        <p className="pending">
          You Have <span className="span-length">{task.length}</span> Pending
          Tasks.
        </p>
        <div className="tasks">
          {task.map((task, index) => (
            <ListTasks
              key={index}
              task={task}
              removeTask={removeTask}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;