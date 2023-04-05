import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Contact = () => {
    const [message, setMessage] = useState("");
    const [owner, setOwner] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const onChangeInput = e => {
        setMessage(e.target.value);
    }

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
                <h1 className="contact__title">Contact {owner?.name}</h1>
                <form className="contact__form form">
                    <div className="form__field">
                        <label htmlFor="message" className="form__label">Message</label>
                        <textarea
                            id="message"
                            className="form__field-input"
                            name="message"
                            value={message}
                            placeholder="Text your message to the apartment owner"
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="form__submit">
                        <a href={`mailto:${owner.email}?Subject=${searchParams.get("apartmentTitle")}&body=${message}`} className="form__submit-btn button button--accent">Send Message</a>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contact;