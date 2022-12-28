import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React from 'react';

const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLogged(true);
            }
            setLoading(false);
        })
    }, []);

    return { isLogged, loading };
};

export default useAuth;