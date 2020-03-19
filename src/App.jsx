import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Spinner from './components/common/Spinner/Spinner';

import { withRouter } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';

class App extends Component {

  componentDidMount () {
    this.props.initializeApp();
  }

  render () {
    if ( !this.props.initialized ){
      return(
        <div className='app-wrapper'>
          <Spinner/>
        </div>
      );
    }
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

            <Route path='/login'
              render={ () => <Login /> }
            />

            <Route
              render={ () => <h1>No page found</h1> }
            />
          </Switch>

        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ( {
  initialized: state.app.initialized,
} );

export default compose(
  withRouter,
  connect( mapStateToProps, { initializeApp, } )
)( App );