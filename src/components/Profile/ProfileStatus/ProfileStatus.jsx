import React, { Component } from 'react';
import Spinner from '../../Spinner/Spinner';
import styles from './ProfileStatus.module.css';

class ProfileStatus extends Component {
  state = {
    editMode: false,
  }

  toggleEditMode = () => {
    // debugger;
    const newState = !this.state.editMode;
    this.setState( { editMode: newState, } );
  }
  renderStatus () {
    return(
      <>
      { this.state.editMode ? <input autoFocus onBlur={ this.toggleEditMode } value={ this.props.status } type="text"/> : <span onClick={ this.toggleEditMode }>{this.props.status}</span> }
      </>
    );
  }
  render () {
    return (
      <div className={ styles.profileStatus }>
        { !this.props.status ? <Spinner/> : this.renderStatus() }
      </div>
    );
  }
}

export default ProfileStatus;