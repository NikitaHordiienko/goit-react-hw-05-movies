import { useState } from "react";
import { toast } from "react-toastify";
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css'

export default function SearchBar({onSubmit}) {
    const [query, setQuery] = useState('');

    const handleChange = event => {
        setQuery(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (query.trim() === '') {
            toast.error('Please fill out the search field')
            return
        }

        onSubmit(query);

        setQuery('');
    }

    return (
        <form className={css.searchForm} onSubmit={handleSubmit}>
            <button className={css["searchForm-button"]} type="submit"><BsSearch className={css.icon} /></button>
            <input
                className={css["searchForm-input"]}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                value={query}
                onChange={handleChange}
            />
        </form>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
