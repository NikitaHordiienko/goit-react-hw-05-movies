import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className={css.navigation}>
            <NavLink
                className={({ isActive }) => (isActive ? css.active : css.navigationLink)}
                to="/" end
            >Home</NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? css.active : css.navigationLink)}
                to="/movies"
            >Movies</NavLink>
        </nav>
    )
}
export default Navigation;