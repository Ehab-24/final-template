import React from 'react';
import { createContext, useContext, useState } from "react";
import * as api from "../api";
import * as TokensManager from "./TokensManager";

type TAuthContext = {
    isLoggedIn: boolean;
    signup: (username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<TAuthContext>(
    {
        isLoggedIn: false,
        signup: () => { },
        login: () => { },
        logout: () => { }
    }
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(TokensManager.hasTokens())

    async function signup(username: string, password: string) {
        const tokens = await api.createUser(username, password)
        if (!!tokens) {
            console.log('user signed up')
            TokensManager.setTokenPair(tokens.access, tokens.refresh)
            setIsLoggedIn(true)
        } else {
            alert('User already exists')
        }
    }

    async function login(username: string, password: string) {
        const tokens = await api.getTokenPair(username, password)
        if (!!tokens) {
            console.log('user logged in')
            TokensManager.setTokenPair(tokens.access, tokens.refresh)
            setIsLoggedIn(true)
        } else {
            alert('Incorrect credentials')
        }
    }

    function logout() {
        console.log('user logged out')
        TokensManager.removeTokenPair()
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, signup, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

