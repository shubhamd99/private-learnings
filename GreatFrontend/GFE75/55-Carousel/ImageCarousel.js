import { useState } from "react";

function clsx(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export default function ImageCarousel({ images }) {
  const [currIndex, setCurrIndex] = useState(0);
  const currImage = images[currIndex];

  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className="image-carousel__image"
      />
      <button
        aria-label="Previous Image"
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          const prevIndex = (currIndex - 1 + images.length) % images.length;
          setCurrIndex(prevIndex);
        }}
      >
        &#10094;
      </button>

      <div className="image-carousel__pages">
        {images.map(({ alt, src }, index) => (
          <button
            className={clsx(
              "image-carousel__pages__button",
              index === currIndex && "image-carousel__pages__button--active",
            )}
            aria-label={`Navigate to ${alt}`}
            key={src}
            onClick={() => {
              setCurrIndex(index);
            }}
          />
        ))}
      </div>

      <button
        aria-label="Next Image"
        className="image-carousel__button image-carousel__button--next"
        onClick={() => {
          const nextIndex = (currIndex + 1 + images.length) % images.length;
          setCurrIndex(nextIndex);
        }}
      >
        &#10095;
      </button>
    </div>
  );
}
