import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
export default function Footer() {
  const {UserName,setUserName} = useContext(UserContext);
  return (
    <div>Footer
      hi {UserName}
    </div>
  )
}
