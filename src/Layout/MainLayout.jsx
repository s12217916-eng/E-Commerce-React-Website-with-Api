import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './../Componance/Navbar/Navbar';
import Footer from './../Componance/Footer/Footer'
import { Container } from '@mui/material';
export default function MainLayout() {
    const userName="Zaid";
    return (
        <div>
            <Navbar userName={userName} />
            <Container  maxWidth="lg">
            <Outlet />
            </Container>
            <Footer />


        </div>
    )
}
