import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength10 = maxLengthCreator( 50 );

const MessageForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className="input-group">
        <Field placeholder="Your message here" component={ Textarea } name="messageText" validate={ [ required, maxLength10, ] }/>
      </div>
      <div className="input-group">
        <button>Send</button>
      </div>
    </form>
  );
};

export const MessageFormRedux = reduxForm( {
  form: 'dialogMessageForm',
} )( MessageForm );