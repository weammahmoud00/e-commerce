import { createContext, useState, useEffect } from "react";
import axios from "axios";

export let WishlistContext = createContext(0);

export default function WishlistContextProvider(props) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);


  function getWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        // console.log("Get wishlist response:", response.data);
        setWishlistItems(response.data.data || []);
        setWishlistCount(response.data.count || 0);
        return response.data;
      })
      .catch((error) => {
        console.error("Error getting wishlist:", error);
        return error;
      });
  }

  async function AddToWishlist(prodId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: prodId,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("Add to wishlist response:", response.data);
        setWishlistItems(response.data || []);
        console.log(wishlistItems,"wishlistItems");
        
        // getWishlist();
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
        return error;
      });
  }

  function removeFromWishlist(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        console.log("Remove from wishlist response:", response.data);
        getWishlist();
        return response.data;
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
        return error;
      });
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        AddToWishlist,
        removeFromWishlist,
        getWishlist,
        wishlistItems,
        wishlistCount,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
