import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const publisherSlice = createApi({
  reducerPath: 'publisherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/graphql',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json')
      const token = localStorage.getItem('token');
      if(token){
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),

  endpoints: builder => ({
    getPublishers: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({query: `
          query {
            publishers{
              id
              name
              location
            }
          }
        `})
      }),
      providesTags: ['Publishers'],
    }),


    addPublisher: builder.mutation({
      query: newPublisher => {
        console.log("Form Data Sent:", newPublisher);
    
        const payload = {
          method: 'POST',
          body: JSON.stringify({
            query: `
              mutation {
                addPublisher(
                  name: "${newPublisher.name}",
                  location: "${newPublisher.location}"
                ){  
                  id
                  name
                  location
                }
              }
            `
          })
        };
    
        // Log the constructed request payload
        console.log("Request Payload:", payload);
    
        return payload;
      },
      invalidatesTags: ['Publishers'],
    })
  })
});

export const {useGetPublishersQuery, useAddPublisherMutation} = publisherSlice;