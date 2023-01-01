import { Link } from "react-router-dom";

const Apartments = () => {
    return (
        <div className="container">
            <h1>Apartments</h1>
            <div className="categories">
                <h2 className="categories__title">Categories</h2>
                <div className="categories__list">
                    <Link to="/category/rent">Rent</Link>
                    <Link to="/category/sale">Sale</Link>
                </div>
            </div>
        </div>
    );
};

export default Apartments;