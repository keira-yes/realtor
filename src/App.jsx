import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { register } from 'swiper/element/bundle';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Apartment from "./pages/Apartment";
import HotOffers from "./pages/HotOffers";
import Profile from "./pages/Profile";
import AddApartment from "./pages/AddApartment";
import EditApartment from "./pages/EditApartment";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProfileRoute from "./components/ProfileRoute";

// Register Swiper slider
register();

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/category/:categoryName' element={<Category />} />
                    <Route path='/category/:categoryName/:apartmentId' element={<Apartment />} />
                    <Route path='/hot-offers' element={<HotOffers />} />
                    <Route path='/profile' element={<ProfileRoute />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='/add-apartment' element={<AddApartment />} />
                    <Route path='/edit-apartment/:apartmentId' element={<EditApartment />} />
                    <Route path='/contact/:contactId' element={<Contact />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ResetPassword />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
