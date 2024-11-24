import React, { useState } from 'react'
import { useCreatePostMutation } from '../slice/ApiSlice'

const CreatePost = () => {

  const [createPost] = useCreatePostMutation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const createdPost = await createPost({title, body});
    setTitle('');
    setBody('');
    console.log(createdPost.data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Post title' />
        <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} id="" placeholder='Body'></textarea>
        <button type='submit'>create Post</button>
      </form>
    </div>
  )
}

export default CreatePost