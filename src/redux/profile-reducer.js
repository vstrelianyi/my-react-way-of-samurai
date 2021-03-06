import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12, },
    { id: 2, message: 'It\'s my first post', likesCount: 11, },
    { id: 3, message: 'Blabla', likesCount: 11, },
    { id: 4, message: 'Dada', likesCount: 11, },
  ],
  profile: null,
  status: '',
};

const profileReducer = ( state = initialState, action ) => {
  switch( action.type ){
  case ADD_POST:{
    const newPost = {
      id: 5,
      message: action.postText,
      likesCount: 0,
    };
    return {
      ...state,
      posts: [ ...state.posts, newPost, ],
    };
  }
  case SET_USER_PROFILE:{
    return{
      ...state,
      profile: action.payload,
    };
  }
  case SET_STATUS:{
    return{
      ...state,
      status: action.status,
    };
  }
  default:
    return state;
  }
};

export const addPostActionCreator = ( postText ) => ( { type: ADD_POST, postText: postText, } );
const setUserProfile = ( userId ) => ( { type: SET_USER_PROFILE, payload: userId, } );
const setStatus = ( status ) => ( { type: SET_STATUS, status: status, } );

export const getUserProfile = ( userId ) => ( dispatch ) => {
  profileAPI.getProfile( userId )
    .then( res => {
      dispatch( setUserProfile( res.data ) );
    } );
};

export const getStatus = ( userId ) => ( dispatch ) => {
  profileAPI.getStatus( userId )
    .then( res => {
      dispatch( setStatus( res.data ) );
    } );
};

export const updateStatus = ( status ) => ( dispatch ) => {
  profileAPI.updateStatus( status )
    .then( res => {
      if( res.data.resultCode === 0 ){
        dispatch( setStatus( status ) );
      }
    } );
};

export default profileReducer;