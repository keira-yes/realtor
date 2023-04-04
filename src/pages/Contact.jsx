import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Contact = () => {
    const [message, setMessage] = useState("");
    const [owner, setOwner] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchContact = async () => {
            const docRef = doc(db, "users", params.contactId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOwner(docSnap.data());
            } else {
                toast.error("Could not get the contact");
            }

            setLoading(false);
        }
        fetchContact();
    }, [params.contactId]);

    if (loading) return <Loader />

    return (
        <main className="contact">
            <div className="contact__container container">
                Contact
            </div>
        </main>
    );
};

export default Contact;