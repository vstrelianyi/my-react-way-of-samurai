import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};

const authReducer = ( state = initialState, action ) => {
  switch( action.type ){
  case SET_USER_DATA:{
    return {
      ...state,
      ...action.payload,
    };
  }
  default: return state;
  }
};

const setAuthUserData = ( userId, email, login, isAuth ) => ( { type: SET_USER_DATA, payload: { userId: userId, email: email, login: login, isAuth: isAuth, }, } );

export const getAuthUserData = () => ( dispatch ) => {
  authAPI.me()
    .then( res => {
      if( res.data.resultCode === 0 ){
        const { id, login, email, } = res.data.data;
        dispatch( setAuthUserData( id, email, login, true ) );
      }
    } );
};

export const login = ( email, password, rememberMe ) => ( dispatch ) => {

  authAPI.login( email, password, rememberMe )
    .then( res => {
      if( res.data.resultCode === 0 ){
        dispatch( getAuthUserData() );
      } else{
        const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error';
        const action = stopSubmit( 'login', { _error: message, } );
        dispatch( action );
      }
    } );
};

export const logout = () => ( dispatch ) => {
  authAPI.logout()
    .then( res => {
      if( res.data.resultCode === 0 ){
        dispatch( setAuthUserData( null, null, null, false ) );
      }
    } );
};

export default authReducer;