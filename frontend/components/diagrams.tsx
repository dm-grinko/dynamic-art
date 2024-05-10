'use client';
import ImageGallery from 'react-image-gallery';

export default function Diagrams() {

  const images = [
    {
      original: "/diagrams/d1.png",
      thumbnail: "/diagrams/d1.png",
    },
    {
      original: "/diagrams/d2.png",
      thumbnail: "/diagrams/d2.png",
    },
    {
      original: "/diagrams/d3.png",
      thumbnail: "/diagrams/d3.png",
    },
    {
      original: "/diagrams/d4.png",
      thumbnail: "/diagrams/d4.png",
    },
    {
      original: "/diagrams/d5.png",
      thumbnail: "/diagrams/d5.png",
    },
  ];

  return (
    <>
      <div className="diagrams-wrapper">
      <div className="diagrams">
        <ImageGallery items={images}></ImageGallery>
      </div>
      </div>
    </>
  );
}

