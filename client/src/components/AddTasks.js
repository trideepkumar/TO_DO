import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { setAuth } from './app/features/authSlice';

function AddTasks({ AddTask }) {
  const [value, setValue] = useState('');
  const authState = useSelector((state) => state.auth.authState);

  const dispatch = useDispatch();

  const addItem = async () => {
    if (!value.trim()) {
      return; // Don't add empty tasks
    }

    AddTask(value);
    setValue('');

    try {
      const body = { tasks:[value], id: authState._id };
      const response = await axiosInstance.post('/addTask', body);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(setAuth(response.data))
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='input-container'>
      <input
        type='text'
        className='input'
        placeholder='Add New Task'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addItem} className='add-btn'>
        ADD TASK
      </button>
    </div>
  );
}

export default AddTasks;