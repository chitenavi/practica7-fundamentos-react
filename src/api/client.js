import axios from 'axios';

const { REACT_APP_BASE_API_URL: baseURL } = process.env;

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
  client.post('/apiv1/auth', credentials).then(auth => {
    setAuthorizationHeader(auth.accessToken);
    return auth;
  });

// Logout method
client.logout = () =>
  new Promise(resolve => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

// Con lo siguiente nos ahorramos otra promesa
// con los datos obtenidos
client.interceptors.response.use(
  response => response.data,
  error => {
    return error.message;
  },
);

export const configureClient = accessToken => {
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};

export default client;
