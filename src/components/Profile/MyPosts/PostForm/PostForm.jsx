import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../common/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';

const maxLength10 = maxLengthCreator( 10 );

const PostForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className="input-group">
        <Field placeholder="Your message here" component={ Textarea } name="postText" validate={ [ required, maxLength10, ] } />
      </div>
      <div className="input-group">
        <button>Add post</button>
      </div>
    </form>
  );
};

export const PostFormRedux = reduxForm( {
  form: 'postForm',
} )( PostForm );
