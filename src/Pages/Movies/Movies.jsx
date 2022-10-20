import { useState, useEffect } from "react";
import { getMoviesByQuery } from "services/moviesApi";
import { useSearchParams } from 'react-router-dom';
import SearchBar from "components/SearchBar/SearchBar";
import MoviesList from "components/MoviesList/MoviesList";
import Status from "services/status";
import Loader from "components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import css from './Movies.module.css'

export default function Movies() {
    const [status, setStatus] = useState(Status.IDLE);
    const [searchParams, setSearchParams] = useSearchParams('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const searchedQuery = searchParams.get('query');

    useEffect(() => {
        if (!searchedQuery) {
            return
        }

        setStatus(Status.PENDING);

        getSearchingMovies();
        
        // eslint-disable-next-line
    }, [searchedQuery]);

    const getSearchingMovies = async () => {
        try {
            const { results } = await getMoviesByQuery(searchedQuery);
            setMovies([...results]);
            setStatus(Status.RESOLVED);

            if (results.length === 0) {
                setStatus(Status.REJECTED);
            }
            
        } catch (err) {
            console.log(err);
            setError(error);
        }
    }

    const onSubmit = (value) => {
        setSearchParams({query: `${value}`})
    }

    return (
        <>
            <SearchBar onSubmit={onSubmit} />
            {status === 'idle' && <h2 className={css.title}>Gallery is empty</h2>}
            {status === 'pending' && <Loader />}
            {status === 'rejected' && <h2 className={css.title}>Sorry, there is nothing that matches your search. Try something else.</h2>}
            {status === 'resolved' && <MoviesList movies={movies} />}
            <ToastContainer autoClose={1000} theme="colored" /> 
        </>
    )
}
