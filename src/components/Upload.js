


// components/Upload.js
import React, { useState } from 'react';

const Upload = ({ onDataLoaded }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const parseTSV = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').slice(1); // Remove header
        const data = rows.map(row => row.split('\t'));
        resolve(data);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    if (file1 && file2) {
      const data1 = await parseTSV(file1);
      const data2 = await parseTSV(file2);
      onDataLoaded(data1, data2);
    }
  };

  return (
    <div>
      <input type="file" accept=".tsv" onChange={handleFile1Change} />
      <input type="file" accept=".tsv" onChange={handleFile2Change} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
