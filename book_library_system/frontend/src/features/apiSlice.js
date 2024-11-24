import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath : 'api',
  baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:5000/graphql'}),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({query: `
              {
                books {
                  id
                  title
                  author
                  genre
                  publishedYear
                }
              }
        `}),
        
        headers: {'Content-Type': 'application/json'}
      })
    }),

    addBook: builder.mutation({
      query: newBook => ({
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation {
              addBook(
                title: "${newBook.title}", 
                author: "${newBook.author}", 
                genre: "${newBook.genre}", 
                publishedYear: ${newBook.publishedYear}
              ){
                id 
                title 
                author 
                genre 
                publishedYear
              }
            }
          `
        }),
        headers: {'Content-Type': 'application/json'}
      })
    })
  })
});

export const {useGetBooksQuery, useAddBookMutation} = apiSlice;