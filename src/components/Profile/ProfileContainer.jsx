import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';

import {
  getUserProfile,
  getStatus,
  updateStatus
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
      userId = this.props.authorizedUserId;
      if( !userId ){
        this.props.history.push( '/login' );
      }
    }
    this.props.getUserProfile( userId );
    this.props.getStatus( userId );
    // this.props.setIsFetching( true );

  }

  render () {
    return(
      <section className="section">
        <Profile
          { ...this.props }
          status={ this.props.status }
          profile={ this.props.profile }
          updateStatus={ this.props.updateStatus }
        />
      </section>
    );
  }
}

const mapStateToProps = ( state ) => ( {
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
} );

export default
compose(
  connect( mapStateToProps, { getUserProfile, getStatus, updateStatus, } ),
  withRouter
  // withAuthRedirect
)( ProfileContainer );

