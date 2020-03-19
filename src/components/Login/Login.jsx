import React from 'react';
import styles from './Login.module.css';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormControl/FormControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

const Login = ( props ) => {
  const sendLoginForm = ( formData ) => {
    props.login( formData.email, formData.password, formData.rememberMe );
  };
  if( props.isAuth ){
    return <Redirect to="/profile"/>;
  }

  return(
    <section className={ styles.login }>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={ sendLoginForm }/>
    </section>
  );
};

const maxLength30 = maxLengthCreator( 30 );

const LoginForm = ( props ) => {
  return(
    <form onSubmit={ props.handleSubmit }>
      <div className={ styles.inputGroup }>
        <Field placeholder="E-mail" component={ Input } name="email" validate={ [ required, maxLength30, ] }/>
      </div>
      <div className={ styles.inputGroup }>
        <Field placeholder="Password" component={ Input } name="password" validate={ [ required, ] } type="password"/>
      </div>
      <div className={ styles.inputGroup }>
        <span>remember me:</span>
        <Field component={ Input } type="checkbox" name="rememeberMe"/>
      </div>

      { props.error ? <div className={ styles.formError }>{props.error}</div> : null }

      <div className={ styles.inputGroup }>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm( {
  form: 'login',
} )( LoginForm );

const mapStateToProps = ( state ) => ( {
  isAuth: state.auth.isAuth,
} );

export default connect( mapStateToProps, { login, } )( Login );