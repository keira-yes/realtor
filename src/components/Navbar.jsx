import { NavLink } from "react-router-dom";
import house from "../assets/img/house.svg";
import star from "../assets/img/star.svg";
import user from "../assets/img/user.svg";

const Navbar = () => {
    const setNavLinkClassName = ({ isActive }) => isActive ? "navbar__item-link active" : "navbar__item";

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <img src={house} className="navbar__item-icon" alt="House" />
                    <NavLink to="/" className={setNavLinkClassName}>Apartments</NavLink>
                </li>
                <li className="navbar__item">
                    <img src={star} className="navbar__item-icon" alt="Star" />
                    <NavLink to="/hot-offers" className={setNavLinkClassName}>Hot Offers</NavLink>
                </li>
                <li className="navbar__item">
                    <img src={user} className="navbar__item-icon" alt="User" />
                    <NavLink to="/profile" className={setNavLinkClassName}>Profile</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;