import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, fetchTasks, updateTask } from '../store/slices/taskSlice';
import UserRoleCheck from './UserRoleCheck';

const TaskList = ({projectId}) => {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => 
    state.tasks.list.filter((task) => task.projectId === projectId)
  );
  const users = useSelector((state) => state.auth.user);
  const [newTask, setNewTask] = useState({name: '', assignedTo: ''});

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewTask((prev) => ({...prev, [name]: value}));
  }

  const handleAddTask = () => {
    if(newTask.name && newTask.assignedTo){
      dispatch(addTask({...newTask, projectId}));
      setNewTask({name: '', assignedTo:''});
    }
  }

  const handleUpdateStatus = (task, newStatus) => {
    dispatch(updateTask({...task, status: newStatus}));
  }

  return (
    <div>
      <h3>Tasks for project {projectId}</h3>

      <ul>
        {tasks.map((task)=> {
          <li key ={task.id}>
            <strong>{task.name}</strong> - {task.status} (assigned to {task.assignedTo})
            <div>
              <button 
                onClick={() => handleUpdateStatus(task, 'To Do')} 
                disabled={task.status === 'To Do'}
              >
                To Do
              </button>
              <button
                onClick={() => handleUpdateStatus(task, 'In Progress')}
                disabled = {task.status === 'In Progress'}
              >
                In Progress
              </button>
              <button
                onClick={() => handleUpdateStatus(task, 'Completed')}
                disabled = {task.status === 'Completed'}
              >
                Completed
              </button>
            </div>
          </li>
        })}
      </ul>

      <UserRoleCheck role="admin">
        <h4>Add New Task</h4>
        <input 
          type="text" 
          name="name"
          value={newTask.name}
          onChange={handleChange}
          placeholder='Task Name'
        />
        <select name="assignedTo" value={newTask.assignedTo} onChange={handleChange}>
          <option value =''>Assigned To</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </UserRoleCheck>
    </div>
  )
}

export default TaskList