import React, { Component } from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  setUserProfile
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
      userId = 2;
    }
    // this.props.setIsFetching( true );
    axios.get( `https://social-network.samuraijs.com/api/1.0/profile/${ userId }` )
      .then( res => {
        // this.props.setIsFetching( false );
        // console.log( res.data );
        this.props.setUserProfile( res.data );
      } );
  }

  render () {
    return(
      <section className="section">
        <Profile
          // { ...this.props }
          setUserProfile={ setUserProfile }
          profile={ this.props.profile }
        />
      </section>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    profile: state.profilePage.profile,
  };
};

const WithUrlDataContainerComponent= withRouter( ProfileContainer );

export default connect( mapStateToProps, { setUserProfile, } )( WithUrlDataContainerComponent );