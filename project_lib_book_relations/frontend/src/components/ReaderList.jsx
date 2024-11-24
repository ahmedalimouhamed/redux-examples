import React from 'react'
import { useGetReadersQuery } from '../features/readerSlice'

const ReaderList = () => {

  const {data, error, isLoading} = useGetReadersQuery();

  if(isLoading) return <p>Loading readers ...</p>;
  if(error) return <p>Error loading readers : {error.message}</p>

  const readers = data?.data?.readers;

  return (
    <div>
      <h2>Readers</h2>
      <ul>
        {readers.map((reader) => (
          <li key={reader.id} style={{ marginBottom : "30px" }}>
            <strong>{reader.name}</strong> - Age : {reader.age}
            <hr />
            <h3>Borrowed books : </h3>
            <ul>
              {reader.borrowedBooks.map((book) => (
                <li key={book.id}>{book.title} - {book.genre} ({book.publishedYear})</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReaderList