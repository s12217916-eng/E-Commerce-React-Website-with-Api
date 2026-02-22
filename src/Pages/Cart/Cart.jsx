import useCart from '../../Hooks/useCart';
export default function Cart() {
    const { data, isLoading, error } = useCart();

    if (isLoading) return <p>Loading Cart...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
       <h1>Your Cart</h1>
    );
}