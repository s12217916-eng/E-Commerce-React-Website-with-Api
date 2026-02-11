import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './../Componance/Navbar/Navbar';
import Footer from './../Componance/Footer/Footer'
import { Container } from '@mui/material';
export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <Container  maxWidth="md">
            <Outlet />
            </Container>
            <Footer />


        </div>
    )
}
