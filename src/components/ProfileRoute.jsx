import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileRoute = () => {
    const { isLogged, loading } = useAuth();

    if (loading) return <div>Loading...</div>

    return isLogged ? <Outlet /> : <Navigate to="/sign-in" />
};

export default ProfileRoute;