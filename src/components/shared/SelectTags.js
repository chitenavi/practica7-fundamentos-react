import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { getAllTags } from '../../api/adverts';

function SelectTags({ onChange, defaultTags }) {
  const [selTags, setSelTags] = useState();
  const { Option } = Select;

  useEffect(() => {
    getAllTags().then(stags => setSelTags(stags));
  }, []);

  return (
    <Select
      onChange={value => {
        onChange({ target: { value, name: 'tags' } });
      }}
      mode="tags"
      style={{ width: '75%' }}
      defaultValue={defaultTags}
      placeholder="Select tags"
    >
      {selTags && selTags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

SelectTags.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectTags;
