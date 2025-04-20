import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://18.118.198.185:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleChange} />
      <br /><br />
      {preview && <img src={preview} alt="preview" height={200} />}
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <br /><br />
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="uploaded" height={200} />
          <p><a href={uploadedUrl} target="_blank" rel="noreferrer">Open in new tab</a></p>
        </div>
      )}

      <ImageGrid />
    </div>
  );
}

export default App;
