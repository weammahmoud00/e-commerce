import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [numOfUserOrder, setNumOfUserOrder] = useState(0);

  const token = localStorage.getItem("userToken");

  const [cartId, setCartId] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);

  function addCartItem(prodId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
        getUserCart();
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding cart item:", error);
        return error;
      });
  }

  async function getUserCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        // console.log(response);
        setCartId(response?.data?.cartId);
        setProducts(response?.data?.data?.products);
        setTotalCartPrice(response?.data?.data?.totalCartPrice);
        setNumOfCartItems(response?.data?.numOfCartItems);

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function updateCart(prodId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        getUserCart();
        return { response: response.data };
      })
      .catch((error) => {
        console.error("CartContext updateCart error:", error);
        return error;
      });
  }

  function deleteCartItem(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        getUserCart();
        console.log("deleeeeeteddddddddd");

        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
        return error;
      });
  }

  function ClearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        getUserCart();
        return response.data;
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        return error;
      });
  }

  const fetchUserOrders = async (userId) => {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        console.log("Orders response:", response.data);
        setNumOfUserOrder(response.data.length);
        console.log("Number of user orders:", response.data.length);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        return error;
      });
  };

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);
  return (
    <CartContext.Provider
      value={{
        addCartItem,
        updateCart,
        deleteCartItem,
        ClearCart,
        getUserCart,
        fetchUserOrders,
        products,
        cartId,
        totalCartPrice,
        numOfCartItems,
        numOfUserOrder,
        setNumOfUserOrder,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
