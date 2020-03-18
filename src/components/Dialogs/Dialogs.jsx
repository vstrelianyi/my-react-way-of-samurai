import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

const Dialogs = ( props ) => {

  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map( d => <DialogItem name={ d.name } key={ d.id } id={ d.id } /> );
  const messagesElements = state.messages.map( m => <Message message={ m.message } key={ m.id } /> );

  const sendMessageForm = ( formData ) => {
    props.sendMessage( formData.messageText );
  };

  if( !props.isAuth ){
    return <Redirect to={ '/login' }/>;
  }

  return (
    <div className={ s.dialogs }>
      <div className={ s.dialogsItems }>
        { dialogsElements }
      </div>
      <div className={ s.messages }>
        <div>{ messagesElements }</div>
        <MessageFormRedux onSubmit={ sendMessageForm }/>
      </div>
    </div>
  );
};

const MessageForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className="input-group">
        <Field placeholder="Your message here" component="textarea" name="messageText"/>
      </div>
      <div className="input-group">
        <button>Send</button>
      </div>
    </form>
  );
};

const MessageFormRedux = reduxForm( {
  form: 'dialogMessageForm',
} )( MessageForm );

export default Dialogs;