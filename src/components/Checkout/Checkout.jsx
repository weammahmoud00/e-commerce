import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function Checkout() {
  let [online, setOnline] = useState(true);
  const navigate = useNavigate();
  const { cartId, totalCartPrice, numOfCartItems, products } =
    useContext(CartContext);
  //   console.log(cartId);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const canceled = urlParams.get("canceled");

    if (success === "true") {
      toast.success("Payment completed successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (canceled === "true") {
      toast.error("Payment was canceled");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [navigate]);

  function detectPayMethod(val) {
    console.log("detectPayMethod called with:", val);
    console.log("online state:", online);

    if (online) {
      payOnline(val);
    } else {
      payCach(val);
    }
  }

  function payCach(val) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: val, //details phone city
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("Pay now response:", response.data);
        if (response?.data?.status === "success") {
          toast.success("Order placed successfully");

          const checkoutData = {
            orderDetails: response.data,
            shippingAddress: val, //details phone city
            cartInfo: {
              cartId,
              totalCartPrice,
              numOfCartItems,
              products,
            },
          };

          navigate("/checkoutDetails", {
            state: { checkoutData },
          });
        }
      })
      .catch((error) => {
        console.error("Pay now error:", error);
      });
  }

  function payOnline(val) {
    console.log("payOnline function called with:", val);
    console.log("cartId:", cartId);
    console.log("userToken:", localStorage.getItem("userToken"));

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174/checkout?success=true&canceled=false`,
        {
          shippingAddress: val,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("Pay online response:", response.data);
        if (response?.data?.status === "success") {
          console.log(response.data.session.url);
          toast.success("Order placed successfully");
          const checkoutUrl = response.data.session.url;
          window.location.href = checkoutUrl;
        }
      })
      .catch((error) => {
        console.error("Pay online error:", error);
        console.error("Error details:", error.response?.data);
      });
  }
  //  const onSubmit = async (values) => {
  //     setLoading(true);
  //       axios.post(
  //       "https://ecommerce.routemisr.com/api/v1/orders/${cartId}",
  //       values
  //     ).then(({data}) => {
  //       setLoading(false);
  //       console.log(data);
  //       if(data?.message === "success") {
  //                 setUserLogin(data?.token);
  //         localStorage.setItem("userToken", data.token);
  //         navigate("/");
  //       }
  //     }).catch ((error) => {
  //       setLoading(false);
  //       console.log(error?.response?.data?.message);
  //       setErrMsg(error?.response?.data?.message);
  //     })
  //   };

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: detectPayMethod,
  });

  // function handlePayNow(){
  //     return (
  //       <>
  //         <div>
  //           <h2 className="text-xl font-semibold mb-4">
  //             Step 3: Review & Submit
  //           </h2>
  //           <p className="mb-4">
  //             Please review your information before submitting.
  //           </p>
  //           <ul className="list-disc pl-5 space-y-2">
  //             <li>
  //               <strong>Name:</strong> <span id="review-name">John Doe</span>
  //             </li>
  //             <li>
  //               <strong>Phone:</strong>{" "}
  //               <span id="review-email">john.doe@example.com</span>
  //             </li>
  //             <li>
  //               <strong>Address:</strong>{" "}
  //               <span id="review-address">123 Main St, City, 12345</span>
  //             </li>
  //           </ul>
  //         </div>
  //       </>
  //     );
  // }
  return (
    <>
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-center mb-8 text-4xl font-bold text-green-600">
              <h2> checkout </h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div id="step-1" className="step">
                <h2 className="text-md font-semibold mb-4">
                  Please enter your Personal Info
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    id="details"
                    name="details"
                    placeholder="Details"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                  />
                  <input
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                  />
                  <input
                    type="text"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    id="city"
                    name="city"
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => {
                    setOnline(false);
                    navigate("/checkoutDetails");
                  }}
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Pay cash
                </button>

                <button
                  onClick={() => {
                    setOnline(true);
                  }}
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Pay online
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
