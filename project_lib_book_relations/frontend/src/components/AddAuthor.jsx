import React, { useState } from 'react'
import { useAddAuthorMutation } from '../features/authorSlice';

const AddAuthor = () => {

  const [addAuthor] = useAddAuthorMutation();

  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addAuthor(formData);
    alert('Author added successfully');
    setFormData({
      name: '',
      age: ''
    })

  }

  return (
    <div>
      <h2>Add a new author</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input 
          type="number" 
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Author</button>
      </form>
    </div>
  )
}

export default AddAuthor