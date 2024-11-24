import React, { useState } from 'react'
import { useAddPublisherMutation } from '../features/publisherSlice'

const AddPublisher = () => {

  const [addPublisher] = useAddPublisherMutation();
  const [formData, setFormData] = useState({name: '', lication: ''});

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addPublisher(formData);
    alert('Publisher added successfully');
    setFormData({name: '', location: ''})
  }

  return (
    <div>
      <h2>Add New Publisher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Publisher</button>
      </form>
    </div>
  )
}

export default AddPublisher