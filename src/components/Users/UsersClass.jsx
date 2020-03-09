import React, { Component } from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

export default class User extends Component {
  getUsers = () => {
    if ( !this.props.users.length ){
      // console.log( 'getUsers' );
      axios.get( 'https://social-network.samuraijs.com/api/1.0/users' )
        .then( res => {
        // console.log( res.data.items );
          this.props.setUsers( res.data.items );
        } );
    }
  }

  render () {
    return(
      <div>
        <button onClick={ this.getUsers }>Get users</button>
        {
          this.props.users.map( u => <div key={ u.id }>
            <span>
              <div>
                <img src={ u.photos.small ? u.photos.small : userPhoto } className={ styles.userPhoto } alt="user"/>
              </div>
              <div>
                {u.followed
                  ? <button onClick={ () => {
                    this.props.unfollow( u.id );
                  } }>Unfollow</button>
                  : <button onClick={ () => {
                    this.props.follow( u.id );
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
  }
}