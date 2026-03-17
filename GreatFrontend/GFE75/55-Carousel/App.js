import ImageCarousel from "./ImageCarousel";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

// Layout and positioning:

// The image carousel should be centered on the screen
// with a maximum size of 600px by 400px.

// Images should shrink to fit within the carousel so that the entire image
// is visible. Empty parts of the carousel can be filled with black.

// If the screen width is smaller than the image, the carousel should be resized
// to fit within the available horizontal space.

// Navigation:

// Add left/right navigation buttons to allow the user to navigate through the images.
// The buttons should allow a cycling behavior, i.e. after the last image,
// the image cycles back to the first.

// Add page buttons at the bottom to directly jump to an image.
// You may assume there will be fewer than 10 images.

// For this question, a technical restriction is there should
// only be one image element in the DOM at any one time.

export default function App() {
  return (
    <div className="wrapper">
      <ImageCarousel images={images} />
    </div>
  );
}
