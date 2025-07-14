import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../contexts/WishlistContext";
// import { removeFromWishlist } from "../contexts/WishlistContext";

export default function RecentProducts({ search = "" }) {
  // console.log("Search term:", search);

  let { AddToWishlist, wishlistItems, removeFromWishlist, getWishlist } =
    useContext(WishlistContext);
  const [wishlistStates, setWishlistStates] = useState({});

  const isInWishlist = (productId) => {
    return (
      (Array.isArray(wishlistItems) &&
        wishlistItems.some((item) => item._id === productId)) ||
      wishlistStates[productId]
    );
  };

  async function handleWishlistToggle(prodID) {
    console.log(prodID);

    try {
      if (isInWishlist(prodID)) {
        
        let response = await removeFromWishlist(prodID);
        console.log("Remove from wishlist response:", response);
        if (response?.status === "success") {
          toast.success("Removed from wishlist!", {
            duration: 2000,
            position: "top-right",
          });
          setWishlistStates((prev) => ({
            ...prev,
            [prodID]: false,
          }));
        }
      } else {
        let response = await AddToWishlist(prodID);
        console.log("Add to wishlist response:", response);
        if (response?.status === "success") {
          toast.success("Added to wishlist!", {
            duration: 2000,
            position: "top-right",
          });
          setWishlistStates((prev) => ({
            ...prev,
            [prodID]: true,
          }));
        }
      }
      // getWishlist();
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong!");
    }
  }

  const { addCartItem } = useContext(CartContext);

  async function handleAddToCart(prodID) {
    let response = await addCartItem(prodID);
    console.log("Add to cart response:", response);
    // console.log(response);
    if (response?.data?.status === "success") {
      toast.success(response?.message, {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.success(response?.message);
    }
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!search) return true;
    const titleMatch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch = product.category?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    return titleMatch || categoryMatch;
  });

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            className="sm:w-full md:w-1/1 lg:w-1/3 xl:w-1/4 p-2"
          >
            <div className="product group border rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <Link
                to={`/productdetails/${product._id}/${product.category.name}`}
                className="relative z-10"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={product.imageCover}
                    className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    alt={product.title}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm bg-green-500 px-3 py-1 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-green-600 text-sm font-medium uppercase tracking-wide group-hover:text-green-700 transition-colors duration-200">
                    {product.category?.name}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                      {product.price} EGP
                    </span>
                    <div className="flex items-center space-x-1">
                      <i className="fas fa-star text-yellow-400 group-hover:text-yellow-500 transition-colors duration-200"></i>
                      <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-200">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              {/* <button
                onClick={() => handleWishlistToggle(product._id)}
                className={`flex justify-end cursor-pointer text-xl font-medium transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-2 
                  ${
                  isInWishlist(product._id)
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-red-500"
                }
                `}
                
                
              >
                <i
                  className="fa-solid fa-heart transition-colors duration-200"
                ></i>
              </button> */}
              <button
                onClick={() => handleWishlistToggle(product._id)}
                className="top-64 right-3 absolute z-50 flex justify-end cursor-pointer text-xl font-medium transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 rounded-full p-0.5"
                title={
                  isInWishlist(product._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >
                <i
                  className={`fa-solid fa-heart transition-colors  ${
                    isInWishlist(product._id)
                      ? "text-red-500"
                      : "text-gray-400 "
                  }`}
                ></i>
              </button>

              <button
                onClick={() => {
                  handleAddToCart(product._id);
                }}
                className="relative z-10 w-full mt-4 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all duration-300 ease-in-out transform translate-y-64 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center space-x-2">
                  <i className="fas fa-shopping-cart transition-transform duration-200 group-hover:scale-110"></i>
                  <span>Add to Cart</span>
                </span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center py-8">
          <h1>No matching products found.</h1>
        </div>
      )}
    </div>
  );
}
