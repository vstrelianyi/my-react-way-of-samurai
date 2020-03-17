import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IN_PROGRESS = 'TOGGLE_IN_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 21,
  currentPage: 1,
  isFetching: true,
  inProgress: [],
};

const usersReducer = ( state = initialState, action ) => {
  switch( action.type ){
  case FOLLOW:
    return {
      ...state,
      users: state.users.map( u => {
        if ( u.id === action.payload ){
          return { ...u, followed: true, };
        }
        return u;
      } ),
    };
  case UNFOLLOW:
    return {
      ...state,
      users: state.users.map( u => {
        if ( u.id === action.payload ){
          return { ...u, followed: false, };
        }
        return u;
      } ),
    };
  case SET_USERS:{
    return { ...state, users: action.payload, };
  }
  case SET_CURRENT_PAGE:{
    return { ...state, currentPage: action.payload, };
  }
  case SET_TOTAL_USERS_COUNT:{
    return { ...state, totalUsersCount: action.payload, };
  }
  case TOGGLE_IS_FETCHING:{
    return { ...state, isFetching: action.isFetching, };
  }
  case TOGGLE_IN_PROGRESS:{
    return{
      ...state,
      inProgress: action.isFetching
        ? [ ...state.inProgress, action.userId, ]
        : state.inProgress.filter( id => id != action.userId ),
    };
  }
  default:
    return state;
  }
};

export const followSuccess = ( userId ) => ( { type: FOLLOW, payload: userId, } );
export const unfollowSuccess = ( userId ) => ( { type: UNFOLLOW, payload: userId, } );
export const setUsers = ( users ) => ( { type: SET_USERS, payload: users, } );
export const setCurrentPage = ( pageNumber ) => ( { type: SET_CURRENT_PAGE, payload: pageNumber, } );
export const setTotalUsersCount = ( totalCount ) => ( { type: SET_TOTAL_USERS_COUNT, payload: totalCount, } );
export const toggleIsFetching = ( isFetching ) => ( { type: TOGGLE_IS_FETCHING, isFetching: isFetching, } );
export const toggleInProgress = ( isFetching, userId ) => ( { type: TOGGLE_IN_PROGRESS, isFetching: isFetching, userId: userId, } );

export const getUsers = ( currentPage, pageSize ) => ( dispatch ) => {
  dispatch( toggleIsFetching( true ) );
  dispatch( setCurrentPage( currentPage ) );
  dispatch( setUsers( [] ) );
  usersAPI.getUsers( currentPage, pageSize )
    .then( res => {
      dispatch( toggleIsFetching( false ) );
      dispatch( setUsers( res.items ) );
      // dispatch( setTotalUsersCount( res.totalCount ) );
    } );
};

export const follow = ( userId ) => ( dispatch ) => {
  dispatch( toggleInProgress( true, userId ) );
  usersAPI.follow( userId )
    .then( res => {
      if ( res.resultCode == 0 ){
        dispatch( followSuccess( userId ) );
      }
      dispatch( toggleInProgress( false, userId ) );
    } );
};

export const unfollow = ( userId ) => ( dispatch ) => {
  dispatch( toggleInProgress( true, userId ) );
  usersAPI.unfollow( userId )
    .then( res => {
      if ( res.resultCode == 0 ){
        dispatch( unfollowSuccess( userId ) );
      }
      dispatch( toggleInProgress( false, userId ) );
    } );
};

export default usersReducer;