import React from 'react'
import { useGetBooksQuery } from '../features/bookSlice'

const BookList = () => {

  const {data, error, isLoading} = useGetBooksQuery();

  if(isLoading) return <p>Loading books ...</p>
  
  if(error) return <p>Error loading books : {error.message}</p>

  const books = data?.data?.books;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.genre} ({book.publishedYear})
            <br/>
            Author : {book.author.name}, Publisher : {book.publisher.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList