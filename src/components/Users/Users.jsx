import React from 'react';
import { Link } from 'react-router-dom';

import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';

import * as axios from 'axios';

import Spinner from '../Spinner/Spinner.jsx';

const Users = ( props ) => {
  const pagesCount = Math.ceil( props.totalUsersCount / props.pageSize );

  const pages = [];
  for( let i=1; i<=pagesCount; i++ ){
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

                        ? <button onClick={ () => {
                          console.log( 'unfollow' );
                          axios.delete( `https://social-network.samuraijs.com/api/1.0/unfollow/${ u.id }`, { withCredentials: true, headers: { 'API-KEY' : '2938316e-42fb-4f4f-a882-a47c3bb0357b', }, } )
                            .then( res => {
                              if( res.data.resulCode === 0 ){
                                props.unfollow( u.id );
                              }
                            } );
                        } }>Unfollow</button>

                        : <button onClick={ () => {
                          console.log( 'follow' );
                          axios.post( `https://social-network.samuraijs.com/api/1.0/follow/${ u.id }`, null, { withCredentials: true, headers: { 'API-KEY': '2938316e-42fb-4f4f-a882-a47c3bb0357b', }, } )
                            .then( res => {
                              debugger;
                              if( res.data.resulCode === 0 ){
                                props.follow( u.id );
                              }
                            } );
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
                </li> );
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