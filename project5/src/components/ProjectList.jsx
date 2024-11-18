import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProject, fetchProjects } from '../store/slices/projectSlice';
import UserRoleCheck from './UserRoleCheck';

const ProjectList = () => {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const [newProject, setNewProject] = useState({name: '', description: ''}); 

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch]);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setNewProject((prev) => ({...prev, [name]: value}));
  };

  const handleAddProject = () => {
    console.log("handleAddProject : ", newProject);
    if(newProject.name && newProject.description){
      dispatch(addProject(newProject));
      setNewProject({name: '', description: ''});
    }
  }

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name} : {project.description}</strong>
          </li>
        ))}
      </ul>

      <UserRoleCheck role="admin">
        <h3>Add New Project</h3>
        <input 
          type="text" 
          name="name"
          value={newProject.name}
          onChange={handleChange}
          placeholder='Project Name'
        />
        <textarea
          name='description'
          value={newProject.description}
          onChange={handleChange}
          placeholder='Project Description'
        />
        <button onClick={handleAddProject}>Add Project</button>
      </UserRoleCheck>
    </div>
  )
}

export default ProjectList