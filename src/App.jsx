import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';

const App = () => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className='app-wrapper-content'>
        <Switch>
          <Route exact path='/'
            render={ () => <h1>Home page</h1> }
          />
          <Route path='/dialogs'
            render={ () => <DialogsContainer /> }
          />

          <Route path='/profile/:userId?'
            render={ () => <ProfileContainer /> }
          />

          <Route path='/users'
            render={ () => <UsersContainer /> }
          />

          <Route
            render={ () => <h1>No page found</h1> }
          />
        </Switch>

      </div>
    </div>
  );
};

export default App;