import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';

import { required, mexLength30 } from '../../../utils/validators/validators';

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

const PostForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className="input-group">
        <Field placeholder="Your message here" component="textarea" name="postText" validate={ [ required, mexLength30, ] } />
      </div>
      <div className="input-group">
        <button>Add post</button>
      </div>
    </form>
  );
};

const PostFormRedux = reduxForm( {
  form: 'postForm',
} )( PostForm );

export default MyPosts;