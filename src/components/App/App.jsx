import { useState } from 'react';
import SearchBox from '../SearchBar/SearchBar';
import Gallery from '../Gallery/Gallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { serchPhoto } from '../unspleshImage';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null)
  const perPage = 12;
  const orientation = "landscape"

  const handleSearch = async (query) => {
    setIsLoading(true);
    setQuery(query);
    setPage(1);
    setError(null);

    try {
      const results = await serchPhoto(query, 1, perPage, orientation);
      setImages(results);
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  };





  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const results = await serchPhoto(query, nextPage);
      setImages((prevImages) => [...prevImages, ...results]);
      setPage(nextPage);
    } catch (error) {
      setError("Error LOAD")
    } finally {
      setIsLoading(false);
    }
  };
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const closeModal = () => {
    setSelectedImage(null);
  }

  
return (
    <>
      <SearchBox onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {!error && (
        <>
          <Gallery images={images} openModal={openModal} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
          <ImageModal isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} />
        </>
      )}
    </>
  );
}



