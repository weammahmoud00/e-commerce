import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/contexts/UserContext";
import { WishlistContext } from "../../components/contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOrdersContext } from "../../components/contexts/UserOrderscontext";
import { getUserId, getUserInfo, getAuthHeaders } from "../../utils/auth";
import JWTDebugger from "../../components/JWTDebugger/JWTDebugger";
import { jwtDecode } from "jwt-decode";
import { ForgetPassContext } from "../../components/contexts/ForgetPassContext";

export default function Personal() {
  let { setUserLogin } = useContext(UserContext);
  let { wishlistCount } = useContext(WishlistContext);
  let { name,email } = useContext(ForgetPassContext);
  let [userName, setUserName] = useState(null);
  let [userId, setUserId] = useState(null);
  // let [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();


// async function handleUpdatePass(currentPassword, password, rePassword) {
//     try {
//       let response = await fetchUpdatePassword(currentPassword, password, rePassword);
//       console.log("Update user logged password response:", response?.data);

//       if (response?.data?.status === "success") {
//         navigate("/personal");
//         return response;
//       } else {
//         setErrMsg(response?.data?.message || "Invalid or expired reset code");
//         return null;
//       }
//     } catch (error) {
//       console.error(
//         "Update user logged passworderror:",
//         error?.response?.data || error.message
//       );
//       setErrMsg(
//         error?.response?.data?.message || "Failed to verify reset code"
//       );
//       return null;
//     }
//   }




  const getUserIdFromJWT = () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        console.log("No token found in localStorage");
        return null;
      }

      // console.log("Token :", token);

      const payload = jwtDecode(token);
      // console.log("JWT Payload:", payload);

      setUserId(payload.id)
      setUserName(payload.name);
      // setUserEmail(payload.email);
      // console.log("User ID :", userId);
      
      return userId;
    } catch (error) {
      console.error("Error with jwt library:", error);
      return null;
    }
  };

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    totalSpent: 0,
    memberSince: "2023",
  });

  // async function getUserOrders() {
  //   try {
  //     setLoading(true);

  //     const userId = getUserIdFromJWT();
  //     if (!userId) {
  //       // console.error(" No user ID found - cannot fetch orders");
  //       setLoading(false);
  //       return;
  //     }

  //     console.log(" Fetching orders for user ID:", userId);

  //     const response = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
  //       {
  //         headers: {
  //           token: localStorage.getItem("userToken"),
  //         },
  //       }
  //     );

  //     const orders = response?.data?.data || [];
  //     setUserOrders(orders);

  //     const totalSpent = orders.reduce(
  //       (sum, order) => sum + (order.totalOrderPrice || 0),
  //       0
  //     );

  //     setStats((prev) => ({
  //       ...prev,
  //       totalOrders: orders.length,
  //       totalSpent: totalSpent,
  //     }));

  //     console.log("User orders:", orders);
  //     setLoading(false);
  //     return orders;
  //   } catch (error) {
  //     console.error("Error fetching user orders:", error);
  //     setLoading(false);
  //     return [];
  //   }
  // }

  useEffect(() => {
    // getUserOrders();
  }, [{name, email}]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, 
            {name}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your account and track your orders
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Orders
                </p>
                {loading ? (
                  <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.totalOrders}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div onClick={() => navigate("/wishlist")}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Wishlist Items
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {wishlistCount || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Spent
                </p>
                {loading ? (
                  <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.totalSpent} EGP
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link
            to="/userOrders"
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg p-8 text-white transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">All Orders</h3>
                <p className="text-green-100">
                  View your order history
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-2xl shadow-lg p-8 text-white transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Wishlist</h3>
                <p className="text-red-100">
                  Manage your saved items and favorites
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-8 relative">
            <div className="absolute top-3 right-3 flex ">
            <button 
            onClick={() => navigate("/updateUserData", { state: { name, email } })}
            className="bg-green-600 cursor-pointer rounded px-4 text-white hover:bg-green-400 duration-300 ">Edit</button>
            </div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Account Information
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 flex ">
                <label className="text-sm  me-4 font-medium text-gray-700 dark:text-gray-300">
                  Name:
                </label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {name}
                </p>
              </div>

              <div className="space-y-2 flex">
                <label className="text-sm me-4  font-medium text-gray-700 dark:text-gray-300">
                  Email Address:
                </label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {email}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password : ********
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address: ********
                </label>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone: ********
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/settings"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settings
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Account preferences
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/support"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get help & contact us
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-red-300 dark:hover:border-red-700"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Logout
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign out of your account
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
