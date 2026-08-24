import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Register } from './features/auth/pages/register'
import { Login } from './features/auth/pages/login'
import { Protected } from './features/auth/components/protected.api'
import Home from './features/interview/pages/home'
import Interview from './features/interview/pages/interview'

const router = createBrowserRouter([
   {
       path : "/",
       element :<Protected><Home/></Protected> 
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path : "/interview/:interviewId",
        element : <Interview/>
    },
    
])

export function Applayout(){
   return <RouterProvider router ={router}></RouterProvider>
}