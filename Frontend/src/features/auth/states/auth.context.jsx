import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await getMe();
                setUser(data?.user || null);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}