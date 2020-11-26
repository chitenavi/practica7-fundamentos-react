import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import storage from '../../utils/storage';

import MainLayout from '../layout/MainLayout';
import FilterForm from '../shared/FilterForm';
import AdvertCard from '../adverts/AdvertCard';
import Loader from '../shared/LoaderStyled';
import Button from '../shared/Button';
import { getAdverts } from '../../api/adverts';

import './AdvertsPage.scss';

const defaultFilter = {
  name: '',
  type: 'all',
  price: [1, 10000],
  tags: [],
};

const makeQueryString = form => {
  const searchParams = new URLSearchParams();

  if (form.name) searchParams.append('name', form.name);
  if (form.price[0] !== 1 || form.price[1] !== 10000)
    searchParams.append('price', `${form.price[0]}-${form.price[1]}`);
  if (form.type !== 'all') searchParams.append('sale', form.type === 'sale');
  if (form.tags.length) searchParams.append('tags', form.tags.join(','));

  return searchParams.toString();
};

const AdvertsPage = () => {
  const initialUserFilter = storage.get('userFilterForm') || defaultFilter;

  const [adverts, setAdverts] = useState([]);
  const [queryString, setQueryString] = useState(
    makeQueryString(initialUserFilter),
  );
  const [loadingAds, setLoadingAds] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async form => {
    // Save filter data on LocalStorage
    storage.set('userFilterForm', form);

    // Apply filter
    setQueryString(makeQueryString(form));
  };

  const getAds = async () => {
    setLoadingAds(true);
    try {
      const {
        result: { rows: ads },
      } = await getAdverts(queryString);
      setAdverts(ads);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    getAds();
  }, [queryString]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="advertsPage-content--error">
          <h2>Error!: {error.message}</h2>
        </div>
      );
    }
    if (adverts.length === 0) {
      return (
        <div className="advertsPage-content--noads">
          {!queryString ? (
            <>
              <h3>There are no ads!, create one...</h3>
              <Link to="/adverts/new">
                <Button className="primary">New Advert</Button>
              </Link>
            </>
          ) : (
            <h3>Sorry, there are no ads with that filters...</h3>
          )}
        </div>
      );
    }

    return adverts.map(ad => {
      return (
        <AdvertCard
          key={ad._id}
          id={ad._id}
          name={ad.name}
          price={ad.price}
          sale={ad.sale}
          tags={ad.tags}
        />
      );
    });
  };

  return (
    <MainLayout title="Adverts">
      <div className="advertsPage">
        <div className="advertsPage-filter">
          <FilterForm
            initialFilter={initialUserFilter}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="advertsPage-content">
          {loadingAds ? <Loader /> : renderContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdvertsPage;
