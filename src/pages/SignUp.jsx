import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from "../firebase.config";
import GoogleAuth from "../components/GoogleAuth";
import logo from "../assets/img/logo.svg";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { name, email, password } = formData;

    const navigate = useNavigate();

    const onChangeInput = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSetShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const onCreateUser = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(auth.currentUser, {
                displayName: name
            });
            const data = {...formData};
            delete data.password;
            data.timestamp = serverTimestamp();
            await setDoc(doc(db, "users", user.uid), data);
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong. Please, try again later.");
        }
    }

    return (
        <div className="sign-up">
            <div className="auth-page">
                <div className="auth-page__container container">
                    <header className="auth-page__header">
                        <Link to="/" className="auth-page__logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <h1 className="auth-page__title">Sign Up</h1>
                    </header>
                    <main className="auth-page__main">
                        <div className="auth-page__form">
                            <form className="form" name="sign-up" onSubmit={onCreateUser}>
                            <div className="form__fields">
                                <div className="form__field form__field--icon form__field--name">
                                    <input
                                        type="text"
                                        className="form__field-input"
                                        name="name"
                                        value={name}
                                        placeholder="Name"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field form__field--icon form__field--email">
                                    <input
                                        type="email"
                                        className="form__field-input"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={onChangeInput}
                                    />
                                </div>
                                <div className="form__field form__field--icon form__field--password form__field--btn">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form__field-input"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={onChangeInput}
                                    />
                                    <button
                                        type="button"
                                        className={`form__field-button password-button${showPassword ? " active" : ""}`}
                                        onClick={onSetShowPassword}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path d="M12 7C8.36364 7 5.25818 9.26182 4 12.4545C5.25818 15.6473 8.36364 17.9091 12 17.9091C15.6364 17.9091 18.7418 15.6473 20 12.4545C18.7418 9.26182 15.6364 7 12 7ZM12 16.0909C9.99273 16.0909 8.36364 14.4618 8.36364 12.4545C8.36364 10.4473 9.99273 8.81818 12 8.81818C14.0073 8.81818 15.6364 10.4473 15.6364 12.4545C15.6364 14.4618 14.0073 16.0909 12 16.0909ZM12 10.2727C10.7927 10.2727 9.81818 11.2473 9.81818 12.4545C9.81818 13.6618 10.7927 14.6364 12 14.6364C13.2073 14.6364 14.1818 13.6618 14.1818 12.4545C14.1818 11.2473 13.2073 10.2727 12 10.2727Z" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="form__submit">
                                <button type="submit" className="form__submit-btn button button--accent">Create Account</button>
                            </div>
                        </form>
                        </div>
                        <div className="auth-page__links">
                            <div className="auth-page__google"><GoogleAuth /></div>
                        </div>
                    </main>
                    <footer className="auth-page__footer">
                        <Link to="/sign-in" className="auth-page__button button">Already have an account? Log in!</Link>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default SignUp;