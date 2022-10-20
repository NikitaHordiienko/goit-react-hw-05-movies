import MoviesListItem from "components/MoviesListItem/MoviesListItems";
import PropTypes from 'prop-types';
import css from './MovieList.module.css'

const MoviesList = ({ movies }) => {
    return (
        <ul className={css.movieList}>
            {movies.map(movie => {
                return (                    
                    <MoviesListItem
                        key={movie.id}
                        movie={movie}
                    />
                )
            })}
        </ul>  
    )
}

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
}

export default MoviesList;