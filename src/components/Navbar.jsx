import { NavLink } from "react-router-dom";

const Navbar = () => {
    const setNavLinkClassName = ({ isActive }) => isActive ? "navbar__item-link active" : "navbar__item-link";

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <NavLink to="/" className={setNavLinkClassName}>
                        <svg className="navbar__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
                            </g>
                        </svg>
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink to="/hot-offers" className={setNavLinkClassName}>
                        <svg className="navbar__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </g>
                        </svg>
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink to="/profile" className={setNavLinkClassName}>
                        <svg className="navbar__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z" />
                            </g>
                        </svg>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;