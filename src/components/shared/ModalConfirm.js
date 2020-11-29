import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ModalConfirm.scss';

const ModalConfirm = ({ children, title, show, onClose }) => {
  return show ? (
    <div className="modalConfirm">
      <div className="modalConfirm-dialog">
        <h2 className="modalConfirm-dialog--title">{title}</h2>
        <div className="modalConfirm-dialog--content">{children}</div>
        <div className="modalConfirm-dialog--actions">
          <Button className="secondary" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button className="tertiary" onClick={() => onClose(true)}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

ModalConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ModalConfirm;
