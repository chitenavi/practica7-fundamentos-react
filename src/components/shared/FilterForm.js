import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slider, Select, Radio, Input } from 'antd';
import { getAllTags } from '../../api/adverts';
import useForm from '../hooks/useForm';
import Button from './Button';
import 'antd/dist/antd.css';
import './FilterForm.scss';

function FilferForm({ onSubmit, userFilter }) {
  const [form, onChange] = useForm(userFilter);
  const [selTags, setSelTags] = useState();
  const { name, type, price, tags } = form;
  const { Option } = Select;

  const onSubmitForm = async ev => {
    ev.preventDefault();
    onSubmit(form);
  };

  useEffect(() => {
    getAllTags().then(stags => setSelTags(stags));
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitForm} className="formFilter">
        <div className="formFilter-field">
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Advert name"
          />
        </div>
        <div className="formFilter-field centered">
          <span className="formFilter-field--label">Type: </span>
          <Radio.Group name="type" onChange={onChange} value={type}>
            <Radio style={{ color: 'white' }} value="sale">
              Sale
            </Radio>
            <Radio style={{ color: 'white' }} value="buy">
              Buy
            </Radio>
            <Radio style={{ color: 'white' }} value="all">
              All
            </Radio>
          </Radio.Group>
        </div>
        <div className="formFilter-field">
          <span className="formFilter-field--label">
            Price: {`${price[0]}€ - ${price[1]}€`}
          </span>
          <Slider
            onChange={value => {
              onChange({ target: { value, name: 'price' } });
            }}
            range
            min={1}
            max={10000}
            defaultValue={price}
          />
        </div>
        <div className="formFilter-field centered">
          <Select
            onChange={value => {
              onChange({ target: { value, name: 'tags' } });
            }}
            mode="tags"
            style={{ width: '75%' }}
            defaultValue={tags}
            placeholder="Select tags"
          >
            {selTags && selTags.map(tag => <Option key={tag}>{tag}</Option>)}
          </Select>
        </div>

        <div className="formFilter-field centered">
          <Button type="submit" className="secondary">
            Apply Filter
          </Button>
        </div>
      </form>
    </div>
  );
}

FilferForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userFilter: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default FilferForm;
