import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import {
  getUserProfile
  // addPostActionCreator,
  // updateNewPostTextActionCreator
} from '../../redux/profile-reducer';

import './Profile.module.css';

class ProfileContainer extends Component {
  componentDidMount () {
    this.getProfile();
  }

  getProfile = () => {
    // let userId = this.props.match.params.userId;
    let userId = this.props.match.params.userId;
    if ( !userId ){
      userId = 6482;
    }
    this.props.getUserProfile( userId );
    // this.props.setIsFetching( true );

  }

  render () {
    if( !this.props.isAuth ){
      return <Redirect to={ '/login' }/>;
    }
    return(
      <section className="section">
        <Profile
          // { ...this.props }
          // setUserProfile={ setUserProfile }
          profile={ this.props.profile }
        />
      </section>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
  };
};

const WithUrlDataContainerComponent = withRouter( ProfileContainer );

export default connect( mapStateToProps, { getUserProfile, } )( WithUrlDataContainerComponent );