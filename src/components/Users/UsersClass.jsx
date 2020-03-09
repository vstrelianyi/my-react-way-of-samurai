import React, { Component } from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

export default class User extends Component {
  componentDidMount = () => {
    this.getUsers();
  }

  getUsers = () => {
    // console.log( 'getUsers' );
    axios.get( `https://social-network.samuraijs.com/api/1.0/users?page${ this.props.currentPage }&count=${ this.props.pageSize }` )
      .then( res => {
        // console.log( res.data.items );
        this.props.setUsers( res.data.items );
      } );
  }

  setCurrentPage = ( page ) => {
    this.props.setCurrentPageAC( page );
  }

  render () {
    const pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize );
    const pages = [];
    for( let i=1; i<=pagesCount; i++ ){
      pages.push( i );
    }
    return(
      <div>
        <ul className={ styles.listPagination }>
          { pages.map( ( p, i ) => {
            return (
              <li
                onClick={ () => this.props.setCurrentPage( i ) }
                key={ i }
                className={ this.props.currentPage === i ? styles.selectedPage : null }>{p}</li>
            );
          } )
          }
        </ul>
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