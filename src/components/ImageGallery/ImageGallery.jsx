import css from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard";
export default function ImageGallery({images}) {  if (!Array.isArray(images) ||!images.length) {
  return <div>No images!!!!</div>} 
  return (
    <ul className={css.ul}>
      {images.map((image, index) => (
        <li className={css.li} key={index}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
