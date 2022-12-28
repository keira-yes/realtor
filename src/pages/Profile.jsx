import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from "../firebase.config";

const Profile = () => {
    const auth = getAuth();

    const [user, setUser] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });
    const [edit, setEdit] = useState(false);

    const { name, email } = user;

    const navigate = useNavigate();

    const onLogout = e => {
        e.preventDefault();
        auth.signOut();
        navigate("/sign-in");
    }

    const onChangeInput = e => {
        setUser(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeUser = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const onEdit = e => {
        e.preventDefault();
        edit && onChangeUser();
        setEdit(prevState => !prevState);
    }

    return (
        <div className="profile page">
            <div className="profile__container container">
                <header className="profile__header">
                    <h1 className="profile__title page-title">Profile</h1>
                    <button
                        type="button"
                        className="profile__logout button button--sm button--accent"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </header>
                <main className="profile__main">
                    <div className="profile__info">
                        <div className="profile__info-form">
                            <form className="form" name="profile">
                                <div className="form__fields">
                                    <div className={`form__field form__field--name${!edit ? " edited" : ""}`}>
                                        <input
                                            type="text"
                                            className="form__field-input"
                                            name="name"
                                            value={name}
                                            placeholder="Name"
                                            disabled={!edit}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                    <div className="form__field form__field--email edited">
                                        <input
                                            type="email"
                                            className="form__field-input"
                                            name="email"
                                            value={email}
                                            placeholder="Email"
                                            disabled
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button type="button" className="profile__info-edit" onClick={onEdit}>
                            {edit ? "Save" : "Edit"}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;