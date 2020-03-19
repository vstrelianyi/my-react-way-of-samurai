import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, requestUsers } from '../../redux/users-reducer';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getInProgress } from '../../redux/users-selectors';
import Users from './Users.jsx';
import { compose } from 'redux';

class UsersContainer extends Component {
  componentDidMount = () => {
    this.props.requestUsers( this.props.currentPage, this.props.pageSize );
  }

  onPageChanged = ( pageNumber ) => {
    this.props.requestUsers( pageNumber, this.props.pageSize );
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
    users: getUsers( state ),
    pageSize: getPageSize( state ),
    totalUsersCount: getTotalUsersCount( state ),
    currentPage: getCurrentPage( state ),
    isFetching: getIsFetching( state ),
    inProgress: getInProgress( state ),
  };
};

export default compose(
  connect( mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    requestUsers,
  } )
)( UsersContainer );