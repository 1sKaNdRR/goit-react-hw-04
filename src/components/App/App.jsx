// import SearchBox from '../SearchBar/SearchBar'
// import Gallery from '../Gallery/Gallery'
// import Loader from '../Loader/Loader';
// import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
// import { useState } from 'react'
// import { serchPhoto } from '../unspleshImage';


// export default function App() {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [query, setQuery]= useState("")

//   const handleSearch = async (query) => {
//     setIsLoading(true);
//     try {
//       const results = await serchPhoto(query);
//       setImages(results);
//     } catch (error) {
//       console.error("ERROR",error)
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <>
//       <SearchBox onSearch={handleSearch} />
//       <Gallery images={images} />
//       {isLoading && <Loader/>}
//     </>
//   );
// }

import SearchBox from '../SearchBar/SearchBar';
import Gallery from '../Gallery/Gallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { useState } from 'react';
import { searchPhotos } from '../unspleshImage';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    setQuery(searchQuery);
    setPage(1);
    try {
      const results = await searchPhotos(searchQuery, 1);
      setImages(results);
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const results = await searchPhotos(query, nextPage);
      setImages((prevImages) => [...prevImages, ...results]);
      setPage(nextPage);
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBox onSearch={handleSearch} />
      <Gallery images={images} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
}
