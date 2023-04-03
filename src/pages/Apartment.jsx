import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Loader from "../components/Loader";

const Apartment = () => {
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLink, setShareLink] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchApartment = async () => {
            const docRef = doc(db, "lists", params.apartmentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setApartment(docSnap.data());
                setLoading(false);
            }
        }
        fetchApartment();
    }, [navigate, params.apartmentId]);

    if (loading) return <Loader />

    return (
        <div>
            <h1>Apartment</h1>
        </div>
    );
};

export default Apartment;