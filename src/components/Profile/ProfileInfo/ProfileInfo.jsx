import React from 'react';
import Spinner from '../../common/Spinner/Spinner';
import styles from './ProfileInfo.module.css';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

const ProfileInfo = ( { profile, status, updateStatus, } ) => {
  const renderProfile = () => {
    return(
      <>
        {/* <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt="profile"/> */}
        <div className={ styles.descriptionBlock }>
          <span>User ID: { profile.userId}</span>
          <span>Fullname: { profile.fullName}</span>
          <img src={ profile.photos.large } alt="profile" />
          <span>{ profile.aboutMe }</span>
          <ProfileStatus status={ status } updateStatus={ updateStatus }/>
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