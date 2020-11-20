import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layout/MainLayout';
import Button from '../shared/Button';

import './LoginPage.scss';

class LoginPage extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
    },
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <MainLayout title="Login">
        <div className="loginPage">
          <form className="formLogin">
            <div className="formLogin-field">
              <input type="text" placeholder="email" />
            </div>
            <div className="formLogin-field">
              <input type="password" placeholder="password" />
            </div>

            <div className="formLogin-field">
              <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                Remember credentials
              </label>
            </div>
            <div className="formLogin-field">
              <Button type="submit" className="secondary">
                Log in
              </Button>
            </div>
          </form>
        </div>
      </MainLayout>
    );
  }
}

export default LoginPage;
