import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const ImageGrid = forwardRef((props, ref) => {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const res = await fetch('http://18.118.198.185:3000/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useImperativeHandle(ref, () => ({
    loadImages,
  }));

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="p-6 bg-white mt-4">
      <h2 className="text-3xl font-bold mb-6 text-center">📸 Uploaded Images</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100 p-2"
          >
            <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`img-${idx}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ImageGrid;
