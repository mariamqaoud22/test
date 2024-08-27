import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import AuthContext from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/productDetails/productDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
// import WishList from "./Components/WishList/WishList";
import Payment from "./Components/Payment/Payment";
import { Offline } from "react-detect-offline";
import VerifyResetCode from "./Components/verificationCode/verificationCode";
// import WishListContextProvider from "./Context/WishListContext";
import ForgetPassword from "./Components/forgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      {
        path: "Home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "WishList",
      //   element: (
      //     <ProtectedRoute>
      //       <WishList/>
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
    
    
      {
        path: "VerifyResetCode",
        element: (
          <ProtectedRoute>
            <VerifyResetCode />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "ResetPassword",
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "ForgotPassword",
        element: (
          <ProtectedRoute>
            <ForgetPassword />
          </ProtectedRoute>
        ),
      },
   
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
   

      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const reactQueryConfig = new QueryClient();
export default function App() {
  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
          {/* <WishListContextProvider> */}
            <RouterProvider router={router} />
            <Toaster/>
            <Offline>
              <div className="bg-black fixed p-5 rounded text-white text-center  bottom-5 left-5">
              <h1>No Internet Connection </h1>  
              </div>
            </Offline>
            {/* </WishListContextProvider> */}
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>
    </>
  );
}

