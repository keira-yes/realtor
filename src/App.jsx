import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Apartments from "./pages/Apartments";
import HotOffers from "./pages/HotOffers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Apartments />} />
                    <Route path='/hot-offers' element={<HotOffers />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
