import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Login() {
   const navigate = useNavigate();

   const {loading,handleLogin} = useAuth()
    
   const [email,setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   async function handleSubmit(event){
         event.preventDefault();
         if (!email.trim() || !password.trim()) {
            setErrorMessage("Email and password are required.");
            return;
         }

         setErrorMessage("");
         const result = await handleLogin({
            email,
            password
         });
         if (!result?.success) {
            setErrorMessage(result?.message || "Login failed. Please try again.");
            return;
         }
         navigate("/");

   }

   if(loading){
      return <main className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center"><h1>Loading.....</h1></main>
   }
   return (
      <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-800">
         <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-300/30 md:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
               Login
            </h2>
            {errorMessage && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}
            <form className="space-y-5" onSubmit={handleSubmit}>
               {/* Email Field */}
               <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input onChange={(e)=>{setEmail(e.target.value)}}
                     type="email"
                     placeholder="Enter your email"
                     className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
               </div>

               {/* Password Field */}
               <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <input  onChange={(e)=>{setPassword(e.target.value)}}
                     type="password"
                     placeholder="Enter your password"
                     className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-indigo-700 py-2.5 text-white transition duration-200 hover:bg-indigo-800"
               >
                  Login
               </button>
            </form>

            {/* Extra Links */}
            <p className="mt-4 text-center text-sm text-slate-500">
               Don’t have an account?{" "}
               <Link className="font-semibold text-indigo-700 hover:text-indigo-800" to="/register">Register</Link>
            </p>
         </div>
         <div>
            <p className="text-black">Go Back To The Desktop <span className="text-indigo-700 font-bold hover:text-indigo-600 cursor-pointer" onClick={()=>navigate("/")}>Home</span></p>
         </div>
      </div>
   )
}