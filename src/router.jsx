import { Children } from "react";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Componance/Categories/Categories";
import AuthAxiosInstance from './Api/AuthAxiosInstance';
const router = createBrowserRouter([
    {
path:'/',
element:<MainLayout />,
children:[
    {
        index:true,
        element:<Home />
    },
    {
        path:'register',
        element:<Register />
    },
     {
        path:'Cart',
        element:<Cart />
    },
     {
        path:'Categories',
        element:<Categories />
    },
    {
        path:'login',
        element:<Login />

    },
    {
        path:'cart',
        element:<Cart />
    },
]


    },
])

export default router;