import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { logout } from '../../api/auth';
import './Header.scss';

import Button from '../shared/Button';
import AuthContext from '../auth/AuthContext';

const Header = ({ className, ...props }) => {
  const { isLogged, onLogout } = useContext(AuthContext);

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <img src="logo192.png" alt="logo" />
        </div>
      </Link>

      <nav className="header-nav">
        {isLogged ? (
          <Button
            className="loginPage-submit tertiary"
            onClick={() => logout().then(onLogout)}
            disabled={false}
          >
            Log out
          </Button>
        ) : (
          <Link to="/login">
            <Button className="loginPage-submit primary">Log in</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: 'layout-header',
};

export default Header;
