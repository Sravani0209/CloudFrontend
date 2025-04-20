import React, { useEffect, useState } from 'react';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://18.118.198.185:3000/images')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📸 Uploaded Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100"
          >
            <img src={src} alt={`img-${idx}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
