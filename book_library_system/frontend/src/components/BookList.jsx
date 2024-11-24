import React from 'react'
import { useGetBooksQuery } from '../features/apiSlice';

const BookList = () => {

  const {data, isLoading, error} = useGetBooksQuery();

  if(isLoading) return <p>Loading ...</p>
  if(error) return <p>Error loading books</p>

  return (
    <div>
      <h1>Library</h1>
      <ul>
        {data?.data?.books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.genre} , {book.publishedYear})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList