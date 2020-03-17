import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, getUsers } from '../../redux/users-reducer';
import Users from './Users.jsx';

class UsersContainer extends Component {
  componentDidMount = () => {
    this.props.getUsers( this.props.currentPage, this.props.pageSize );
  }

  onPageChanged = ( pageNumber ) => {
    this.props.getUsers( pageNumber, this.props.pageSize );
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
        follow={ this.props.follow }
        unfollow={ this.props.unfollow }
        isFetching={ this.props.isFetching }
        inProgress = { this.props.inProgress }
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
  setCurrentPage,
  getUsers,
} )( UsersContainer );