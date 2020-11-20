import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

const Button = ({ type, className, disabled, children }) => {
  return (
    <button
      className={classNames('button', className)}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

export default Button;
