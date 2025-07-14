import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../components/contexts/WishlistContext";
import { CartContext } from "../../components/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";

export default function Wishlist() {
  const navigate = useNavigate();
  let { getWishlist, wishlistItems, wishlistCount, removeFromWishlist } =
    useContext(WishlistContext);
  let { addCartItem } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  console.log("Wishlist items:", wishlistItems);
  console.log("Wishlist count:", wishlistCount);

  async function loadWishlist() {
    try {
      setLoading(true);
      await getWishlist();
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadWishlist();
  }, []);

  async function handleRemoveFromWishlist(productId) {
    try {
      let response = await removeFromWishlist(productId);
      if (response?.status === "success") {
        toast.success("Removed from wishlist!");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    }
  }

  async function handleAddToCart(productId) {
    try {
      let response = await addCartItem(productId);
      if (response?.data?.status === "success") {
        toast.success("Added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  }

  if (loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          My Wishlist ({wishlistCount || 0} items)
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.length > 0 ? <> {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Remove from Wishlist"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium uppercase tracking-wide">
                    {item.category?.name}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.price} EGP
                  </span>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.ratingsAverage}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                    />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}</> : <div className="text-center  py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start adding items to your wishlist to see them here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Start Shopping
            </button>
          </div>
        </div>}
          
        </div>
      </div>
    </div>
  );
}
