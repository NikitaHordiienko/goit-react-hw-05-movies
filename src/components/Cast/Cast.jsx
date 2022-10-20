import { useState, useEffect } from "react";
import { getCastById } from "services/moviesApi";
import { useParams } from 'react-router-dom';
import Status from "services/status";
import Loader from "components/Loader/Loader";
import noImage from '../../images/person.png'
import css from './Cast.module.css';

export default function Cast() {
    const [status, setStatus] = useState(Status.IDLE);
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {

        setStatus(Status.PENDING);

        getCast(); 
        
        // eslint-disable-next-line
    },[])

    const getCast = async () => {
        try {
            const  { cast }  = await getCastById(movieId);
            setActors(cast)
            setStatus(Status.RESOLVED);

            if (cast.length === 0) {
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
            {status === 'rejected' && <h2 className={css.title}>We don't have any info about actors for this movie.</h2>}
            {status === 'resolved' &&
                <ul className={css.castList}>
                        {actors.map(actor => {
                            return (
                                <li className={css.castListItem} key={actor.id}>
                                    <img style={{ width: 200 }} src={actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                        : noImage}
                                        alt={actor.name} />
                                    <h3>{actor.name}</h3>
                                    <p>{actor.character}</p>
                               </li>
                            ) 
                        })}
                </ul>
            }
        </>
    )
}