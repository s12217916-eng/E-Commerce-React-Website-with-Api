import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './../Componance/Navbar/Navbar';
import Footer from './../Componance/Footer/Footer'
export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />


        </div>
    )
}
