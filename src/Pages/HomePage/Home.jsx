import { useState, useEffect } from "react";
import { getMovies } from "services/moviesApi";
import MoviesList from "components/MoviesList/MoviesList";
import Status from "services/status";
import Loader from "components/Loader/Loader";
import css from './Home.module.css'

export default function Homepage() {
    const [status, setStatus] = useState(Status.IDLE);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);    

    useEffect(() => {
        setStatus(Status.PENDING);

        getTrendingMovies();

        // eslint-disable-next-line
    }, []);

    const getTrendingMovies = async () => {
        try {
            const { results } = await getMovies();
            setMovies([...results]);
            setStatus(Status.RESOLVED);
            
        } catch (err) {
            console.log(err);
            setError(error);
            setStatus(Status.REJECTED);
        }
    }

    return (        
        <section>
            {status === 'idle' && <></>}
            {status === 'pending' && <Loader />}
            {status === 'rejected' && <h2>Sorry, something went wrong.</h2>}
            {status === 'resolved' && (
                <>
                    <h2 className={css.homeTitle}>Trending today</h2>
                    <MoviesList movies={movies} />
                </>
            )}            
        </section>
    ) 
}