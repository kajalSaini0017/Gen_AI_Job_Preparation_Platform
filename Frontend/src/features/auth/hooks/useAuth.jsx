import { useContext } from "react";
import { AuthContext } from "../states/auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            if (!data?.user) {
                return { success: false, message: "Unable to login" };
            }
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed. Please try again."
            };
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            if (!data?.user) {
                return { success: false, message: "Unable to register" };
            }
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed. Please try again."
            };
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetME = async () => {
        setLoading(true);
        try {
            const data = await getMe();
            setUser(data?.user || null);
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleLogin, handleLogout, handleRegister, handleGetME };
};