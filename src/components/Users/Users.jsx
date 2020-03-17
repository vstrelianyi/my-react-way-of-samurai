import React from 'react';
import { Link } from 'react-router-dom';

import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';

import { usersAPI } from '../../api/api';

import Spinner from '../Spinner/Spinner.jsx';

const Users = ( props ) => {
  const pagesCount = Math.ceil( props.totalUsersCount / props.pageSize );

  const pages = [];
  for( let i = 1; i <= pagesCount; i++ ){
    pages.push( i );
  }
  return (
    <section className={ styles.sectionUsers }>
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
      <div className={ styles.wrapperListUsers }>
        <ul className={ styles.listUsers }>
          {
            props.users.map( u => {
              return(

                <li key={ u.id }>
                  <span>
                    <div>
                      <Link to={ `/profile/${ u.id }` }>
                        <img src={ u.photos.small ? u.photos.small : userPhoto } className={ styles.userPhoto } alt="user"/>
                      </Link>
                    </div>
                    <div>
                      {u.followed

                        ? <button disabled={ props.inProgress.some( id => id === u.id ) } onClick={ () => {
                          props.toggleInProgress( true, u.id );
                          usersAPI.unfollow( u.id )
                            .then( res => {
                              if( res.resultCode === 0 ){
                                props.unfollow( u.id );
                              }
                              props.toggleInProgress( false, u.id );
                            } );
                        } }>Unfollow</button>

                        : <button disabled={ props.inProgress.some( id => id === u.id ) } onClick={ () => {
                          props.toggleInProgress( true, u.id );
                          usersAPI.follow( u.id )
                            .then( res => {
                              if( res.resultCode === 0 ){
                                props.follow( u.id );
                              }
                              props.toggleInProgress( false, u.id );
                            } );
                        } }>Follow</button>}

                    </div>
                  </span>
                  <span>
                    <span>
                      <div>id: { u.id }</div>
                      <div>{u.name}</div>
                      <div>{u.status}</div>
                    </span>
                    <span>
                      <div>{ 'country' }</div>
                      <div>{ 'city' }</div>
                    </span>
                  </span>
                </li>

              );
            }
            )
          }
        </ul>
        { props.isFetching ? <Spinner/> : null }
      </div>
    </section>
  );
};

export default Users;