import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import logo from "../assets/img/logo.svg";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const onChangeInput = e => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset link was sent to your email");
        } catch (error) {
            toast.error("Something went wrong. Please, try again later.");
        }
    }

    return (
        <div className="forgot-password">
            <div className="auth-page">
                <div className="auth-page__container container">
                    <header className="auth-page__header">
                        <Link to="/" className="auth-page__logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <h1 className="auth-page__title">Reset password</h1>
                    </header>
                    <main className="auth-page__form">
                        <form className="form" name="forgot-password" onSubmit={onSubmit}>
                            <div className="form__fields">
                                <div className="form__field form__field--email">
                                    <input
                                        type="email"
                                        className="form__field-input"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="form__submit">
                                <button type="submit" className="form__submit-btn button button--accent">Reset</button>
                            </div>
                        </form>
                    </main>
                    <footer className="auth-page__footer">
                        <Link to="/sign-in" className="auth-page__button button">Remember password? Log in!</Link>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;