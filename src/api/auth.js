import client from './client';
import storage from '../utils/storage';

export const login = credentials =>
  client.login(credentials).then(auth => {
    const { token } = auth;
    // console.log(auth);
    if (credentials.remcredentials) storage.set('userToken', token);
    return auth;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('userToken');
  });
