import React, { useContext } from "react";
import { CartContext } from "../../components/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  let {
    products,
    updateCart,
    deleteCartItem,
    ClearCart,
    cartId,
    totalCartPrice,
    numOfCartItems,
  } = useContext(CartContext);
  // console.log("Cart products:", products);

  async function handleUpdateCart(prodId, count) {
    if (count <= 0) {
      console.log("Deleting item");
      try {
        let response = await deleteCartItem(prodId);
        toast.success("Item deleted from cart");
        console.log("Delete response:", response);
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
      return;
    }

    try {
      let response = await updateCart(prodId, count);
      console.log("Update response:", response);

      if (response?.response?.status === "success") {
        toast.success("Item updated successfully");
        return response?.response?.status;
      }

      if (response?.response?.status === "error") {
        console.error("Error updating cart:", response?.response?.message);
      } else {
        console.error("Unknown response format:", response);
      }
    } catch (error) {
      console.error("Error in handleUpdateCart:", error);
    }
  }

  async function handleDeleteCartItem(prodId) {
    try {
      let response = await deleteCartItem(prodId);
      toast.success("Item delted from cart");
      console.log("Delete response:", response);
    } catch (error) {
      console.error("Error deleting cart item ", error);
    }
  }

  function handleClearCart() {
    try {
      let response = ClearCart();
      toast.success("Cart cleared successfully");
      console.log("Clear cart response:", response);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  return (
    <>
      <section className="min-h-screen bg-gray-50 dark:bg-[#0A2025] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-8">
            My Shopping Cart
          </h1>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Cart Items
                    </h2>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="text-center px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="text-center px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="text-center px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {products?.map((prod) => {
                        return (
                          <tr
                            key={prod._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-16 h-16">
                                  <img
                                    src={prod?.product?.imageCover}
                                    alt={prod?.product?.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {prod?.product?.title
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {prod?.product?.category?.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                {prod?.price} EGP
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center space-x-3">
                                <button
                                  onClick={() => {
                                    handleUpdateCart(
                                      prod?.product?._id,
                                      prod?.count - 1
                                    );
                                  }}
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-600 dark:text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>
                                <span className="w-12 text-center text-gray-900 dark:text-white font-medium">
                                  {prod?.count}
                                </span>
                                <button
                                  onClick={() => {
                                    handleUpdateCart(
                                      prod?.product?._id,
                                      prod?.count + 1
                                    );
                                  }}
                                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-600 dark:text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => {
                                  handleDeleteCartItem(prod?.product?._id);
                                }}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="p-6 flex justify-between border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
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
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => {
                        handleClearCart();
                      }}
                      className="inline-flex items-center px-6 py-3 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 font-medium rounded-lg transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">
                        Items ({numOfCartItems})
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {totalCartPrice} EGP
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">
                        Shipping
                      </span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between items-center py-3 text-lg font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-green-600">
                        {totalCartPrice} EGP
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
                    <span>Proceed to Checkout</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Looks like you haven't added any items to your cart yet.
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
            </div>
          )}
        </div>
      </section>
    </>
  );
}
