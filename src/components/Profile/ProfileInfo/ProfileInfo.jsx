import React from 'react';
import Spinner from '../../Spinner/Spinner';
import styles from './ProfileInfo.module.css';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

const ProfileInfo = ( { profile, } ) => {
  const renderProfile = () => {
    return(
    <>
      {/* <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt="profile"/> */}
      <div className={ styles.descriptionBlock }>
        <span>User ID: { profile.userId}</span>
        <span>Fullname: { profile.fullName}</span>
        <img src={ profile.photos.large } alt="photo-profile"/>
        <span>{ profile.aboutMe }</span>
        <ProfileStatus status="hello friends"/>
      </div>
    </>
    );
  };
  return (
    <div className={ styles.profileInfo }>
      { !profile ? <Spinner/> : renderProfile() }
    </div>
  );
};

export default ProfileInfo;