import React, { useState } from 'react'
import { useAddBookMutation } from '../features/apiSlice'

const AddBook = () => {

  const [addBook] = useAddBookMutation();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addBook(formData);
    setFormData({
      title: '',
      author: '',
      genre: '',
      publishedYear: ''
    })
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Title' 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />

        <input 
          type="text" 
          placeholder='Author' 
          value={formData.author} 
          onChange={(e) => setFormData({...formData, author: e.target.value})} 
        />

        <input 
          type="text" 
          placeholder='Genre' 
          value={formData.genre} 
          onChange={(e) => setFormData({...formData, genre: e.target.value})} 
        />

        <input 
          type="number" 
          placeholder='Year' 
          value={formData.publishedYear} 
          onChange={(e) => setFormData({...formData, publishedYear: e.target.value})} 
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default AddBook