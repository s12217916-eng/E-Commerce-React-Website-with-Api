import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './../Componance/Navbar/Navbar';
import Footer from './../Componance/Footer/Footer'
import { Container } from '@mui/material';
import CategoriesSection from '../Componance/Categories/CategoriesSection';
export default function MainLayout() {
    
    return (
        <div>
            <Navbar />
           
            <Container  maxWidth="lg">
                
            <Outlet />
            </Container>
            <Footer />


        </div>
    )
}
