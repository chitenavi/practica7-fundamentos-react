import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import MainLayout from '../layout/MainLayout';
import Loader from '../shared/LoaderStyled';
import LoaderPage from '../shared/LoaderPage';
import Button from '../shared/Button';
import ModalConfirm from '../shared/ModalConfirm';
import { getAdvertDetail, deleteAdvert } from '../../api/adverts';
import './AdvertDetailPage.scss';

function AdvertDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [advert, setAdvert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingAd, setLoadingAd] = useState(true);
  const [deletingAd, setDeletingAd] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const serverUrl = process.env.REACT_APP_API_URL;

  const getAdDetail = async adId => {
    setLoadingAd(true);
    try {
      const ad = await getAdvertDetail(adId);
      setLoadingAd(false);
      if (!ad) history.push('/404');
      else setAdvert(ad);
    } catch (err) {
      setLoadingAd(false);
      history.push('/404');
    }
  };

  const deleteAd = async () => {
    setDeletingAd(true);
    setErrorDeleting(null);
    try {
      await deleteAdvert(id);
      setDeletingAd(false);
      history.push('/adverts');
    } catch (err) {
      setDeletingAd(false);
      setErrorDeleting(err);
    }
  };

  useEffect(() => {
    getAdDetail(id);
  }, []);

  const renderContent = () => {
    return (
      <div className="product">
        <h2 className="product-title">{advert.name}</h2>
        <div className="product-container">
          <div className="product-container-img">
            <img
              src={
                advert.photo
                  ? `${serverUrl}${advert.photo}`
                  : 'https://via.placeholder.com/600x400?text=No+Image'
              }
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
        <Button
          className="secondary"
          onClick={() => {
            setShowModal(true);
            setErrorDeleting(null);
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

  return (
    <MainLayout title="Advert Detail">
      {loadingAd ? <Loader size="medium" /> : advert && renderContent()}
      <ModalConfirm
        title="Delete Advert"
        onClose={isConfirmed => {
          if (isConfirmed) deleteAd();

          setShowModal(false);
        }}
        show={showModal}
      >
        Are you sure to delete it?
      </ModalConfirm>
      <div className="adDelete">
        {deletingAd ? (
          <LoaderPage />
        ) : (
          errorDeleting && (
            <Alert
              className="adDelete-error"
              message={errorDeleting.message}
              type="error"
            />
          )
        )}
      </div>
    </MainLayout>
  );
}

export default AdvertDetailPage;
