import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieListItem.module.css';
import noImage from '../../images/person.png'

const MoviesListItem = ({ movie }) => {
    const location = useLocation();

    return (
        <li className={css.movieListItem}>
            <Link className={css.movieLink} to={`/movies/${movie.id}`} state={{ from: location }}>
                <img
                    style={{ width: 200 }}
                    src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                        : noImage} alt={movie.title} />
                <h3 className={css.movieTitle}>{movie.title}</h3>
            </Link>
        </li>
    )
}

MoviesListItem.propTypes = {
    movie: PropTypes.object.isRequired,
}

export default MoviesListItem;