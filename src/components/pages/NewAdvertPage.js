import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Select, Radio, Input, InputNumber, Alert } from 'antd';
import useForm from '../hooks/useForm';
import MainLayout from '../layout/MainLayout';
import Button from '../shared/Button';
import Loader from '../shared/LoaderStyled';
import FileLoad from '../shared/FileLoad';
import { createAdvert } from '../../api/adverts';
import './NewAdvertPage.scss';

const NewAdvertPage = () => {
  const { Option } = Select;
  const history = useHistory();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, onChange] = useForm();
  const [img, setImg] = useState(null);
  const { name, sale, tags, price } = form;

  const canSubmit = () => {
    return name && tags.length && price;
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === 'tags') tags.forEach(val => formData.append(key, val));
        else formData.append(key, form[key]);
      });

      if (img) formData.append('photo', img);

      const result = await createAdvert(formData);
      if (result.ok) history.push('/adverts');
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout title="New Advert">
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={onSubmitForm}
        className="formNewAd"
      >
        <div className="formNewAd-field">
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Advert name"
          />
        </div>
        <div className="formNewAd-group">
          <div className="formNewAd-field">
            <span className="formNewAd-field--label">Price: </span>
            <InputNumber
              name="price"
              onChange={value => {
                onChange({ target: { value, name: 'price' } });
              }}
              min={0}
              max={10000}
              value={price}
            />
          </div>
          <div className="formNewAd-field">
            <span className="formNewAd-field--label">Type: </span>
            <Radio.Group name="sale" onChange={onChange} value={sale}>
              <Radio style={{ color: 'white' }} value>
                Sale
              </Radio>
              <Radio style={{ color: 'white' }} value={false}>
                Buy
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="formNewAd-field">
          <Select
            onChange={value => {
              onChange({ target: { value, name: 'tags' } });
            }}
            mode="tags"
            style={{ width: '100%' }}
            defaultValue={tags}
            placeholder="Select tags"
          >
            <Option key="motor">motor</Option>
            <Option key="mobile">mobile</Option>
            <Option key="work">work</Option>
            <Option key="lifestyle">lifestyle</Option>
          </Select>
        </div>
        <div className="formNewAd-field centered">
          <FileLoad />
        </div>
        <div className="formNewAd-field centered">
          <input
            onChange={e => setImg(e.target.files[0])}
            type="file"
            name="photo"
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="formNewAd-field centered">
          <Button type="submit" className="secondary" disabled={!canSubmit()}>
            Create Advert
          </Button>
        </div>
      </form>
      {submitting && (
        <div className="newAdPage-loading">
          <Loader />
        </div>
      )}
      {error && (
        <div className="newAdPage-error">
          <Alert message={error.message} type="error" />
        </div>
      )}
    </MainLayout>
  );
};

export default NewAdvertPage;
