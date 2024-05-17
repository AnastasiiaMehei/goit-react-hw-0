import css from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard";
export default function ImageGallery({images}) {
  console.log(images);
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
