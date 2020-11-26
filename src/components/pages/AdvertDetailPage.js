import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Loader from '../shared/LoaderStyled';
import Button from '../shared/Button';
import { getAdvertDetail } from '../../api/adverts';
import './AdvertDetailPage.scss';

function AdvertDetailPage() {
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [loadingAd, setLoadingAd] = useState(true);
  const [error, setError] = useState(null);

  const getProductDetail = async adId => {
    setLoadingAd(true);
    try {
      const { result: ad } = await getAdvertDetail(adId);
      setAdvert(ad);
      console.log(ad);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoadingAd(false);
    }
  };

  useEffect(() => {
    getProductDetail(id);
  }, []);

  const renderContent = () => {
    if (error) {
      return <Redirect to="/404" />;
    }
    return (
      <div className="product">
        <h2 className="product-title">{advert.name}</h2>
        <div className="product-container">
          <div className="product-container-img">
            <img
              src={`http://localhost:3000${advert.photo}`}
              alt={advert.name}
            />
          </div>

          <div className="product-container-detail">
            <p>
              <span>Type: </span>
              {advert.sale ? 'Sale' : 'Buy'}
            </p>
            <p>
              <span>Price: </span>
              {advert.price} €
            </p>
            <p>
              <span>Tags: </span>
              {advert.tags.join(', ')}
            </p>
          </div>
        </div>
        <Button className="secondary">Delete</Button>
      </div>
    );
  };

  return (
    <MainLayout title="Advert Detail">
      {loadingAd ? <Loader size="medium" /> : renderContent()}
    </MainLayout>
  );
}

export default AdvertDetailPage;
