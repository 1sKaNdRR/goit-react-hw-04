
import { CiSearch } from "react-icons/ci";
import css from "./SearchBar.module.css"
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function SearchBox({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query)
        } else {
            toast.error('Please enter a keyword to search!');
        }
    }
    return (
        <header className={css.headerWrap}>
            <form className={css.container}  onSubmit={handleSubmit}>
                <button type="submit" className={css.button}>
                    <CiSearch />
                </button>
                <input
                type="text"
                className={css.searchArea}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search images and photos"
                />
                <Toaster position="top-right"/>
            </form>
            </header>
    )
} 

