import {createContext, useState} from "react";

export const UserContext = createContext();

const UserContentProvider =({children})=>{
console.log("Hello Zaid")
const [UserName,setUserName]= useState('zaid');
const UserAge=21;
return (
    <UserContext.Provider value={{UserName,UserAge,setUserName}}>
        {children}

    </UserContext.Provider>) 



}



export default UserContentProvider;