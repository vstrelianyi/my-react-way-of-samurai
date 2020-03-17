import React, { Component } from 'react';
import Header from './Header.jsx';
import * as axios from 'axios';
import { setAuthUserData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  componentDidMount () {
    this.getAuth();
  }
  getAuth = () => {
    // this.props.setIsFetching( true );
    // this.props.setUsers( [] );
    axios.get( 'https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true, } )
      .then( res => {
        // debugger;
        if( res.data.resultCode === 0 ){
          const { id, login, email, } = res.data.data;
          this.props.setAuthUserData( id, email, login );
        }
        // this.props.setIsFetching( false );
        // this.props.setUsers( res.data.items );
      } );
  }

  render () {
    return (
      <Header { ...this.props }/>
    );
  }

}

const mapStateToProps = ( state ) => ( {
  isAuth: state.auth.isAuth,
  login: state.auth.login,
} );

export default connect( mapStateToProps, { setAuthUserData, } )( HeaderContainer );