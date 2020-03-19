import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = ( { isAuth, login, logout, } ) => {
  return (
    <header className={ s.header }>
      <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt="header" />

      <div className={ s.loginBlock }>
        {
          isAuth
            ? <div>
              <span style={ { marginRight: '5px', } }>{ login }</span>
              <button onClick={ logout }>Log out</button>
            </div>
            : <NavLink to={ '/login' }>Login</NavLink>
        }
      </div>
    </header>
  );
};

export default Header;