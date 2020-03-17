import React, { Component } from 'react';
import Header from './Header.jsx';
import { getAuthUserDate } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  componentDidMount () {
    this.getAuth();
  }
  getAuth = () => {
    this.props.getAuthUserDate();
    // this.props.setIsFetching( true );
    // this.props.setUsers( [] );

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

export default connect( mapStateToProps, { getAuthUserDate, } )( HeaderContainer );