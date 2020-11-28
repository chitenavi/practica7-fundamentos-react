import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = token => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

client.login = credentials =>
  client.post('/apiv1/auth/login', credentials).then(auth => {
    setAuthorizationHeader(auth.token);
    return auth;
  });

// Logout method
client.logout = () =>
  new Promise(resolve => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

client.interceptors.response.use(
  response => response.data,
  error => {
    throw error;
  },
);

export const setupTokenClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
