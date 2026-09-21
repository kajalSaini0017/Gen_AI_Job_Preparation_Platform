import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './features/auth/pages/register'
import { Login } from './features/auth/pages/login'
import { Protected } from './features/auth/components/protected.api'
import Home from './features/interview/pages/home'
import Interview from './features/interview/pages/interview'
import HomePage from './pages/home'
import Layout from './Layout/mainLayout'
import AboutPage from './pages/about'
import ContactPage from './pages/contact'
import Reports from './features/interview/pages/Report'
import Error404 from './error404'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                
            },
            {
                path: "/interview",
                element: <Protected><Home /></Protected>
            },

            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/contact",
                element:<Protected><ContactPage /></Protected> 
            },


            {
                path: "/reports",
                element:<Protected><Reports /></Protected> 
            },
            {
                path: "/interview/:interviewId",
                element: <Protected><Interview /></Protected>
            },
            {
                path: "*",
                element: <Error404 />
            },
        ]
    }, {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },


])

export function Applayout() {
    return <RouterProvider router={router}></RouterProvider>
}