import { Link } from "react-router-dom";
import banner from "../assets/img/banner_desktop.jpg";
import banner_desktop from "../assets/img/banner_desktop.jpg";
import rent from "../assets/img/rent.jpg";
import sale from "../assets/img/sale.jpg";
import offers from "../assets/img/offers.jpg";

const Home = () => {
    return (
        <div className="home">
            <div className="home__banner">
                <picture className="home__banner-img">
                    <source media="(min-width: 641px)" srcSet={banner_desktop} />
                    <img src={banner} alt="Housing" />
                </picture>
                <h1 className="home__banner-title">Real estate from market experts</h1>
            </div>
            <div className="home__container container">
                <div className="home__categories">
                    <Link to="/category/rent" className="home__category">
                        <img className="home__category-img" src={rent} alt="Rent"/>
                        <div className="home__category-content">
                            <h2 className="home__category-title">Rent</h2>
                        </div>
                    </Link>
                    <Link to="/category/sale" className="home__category">
                        <img className="home__category-img" src={sale} alt="Sale"/>
                        <div className="home__category-content">
                            <h2 className="home__category-title">Sale</h2>
                        </div>
                    </Link>
                    <Link to="/hot-offers" className="home__category">
                        <img className="home__category-img" src={offers} alt="Hot offers"/>
                        <div className="home__category-content">
                            <h2 className="home__category-title">Hot offers</h2>
                        </div>
                    </Link>
                </div>
                <div className="home__description">
                    <h2 className="home__description-totle">About Realtor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, veritatis!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam enim esse eveniet exercitationem, impedit incidunt itaque laborum maiores molestiae odio repellat temporibus velit, voluptate voluptatem. Aperiam asperiores dicta dolorem molestias nisi perferendis quia sit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum doloremque et in laudantium, libero natus quia sunt voluptate.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;