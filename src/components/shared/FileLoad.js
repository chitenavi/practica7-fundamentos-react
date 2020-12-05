import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FileLoad.scss';

const FileLoad = ({ onFileSelect, label }) => {
  const [fileName, setFileName] = useState('');

  const handleFileInput = e => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="fileLoad">
      <div className="fileLoad-file">
        <label htmlFor="file">
          <span className="fileLoad-file--btn">{label}</span>
          <input type="file" id="file" onChange={handleFileInput} hidden />
        </label>
      </div>
      <div className="filename-filename">
        {fileName && `Filename: ${fileName}`}
      </div>
    </div>
  );
};

FileLoad.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default FileLoad;
