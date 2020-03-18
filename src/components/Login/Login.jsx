import React from 'react';
import styles from './Login.module.css';

const Login = ( props ) => {
  return(
    <section className={ styles.login }>
      <h1>Login</h1>
      <form action="">
        <div className={ styles.inputGroup }><input type="text" placeholder="Login"/></div>
        <div className={ styles.inputGroup }><input type="text" placeholder="Password"/></div>
        <div className={ styles.inputGroup }><input type="checkbox" /></div>
        <div className={ styles.inputGroup }><button>Login</button></div>
      </form>
    </section>
  );
};

export default Login;