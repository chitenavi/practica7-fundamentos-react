import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from '../auth/LoginPage';
import { AuthContextProvider } from '../auth/AuthContext';
import PrivateRoute from '../auth/PrivateRoute';
import AdvertsPage from '../pages/AdvertsPage';
import AdvertDetailPage from '../pages/AdvertDetailPage';
import NewAdvertPage from '../pages/NewAdvertPage';
import NotFoundPage from '../pages/NotFoundPage';

function App({ initialToken }) {
  const [tokenUser, setTokenUser] = useState(initialToken);

  const handleLogin = token =>
    new Promise(resolve => {
      setTokenUser(token);
      resolve();
    });
  const handleLogout = () => setTokenUser(null);

  // COMPLETE: fix main route '/'. It's not necesary to check tokenUser

  return (
    <AuthContextProvider
      value={{
        isLogged: !!tokenUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/adverts" />
          </Route>
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:id" exact>
            <AdvertDetailPage />
          </PrivateRoute>
          <PrivateRoute path="/adverts/new" exact>
            <NewAdvertPage />
          </PrivateRoute>
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage onLogin={handleLogin} history={history} />
            )}
          </Route>
          <Route path="/404" exact>
            <NotFoundPage />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

App.propTypes = {
  initialToken: PropTypes.string.isRequired,
};

export default App;
