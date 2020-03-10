import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';

const Users = ( props ) => {
  const pagesCount = Math.ceil( props.totalUsersCount / props.pageSize );

  const pages = [];
  for( let i=1; i<=pagesCount; i++ ){
    pages.push( i );
  }
  return (
    <div>
      <ul className={ styles.listPagination }>
        { pages.map( ( p ) => {
          // console.log( 'currentPage:', props.currentPage, 'p', p );
          return (
            <li
              onClick={ () => props.onPageChanged( p ) }
              key={ p }
              className={ props.currentPage === p ? styles.selectedPage : null }
            >{p}</li>
          );
        } )
        }
      </ul>
      {/* <button onClick={ getUsers }>Get users</button> */}
      {
        props.users.map( u => <div key={ u.id }>
          <span>
            <div>
              <img src={ u.photos.small ? u.photos.small : userPhoto } className={ styles.userPhoto } alt="user"/>
            </div>
            <div>
              {u.followed
                ? <button onClick={ () => {
                  props.unfollow( u.id );
                } }>Unfollow</button>
                : <button onClick={ () => {
                  props.follow( u.id );
                } }>Follow</button>}

            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{ 'country' }</div>
              <div>{ 'city' }</div>
            </span>
          </span>
        </div> )
      }
    </div>
  );
};

export default Users;