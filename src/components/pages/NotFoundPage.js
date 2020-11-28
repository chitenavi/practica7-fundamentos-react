import React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../../assets/404image.png';
import Button from '../shared/Button';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="notFoundPage-img">
        <img src={image404} alt="404" />
      </div>
      <Link to="/">
        <Button className="primary">Go Home</Button>
      </Link>
    </div>
  );
};
export default NotFoundPage;
