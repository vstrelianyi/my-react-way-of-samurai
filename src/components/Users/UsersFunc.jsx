import React from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

const UsersFunc = ( props ) => {

  const getUsers = () => {
    if ( !props.users.length ){
      // console.log( 'getUsers' );
      axios.get( 'https://social-network.samuraijs.com/api/1.0/users' )
        .then( res => {
        // console.log( res.data.items );
          props.setUsers( res.data.items );
        } );
    }
  };
  return (
    <div>
      <button onClick={ getUsers }>Get users</button>
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

export default UsersFunc;