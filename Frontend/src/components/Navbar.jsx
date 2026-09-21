import { LuBrain } from "react-icons/lu"
import { useNavigate, NavLink } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa"
import { useState } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useTheme } from "../context/theme.context";


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate()
    const linkClassName = ({ isActive }) => isActive
        ? "text-indigo-700 font-bold underline dark:text-indigo-300"
        : "text-gray-700 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-300";

    const { user,handleLogout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    function handleGetStart(){
        if(!user){
             navigate("/register");
        }
       else{
        navigate("/interview")
       }
    
    }

     async function handlelogout(){
         await handleLogout();
         setIsMenuOpen(false);
         navigate("/login");
    }

    return (
        <>  
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                <div className="flex flex-wrap gap-4 justify-between w-full p-3 items-center px-4 sm:px-6 lg:px-12">
                    <div className="flex gap-2 items-center">
                        <div>
                            <LuBrain className="size-7 text-indigo-700" />
                        </div>

                        <div className="font-bold text-lg ">
                            GenAI <span className="text-indigo-700">Prep</span>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-6">                        <NavLink to="/" className={linkClassName}>Home</NavLink>
                        <NavLink to="/about" className={linkClassName}>About</NavLink>
                        <NavLink to="/interview" className={linkClassName}>Interview</NavLink>
                        <NavLink to="/reports" className={linkClassName}>Reports</NavLink>
                        <NavLink to="/contact" className={linkClassName}>Contact</NavLink>
                        {
                            user && <button type="button" onClick={handlelogout} className="text-gray-700 hover:text-indigo-700">Logout</button>
                        }
                        
                    </div>
                    <div className="hidden items-center gap-4 md:flex">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            className="rounded-full border border-slate-300 p-2 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-700 hover:cursor-pointer dark:border-slate-700 dark:text-yellow-300 dark:hover:border-yellow-300"
                        >
                            {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                        </button>
                        <div>
                            <NavLink to="/login">Login</NavLink>
                        </div>
                        <div>
                            <button className="p-2 pr-4 pl-4 rounded-2xl bg-indigo-700 text-white font-bold" onClick={handleGetStart} >Get Started</button>
                        </div>

                    </div>
                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-xl text-indigo-700 p-2"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {isMenuOpen && (
                        <div className="basis-full md:hidden border-t border-gray-200 pt-3 mt-2 fixed top-14 right-2 bg-gray-100 bg-opacity-30 p-4 rounded-2xl items-center">
                            <div className="flex flex-col gap-3" >
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                    className="flex w-fit items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-left text-gray-700 dark:border-slate-700 dark:text-slate-200"
                                >
                                    {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                                    {theme === "dark" ? "Light mode" : "Dark mode"}
                                </button>
                                <NavLink to="/" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                                <NavLink to="/about" className={linkClassName} onClick={() => setIsMenuOpen(false)}>About</NavLink>
                                <NavLink to="/interview" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Interview</NavLink>
                                <NavLink to="/reports" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Reports</NavLink>
                                <NavLink to="/contact" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                                {user && <button type="button" onClick={handlelogout} className="text-left text-gray-700 hover:text-indigo-700">Logout</button>}
                                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                                <button onClick={handleGetStart} className="w-fit px-3 py-1 text-sm rounded-2xl bg-indigo-700 text-white font-bold md:px-4 md:py-2 md:text-base">Get Started</button>
                            </div>
                        </div>
                    )}
                </div>


            </nav>
        </>
    )
}
export default Navbar;