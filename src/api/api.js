import * as axios from 'axios';

const instance = axios.create( {
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    // 'API-KEY': '2938316e-42fb-4f4f-a882-a47c3bb0357b', // petrtrofimov7@gmail.com id:
    'API-KEY': '962a5ebd-736b-42e4-a0a3-922824cd40e6', // avocode27@protonmail.com id: 6500
    // 'API-KEY': '1aac05a2-587d-40fe-ada7-8ded18b6b1f6', // avocode28@protonmail.com id:6482
    // 'API-KEY': 'b1775b2f-c3a5-4509-8dc9-90b5629de7c3', // dima.kuzyuberdin@yandex.by
  },
} );

export const usersAPI = {
  getUsers ( page = 1, count = 10 ) {
    return instance.get( `users?page=${ page }&count=${ count }` )
      .then( res => res.data );
  },
  follow ( userId ) {
    return instance.post( `follow/${ userId }`, {} )
      .then( res => res.data );
  },
  unfollow ( userId ) {
    return instance.delete( `follow/${ userId }` )
      .then( res => res.data );
  },

};

export const profileAPI = {
  getProfile ( userId ) {
    return instance.get( 'profile/' + userId );
  },
  getStatus ( userId ) {
    return instance.get( 'profile/status/' + userId );
  },
  updateStatus ( status ) {
    return instance.put( 'profile/status', { status: status, } );
  },

};

export const authAPI = {
  me () {
    return instance.get( 'auth/me' );
  },

};
