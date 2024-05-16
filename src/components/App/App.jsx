// import css from './App.module.css'
import { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../components/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function App() {

 const [images, setImages] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [page, setPage] = useState(1);
 const [searchQuery, setSearchQuery] = useState("");


const handleSearch = async (topic) => {
try {
  setIsLoading(true);
  setIsError(false);
  setImages([]);
  searchQuery(topic)
  const fetchedImages = await getImages(searchQuery, page);
  setImages(fetchedImages);  
} catch (error) {
  setIsError(true);
}
finally{
  setIsLoading(false); 

}};
const handLoadMore = async () =>{
try {
  setPage(page+1);
  setIsLoading(true);
  setIsError(false);
  const fetchedImages = await getImages(searchQuery, page);
  setImages(fetchedImages);  
} catch (error) {
  setIsError(true);
}
finally{
  setIsLoading(false); 

}
}
  return (
    <><SearchBar onSearch={handleSearch}/>
    { isLoading && <Loader/> }
    {isError && <ErrorMessage/>}
        {images.length > 0 && <ImageGallery images={images} /> }
        <LoadMoreBtn onClick={handLoadMore}/>
        </>

)
}