// import css from './App.module.css'
import { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../components/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { useEffect } from 'react';

export default function App() {

 const [images, setImages] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [page, setPage] = useState(1);
 const [searchQuery, setSearchQuery] = useState("");
useEffect(()=>{
if (searchQuery.trim() === "") {
  return
}
async function fetchImages() {
  try {
    setIsLoading(true);
    setIsError(false);
    const data = await getImages(searchQuery, page);
    setImages((prevState) => [... prevState, ...data]); 

  } catch (error) {
    setIsError(true);
  }
  finally{
    setIsLoading(false); 
  }
}
fetchImages()
}, [page, searchQuery])

const handleSearch = async (topic) => {
  setSearchQuery(topic);
  setPage(1);
  setImages([]);
}
const handLoadMore = async () =>{
  setPage(page+1);
}
  return (
    <>
    <SearchBar onSearch={handleSearch}/>
    { isLoading && <Loader/> }
    {isError && <ErrorMessage/>}
        {images.length > 0 && <ImageGallery images={images} /> }
        {images.length>0 && isLoading && (<LoadMoreBtn onClick={handLoadMore}/>)}
        </>
)
}