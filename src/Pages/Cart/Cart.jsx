import useCart from '../../Hooks/useCart';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import UserContentProvider from '../../Context/UserContext';
export default function Cart() {
    const { data, isLoading, error } = useCart();

    if (isLoading) return <p>Loading Cart...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const {UserName,UserAge,setUserName} = useContext(UserContext);

    return (
        <>
            <h1>Your Cart</h1>
            {UserName}
            {UserAge}
            <button onClick={()=> setUserName('sara')} >Change</button>
            {setUserName}
        </>
    );
}