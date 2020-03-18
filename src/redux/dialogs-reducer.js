const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  dialogs: [
    { id: 1, name: 'Dimych', },
    { id: 2, name: 'Andrew', },
    { id: 3, name: 'Sveta', },
    { id: 4, name: 'Sasha', },
    { id: 5, name: 'Viktor', },
    { id: 6, name: 'Valera', },
  ],
  messages: [
    { id: 1, message: 'Hi', },
    { id: 2, message: 'How is your it-kamasutra?', },
    { id: 3, message: 'Yo', },
    { id: 4, message: 'Yo', },
    { id: 5, message: 'Yo', },
  ],
};

const dialogsReducer = ( state = initialState, action ) => {
  switch ( action.type ){
  case SEND_MESSAGE:
    return {
      ...state,
      messages: [ ...state.messages, { id: 6, message: action.text, }, ],
    };
  default:
    return state;
  }
};

export const sendMessageCreator = ( text ) => ( { type: SEND_MESSAGE, text: text, } );

export default dialogsReducer;