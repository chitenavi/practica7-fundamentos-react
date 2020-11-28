import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import MainLayout from '../layout/MainLayout';
import Loader from '../shared/LoaderStyled';
import Button from '../shared/Button';
import { login } from '../../api/auth';

import './LoginPage.scss';

class LoginPage extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
      remcredentials: false,
    },
    submitting: false,
    error: null,
  };

  canSubmit = () => {
    const {
      form: { email, password },
      submitting,
    } = this.state;
    return !submitting && email && password;
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ submitting: true, error: null });
    const { onLogin, history } = this.props;
    const { form } = this.state;

    try {
      const authResponse = await login(form);
      // console.log(authResponse);
      if (!authResponse.ok) {
        throw new Error(authResponse.error);
      }

      this.setState({ error: null });
      onLogin(authResponse.token).then(() => history.push('/adverts'));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleChange = ev => {
    this.setState(state => ({
      form: { ...state.form, [ev.target.name]: ev.target.value },
    }));
  };

  handleChangeCheck = ev => {
    this.setState(state => ({
      form: { ...state.form, [ev.target.name]: ev.target.checked },
    }));
  };

  render() {
    const {
      form: { email, password, remcredentials },
      error,
      submitting,
    } = this.state;
    return (
      <MainLayout title="Welcome to Nodepop SPA">
        <div className="loginPage">
          <form onSubmit={this.handleSubmit} className="formLogin">
            <div className="formLogin-field">
              <input
                type="text"
                onChange={this.handleChange}
                name="email"
                value={email}
                placeholder="email"
              />
            </div>
            <div className="formLogin-field">
              <input
                type="password"
                onChange={this.handleChange}
                value={password}
                name="password"
                placeholder="password"
              />
            </div>

            <div className="formLogin-field">
              <label htmlFor="remember">
                <input
                  type="checkbox"
                  id="remember"
                  name="remcredentials"
                  onChange={this.handleChangeCheck}
                  checked={remcredentials}
                />
                Remember credentials
              </label>
            </div>
            <div className="formLogin-field">
              <Button
                type="submit"
                className="secondary"
                disabled={!this.canSubmit()}
              >
                Log in
              </Button>
            </div>
          </form>
          {submitting && (
            <div className="loginPage-loading">
              <Loader size="medium" />
            </div>
          )}
          {error && (
            <div className="loginPage-error">
              <Alert message={error.message} type="error" />
            </div>
          )}
        </div>
      </MainLayout>
    );
  }
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LoginPage;
