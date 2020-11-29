import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FileLoad.scss';

const FileLoad = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState('');
  const handleFileInput = e => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="fileLoad" htmlFor="file">
        <span className="fileLoad-btn">Select a single file image</span>
        <span className="fileLoad-filename">
          {fileName && `Filename: ${fileName}`}
        </span>
        <input type="file" id="file" onChange={handleFileInput} hidden />
      </label>
    </div>
  );
};

FileLoad.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileLoad;
