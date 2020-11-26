import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AdvertCard.scss';

function AdvertCard({ id, name, price, sale, tags }) {
  return (
    <Link
      to={`/advert/${id}`}
      className={`advertCard ${sale ? 'sale' : 'buy'}`}
    >
      <article>
        <h3 className="advertCard-name">{name}</h3>
        <p className="advertCard-field">
          <span>Price: </span>
          <span className="advertCard-field--price">{price} €</span>
        </p>
        <p className="advertCard-field">
          <span>Type: </span> {sale ? 'Sale' : 'Buy'}
        </p>
        <p className="advertCard-field">
          <span>Tags: </span> {tags.join(', ')}
        </p>
      </article>
    </Link>
  );
}

AdvertCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default AdvertCard;
