import React from 'react'
import { useGetAuthorsQuery } from '../features/authorSlice'

const AuthorList = () => {

  const {data, error, isLoading} = useGetAuthorsQuery();
  
  if(isLoading) return <p>Loading authors ...</p>

  if(error) return <p>Error loading authors : {error.message}</p>

  const authors = data?.data?.authors;
  console.log(authors);

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            name : {author.name} - age : {author.age}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AuthorList