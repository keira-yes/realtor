import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";

const AddApartment = () => {
    const [locationEnabled, setLocationEnabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        type: 'rent',
        address: '',
        city: '',
        postalCode: 0,
        lat: '',
        lng: '',
        deposit: 0,
        discount: false,
        discountPrice: 0,
        price: 0,
        floor: 1,
        bedrooms: 1,
        houseroom: 0,
        furniture: false,
        parking: false,
        terrace: false,
        description: '',
        images: []
    });

    const auth = getAuth();
    const navigate = useNavigate();

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
        <div>
            <h1>Add Apartment</h1>
        </div>
    );
};

export default AddApartment;