import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const mapStateToProps = ( state ) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const AuthRedirectComponent = withAuthRedirect( Dialogs );

const mapDispatchToProps = ( dispatch ) => {
  return {
    sendMessage: () => {
      dispatch( sendMessageCreator() );
    },
    updateNewMessageBody: ( body ) => {
      dispatch( updateNewMessageBodyCreator( body ) );
    },
  };
};

const DialogsContainer = connect( mapStateToProps, mapDispatchToProps )( AuthRedirectComponent );

export default DialogsContainer;