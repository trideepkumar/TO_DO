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
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(3);

  const paginate = (tasks, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return tasks.slice(startIndex, endIndex);
  };

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

  const paginatedTasks = paginate(task, currentPage, itemsPerPage);

  return (
    <>
      <Appbar />
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
          {paginatedTasks.map((task, index) => (
            <ListTasks
              key={index}
              task={task}
              removeTask={removeTask}
              index={index}
            />
          ))}
        </div>
      </div>

<div className="fixed-container">
  <div className="pagination">
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      &lt;
    </button>
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === Math.ceil(task.length / itemsPerPage)}
      className="pagination-button"
    >
      &gt;
    </button>
  </div>
  <div>
  <p className="page-count">
    {currentPage} of {Math.ceil(task.length / itemsPerPage)}
  </p>
  </div>
</div>

    </>
  );
};

export default Todo;
