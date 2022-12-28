import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const ProfileRoute = () => {
    const { isLogged, loading } = useAuth();

    if (loading) return <Loader />

    return isLogged ? <Outlet /> : <Navigate to="/sign-in" />
};

export default ProfileRoute;