// import css from './App.module.css'
import { useState, useEffect } from 'react';
// import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../components/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

export default function App() {
  // useEffect(()=>{
  //   axios
  //   .get(`https://api.unsplash.com/search/photos/query=cats/?client_id=-7i_jnQlSjDuNkJ4shZWckNEJtBVks9schHspWR86Vg`)
  //   .then((response)=>{
  //     console.log(response.data.hits);
  //   })
  // }, [])
 const [images, setImages] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);


//   useEffect(()=>{
//     async function fetchImages(){
//       try {
//         setIsLoading(true);
//       const fetchedImages = await getImages('cats');
//       setImages(fetchedImages);
//       } catch (error) {
//         setIsError(true);
//     }
//     }
//     fetchImages(
//       setIsLoading(false)
//     );
// },[]);
useEffect(() => {
  async function fetchImages() {
    try {
      setIsLoading(true);
      const fetchedImages = await getImages('cats');
      setImages(fetchedImages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false); 
    }
  }
  fetchImages();
}, []);
  return (
    <>
{isLoading && <Loader/>}
{isError && <ErrorMessage/>}
    {images.length > 0 && <ImageGallery images={images} /> }

    </>
)
}