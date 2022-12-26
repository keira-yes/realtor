import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
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
       navigate("/");
   }

    console.log(auth.currentUser)

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
            </div>
        </div>
    );
};

export default Profile;