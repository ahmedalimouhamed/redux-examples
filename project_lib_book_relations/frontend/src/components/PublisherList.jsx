import React from 'react'
import { useGetPublishersQuery } from '../features/publisherSlice'

const PublisherList = () => {

  const {data, error, isLoading} = useGetPublishersQuery();

  if(isLoading) return <p>Loading publishers ...</p>

  if(error) return <p>Error loading publishers {error.message}</p>

  const publishers = data?.data?.publishers;

  return (
    <div>
      <h2>Publishers</h2>
      <ul>
        {publishers.map((publisher) => (
          <li key={publisher.id}>
            name : {publisher.name} - location : {publisher.location}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublisherList