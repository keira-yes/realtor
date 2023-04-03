import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.config";
import Loader from "../components/Loader";

const AddApartment = () => {
    const [geocodingEnabled, setGeocodingEnabled] = useState(true);
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
            [e.target.name]: e.target.files ? e.target.files : e.target.value
        }));
    }

    const onChangeBoolean = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: Boolean(e.target.value)
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (discountPrice >= price) {
            setLoading(false);
            toast.error('Discount price has to be lower than regular price!');
            return;
        }

        // Handle images

        const saveImage = async (file) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`;
                const storageRef = ref(storage, 'images/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }

        const imagesUrls = await Promise.all(
            [...images].map(image => saveImage(image))
        ).catch(() => {
            setLoading(false);
            toast.error("Images loading is wrong, try again later");
        });

        // Handle coordinates

        const coordinates = {};
        let location = `${address}, ${postalCode} ${city}`;

        if (geocodingEnabled) {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
            const data = await response.json();
            coordinates.lat = data.results[0]?.geometry.location.lat ?? 0;
            coordinates.lng = data.results[0]?.geometry.location.lng ?? 0;

            if (!location) {
                setLoading(false);
                toast.error('Please check address, city or postal code');
            }

        } else {
            coordinates.lat = lat;
            coordinates.lng = lng;
        }

        // Save form data to db

        const formDataUpdated = {
            ...formData,
            images: imagesUrls,
            coordinates,
            timestamp: serverTimestamp()
        }

        console.log(formDataUpdated)

        const docRef = await addDoc(collection(db, "lists"), formDataUpdated);
        toast.success('Apartment is added!');
        navigate(`/category/${formDataUpdated.type}/${docRef.id}`);

        setLoading(false);
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
            <div className="form-page">
                <div className="form-page__container container">
                    <h1 className="form-page__title">Add new apartment</h1>
                    <main className="form-page__main">
                        <form className="form" name="add-apartment" onSubmit={onSubmit}>
                            <div className="form__fields">
                                <div className="form__field">
                                    <label htmlFor="title" className="form__label">Title*</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form__field-input"
                                        name="title"
                                        value={title}
                                        placeholder="Title of apartment"
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
                                    <label htmlFor="address" className="form__label">Address*</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="form__field-input"
                                        name="address"
                                        value={address}
                                        placeholder="Street name, house/apartment"
                                        required
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="city" className="form__label">City*</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="form__field-input"
                                        name="city"
                                        value={city}
                                        placeholder="Locality"
                                        required
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="postalCode" className="form__label">Postal Code*</label>
                                    <input
                                        type="number"
                                        id="postalCode"
                                        className="form__field-input"
                                        name="postalCode"
                                        value={postalCode}
                                        placeholder="Enter Code"
                                        min="1"
                                        required
                                        onChange={onChangeInput}
                                    />
                                </div>
                                {!geocodingEnabled && <>
                                    <div className="form__field">
                                        <label htmlFor="latitude" className="form__label">Latitude*</label>
                                        <input
                                            type="number"
                                            id="latitude"
                                            className="form__field-input"
                                            name="latitude"
                                            value={lat}
                                            placeholder="60.437126"
                                            min="1"
                                            required
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field">
                                    <label htmlFor="longitude" className="form__label">Longitude*</label>
                                        <input
                                            type="number"
                                            id="longitude"
                                            className="form__field-input"
                                            name="longitude"
                                            value={lng}
                                            placeholder="11.050333"
                                            min="1"
                                            required
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
                                    <label htmlFor="price" className="form__label">Price, $*</label>
                                    <input
                                        type="number"
                                        id="price"
                                        className="form__field-input"
                                        name="price"
                                        value={price}
                                        placeholder="Enter price"
                                        min="1"
                                        required
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="discountPrice" className="form__label">Discount price, $</label>
                                    <input
                                        type="number"
                                        id="discountPrice"
                                        className="form__field-input"
                                        name="discountPrice"
                                        value={discountPrice}
                                        placeholder="Enter price"
                                        min="1"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="deposit" className="form__label">Deposit, $</label>
                                    <input
                                        type="number"
                                        id="deposit"
                                        className="form__field-input"
                                        name="deposit"
                                        value={deposit}
                                        placeholder="Sum of deposit"
                                        min="1"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="floor" className="form__label">Floor</label>
                                    <input
                                        type="number"
                                        id="floor"
                                        className="form__field-input"
                                        name="floor"
                                        value={floor}
                                        placeholder="Floor number"
                                        min="1"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="bedrooms" className="form__label">Bedrooms</label>
                                    <input
                                        type="number"
                                        id="bedrooms"
                                        className="form__field-input"
                                        name="bedrooms"
                                        value={bedrooms}
                                        placeholder="Number of bedrooms"
                                        min="1"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="houseroom" className="form__label">Houseroom, м²</label>
                                    <input
                                        type="number"
                                        id="houseroom"
                                        className="form__field-input"
                                        name="houseroom"
                                        value={houseroom}
                                        placeholder="Number of м²"
                                        min="1"
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
                                    <label htmlFor="description" className="form__label">Description</label>
                                    <textarea
                                        id="description"
                                        className="form__field-input"
                                        name="description"
                                        value={description}
                                        placeholder="Describe your apartment"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field">
                                    <label htmlFor="images" className="form__label">Images*</label>
                                    <input
                                        type="file"
                                        id="images"
                                        className="form__field-input"
                                        name="images"
                                        accept=".jpg, .jpeg, .png, .svg"
                                        max="6"
                                        multiple
                                        required
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="form__submit">
                                <button type="submit" className="form__submit-btn button button--accent">Create</button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AddApartment;