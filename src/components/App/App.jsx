import './App.module.css'
import { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { useEffect } from 'react';
import ImageModal from '../ImageModal/ImageModal';

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
// const handLoadMore = async () =>{
//   setPage(page+1);
// }
const loadMoreImages = async () => {
  try {
    const newImages = await getImages(page + 1);
    if (newImages.length > 0) {
      setImages(prevImages => [...prevImages,...newImages]);
      setPage(prevPage => prevPage + 1);
    }
  } catch (error) {
    console.error(error);
  }
};
// модалка
const [selectedImage, setSelectedImage] = useState(null)
const [modalIsOpen, setIsModalOpen] = useState(false);
const handleImageClick = (image) => {
  setSelectedImage(image);
  setIsModalOpen(true);
};
 const closeModal = () => {
  setIsModalOpen(false);
};
  return (
    <>
    <SearchBar onSearch={handleSearch}/>
    { isLoading && <Loader/> }
    {isError && <ErrorMessage/>}
    {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
            {images.length>0 && !isLoading && (<LoadMoreBtn onClick={loadMoreImages}/>)}
        {selectedImage && <ImageModal  isOpen={modalIsOpen}
        selectedImage={selectedImage}
        onRequestClose={closeModal}/>}
        </>
)
}