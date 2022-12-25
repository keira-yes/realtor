import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const Profile = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {user ? user.displayName : "Please, log in..."}
        </div>
    );
};

export default Profile;