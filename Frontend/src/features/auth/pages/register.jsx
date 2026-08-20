import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Register(){
  const navigate = useNavigate();

  const {loading,handleRegister} = useAuth();

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
   const handleSubmit = async (e)=>{
      e.preventDefault();
      await handleRegister({
        email,
        password,
        username
      })
      navigate('/')
   }

   if(loading){
    return <main className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center"><h1>Loading.....</h1></main>
   }
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Register
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <input onChange={(e)=>{setUsername(e.target.value)}}
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-pink-400 hover:text-pink-300" to="/login">Login</Link>
        </p>
      </div>
    </div>
   )
}