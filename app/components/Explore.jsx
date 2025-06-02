'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInfo } from 'react-icons/fa';
import { createClient } from 'pexels';

function shuffle(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 25) + 1;
}


const Explore = () => {
  const [images, setImages] = useState([]);
  const client = createClient(process.env.NEXT_PUBLIC_PEXELS_APIKEY);

  useEffect(() => {
    const queries = ['nature', 'cars', 'galaxy', 'dark', 'mountains', 'sunset', 'digital art', 'futuristic', 'night city', 'monuments', 'cyberpunk', 'wildlife', 'animals', 'vintage', 'cinematic', 'gaming'];

    Promise.all(
      queries.map((query) =>
        client.photos.search({ query, per_page: 15, page: getRandomNumber() }).then((res) => res.photos)
      )
    ).then((results) => {
      const flatImages = results.flat();
      const shuffled = shuffle(flatImages);
      setImages(shuffled);
    });
  }, []);

  return (
    <div className="flex flex-col gap-12 py-[150px] items-center w-full" id='Explore'>
      <h1 className="text-4xl text-gray-600 flex gap-2.5 items-baseline Oswald textShadow">
        <span className="Lobster gradient6 text-5xl">Explore</span>More
      </h1>

      <div className="max-w-[90%] mx-auto w-full">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((photo, index) => (
            <div key={index} className="relative group break-inside-avoid overflow-hidden rounded-lg shadow-md">
              <img
                src={photo.src.large}
                alt={`explore-${index}`}
                className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <Link
                href={photo.url}
                target='_blank'
                className="absolute top-3 left-3 p-3 rounded-full bg-gray-400/40 text-white hover:bg-white/60 hover:text-black transition-all duration-150 opacity-100 lg:opacity-0 group-hover:opacity-100 flex justify-center items-center"
              >
                <FaInfo />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <h1 className='Oswald text-gray-700 text-5xl pt-[100px]'>- The End -</h1>
      
    </div>
  );
};

export default Explore;
