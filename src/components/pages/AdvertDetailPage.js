import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import MainLayout from '../layout/MainLayout';
import Loader from '../shared/LoaderStyled';
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
  const [errorDeleting, setErrorDeleting] = useState(null);
  const serverUrl = process.env.REACT_APP_API_URL;

  const getAdDetail = async adId => {
    setLoadingAd(true);
    try {
      const { result: ad } = await getAdvertDetail(adId);
      if (!ad) history.push('/404');
      setAdvert(ad);
    } catch (err) {
      history.push('/404');
    } finally {
      setLoadingAd(false);
    }
  };

  const deleteAd = async () => {
    setErrorDeleting(null);
    try {
      const result = await deleteAdvert(id);
      if (result.ok) history.push('/adverts');
      else throw new Error('Something went wrong!!');
    } catch (err) {
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
            <img src={`${serverUrl}${advert.photo}`} alt={advert.name} />
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
        <Button className="secondary" onClick={() => setShowModal(true)}>
          Delete
        </Button>
      </div>
    );
  };

  return (
    <MainLayout title="Advert Detail">
      {loadingAd ? <Loader size="medium" /> : renderContent()}
      <ModalConfirm
        title="Delete Advert"
        onClose={e => {
          setShowModal(false);
          if (e.target.classList.contains('tertiary')) {
            deleteAd();
          }
        }}
        show={showModal}
      >
        Are you sure to delete it?
      </ModalConfirm>
      <div className="adDetail-error">
        {errorDeleting && (
          <Alert message={errorDeleting.message} type="error" />
        )}
      </div>
    </MainLayout>
  );
}

export default AdvertDetailPage;
