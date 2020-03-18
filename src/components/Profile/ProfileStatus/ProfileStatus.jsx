import React, { Component } from 'react';
import Spinner from '../../Spinner/Spinner';
import styles from './ProfileStatus.module.css';

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  componentDidUpdate ( prevProps, prevState ) {
    if( prevProps.status !== this.props.status ){
      this.setState( {
        status: this.props.status,
      } );
    }
  }

  activateEditMode = () => {
    this.setState( {
      editMode: true,
    } );
  }

  deactivateEditMode = () => {
    this.setState( {
      editMode: false,
    } );
    this.props.updateStatus( this.state.status );
  }

  onStatusChange = ( e ) => {
    const status = e.currentTarget.value;
    this.setState( { status: status, } );
  }

  render () {
    return (
      <div className={ styles.profileStatus }>
        <div>
          {!this.state.editMode &&
            <span onClick={ this.activateEditMode }>{this.props.status || '-------'}</span>
          }
          {this.state.editMode &&
            <input onChange={ this.onStatusChange } autoFocus={ true } onBlur={ this.deactivateEditMode } value={ this.state.status }/>
          }
        </div>
      </div>
    );
  }
}

export default ProfileStatus;