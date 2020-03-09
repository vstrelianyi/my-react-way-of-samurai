// import UsersFunc from './UsersFunc.jsx';
import UsersClass from './UsersClass.jsx';
import { connect } from 'react-redux';
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC } from '../../redux/users-reducer';

const mapStateToProps = ( state ) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    follow: ( userId ) => {
      dispatch( followAC( userId ) );
    },
    unfollow: ( userId ) => {
      dispatch( unfollowAC( userId ) );
    },
    setUsers: ( users ) => {
      dispatch( setUsersAC( users ) );
    },
    setCurrentPage: ( page ) => {
      dispatch( setCurrentPageAC( page ) );
    },
  };
};

const UsersContainer = connect( mapStateToProps, mapDispatchToProps )( UsersClass );

export default UsersContainer;