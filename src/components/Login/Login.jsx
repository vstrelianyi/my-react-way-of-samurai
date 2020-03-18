import React from 'react';
import styles from './Login.module.css';
import { reduxForm, Field } from 'redux-form';

const Login = ( props ) => {
  const sendLoginForm = ( formData ) => {
    console.log( formData );
  };

  return(
    <section className={ styles.login }>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={ sendLoginForm }/>
    </section>
  );
};

const LoginForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className={ styles.inputGroup }>
        <Field placeholder="Login" component="input" name="login"/>
      </div>
      <div className={ styles.inputGroup }>
        <Field placeholder="Password" component="input" name="password"/>
      </div>
      <div className={ styles.inputGroup }>
        <Field component="input" type="checkbox" name="rememeberMe"/>
      </div>
      <div className={ styles.inputGroup }>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm( {
  form: 'login',
} )( LoginForm );

export default Login;