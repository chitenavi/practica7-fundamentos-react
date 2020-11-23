import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Button from '../shared/Button';
import './AdvertsPage.scss';
import { getAdverts } from '../../api/adverts';

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([]);
  const [form, setForm] = useState({ search: '' });
  const { search } = form;

  const handleFormChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = ev => {
    ev.preventDefault();
    console.log(ev.target);
  };

  const getAds = async () => {
    try {
      const {
        result: { rows: ads },
      } = await getAdverts();
      setAdverts(ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  const renderContent = () => {
    if (adverts.length === 0) {
      return (
        <div className="noAds">
          <h3>There are no ads!, create one...</h3>
          <Link to="/adverts/new">
            <Button className="primary">New Advert</Button>
          </Link>
        </div>
      );
    }

    return adverts.map(ad => {
      return (
        <div id={ad._id} className="advert">
          {JSON.stringify(ad)}
        </div>
      );
    });
  };
  return (
    <MainLayout title="Adverts">
      <div className="advertsPage">
        <div className="advertsPage-filter">
          <form onSubmit={handleSubmit} className="formFilter">
            <div className="formFilter-field">
              <input
                type="search"
                onChange={handleFormChange}
                name="search"
                value={search}
                placeholder="Search"
              />
            </div>
            <div className="formFilter-field">
              <Button type="submit" className="secondary">
                Filter
              </Button>
            </div>
          </form>
        </div>
        <div className="advertsPage-content">{renderContent()}</div>
      </div>
    </MainLayout>
  );
};

export default AdvertsPage;
