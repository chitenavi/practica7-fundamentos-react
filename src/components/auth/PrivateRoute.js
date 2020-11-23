import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContextConsumer } from './AuthContext';

const PrivateRoute = ({ path, children }) => {
  return (
    <AuthContextConsumer>
      {({ isLogged }) =>
        isLogged ? (
          <Route path={path}>{children}</Route>
        ) : (
          <Redirect to="/login" />
        )
      }
    </AuthContextConsumer>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
