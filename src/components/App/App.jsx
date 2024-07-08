import { useState, useEffect } from 'react';
import SearchBox from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
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
  const [error, setError] = useState(null);
  const perPage = 12;
  const orientation = "landscape";

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await serchPhoto(query, page, perPage, orientation);
        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBox onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {!error && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
          <ImageModal isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} />
        </>
      )}
    </>
  );
}




