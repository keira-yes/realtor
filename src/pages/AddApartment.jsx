import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";

const AddApartment = () => {
    const [locationEnabled, setLocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        type: "rent",
        address: "",
        city: "",
        postalCode: "",
        lat: "",
        lng: "",
        hotOffers: false,
        discountPrice: "",
        price: "",
        deposit: "",
        floor: "",
        bedrooms: "",
        houseroom: "",
        furniture: false,
        parking: false,
        terrace: false,
        description: "",
        images: []
    });

    const {
        title,
        type,
        address,
        city,
        postalCode,
        lat,
        lng,
        hotOffers,
        price,
        discountPrice,
        deposit,
        floor,
        bedrooms,
        houseroom,
        furniture,
        parking,
        terrace,
        description,
        images
    } = formData;

    const auth = getAuth();
    const navigate = useNavigate();

    const onChangeInput = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onChangeBoolean = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: Boolean(e.target.value)
        }));
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setFormData({...formData, userId: user.uid});
            } else {
                navigate("/sign-in");
            }
        })
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="add-apartment">
            <div className="auth-page">
                <div className="auth-page__container container">
                    <header className="auth-page__header">
                        <h1 className="auth-page__title">Add new apartment</h1>
                    </header>
                    <main className="auth-page__main">
                        <div className="auth-page__form">
                            <form className="form" name="add-apartment" onSubmit={onSubmit}>
                                <div className="form__fields">
                                    <div className="form__field">
                                        <input
                                            type="text"
                                            className="form__field-input"
                                            name="title"
                                            value={title}
                                            placeholder="Title*"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field form__field--radio">
                                        <h2 className="form__label">Type</h2>
                                        <div className="radio">
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="rent-type"
                                                    className="radio__item-input sr-only"
                                                    name="type"
                                                    value="rent"
                                                    checked={type === "rent"}
                                                    onChange={onChangeInput}
                                                />
                                                <label htmlFor="rent-type" className="radio__item-label">Rent</label>
                                            </div>
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="sale-type"
                                                    className="radio__item-input sr-only"
                                                    name="type"
                                                    value="sale"
                                                    checked={type === "sale"}
                                                    onChange={onChangeInput}
                                                />
                                                <label htmlFor="sale-type" className="radio__item-label">Sale</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="text"
                                            className="form__field-input"
                                            name="address"
                                            value={address}
                                            placeholder="Address*"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="text"
                                            className="form__field-input"
                                            name="city"
                                            value={city}
                                            placeholder="City*"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="postalCode"
                                            value={postalCode}
                                            placeholder="Postal Code*"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    {!locationEnabled && <>
                                        <div className="form__field">
                                            <input
                                                type="number"
                                                className="form__field-input"
                                                name="latitude"
                                                value={lat}
                                                placeholder="Latitude"
                                                onChange={onChangeInput}
                                            />
                                        </div>
                                        <div className="form__field">
                                            <input
                                                type="number"
                                                className="form__field-input"
                                                name="longitude"
                                                value={lng}
                                                placeholder="Longitude"
                                                onChange={onChangeInput}
                                            />
                                        </div>
                                    </>}
                                    <div className="form__field form__field--radio">
                                        <h2 className="form__label">Add to Hot Offers?</h2>
                                        <div className="radio">
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="hot-offers-yes"
                                                    className="radio__item-input sr-only"
                                                    name="hotOffers"
                                                    value="yes"
                                                    checked={hotOffers}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="hot-offers-yes" className="radio__item-label">Yes</label>
                                            </div>
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="hot-offers-no"
                                                    className="radio__item-input sr-only"
                                                    name="hotOffers"
                                                    value=""
                                                    checked={!hotOffers}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="hot-offers-no" className="radio__item-label">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="price"
                                            value={price}
                                            placeholder="Price*"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="discountPrice"
                                            value={discountPrice}
                                            placeholder="Discount Price"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="deposit"
                                            value={deposit}
                                            placeholder="Deposit"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="floor"
                                            value={floor}
                                            placeholder="Floor"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="bedrooms"
                                            value={bedrooms}
                                            placeholder="Bedrooms"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="number"
                                            className="form__field-input"
                                            name="houseroom"
                                            value={houseroom}
                                            placeholder="Houseroom, м²"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field form__field--radio">
                                        <h2 className="form__label">Furniture</h2>
                                        <div className="radio">
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="furniture-yes"
                                                    className="radio__item-input sr-only"
                                                    name="furniture"
                                                    value="yes"
                                                    checked={furniture}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="furniture-yes" className="radio__item-label">Yes</label>
                                            </div>
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="furniture-no"
                                                    className="radio__item-input sr-only"
                                                    name="furniture"
                                                    value=""
                                                    checked={!furniture}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="furniture-no" className="radio__item-label">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field form__field--radio">
                                        <h2 className="form__label">Parking</h2>
                                        <div className="radio">
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="parking-yes"
                                                    className="radio__item-input sr-only"
                                                    name="parking"
                                                    value="yes"
                                                    checked={parking}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="parking-yes" className="radio__item-label">Yes</label>
                                            </div>
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="parking-no"
                                                    className="radio__item-input sr-only"
                                                    name="parking"
                                                    value=""
                                                    checked={!parking}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="parking-no" className="radio__item-label">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field form__field--radio">
                                        <h2 className="form__label">Terrace</h2>
                                        <div className="radio">
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="terrace-yes"
                                                    className="radio__item-input sr-only"
                                                    name="terrace"
                                                    value="yes"
                                                    checked={terrace}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="terrace-yes" className="radio__item-label">Yes</label>
                                            </div>
                                            <div className="radio__item">
                                                <input
                                                    type="radio"
                                                    id="terrace-no"
                                                    className="radio__item-input sr-only"
                                                    name="terrace"
                                                    value=""
                                                    checked={!terrace}
                                                    onChange={onChangeBoolean}
                                                />
                                                <label htmlFor="terrace-no" className="radio__item-label">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field">
                                        <textarea
                                            className="form__field-input"
                                            name="description"
                                            value={description}
                                            placeholder="Description"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <input
                                            type="file"
                                            className="form__field-input"
                                            name="images"
                                            // value={images}
                                            placeholder="images"
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                                <div className="form__submit">
                                    <button type="submit" className="form__submit-btn button button--accent">Create</button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AddApartment;