import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import css from './BackLink.module.css'

const BackLink = ({ to, children }) => {
    return (
        <Link className={css.backLink} to={to}>{children}</Link>
    )
}

BackLink.propTypes = {
    to: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
}

export default BackLink;