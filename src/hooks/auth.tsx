import { createContext, ReactNode, useContext } from "react";

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
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const user: User = {
        id: "1",
        name: "João",
        email: "joao@gmail.com",
    };

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
