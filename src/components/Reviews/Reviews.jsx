import { useState, useEffect } from "react";
import { getReviewsById } from "services/moviesApi";
import { useParams } from 'react-router-dom';
import Status from "services/status";
import Loader from "components/Loader/Loader";
import css from './Reviews.module.css';

export default function Reviews() {
    const [status, setStatus] = useState(Status.IDLE);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {

        setStatus(Status.PENDING);

        getReviews();
        
        // eslint-disable-next-line
    }, []);

    const getReviews = async () => {
        try {
            const { results } = await getReviewsById(movieId);
            setReviews([...results])
            setStatus(Status.RESOLVED);
            
            if (results.length === 0) {
                setStatus(Status.REJECTED);
            }
        } catch (err) {
            console.log(err);
            setError(error);
        }
    }
    
    return (
        <>
            {status === 'idle' && <></>}
            {status === 'pending' && <Loader />}
            {status === 'rejected' && <h2 className={css.title}>We don't have any reviews for this movie.</h2>}
            {status === 'resolved' && 
                <ul className={css.reviewsList}>
                    {reviews.map(review => {
                        return (
                            <li className={css.reviewsListItem} key={review.id}>
                                <h3>Author: <span className={css.nik}>{review.author}</span></h3>
                                <p>{review.content}</p>
                            </li>
                        ) 
                    })}
                </ul>
            }
        </>
    )
}