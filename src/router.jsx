import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import UserContentProvider from "./Context/UserContext";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import CheckOut from "./Pages/CheckOut/CheckOut";
import ProtectedRouter from "./ProtectedRouter";
import Profile from "./Pages/Profile/Profile";
import ProfileInfo from "./Pages/Profile/ProfileInfo";
import ProfileOrder from "./Pages/Profile/ProfileOrder";
import ProductsPage from "./ProductsPage/ProductsPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserContentProvider>
        <MainLayout />
      </UserContentProvider>
    ),
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
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <ProfileInfo />
          },
          {
            path: 'orders',
            element: <ProfileOrder />
          }
        ]
      },
      {
        path: 'CheckOut',
        element: (
          <ProtectedRouter>
            <CheckOut />
          </ProtectedRouter>
        )
      },
      {
        path: 'categories',
        element: <CategoriesPage />
      },
    ]
  }
]);

export default router;