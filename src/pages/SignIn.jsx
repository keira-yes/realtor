import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import GoogleAuth from "../components/GoogleAuth";
import logo from "../assets/img/logo.svg";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const navigate = useNavigate();

    const onChangeInput = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSetShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const onSignIn = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) navigate("/profile");
        } catch(error) {
            toast.error("Wrong Login or Password");
        }
    }

    return (
        <div className="sign-in">
            <div className="auth-page">
                <div className="auth-page__container container">
                    <header className="auth-page__header">
                        <Link to="/" className="auth-page__logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <h1 className="auth-page__title">Sign In</h1>
                    </header>
                    <main className="auth-page__main">
                        <div className="auth-page__form">
                            <form className="form" name="sign-in" onSubmit={onSignIn}>
                                <div className="form__fields">
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
                                    <button type="submit" className="form__submit-btn button button--accent">Log In</button>
                                </div>
                            </form>
                        </div>
                        <div className="auth-page__links">
                            <div className="auth-page__google"><GoogleAuth /></div>
                            <Link to="/forgot-password" className="auth-page__link">Forgot your password?</Link>
                        </div>
                    </main>
                    <footer className="auth-page__footer">
                        <Link to="/sign-up" className="auth-page__button button">Don't have an account yet? Sign up!</Link>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default SignIn;