import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const bookSlice = createApi({
  reducerPath: 'bookApi',
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
    getBooks: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({query: `
            query{
              books{
                id
                title
                genre
                publishedYear
                author{
                  id
                  name
                  age
                }
                publisher{
                  id
                  name
                  location
                }
              }
            }
          `
        })
      }),
      providesTags: ['Books'],
    }),

    addBook: builder.mutation({
      query: newBook => {
        console.log("Form Data Sent:", newBook);
    
        const payload = {
          method: 'POST',
          body: JSON.stringify({
            query: `
              mutation {
                addBook(
                  title: "${newBook.title}",
                  genre: "${newBook.genre}",
                  publishedYear: ${newBook.publishedYear},
                  author: "${newBook.author}",
                  publisher: "${newBook.publisher}"
                ){
                  id
                  title
                  genre
                  publishedYear
                  author{
                    name
                    age
                  }
                  publisher{
                    name
                    location
                  }
                }
              }
            `
          })
        };
    
        // Log the constructed request payload
        console.log("Request Payload:", payload);
    
        return payload;
      },
      invalidatesTags: ['Books'],
    })
  })
});

export const {useGetBooksQuery, useAddBookMutation} = bookSlice;