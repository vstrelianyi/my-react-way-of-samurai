import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching, toggleInProgress } from '../../redux/users-reducer';
import Users from './Users.jsx';
import { usersAPI } from '../../api/api';

class UsersContainer extends Component {
  componentDidMount = () => {
    this.props.setIsFetching( true );
    this.props.setUsers( [] );
    usersAPI.getUsers( this.props.currentPage, this.props.pageSize )
      .then( res => {
        this.props.setIsFetching( false );
        this.props.setUsers( res.items );
      } );

  }

  onPageChanged = ( pageNumber ) => {
    this.props.setCurrentPage( pageNumber );
    this.props.setIsFetching( true );
    this.props.setUsers( [] );
    usersAPI.getUsers( pageNumber, this.props.pageSize )
      .then( res => {
        this.props.setIsFetching( false );
        this.props.setUsers( res.items );
      } );
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
        inProgress = { this.props.inProgress }
        toggleInProgress={ this.props.toggleInProgress }
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
    inProgress: state.usersPage.inProgress,
  };
};

export default connect( mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
  toggleInProgress,
} )( UsersContainer );