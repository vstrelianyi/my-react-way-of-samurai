import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

import { PostFormRedux } from './PostForm/PostForm';

const MyPosts = ( props ) => {
  const postsElements = props.posts.map( p => <Post message={ p.message } likesCount={ p.likesCount } key={ p.id }/> );

  const sendPostForm = ( formData ) => {
    props.addPost( formData.postText );
  };

  return (
    <div className={ s.postsBlock }>
      <h3>My posts</h3>

      <PostFormRedux onSubmit={ sendPostForm }/>

      <div className={ s.posts }>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;