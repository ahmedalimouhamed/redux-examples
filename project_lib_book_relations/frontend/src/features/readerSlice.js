import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const readerSlice = createApi({
  reducerPath: 'createApi',
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
    getReaders: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({
          query: `
            query{
              readers{
                id
                name
                age
                borrowedBooks{
                  id
                  title
                  genre
                  publishedYear
                }
              }
            }
          `
        })
      }),

      providesTags: ['Readers'],
    }),

    addReader: builder.mutation({
      query: newReader => ({
        method: "POST",
        body: JSON.stringify({
          query: `
            mutation{
              addReader(
                name: "${newReader.name}",
                age: ${newReader.age},
                borrowedBooks: [${newReader.borrowedBooks.map((bookId) => `"${bookId}"`)}]
              ){
                id
                name
                borrowedBooks{
                  id
                  title
                }
              }
            }
          `
        })
      }),

      invalidatesTags: ['Readers'],
    })
  })
});

export const {useGetReadersQuery, useAddReaderMutation} = readerSlice;