import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Radio, Input } from 'antd';
import SelectTags from './SelectTags';
import useForm from '../hooks/useForm';
import Button from './Button';
import 'antd/dist/antd.css';
import './FilterForm.scss';

function FilferForm({ onSubmit, userFilter }) {
  const [form, onChange] = useForm(userFilter);
  const { name, type, price, tags } = form;

  const onSubmitForm = async ev => {
    ev.preventDefault();
    onSubmit(form);
  };

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
          <SelectTags onChange={onChange} defaultTags={tags} />
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
