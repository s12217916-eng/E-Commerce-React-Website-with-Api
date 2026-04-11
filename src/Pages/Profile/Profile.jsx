import { Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Box } from '@mui/system'
import useProfile from '../../Hooks/useProfile'
export default function Profile() {
    const {data} = useProfile();
    console.log(data)
  return (
    <Box className='profile'>
        <Typography variant='h4' textAlign='center' marginBottom={3}>
            Profile
        </Typography>
        <Link to='Info'>Info</Link>
        <Link to='orders'>Orders</Link>

        <Box>
            <Outlet />
        </Box>
                </Box>
  )
}
