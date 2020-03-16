import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching } from '../../redux/users-reducer';
import * as axios from 'axios';
import Users from './Users.jsx';

class UsersContainer extends Component {
  componentDidMount = () => {
    this.getUsers( this.props.currentPage, this.props.pageSize );
  }

  getUsers = ( page, count ) => {
    this.props.setIsFetching( true );
    this.props.setUsers( [] );
    axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${ page }&count=${ count }` )
      .then( res => {
        // console.log( res.data.items );
        this.props.setIsFetching( false );
        this.props.setUsers( res.data.items );
        // this.props.setTotalUsersCount( res.data.totalCount );
      } );
  }

  onPageChanged = ( pageNumber ) => {
    this.props.setCurrentPage( pageNumber );
    this.getUsers( pageNumber, this.props.pageSize );
  }

  setCurrentPage = ( page ) => {
    this.props.setCurrentPageAC( page );
  }

  render () {
    return(
      <Users
        totalUsersCount={ this.props.totalUsersCount }
        pageSize={ this.props.pageSize }
        currentPage={ this.props.currentPage }
        onPageChanged={ this.onPageChanged }
        users={ this.props.users }
        unfollow={ this.props.unfollow }
        follow={ this.props.follow }
        isFetching={ this.props.isFetching }
      />
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

export default connect( mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
} )( UsersContainer );