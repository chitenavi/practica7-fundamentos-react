import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import LoginPage from '../auth/LoginPage';
import { AuthContextProvider } from '../auth/AuthContext';

function App() {
  const [loggedUserId, setLoggedUserId] = useState(null);

  const handleLogin = loggedId =>
    new Promise(resolve => {
      setLoggedUserId(loggedId);
      resolve();
    });
  const handleLogout = () => setLoggedUserId(null);

  return (
    <AuthContextProvider
      value={{
        isLogged: !!loggedUserId,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <MainLayout title="Bienvenido a Nodepop SPA">
              <p>Página Inicio Home</p>
            </MainLayout>
          </Route>
          <Route path="/login" exact>
            <LoginPage />
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

export default App;
