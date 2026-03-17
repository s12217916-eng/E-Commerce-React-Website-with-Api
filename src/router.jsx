import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import UserContentProvider from "./Context/UserContext";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";

const router = createBrowserRouter([
{
path: '/',
element:
<UserContentProvider>
<MainLayout />
</UserContentProvider>,

children: [

{
index: true,
element: <Home />
},

{
path: 'register',
element: <Register />
},

{
path: 'login',
element: <Login />
},

{
path: 'products/:id',
element: <ProductDetails />
},

{
path: 'cart',
element: <Cart />
},

{
path: 'categories',
element: <CategoriesPage />
},

]
}
])

export default router;