import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import CounterContextProvider from "./components/contexts/CounterContext";
import Brands from "./pages/Brands/Brands";
import UserContextProvider from "./components/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./components/slices/store";
import Protected from "./components/Protected/Protected";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./components/contexts/CartContext";
import Checkout from "./components/Checkout/Checkout";
import CheckoutDetails from "./components/CheckoutDetails/CheckoutDetails";
import Personal from "./pages/Personal/Personal";
import WishlistContextProvider from "./components/contexts/WishlistContext";
import Wishlist from "./pages/Wishlist/Wishlist";
import ForgetPassContextProvider from "./components/contexts/ForgetPassContext";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UpdatePass from "./components/UpdatePass/UpdatePass";
import UpdateUserData from "./components/UpdateUserData/UpdateUserData";
// import UserOrders from './pages/UserOrders/UserOrders'
// import UserOrdersContextProvider from './components/contexts/UserOrderscontext'

let queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            {" "}
            <Home />{" "}
          </Protected>
        ),
      },
      {
        path: "brands",
        element: (
          <Protected>
            {" "}
            <Brands />{" "}
          </Protected>
        ),
      },
      {
        path: "products",
        element: (
          <Protected>
            {" "}
            <Products />{" "}
          </Protected>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <Protected>
            {" "}
            <ProductDetails />{" "}
          </Protected>
        ),
      },
      {
        path: "categories",
        element: (
          <Protected>
            {" "}
            <Categories />{" "}
          </Protected>
        ),
      },
      {
        path: "cart",
        element: (
          <Protected>
            {" "}
            <Cart />{" "}
          </Protected>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "checkout", element:<Protected><Checkout /></Protected>  },
      { path: "personal", element: <Protected><Personal /></Protected> },
      { path: "checkoutDetails", element: <CheckoutDetails /> },
      { path: "wishlist", element: <Protected> <Wishlist /> </Protected>  },
      { path: "forgetPass", element: <Protected><ForgetPass /></Protected>  },
      { path: "resetPassword", element:<Protected><ResetPassword /></Protected>  },
      { path: "updatePass", element:<Protected><UpdatePass /></Protected>  },
      { path: "updateUserData", element:<Protected><UpdateUserData values={{ name }} /></Protected>  },
      // {path: "userOrdedrs", element: <UserOrders/> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <>
      {/* <Provider store={store}> */}

      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ForgetPassContextProvider>
            <WishlistContextProvider>
              <CartContextProvider>
                <CounterContextProvider>
                  <RouterProvider router={routes} />
                  <Toaster />
                </CounterContextProvider>
              </CartContextProvider>
            </WishlistContextProvider>
          </ForgetPassContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
      {/* </Provider> */}
    </>
  );
}

export default App;
