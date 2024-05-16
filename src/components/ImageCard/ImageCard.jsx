import css from './ImageCard.module.css'
export default function ImageCard({image}) {
  
    return (
      <div className={css.div}>
        <img className={css.img} src={image.url} alt={image.alt} />
      </div>
    );
  }