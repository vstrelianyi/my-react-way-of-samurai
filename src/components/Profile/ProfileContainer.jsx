import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';

import {
  getUserProfile
  // addPostActionCreator,
  // updateNewPostTextActionCreator
} from '../../redux/profile-reducer';

import './Profile.module.css';
import { compose } from 'redux';

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

const mapStateToProps = ( state ) => ( { profile: state.profilePage.profile, } );

export default
compose(
  connect( mapStateToProps, { getUserProfile, } ),
  withRouter
  // withAuthRedirect
)( ProfileContainer );

