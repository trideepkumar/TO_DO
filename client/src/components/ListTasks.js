import React, { useState } from "react";

function ListTasks({ task, index, removeTask }) {

  console.log("taaask",task,index,removeTask)

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    task.title = newTitle;
    setEditing(false);
  };

  const handleEditCancel = () => {
    setNewTitle(task.title);
    setEditing(false);
  };

  return (
    <div className="list-task">
      {task.title}
      <div
        className={`list-task ${completed ? "completed" : ""}`}
        style={completed ? { textDecoration: "line-through" } : {}}
      >
        {editing ? (
          <form onSubmit={handleEditSubmit} className="form">
            <input type="text" value={newTitle} onChange={handleTitleChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={handleEditCancel}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            {task}
            <button className="edit-btn" onClick={() => setEditing(true)}>
              Edit
            </button>
          </>
        )}
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <button onClick={() => removeTask(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListTasks;