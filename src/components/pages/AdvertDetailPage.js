import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  const [error, setError] = useState(null);
  const serverUrl = process.env.REACT_APP_API_URL;

  const getAdDetail = async adId => {
    setLoadingAd(true);
    try {
      const { result: ad } = await getAdvertDetail(adId);
      if (!ad) history.push('/404');
      setAdvert(ad);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingAd(false);
    }
  };

  const deleteAd = async () => {
    console.log(`ID: ${id} => Eliminado`);
    try {
      const result = await deleteAdvert(id);
      if (result.ok) history.push('/adverts');
    } catch (err) {
      console.log(err);
      setError(err);
    }
    // history.push('/adverts');
  };

  useEffect(() => {
    getAdDetail(id);
  }, []);

  const renderContent = () => {
    if (error) {
      return history.push('/404');
    }
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
