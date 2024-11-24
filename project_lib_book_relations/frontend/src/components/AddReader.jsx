import React, { useState } from 'react'
import { useAddReaderMutation } from '../features/readerSlice'
import { useGetBooksQuery } from '../features/bookSlice';

const AddReader = () => {

  const [addReader] = useAddReaderMutation();
  const {data: booksData, isLoading: loadingBooks} = useGetBooksQuery();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    borrowedBooks: []
  });

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;

    if(type === 'checkbox'){
      setFormData({
        ...formData, 
        borrowedBooks: checked ? [...formData.borrowedBooks, value] : formData.borrowedBooks.filter((id) => id !== value)
      })
    }else{
      setFormData({...formData, [name]: value});
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addReader(formData);
    alert('Reader added successfully');
    setFormData({
      name: '',
      age: '',
      borrowedBooks: []
    })
  }

  return (
    <div>
      <h2>Add new Reader</h2>
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

        <fieldset>
          <legend>select Borrowed Books</legend>
          {loadingBooks && <p>Loading Books ...</p>}
          {!loadingBooks && booksData?.data?.books.map((book) => (
            <label key={book.id}>
              <input 
                type="checkbox"
                name="borrowedBooks"
                value={book.id}
                checked={formData.borrowedBooks.includes(book.id)}
                onChange={handleChange}
              /> &nbsp;
              {book.title}
            </label>
          ))}
        </fieldset>
        <button type="submit">Add Reader</button>
      </form>

    </div>
  )
}

export default AddReader