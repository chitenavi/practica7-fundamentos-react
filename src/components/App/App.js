import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainLayout from '../layout/MainLayout';
import LoginPage from '../auth/LoginPage';
import { AuthContextProvider } from '../auth/AuthContext';
import PrivateRoute from '../auth/PrivateRoute';
import AdvertsPage from '../pages/AdvertsPage';

function App({ initialToken }) {
  const [tokenUser, setTokenUser] = useState(initialToken);

  const handleLogin = token =>
    new Promise(resolve => {
      setTokenUser(token);
      resolve();
    });
  const handleLogout = () => setTokenUser(null);

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
            {tokenUser ? <Redirect to="/adverts" /> : <Redirect to="/login" />}
          </Route>
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:id" exact>
            <MainLayout title="Advert Detail">
              <div>Página de Detalle</div>
            </MainLayout>
          </PrivateRoute>
          <PrivateRoute path="/adverts/new" exact>
            <MainLayout title="New Advert">
              <div>Página de Creación de Anuncio</div>
            </MainLayout>
          </PrivateRoute>
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage onLogin={handleLogin} history={history} />
            )}
          </Route>
          <Route path="/404" exact>
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
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
