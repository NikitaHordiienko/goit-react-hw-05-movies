import { useState, useEffect, Suspense } from "react";
import { getMoviesId } from "services/moviesApi";
import { useParams, useLocation } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import BackLink from "components/BackLink/BackLink";
import Status from "services/status";
import Loader from "components/Loader/Loader";
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const [status, setStatus] = useState(Status.IDLE);
    const [movie, setMovie] = useState('');
    const [error, setError] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();

    const backLinkHref = location.state?.from ?? "/";

    useEffect(() => {
        setStatus(Status.PENDING);

        getMovieData()

        // eslint-disable-next-line
    },[])

    const getMovieData = async () => {
        try {
            const movieInfo  = await getMoviesId(movieId)
            setMovie(movieInfo)
            setStatus(Status.RESOLVED);
        } catch (err) {
            console.log(err);
            setError(error);
            setStatus(Status.REJECTED);
        }
    }

    return (
        <>
            {status === 'idle' && <></>}
            {status === 'pending' && <Loader />}
            {status === 'rejected' && <h2>Sorry, something went wrong.</h2>}
            {status === 'resolved' &&
                <>
                    <div className={css.description}>
                        <BackLink to={backLinkHref}>Back to movie list</BackLink>
                        <div className={css.descriptionThumb}>
                            <img className={css.descriptionImage} src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                            <div className={css.descriptionThumbText}>
                                <h3 className={css.descriptionThumbTitle}>{movie.title} ({movie.release_date.substring(0,4)})</h3>
                                <p className={css.descriptionText}>User score: {Math.round(movie.vote_average * 10)}%</p>
                                <h3 className={css.descriptionThumbTitle}>Overview</h3>
                                <p className={css.descriptionText}>{movie.overview}</p>
                                <h3 className={css.descriptionThumbTitle}>Genres:</h3>
                                <ul className={css.genreList}>
                                    {movie.genres.map(genre => {
                                        return <li className={css.descriptionText} key={genre.id}>{genre.name}</li>
                                    })}
                                </ul>                            
                            </div>                        
                        </div>                    
                    </div>
                    <div className={css.infoThumb}>
                        <h2 className={css.descriptionThumbTitle}>Additional information</h2>
                        <div className={css.infoLinks}>
                            <NavLink to={`/movies/${movie.id}/cast`} state={location.state} className={({ isActive }) => (isActive ? css.active : css.infoLink)}>Cast</NavLink>
                            <NavLink to={`/movies/${movie.id}/reviews`} state={location.state} className={({ isActive }) => (isActive ? css.active : css.infoLink)}>Reviews</NavLink>
                        </div>
                    </div>            
                    <Suspense fallback={<Loader/>}>
                        <Outlet />
                    </Suspense>
                </>
            }                           
        </>        
    )
}