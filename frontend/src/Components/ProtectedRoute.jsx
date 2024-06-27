/**
 * @file Protected_Route.jsx
 * @author Micah Chen
 * @date Last Modified: 5/20/2021
 * 
 * Description: This file contains the implementation of the Protected_Route component. This component is used to protect certain routes
 * in the application that require user authentication. It checks if the user is authenticated by verifying the JWT access token stored in local storage.
 * 
 * If the access token is not present or is expired, it attempts to refresh the token using the refresh token. If the refresh token is also not present or invalid,
 * the user is considered unauthenticated and is redirected to the welcome page.
 * 
 * If the access token is valid and not expired, the user is considered authenticated and is allowed to access the protected route.
 */

import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import as a default export
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../Constants';
import { useEffect, useState, useCallback } from 'react';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshToken = useCallback(async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/authenticate/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }, []);

    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token); // Correct usage with default import
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }, [refreshToken]);

    useEffect(() => {
        // Call auth on initial render
        auth();

        // Set up interval to refresh token before it expires
        const interval = setInterval(() => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                const decoded = jwtDecode(token);
                const tokenExpiration = decoded.exp;
                const now = Date.now() / 1000;

                // Refresh the token if it will expire in the next minute
                if (tokenExpiration - now < 60) {
                    refreshToken();
                }
            }
        }, 5000); // Check every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [auth, refreshToken]); // Run only once when the component mounts

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/welcome" />;
}

export default ProtectedRoute;



// This is the old version, it doesn't handle refresh 

/*
import {Navigate, Route} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../Constants';
import {useEffect, useState} from 'react';


function Protected_Route({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/authenticate/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/welcome" />;
}

export default Protected_Route;
*/