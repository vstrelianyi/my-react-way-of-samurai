import { combineReducers, createStore, applyMiddleware } from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import sidebarReducer from './sidebar-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers( {
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
} );

const store = createStore( reducers, applyMiddleware( thunkMiddleware ) );

window.store = store;

export default store;