import { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle: () => Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse;
            if (type === "success") {
                const response = await fetch(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
                );
                const userInfo = await response.json();
                setUser({ id: userInfo.id, email: userInfo.email, name: userInfo.name, photo: userInfo.picture });
            }
        } catch (error) {
            throw error;
        }
    }

    return <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
