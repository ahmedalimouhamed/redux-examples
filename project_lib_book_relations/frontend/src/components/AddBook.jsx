import React, { useState } from 'react'
import { useAddBookMutation } from '../features/bookSlice'
import { useGetAuthorsQuery } from '../features/authorSlice';
import { useGetPublishersQuery } from '../features/publisherSlice';

const AddBook = () => {

  const [addBook] = useAddBookMutation();
  const {data: authorsData, isLoading: loadingAuthors} = useGetAuthorsQuery();
  const {data: publishersData, isLoading: loadingPublishers} = useGetPublishersQuery();

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    publishedYear: '',
    author: '',
    publisher: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addBook(formData);
    alert('Book added successfully');
    setFormData({
      title: '',
      genre: '',
      publishedYear: '',
      author: '',
      publisher: ''
    });
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input 
          type="text" 
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <input 
          type="number" 
          name="publishedYear"
          placeholder="Published Year"
          value={formData.publishedYear}
          onChange={handleChange}
          required
        />

        <select
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        >
          <option value="">Select Author</option>
          {!loadingAuthors && authorsData?.data?.authors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>

        <select
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          required
        >
          <option value="">Select Publisher</option>
          {!loadingPublishers && publishersData?.data?.publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
          ))}
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default AddBook