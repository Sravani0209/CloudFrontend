import React, { useState, useRef } from 'react';
import axios from 'axios';
import ImageGrid from './components/ImageGrid';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const imageGridRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://18.118.198.185:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImage(null);
      setPreview('');

      if (imageGridRef.current) {
        imageGridRef.current.loadImages();
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-center items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800">📤 Image Uploader</h1>
      </nav>

      <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex flex-col items-center space-y-6">
          <label className="w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              {image ? (
                <p className="text-sm text-gray-700 font-medium">
                  Selected: {image.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Click to select an image</p>
              )}
            </div>
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-64 object-contain rounded-md shadow-sm border"
            />
          )}

          <button
            onClick={handleUpload}
            disabled={!image}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>

      <ImageGrid ref={imageGridRef} />
    </div>
  );
}

export default App;
