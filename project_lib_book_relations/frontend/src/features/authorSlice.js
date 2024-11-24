import  {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authorSlice = createApi({
  reducerPath: 'authorApi',
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
    getAuthors: builder.query({
      query: () => ({
        method: 'POST',
        body: JSON.stringify({query : `
          query{
            authors{
              id
              name
              age
            }
          }
        `})
      }),

      providesTags: ['Authors'],
    }),

    addAuthor: builder.mutation({
      query: newAuthor => {
        console.log("Form Data Sent:", newAuthor);
    
        const payload = {
          method: 'POST',
          body: JSON.stringify({
            query: `
              mutation {
                addAuthor(
                  name: "${newAuthor.name}",
                  age: ${newAuthor.age}
                ){  
                  id
                  name
                  age
                }
              }
            `
          })
        };
    
        // Log the constructed request payload
        console.log("Request Payload:", payload);
    
        return payload;
      },

      invalidatesTags: ['Authors'],
    })    
  })
});

export const {useGetAuthorsQuery, useAddAuthorMutation} = authorSlice;